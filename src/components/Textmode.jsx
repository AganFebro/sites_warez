import { useEffect, useRef } from 'react';

const CELL_W = 8;
const CELL_H = 16;
const SCALE = 2;
const TONES = [
  '#ffffff',
  '#e8e8e8',
  '#d1d1d1',
  '#bababa',
  '#a3a3a3',
  '#8c8c8c',
  '#757575',
  '#5e5e5e',
  '#474747',
  '#303030',
];
const SHADOW = '#222222';

function layout(text) {
  const lines = text.replace(/\s+$/, '').split('\n');
  const height = lines.length;
  const width = Math.max(...lines.map((line) => line.length));
  const face = lines.map((line) => {
    const row = Array(width).fill(false);
    for (let column = 0; column < line.length; column += 1) row[column] = line[column] !== ' ';
    return row;
  });

  // ponytail: join a 2-cell nub sitting one gap off the stroke. The e's middle counter stays open.
  for (let row = 0; row < height; row += 1) {
    let column = 0;
    while (column < width) {
      while (column < width && !face[row][column]) column += 1;
      const runStart = column;
      while (column < width && face[row][column]) column += 1;
      const run = column - runStart;
      const flush = column >= width || face.every((line) => !line[column]);
      if (!flush || run !== 2 || runStart < 2 || !face[row][runStart - 2] || face[row][runStart - 1]) continue;
      let body = runStart - 2;
      while (body >= 0 && face[row][body]) body -= 1;
      if (runStart - 2 - body >= 3) face[row][runStart - 1] = true;
    }
  }

  const ink = Array.from({ length: width }, (_, column) => face.some((row) => row[column]));
  const letters = [];
  let start = -1;
  for (let column = 0; column <= width; column += 1) {
    if (column < width && ink[column]) {
      if (start < 0) start = column;
    } else if (start >= 0) {
      letters.push([start, column - 1]);
      start = -1;
    }
  }

  const tone = face.map((row) => row.map(() => -1));
  for (const [left, right] of letters) {
    let top = height;
    let bottom = 0;
    for (let row = 0; row < height; row += 1) {
      for (let column = left; column <= right; column += 1) {
        if (!face[row][column]) continue;
        top = Math.min(top, row);
        bottom = Math.max(bottom, row);
      }
    }
    const span = bottom - top;
    for (let row = top; row <= bottom; row += 1) {
      const level = span === 0 ? 0 : Math.round(((row - top) * (TONES.length - 1)) / span);
      for (let column = left; column <= right; column += 1) {
        if (face[row][column]) tone[row][column] = level;
      }
    }
  }

  return { tone, width, height };
}

export default function Textmode({ text }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const { tone, width, height } = layout(text);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const columns = width + 1;
    const rows = height + 1;

    canvas.width = columns * CELL_W * SCALE;
    canvas.height = rows * CELL_H * SCALE;
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const level = row < height && column < width ? tone[row][column] : -1;
        const shaded = level < 0 && row > 0 && column > 0 && tone[row - 1][column - 1] >= 0;
        if (level < 0 && !shaded) continue;

        context.fillStyle = level < 0 ? SHADOW : TONES[level];
        context.fillRect(
          column * CELL_W * SCALE,
          row * CELL_H * SCALE,
          CELL_W * SCALE,
          CELL_H * SCALE,
        );
      }
    }
  }, [text]);

  return <canvas ref={canvasRef} className="nfo-logo" aria-hidden="true" />;
}
