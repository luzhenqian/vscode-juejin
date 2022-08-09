import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { List } from "./list";
import { Post } from "./post";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  );
}
