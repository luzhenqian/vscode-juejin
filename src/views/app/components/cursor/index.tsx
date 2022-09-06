import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "../../../liveblocks.config";
import * as React from "react";
import Cursor from "./Cursor";
import FlyingReaction from "./FlyingReaction";
import ReactionSelector from "./ReactionSelector";
import useInterval from "../../hooks/useInterval";
import { PostContext } from "../../post";
import { debounce } from "lodash";
import { getPostList } from "../../proto/post";
const { useState, useCallback, useEffect } = React;
/**
 * This file shows how to create Live Cursors with a small chat and interactions
 *
 * Because it's a bit more advanced that others examples, it's implemented using typescript to ensure that we introduce less bug while maintaining it.
 * It also uses Tailwind CSS for the styling
 */

const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

type CursorState =
  | {
      mode: CursorMode.Hidden;
    }
  | {
      mode: CursorMode.Chat;
      message: string;
      previousMessage: string | null;
    }
  | {
      mode: CursorMode.ReactionSelector;
    }
  | {
      mode: CursorMode.Reaction;
      reaction: string;
      isPressed: boolean;
    };

type Reaction = {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
};

type ReactionEvent = {
  x: number;
  y: number;
  value: string;
};

function Example({ onScroll, children }, ref) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const broadcast = useBroadcastEvent();
  const [state, setState] = useState<CursorState>({ mode: CursorMode.Hidden });
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const inputRef = React.useRef<HTMLInputElement>();
  const setReaction = useCallback((reaction: string) => {
    setState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (state.mode === CursorMode.Reaction && state.isPressed && cursor) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: state.reaction,
            timestamp: Date.now(),
          },
        ])
      );
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: state.reaction,
      });
    }
  }, 100);

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "/") {
        setState({ mode: CursorMode.Chat, previousMessage: null, message: "" });
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setState({ mode: CursorMode.ReactionSelector });
      }
    }

    window.addEventListener("keyup", onKeyUp);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/") {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  return (
    <div
      ref={ref}
      id={"cursor-container"}
      className="relative flex items-center justify-center w-full h-screen overflow-x-hidden overflow-y-auto touch-none z-100"
      style={{
        cursor:
          state.mode === CursorMode.Chat
            ? "none"
            : `url(${window.config.images.cursor}) 0 0, auto`,
      }}
      onScroll={onScroll}
      onPointerMove={(event) => {
        event.preventDefault();
        if (cursor === null || state.mode !== CursorMode.ReactionSelector) {
          updateMyPresence({
            cursor: {
              x: Math.round(event.clientX),
              y: Math.round(event.clientY),
            },
          });
        }
      }}
      onPointerLeave={() => {
        setState({
          mode: CursorMode.Hidden,
        });
        updateMyPresence({
          cursor: null,
        });
      }}
      onPointerDown={(event) => {
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
        setState((state) =>
          state.mode === CursorMode.Reaction
            ? { ...state, isPressed: true }
            : state
        );
      }}
      onPointerUp={() => {
        setState((state) =>
          state.mode === CursorMode.Reaction
            ? { ...state, isPressed: false }
            : state
        );
      }}
    >
      {children}
      {reactions.map((reaction) => {
        return (
          <FlyingReaction
            key={reaction.timestamp.toString()}
            x={reaction.point.x}
            y={reaction.point.y}
            timestamp={reaction.timestamp}
            value={reaction.value}
          />
        );
      })}
      {cursor && (
        <div
          className="absolute top-0 left-0"
          style={{
            transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
          }}
        >
          {state.mode === CursorMode.Chat && (
            <>
              <img src={window.config.images.cursor} />

              <div
                className="absolute z-50 p-1 text-sm leading-relaxed text-white bg-blue-500 rounded-sm top-5 left-2 "
                onKeyUp={(e) => e.stopPropagation()}
              >
                {state.previousMessage && <div>{state.previousMessage}</div>}
                <input
                  className="w-auto p-1 text-white placeholder-blue-300 bg-transparent border-none outline-none"
                  ref={inputRef}
                  autoFocus={true}
                  onChange={(e) => {
                    let value = e.target.value;
                    updateMyPresence({ message: value });
                    setState({
                      mode: CursorMode.Chat,
                      previousMessage: null,
                      message: value,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setState({
                        mode: CursorMode.Chat,
                        previousMessage: state.message,
                        message: "",
                      });
                      if (inputRef.current) {
                        inputRef.current.blur();
                      }
                    } else if (e.key === "Escape") {
                      setState({
                        mode: CursorMode.Hidden,
                      });
                    }
                  }}
                  placeholder={
                    state.previousMessage ? "" : "输入文字，开始聊天"
                  }
                  value={state.message}
                  maxLength={50}
                />
              </div>
            </>
          )}
          {state.mode === CursorMode.ReactionSelector && (
            <ReactionSelector
              setReaction={(reaction) => {
                setReaction(reaction);
              }}
            />
          )}
          {state.mode === CursorMode.Reaction && (
            <div className="absolute top-3.5 left-1 pointer-events-none select-none">
              {state.reaction}
            </div>
          )}
        </div>
      )}

      {others.map(({ connectionId, presence }) => {
        if (!presence || !presence.cursor) {
          return null;
        }

        return (
          <Cursor
            key={connectionId}
            color={COLORS[connectionId % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
            message={presence.message}
          />
        );
      })}
    </div>
  );
}

const ExampleWrap = React.forwardRef(Example);

export default function CursorsChat({ children }) {
  const {
    cursor,
    setCursor,
    currentCategoryID,
    currentSort,
    setPostList,
    getPostListIsLoading,
    setGetPostListIsLoading,
  } = React.useContext(PostContext);
  const postListRef = React.useRef<HTMLDivElement>();
  const loadMore = debounce(() => {
    if (getPostListIsLoading) {
      return;
    }

    const postListEl = postListRef.current;
    if (!postListEl) {
      return;
    }

    const { scrollHeight, scrollTop } = postListEl;
    const { height } = postListEl.getBoundingClientRect();

    if (scrollTop + height > scrollHeight - 100) {
      setGetPostListIsLoading(true);
      getPostList({
        sortType: currentSort,
        cursor,
        categoryID: currentCategoryID,
      })
        .then((res) => {
          setCursor(res.cursor);
          setPostList((postList) => [...postList, ...res.data]);
        })
        .finally(() => {
          setGetPostListIsLoading(false);
        });
    }
  }, 1_000);
  return (
    <ExampleWrap onScroll={loadMore} ref={postListRef}>
      {children}
    </ExampleWrap>
  );
}
