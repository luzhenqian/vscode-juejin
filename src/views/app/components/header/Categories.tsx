import * as React from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  offset,
} from "@floating-ui/react-dom-interactions";
import { dispatch } from "../../post";
import { Button } from "./Button";
import { Item } from "./Item";

export const Categories = ({ hide, categories }) => {
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
              onClick={() => {
                hide();
                setCateVisible(false);
                dispatch({
                  type: "SET_CURRENT_CATEGORY_ID",
                  payload: { categoryID: category.id },
                });
              }}
            >
              {category.name}
            </Item>
          ))}
        </Button>
      )}
    </>
  );
};
