import { Editor, Transforms } from "slate";
import { BlockType } from "./types";
import { nanoid } from "nanoid";

const AUTO_EMBED_PREFIX = "https://share.cleanshot.com/";

export function withImageAutoEmbed(editor: Editor) {
  const { insertText } = editor;

  editor.insertText = (text) => {
    if (text.startsWith(AUTO_EMBED_PREFIX)) {
      Transforms.insertNodes(
        editor,
        {
          id: nanoid(),
          type: BlockType.Image,
          url: text,
          alt: null,
          children: [{ text: "" }],
        },
        {
          match: (n) => Editor.isBlock(editor, n),
        }
      );

      return;
    }

    insertText(text);
  };

  return editor;
}
