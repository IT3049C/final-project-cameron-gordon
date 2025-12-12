import { avatars } from "../../logic/avatars";

export function PlayerInfoCard({ playerName, playerAvatar }) {
  console.log(playerAvatar);
  return (
    <section aria-labelledby="player-info-heading" className="card" style={{
    background: "linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 100%)",
    borderRadius: "18px",
    padding: "28px",
    margin: "30px auto",
    maxWidth: "700px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    border: "1px solid var(--color-border)",
  }}>
      <h2 id="player-info-heading">Player Info</h2>
      <div role="status" aria-live="polite" data-testid="greeting">
        {playerName ? `Welcome ${playerName}!` : null}
      </div>
      <div className="player-avatar">
        <img
          id="current-avatar"
          src={avatars.find((a) => a.key === playerAvatar).image}
          alt="Player avatar"
        />
        <span id="player-name">{playerName}</span>
      </div>
    </section>
  );
}
