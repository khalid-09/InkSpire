"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { uploadFiles } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

interface RichTextEditorProps {
  initialContent?: string;
  setBlocks: Dispatch<SetStateAction<string>>;
}

const RichTextEditor = ({ initialContent, setBlocks }: RichTextEditorProps) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles("imageUploader", { files: [file] });
      return res.url;
    },
  });

  return (
    <section>
      <BlockNoteView
        theme="dark"
        className="h-full py-3"
        onChange={() =>
          setBlocks(JSON.stringify(JSON.stringify(editor.document)))
        }
        editor={editor}
      />
    </section>
  );
};

export default RichTextEditor;
