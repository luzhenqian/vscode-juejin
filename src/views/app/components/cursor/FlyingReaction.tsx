import * as React from "react";
import "./FlyingReaction.module.css";

type Props = {
  x: number;
  y: number;
  timestamp: number;
  value: string;
};

export default function FlyingReaction({ x, y, timestamp, value }: Props) {
  return (
    <div
      className={`absolute select-none pointer-events-none disappear text-${
        (timestamp % 5) + 2
      }xl ${"goUp" + (timestamp % 3)}`}
      style={{ left: x, top: y }}
    >
      <div className={"leftRight" + (timestamp % 3)}>
        <div className="transform -translate-x-1/2 -translate-y-1/2">
          {value}
        </div>
      </div>
    </div>
  );
}
