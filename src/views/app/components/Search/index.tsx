import * as React from "react";
import { PostContext } from "../../post";
import { Articles, Loading } from "../../post/list";
import { searchPost } from "../../proto/post";
import { Input } from "./Input";

export function Search() {
  const [postList, setPostList] = React.useState([]);
  const [searching, setSearching] = React.useState(false);
  const onSearch = (value) => {
    setSearching(true);
    searchPost({ sortType: 200, keywords: value }).then((res) => {
      setSearching(false);
      setPostList(res as any);
    });
  };
  const onClose = () => {
    setSearchVisible(false);
  };
  const { setSearchVisible } = React.useContext(PostContext);
  return (
    <div
      className="fixed m-auto left-0 right-0 bg-white dark:bg-slate-800 top-[80px] w-[800px] rounded-md border py-2
    max-h-[90vh] pt-0 overflow-auto"
    >
      <Input
        placeholder="搜索稀土掘金"
        searching={searching}
        onSearch={onSearch}
        onClose={onClose}
      />
      {searching && <Loading className="pt-0 mt-2" />}
      {postList.length > 0 && <Articles postList={postList} className="px-4" />}
    </div>
  );
}
