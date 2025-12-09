import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {` | `}
      <NavLink to="/lobby">Lobby</NavLink>
      {` | `}
      <NavLink to="/game/rps">Rock Paper Scissors</NavLink>
      {` | `}
      <NavLink to="/game/tic-tac-toe">Tic Tac Toe</NavLink>
      {` | `}
      <NavLink to="/game/wordle">Wordle</NavLink>
      {` | `}
      <NavLink to="/game/arxiv_snarxiv">Arxiv vs. Snarxiv</NavLink>
    </nav>
  );
}