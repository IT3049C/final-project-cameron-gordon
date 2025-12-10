import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";

  const games = [
    { key: "rps", name: "Rock Paper Scissors", description: "A simple game of Rock Paper Scissors" },
    { key: "tic-tac-toe", name: "Tic Tac Toe", description: "A simple game of Tic Tac Toe" },
    { key: "wordle", name: "Wordle", description: "A Wordle game built in React" },
    { key: "arxiv_snarxiv", name: "Arxiv vs. Snarxiv", description: "Guess the real paper" },
  ];

  // Filter games based on search param (case-insensitive)
  const filteredGames = useMemo(() => {
    if (!search) return games;
    const term = search.toLowerCase();
    return games.filter(g => g.name.toLowerCase().includes(term));
  }, [search]);

  // Handle input change — updates search param in URL
  function handleSearchChange(e) {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
      navigate(`/?search=${encodeURIComponent(value)}`, { replace: true });
    } else {
      setSearchParams({});
      navigate("/", { replace: true });
    }
  }

  return (
    <section>
      <h2>Available Games</h2>
      <p>Choose a game to play</p> 
      <input
        id="game-search"
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={handleSearchChange}
      />

      <ul style={{ textAlign: "left" }}>
        {filteredGames.map((game) => (
          <li key={game.key}>
            <Link to={`/game/${game.key}`}>{game.name}</Link>
            <p>{game.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
