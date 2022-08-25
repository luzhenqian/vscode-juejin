import * as React from "react";
import { Loading } from "../components/loading";
import { dispatch, PostContext } from ".";
import hljs from "highlight.js/lib/core";

export function Post() {
  const { darkMode, currentPostID, postHTML, setPostHTML } =
    React.useContext(PostContext);
  React.useEffect(() => {
    dispatch({ type: "GET_POST", payload: { id: currentPostID, setPostHTML } });
  }, [currentPostID, setPostHTML]);
  React.useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <div
      className="fixed overflow-scroll top-14 left-[20px] bottom-0 right-[20px]
      px-4 z-20
    bg-white text-gray-900 dark:bg-gray-900 dark:text-white
    "
    >
      {postHTML && postHTML.html ? (
        <div
          dangerouslySetInnerHTML={{
            __html: `${postHTML.html}
<style>
.post_content img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: auto;
}
</style>

<link href="${window.config.themes.tailwind}" rel="stylesheet">
${
  darkMode
    ? `<link href="${window.config.themes.tailwindDark}" rel="stylesheet">`
    : ""
}
<link href="${
              darkMode
                ? window.config.codeThemes.githubDarkDimmed
                : window.config.codeThemes.github
            }" rel="stylesheet">
    `,
          }}
          className="w-full h-full post_content"
        />
      ) : (
        // <div dangerouslySetInnerHTML={{ __html: postHTML.html }} />
        <Loading />
      )}
    </div>
  );
}
