import { LiveList } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import Editor from "../../src/Editor";
import { RoomProvider } from "../../src/liveblocks.config";
import { BlockType, CustomElement } from "../../src/types";

const initialValue: CustomElement[] = [
  {
    id: nanoid(),
    type: BlockType.Title,
    children: [
      {
        text: "📝🥷 NoteNinja",
      },
    ],
  },
  {
    id: nanoid(),
    type: BlockType.Paragraph,
    children: [
      {
        text: "Lecture Notes That Write Themselves",
        bold: true,
      },
    ],
  },
  {
    id: nanoid(),
    type: BlockType.Paragraph,
    children: [
      {
        text: "",
      },
    ],
  },
  {
    id: nanoid(),
    type: BlockType.Paragraph,
    children: [
      {
        text: "",
      },
    ],
  },
];

export default function Page() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <RoomProvider
      id={id}
      initialStorage={{
        recordingPlaceholder: "",
        blocks: new LiveList(initialValue),
      }}
      initialPresence={{
        selectedBlockId: null,
        isRecording: false,
      }}
    >
      <Editor />
    </RoomProvider>
  );
}
