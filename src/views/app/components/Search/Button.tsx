import * as React from "react";
import { PostContext } from "../../post";
import { Search } from "../Icons/search";

export const SearchButton = (props) => {
  const { setSearchVisible } = React.useContext(PostContext);
  const { className } = props;
  return (
    <div
      className={`inline-flex w-[200px] rounded-md p-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:text-gray-400 dark:ring-0 dark:shadow-highlight/4 ${className}
      cursor-pointer
      hover:text-gray-800 dark:hover:text-gray-300
      `}
      onClick={() => setSearchVisible(true)}
    >
      <span className="flex-1">搜索</span>
      <Search
        className={`w-5 h-5 ml-1  
      hover:fill-gray-800 dark:hover:fill-gray-300 fill-gray-400 dark:fill-gray-300`}
      />
    </div>
  );
};
