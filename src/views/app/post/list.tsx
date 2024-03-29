import { debounce } from "lodash";
import * as React from "react";
import { PostContext } from ".";
import { Post } from "../../../types";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { getPostList } from "../proto/post";
import { Post as PostComponent } from "./post";

export const List = React.memo(function _List() {
  const {
    postList,
    darkMode,
    currentPostID,
    cursor,
    setCursor,
    currentCategoryID,
    chatMode,
    searchVisible,
    currentSort,
    setPostList,
  } = React.useContext(PostContext);
  const loadMore = debounce(async () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    if (scrollTop + window.innerHeight > scrollHeight - 100) {
      console.log(cursor, "cursor");

      const res = await getPostList({
        sortType: currentSort,
        cursor,
        categoryID: currentCategoryID,
      });
      setCursor(res.cursor);
      setPostList((postList) => postList.concat(res.data));
    }
  }, 1000);
  React.useEffect(() => {
    if (chatMode) {
      return () => {};
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [cursor, currentCategoryID]);
  return (
    <div
      className={`${darkMode && " dark "} min-w-[800px] 
      w-full
      ${currentPostID && "max-h-screen overflow-hidden"}`}
    >
      <div
        className={`flex w-full max-h-screen h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <Header context={PostContext} />
        {postList.length === 0 ? (
          <Loading />
        ) : (
          <Articles postList={postList} className=" mt-14" />
        )}
        {currentPostID && <PostComponent />}
        {searchVisible && <Search />}
      </div>
    </div>
  );
});

export function Loading({ className = "" }) {
  return (
    <div
      className={`flex flex-col w-full max-h-screen gap-3 px-3 overflow-hidden pt-14 ${className}`}
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="p-4 border rounded-md shadow dark:border-gray-800"
        >
          <div className="flex w-full space-x-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-700"></div>
            <div className="flex-1 py-1 space-y-6">
              <div className="h-2 rounded bg-slate-700"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 col-span-2 rounded bg-slate-700"></div>
                  <div className="h-2 col-span-1 rounded bg-slate-700"></div>
                </div>
                <div className="h-2 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Article({ id, info, author, tags }: Post) {
  const { setCurrentPostID, setScrollTop } = React.useContext(PostContext);
  return (
    <article className="flex items-center justify-between gap-2 pb-2 mt-2 border-b">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1 text-sm">
          <a>
            <img className="w-8 h-8" src={author.avatar} alt={author.name} />
          </a>
          <span className="">{author.name}</span>
          <span className="font-light text-gray-600 dark:text-gray-500">
            {info.createdAt}
          </span>
        </div>

        <div
          className="flex flex-col mb-2"
          onClick={() => {
            setScrollTop(window.scrollY);
            setCurrentPostID(id);
          }}
        >
          <div className="mb-2 text-xl font-bold cursor-pointer">
            {info.title}
          </div>
          <div className="font-light cursor-pointer line-clamp-2">
            {info.briefContent}
          </div>
        </div>

        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <div className="flex gap-2 mr-3">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-lg bg-gray-200 px-1.5 py-0.5 cursor-pointer dark:bg-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <span>阅读:{info.viewCount}</span>
              <span>点赞:{info.diggCount}</span>
              <span>评论:{info.commentCount}</span>
              <span>收藏:{info.collectCount}</span>
              <span>总分:{info.rankIndex}</span>
              <span>热度:{info.hotIndex}</span>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            {/* <span className="cursor-pointer">收藏</span>
            <span className="cursor-pointer">屏蔽</span> */}
          </div>
        </div>
      </div>

      {info.coverImage && (
        <img
          className="object-contain w-24 h-16"
          src={info.coverImage}
          alt={info.title}
        />
      )}
    </article>
  );
}

export function Articles({ postList, className = "" }) {
  return (
    <main
      className={`flex-1 px-10 py-2 bg-white dark:bg-slate-800 ${className}`}
    >
      {postList.map((post) => (
        <Article key={post.id} {...post} />
      ))}
    </main>
  );
}
