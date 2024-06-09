"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { uploadFiles } from "@/lib/uploadthing";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "next-themes";

interface RichTextEditorProps {
  initialContent?: string;
  setBlocks: Dispatch<SetStateAction<string>>;
}

const RichTextEditor = ({ initialContent, setBlocks }: RichTextEditorProps) => {
  const { resolvedTheme } = useTheme();

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
    <div className="h-[500px]">
      <BlockNoteView
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={async () => {
          setBlocks(JSON.stringify(JSON.stringify(editor.document)));
        }}
        editor={editor}
        editable={false}
      />
    </div>
  );
};

export default RichTextEditor;
