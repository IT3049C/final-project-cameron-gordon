export function HighScoresSection() {
  return (
    <section aria-labelledby="highscores-heading" className="card" style={{
    background: "linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 100%)",
    borderRadius: "18px",
    padding: "28px",
    margin: "30px auto",
    maxWidth: "700px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    border: "1px solid var(--color-border)",
  }}>
      <h2 id="highscores-heading">High Scores</h2>
      <ul id="highscores"></ul>
      <button id="clear-highscores" type="button">
        Clear High Scores
      </button>
    </section>
  );
}
