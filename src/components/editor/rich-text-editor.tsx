"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor } from "@blocknote/core";

const RichTextEditor = () => {
  const editor: BlockNoteEditor = useCreateBlockNote();

  return (
    <section className="h-[900px]">
      <BlockNoteView theme="dark" className="h-full py-3" editor={editor} />
    </section>
  );
};

export default RichTextEditor;
