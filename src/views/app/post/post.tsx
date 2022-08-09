import * as React from "react";
import { Loading } from "../components/loading";
import { dispatch, PostContext } from ".";

export function Post() {
  const { currentPostID, postHTML, setPostHTML } =
    React.useContext(PostContext);
  React.useEffect(() => {
    dispatch({ type: "GET_POST", payload: { id: currentPostID, setPostHTML } });
  }, []);
  return (
    <div
      className="fixed overflow-scroll top-14 left-[20px] bottom-0 right-[20px]
    bg-white text-gray-900 dark:bg-gray-900 dark:text-white
    "
    >
      {postHTML ? (
        <iframe srcDoc={`${postHTML.html}<style>img {display: block;max-width: 100%;margin: auto;}</style>`} className="w-full h-full" />
      ) : (
        // <div dangerouslySetInnerHTML={{ __html: postHTML.html }} />
        <Loading />
      )}
    </div>
  );
}
