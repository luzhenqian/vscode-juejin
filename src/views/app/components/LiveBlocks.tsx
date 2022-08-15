import { RoomProvider } from "../../liveblocks.config";
import * as React from "react";

export default function LiveBlocksContext({ children }) {
  const roomId = useOverrideRoomId("juejin-live-cursors-chat");

  return (
    <RoomProvider
      id={roomId}
      initialPresence={() => ({
        cursor: null,
        message: "",
      })}
    >
      {children}
    </RoomProvider>
  );
}

function useOverrideRoomId(roomId: string) {
  const overrideRoomId = React.useMemo(() => {
    return roomId;
  }, [roomId]);

  return overrideRoomId;
}
