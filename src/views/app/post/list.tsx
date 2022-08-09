import * as React from "react";
import { PostContext } from ".";
import { Post } from "../../../types";
import { Header } from "../components/header";
import { Post as PostComponent } from "./post";

function Categories() {
  const { categories } = React.useContext(PostContext);
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-3 w-full max-h-screen pt-14 px-3 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <div key={i} className=" rounded-md border p-4 shadow">
          <div className="flex w-full animate-pulse space-x-4">
            <div className="h-10 w-10 rounded-full bg-slate-700"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-slate-700"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                  <div className="col-span-1 h-2 rounded bg-slate-700"></div>
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
  const { setCurrentPostID } = React.useContext(PostContext);
  return (
    <article className="flex justify-between items-center border-b mt-2 pb-2 gap-2">
      <div className="flex flex-col flex-1">
        <div className="mb-1 flex items-center gap-2 text-sm">
          <a>
            <img className="h-8 w-8" src={author.avatar} />
          </a>
          <span className="">{author.name}</span>
          <span className="font-light text-gray-600 dark:text-gray-500">
            {info.createdAt}
          </span>
        </div>

        <div
          className="mb-2 flex flex-col"
          onClick={setCurrentPostID.bind(null, id)}
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
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-lg bg-gray-200 px-1.5 py-0.5 cursor-pointer dark:bg-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <span>{info.viewCount}阅读</span>
              <span>{info.diggCount}点赞</span>
              <span>{info.commentCount}评论</span>
              <span>{info.collectCount}收藏</span>
              <span>{info.hotIndex}热度</span>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="cursor-pointer">收藏</span>
            <span className="cursor-pointer">屏蔽</span>
          </div>
        </div>
      </div>

      {info.coverImage && (
        <img
          className="h-16 w-24 object-contain"
          src={info.coverImage}
          alt={info.title}
        />
      )}
    </article>
  );
}

function Articles() {
  const { postList } = React.useContext(PostContext);
  return (
    <main className="flex-1 bg-white px-10 py-2 dark:bg-slate-800 mt-14">
      {postList.map((post) => (
        <Article key={post.id} {...post} />
      ))}
    </main>
  );
}

export const List = React.memo(function _List() {
  const { darkMode, postList, currentPostID } = React.useContext(PostContext);

  return (
    <div
      className={`${darkMode && " dark "} min-w-[800px] 
      ${currentPostID && "max-h-screen overflow-hidden"}`}
    >
      <div
        className={`flex max-h-screen h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <Header context={PostContext} />
        {postList.length === 0 ? <Loading /> : <Articles />}
        {currentPostID && <PostComponent />}
      </div>
    </div>
  );
});
