export function generateTitle(){
  const realPapers = [
    ["Quantum Entanglement in Photonic Wormholes", "real"],
    ["Spectral Analysis of Ricci Flow in Lattice Geometry", "real"],
    ["The Categorical Structure of Magnetized Time", "real"],
  ];

  const fakePapers = [
    ["Fuzzy Ontologies of Topological Reality in Metaquantum Clusters", "fake"],
    ["Gravitational Racetrack Stabilization through Cosmic Sudoku", "fake"],
    ["Dyson Sphere Origami in Cyclic Multiverses", "fake"],
  ];

  const arr = Math.random() < 0.5 ? realPapers : fakePapers;
  const [title, answer] = arr[Math.floor(Math.random()*arr.length)];

  return {
    title,
    answer
  };
}
