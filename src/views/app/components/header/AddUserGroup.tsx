import * as React from "react";
import { Button } from "./Button";
import {
  useFloating,
  useInteractions,
  useClick,
  offset,
} from "@floating-ui/react-dom-interactions";
import { Item } from "./Item";

export const AddUserGroup = () => {
  const [addUserGroupVisible, setAddUserGroupVisible] = React.useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open: addUserGroupVisible,
    onOpenChange: setAddUserGroupVisible,
    middleware: [offset(16)],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
  ]);
  return (
    <>
      <Item
        onClick={() => setAddUserGroupVisible(!addUserGroupVisible)}
        ref={reference}
        {...getReferenceProps()}
      >
        用户群
      </Item>

      {addUserGroupVisible && (
        <Button
          className="flex flex-col break-words bg-white ring-1 ring-gray-800 dark:bg-gray-900 w-[200px] gap-1 p-2"
          style={{
            // top: "calc(100% + 0.5rem)",
            // transform: "translateX(-50%)",
            wordBreak: "keep-all",
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          ref={floating}
          {...getFloatingProps()}
        >
          <img
            src="https://s2.loli.net/2022/08/10/w4FEUIQszedixmX.jpg"
            className="object-contain w-full h-auto"
          />
          <span>考虑到微信群聊二维码存在过期时间</span>
          <span>添加作者邀请入群</span>
          <span>添加好友时请加备注「VSCode掘金」</span>
        </Button>
      )}
    </>
  );
};
