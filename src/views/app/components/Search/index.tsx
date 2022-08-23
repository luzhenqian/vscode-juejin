import * as React from "react";
import { dispatch, PostContext } from "../../post";
import { Input } from "./Input";

export function Search() {
  const onSearch = (value) => {
    dispatch({ type: "SEARCH", payload: { keywords: value } });
  };
  const onClose = () => {
    setSearchVisible(false);
  };
  const { setSearchVisible } = React.useContext(PostContext);
  return (
    <div className="fixed m-auto left-0 right-0 bg-white dark:bg-slate-800 top-[80px] w-[600px] rounded-md border py-2 z-10">
      <Input placeholder="搜索稀土掘金" onSearch={onSearch} onClose={onClose} />
    </div>
  );
}
