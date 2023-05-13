import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Presence, UserMeta, Storage } from "./types";

export const client = createClient({
  authEndpoint: "/api/auth",
});

export const {
  RoomProvider,
  useMutation,
  useOthers,
  useRoom,
  useList,
  useSelf,
  useStorage,
  useUpdateMyPresence,
} = createRoomContext<Presence, Storage, UserMeta>(client);
