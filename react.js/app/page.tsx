"use client";
import range from "lodash/range";
import app from "./app.module.css";
import clamp from "lodash/clamp";
import { type FC, memo, PropsWithChildren, useCallback, useState } from "react";

const w = 50;

interface Block {
  i: number;
  count: number;
  onHovered: (i: number) => void;
}
const Block: FC<PropsWithChildren<Block>> = memo(
  ({ count, i, onHovered, children }) => {
    const c = clamp(255 - count * 25, 1, 255);
    const background = `rgb(${c}, ${c}, ${c})`;
    return (
      <div
        style={{
          background,
        }}
        className={app.block}
        onMouseEnter={useCallback(() => onHovered(i), [onHovered, i])}
      >
        {children}
      </div>
    );
  }
);

export default function App() {
  const [state, setState] = useState(
    range(0, w * w).map((_) => ({ count: 0 }))
  );

  return (
    <main className={app.main}>
      {state.map((v, i) => (
        <Block
          key={i}
          onHovered={useCallback((i) => {
            setState((state) => {
              state[i].count++;
              return [...state];
            });
          }, [])}
          count={v.count}
          i={i}
        >
          <div>{v.count}</div>
        </Block>
      ))}
    </main>
  );
}
