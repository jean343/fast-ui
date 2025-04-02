import { For, ParentComponent, type Component } from "solid-js";
import range from "lodash/range";
import app from "./app.module.css";
import { createStore, produce } from "solid-js/store";
import clamp from "lodash/clamp";

const w = 50;

interface Block {
  i: number;
  count: number;
  onHover: (i: number) => void;
}
const Block: ParentComponent<Block> = (props) => {
  const background = () => {
    const c = clamp(255 - props.count * 25, 1, 255);
    return `rgb(${c}, ${c}, ${c})`;
  };
  return (
    <div
      style={{
        background: background(),
      }}
      class={app.block}
      onMouseEnter={() => props.onHover(props.i)}
    >
      {props.children}
    </div>
  );
};

export default function App() {
  const [store, setStore] = createStore(
    range(0, w * w).map((_) => ({ count: 0 }))
  );

  return (
    <main class={app.main}>
      <For each={store}>
        {(v, i) => (
          <Block
            onHover={(i) => {
              setStore(i, "count", store[i].count + 1);
            }}
            count={v.count}
            i={i()}
          >
            <div>{v.count}</div>
          </Block>
        )}
      </For>
    </main>
  );
}
