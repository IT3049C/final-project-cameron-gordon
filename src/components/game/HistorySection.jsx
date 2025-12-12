export function HistorySection({ history }) {
  return (
<ul
  id="history"
  aria-live="polite"
  style={{ textAlign: "left" }}
>
  {history.map((h, index) => (
    <li
      key={index}
      className={index === 0 ? "result" : ""}
      data-testid={index === 0 ? "rps-result" : undefined}
    >
      Player({h.player}) vs CPU({h.cpu}): {h.msg}
    </li>
  ))}
</ul>

  );
}
