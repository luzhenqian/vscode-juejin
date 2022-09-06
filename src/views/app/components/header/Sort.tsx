import * as React from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  offset,
} from "@floating-ui/react-dom-interactions";
import { Button } from "./Button";
import { Item } from "./Item";
import { getPostList } from "../../proto/post";
import { SortType } from "../../../../types";

const sortDictionary = new Map<string, SortType>();
sortDictionary.set("推荐", 200);
sortDictionary.set("最新", 300);
sortDictionary.set("最热", 3);

export const Sort = ({
  hide,
  setCurrentSort,
  categoryID,
  setPostList,
  setCursor,
  sortType,
}) => {
  const [visible, setVisible] = React.useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    middleware: [offset(16)],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
  ]);
  return (
    <>
      <Item ref={reference} {...getReferenceProps()}>
        排序
      </Item>

      {visible && (
        <Button
          className="flex justify-between gap-2 p-2 break-words bg-white ring-1 ring-gray-800 dark:bg-gray-900 "
          style={{
            wordBreak: "keep-all",
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          ref={floating}
          {...getFloatingProps()}
        >
          {Array.from(sortDictionary.keys()).map((sort) => (
            <Item
              key={sort}
              onClick={async () => {
                const sortType = sortDictionary.get(sort);
                hide();
                setVisible(false);
                setCurrentSort(sortType);
                const cursorContainer =
                  document.getElementById("cursor-container");
                if (cursorContainer) {
                  cursorContainer.scrollTo({ top: 0 });
                } else {
                  window.scrollTo({ top: 0 });
                }

                const { cursor, data } = await getPostList({
                  sortType,
                  cursor: "0",
                  categoryID,
                });
                setCursor(cursor);
                setPostList(data);
              }}
              className={`${sortDictionary.get(sort) === sortType ? " font-bold " : ""}`}
            >
              {sort}
            </Item>
          ))}
        </Button>
      )}
    </>
  );
};
