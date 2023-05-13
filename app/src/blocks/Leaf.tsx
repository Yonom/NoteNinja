import { RenderLeafProps } from "slate-react";
import styles from "./Leaf.module.css";
import { useStorage } from "../liveblocks.config";

export default function Leaf({ leaf, children, attributes }: RenderLeafProps) {
  if (leaf.placeholder) {
    return (
      <>
        <span className={styles.placeholder} contentEditable={false}>
          {leaf.placeholder}
        </span>
        <span {...attributes}>{children}</span>
      </>
    );
  }

  if (leaf.recordingPlaceholder) {
    return (
      <>
        <RecordingPlaceholder />
        <span {...attributes}>{children}</span>
      </>
    );
  }

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikeThrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
}

const RecordingPlaceholder = () => {
  const placeholder = useStorage((s) => s.recordingPlaceholder);
  if (!placeholder) return null;
  return (
    <span className={styles.recordingPlaceholder} contentEditable={false}>
      {" "}
      {placeholder}
    </span>
  );
};
