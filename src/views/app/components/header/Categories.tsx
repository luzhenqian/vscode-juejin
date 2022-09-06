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

export const Categories = ({
  hide,
  categories,
  sortType,
  setCursor,
  setCurrentCategoryID,
  setPostList,
  categoryID,
}) => {
  const [cateVisible, setCateVisible] = React.useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open: cateVisible,
    onOpenChange: setCateVisible,
    middleware: [offset(16)],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
  ]);
  return (
    <>
      <Item ref={reference} {...getReferenceProps()}>
        分类
      </Item>

      {cateVisible && (
        <Button
          className="flex justify-between gap-2 p-2 break-words bg-white ring-1 ring-gray-800 dark:bg-gray-900 "
          style={{
            // top: "calc(100% + 0.5rem)",
            wordBreak: "keep-all",
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          ref={floating}
          {...getFloatingProps()}
        >
          {categories.map((category) => (
            <Item
              key={category.id}
              onClick={async () => {
                hide();
                setCateVisible(false);
                setCurrentCategoryID(category.id);

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
                  categoryID: category.id,
                });
                setCursor(cursor);
                setPostList(data);
              }}
              className={`${
                category.id === categoryID ? " font-bold " : ""
              }`}
            >
              {category.name}
            </Item>
          ))}
        </Button>
      )}
    </>
  );
};
