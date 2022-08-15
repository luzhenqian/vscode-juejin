import * as React from "react";
import { Button } from "./Button";
import {
  useFloating,
  useInteractions,
  offset,
  useHover,
} from "@floating-ui/react-dom-interactions";
import { Item } from "./Item";

export const ChatMode = ({ darkMode, chatMode, setChatMode }) => {
  const [chatModeVisible, setChatModeVisible] = React.useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open: chatModeVisible,
    onOpenChange: setChatModeVisible,
    middleware: [offset(16)],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
  ]);
  return (
    <>
      <Item
        ref={reference}
        {...getReferenceProps()}
        onClick={() => {
          setChatMode(!chatMode);
          // TODO: 切换聊天模式，恢复原来的滚动位置
          // const scrollTop = window.scrollY;
          // setTimeout(() => {
          //   window.scrollBy({
          //     top: scrollTop,
          //     left: 0,
          //   });
          // }, 0);
        }}
        className={`
    ${chatMode ? "font-bold" : ""}
    ${chatMode ? (darkMode ? "text-gray-300" : "text-gray-800") : ""}
    `}
      >
        聊天模式
      </Item>

      {chatModeVisible && (
        <Button
          className="flex flex-col break-words bg-white ring-1 ring-gray-800 dark:bg-gray-900 w-[200px] gap-1 p-2"
          style={{
            wordBreak: "keep-all",
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          ref={floating}
          {...getFloatingProps()}
        >
          <span>聊天模式是为了提高交互性体验的功能。</span>
          <span>我们可以在刷掘金的同时看到其他在线的朋友。</span>
          <span className="text-orange-600">按下 / 键开始聊天</span>
          <span className="text-orange-600">按下 E 键发送表情</span>
          <span className="text-orange-600">按下 ESC 键还原</span>
          <span>如果在线用户数量太多影响阅读体验，可以关闭该模式。</span>
        </Button>
      )}
    </>
  );
};
