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

  /**
   *     <section>
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

      <h2><b>Developed by: </b> Cameron Gordon</h2>
    </section>
   */

  return (
  <section   style={{
    background: "linear-gradient(180deg, #FFFFFF 0%, #F6F9FF 100%)",
    padding: "40px 20px",
    borderRadius: "20px",
    maxWidth: "900px",
    margin: "40px auto",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  }}>
    <h2 style={{ color: "var(--color-text)" }}>Available Games</h2>
    <p  style={{ color: "var(--color-text-secondary)" }}>Choose a game to play</p> 

<div style={{
  position: "relative",
  width: "100%",
  maxWidth: "400px",
  marginBottom: "20px"
}}>
  <span
    style={{
      position: "absolute",
      left: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--color-text-secondary)",
      fontSize: "18px"
    }}
  >
    🔍
  </span>

  <input
    id="game-search"
    type="text"
    placeholder="Search games..."
    value={search}
    onChange={handleSearchChange}
    style={{
      padding: "10px 10px 10px 36px",   // <-- space for icon
      width: "100%",
      borderRadius: "8px",
      border: "1px solid var(--color-border)",
      background: "var(--color-surface-secondary)",
      color: "var(--color-text)",
      backgroundColor: "white"
    }}
  />
</div>

    {/* GAME GRID */}
  {/* GAME GRID */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    }}
  >
    {filteredGames.map((game, index) => {
      const isEven = index % 2 === 0;

      return (
        <div
          key={game.key}
          style={{
            background: isEven ? "var(--alt-1)" : "var(--alt-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "10px",
            padding: "16px",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Link
            to={`/game/${game.key}`}
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "var(--color-primary)",
              textDecoration: "none",
            }}
          >
            {game.name}
          </Link>

          <p style={{ color: "var(--color-text-secondary)" }}>
            {game.description}
          </p>
        </div>
      );
    })}
  </div>

    {/* FOOTER */}
    <h2     style={{
      marginTop: "40px",
      textAlign: "center",
      color: "var(--color-primary)",
    }}>
      <b>Developed by:</b> Cameron Gordon
    </h2>
  </section>

  );
}
