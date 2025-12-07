import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const BASE = 'https://game-room-api.fly.dev';
async function apiCreateRoom(body){
  console.log("API CREATE ROOM → sending:", body);

  const res = await fetch(`${BASE}/api/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if(!res.ok){
    const txt = await res.text();
    console.error("CREATE ROOM ERROR:", txt);
    throw new Error('Failed to create room');
  }

  const data = await res.json();
  console.log("API CREATE ROOM RESPONSE:", data);
  return data;
}

/**
 * correct
 * async function apiCreateRoom(initialState){
  console.log("API CREATE ROOM → sending:", initialState);

  const res = await fetch(`${BASE}/api/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initialState })
  });

  if(!res.ok){
    const txt = await res.text();
    console.error("CREATE ROOM ERROR:", txt);
    throw new Error('Failed to create room');
  }

  const data = await res.json();
  console.log("API CREATE ROOM RESPONSE:", data);
  return data;
}**/


/*async function apiCreateRoom(initialState){
  console.log("API CREATE ROOM → sending:", initialState);

  const res = await fetch(`${BASE}/api/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameState: initialState })
  });

  if(!res.ok){
    const txt = await res.text();
    console.error("CREATE ROOM ERROR:", txt);
    throw new Error('Failed to create room');
  }

  const data = await res.json();
  console.log("API CREATE ROOM RESPONSE:", data);
  return data;
}**/

async function apiGetRoom(roomId){
  if (!roomId) return null;

  const res = await fetch(`${BASE}/api/rooms/${roomId}`);
  if(!res.ok){
    console.error("ROOM NOT FOUND:", roomId);
    throw new Error('Room not found');
  }

  const j = await res.json();
  return j;
}

async function apiUpdateRoom(roomId, gameState){
  console.log("API UPDATE ROOM", roomId, gameState);

  const res = await fetch(`${BASE}/api/rooms/${roomId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameState })
  });

  if(!res.ok){
    const txt = await res.text();
    console.error("UPDATE ROOM ERROR:", txt);
    throw new Error('Failed to update room');
  }

  return res.json();
}

export function useGameRoom(options) {
  const [roomId, setRoomId] = useState(null);
  const qc = useQueryClient();

  // live polling room state
  const {
    data: state,
    isLoading,
    error
  } = useQuery({
    queryKey: ['room', roomId],
    enabled: !!roomId,
    queryFn: () => apiGetRoom(roomId).then(r => r?.gameState),
    refetchInterval: (options && options.refetchInterval) || 800,
  });
  const createRoom = useMutation({
    mutationFn: apiCreateRoom,
    onSuccess: ({ roomId: rId, gameState }) => {
      setRoomId(rId);
      qc.setQueryData(['room', rId], gameState);
    }
  }); 

  // PUSH NEW STATE
  const pushState = useMutation({
  mutationFn: async (next) => {
    if (!roomId) throw new Error("No room");

    // Get latest full game state
    const latest = await apiGetRoom(roomId);

    // extract the usable gameState (flatten nested initialState)
    const gs = latest.gameState?.initialState?.initialState 
            || latest.gameState?.initialState 
            || latest.gameState 
            || {};

    // create merged object
    const merged = {
      ...gs,          // keep everything
      ...next,        // apply updates
      players: {
        ...gs.players,
        ...next.players,
      },
      guesses: {
        ...gs.guesses,
        ...next.guesses,
      },
      version: (gs.version ?? 0) + 1,
    };

    console.log("pushState sending merged:", merged);

    const updated = await apiUpdateRoom(roomId, merged);
    return updated.gameState;
  },
  onSuccess: (gameState) => {
    if (roomId) qc.setQueryData(['room', roomId], gameState);
  }
});

  /*const pushState = useMutation({
    mutationFn: async (next) => {
      if(!roomId) throw new Error('No room');

      const latest = await apiGetRoom(roomId);
      const version = (latest?.gameState?.version ?? 0) + 1;
      const merged = { ...next, version };

      console.log("PUSH STATE — FINAL MERGED:", merged);

      const updated = await apiUpdateRoom(roomId, merged);
      return updated.gameState;
    },
    onSuccess: (gameState) => {
      console.log("UPDATE SUCCESS:", gameState);
      if(roomId) qc.setQueryData(['room', roomId], gameState);
    }
  });**/

  return {
    roomId,
    state,
    isLoading,
    error,
    setRoomId,
    createRoom: (body) => createRoom.mutateAsync(body),

   // createRoom: (initialState) => createRoom.mutateAsync({ initialState }),
    pushState: (next) => pushState.mutateAsync(next),
  };
}
