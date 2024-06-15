"use client";

import { useBlog } from "@/context/blog-context";
import { useTheme } from "next-themes";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

import { uploadFiles } from "@/lib/uploadthing";

interface RichTextEditorProps {
  editable: boolean;
  content: string;
}

const RichTextEditor = ({ content, editable }: RichTextEditorProps) => {
  const { resolvedTheme } = useTheme();
  const { setBlog } = useBlog();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: content
      ? (JSON.parse(content) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles("imageUploader", { files: [file] });
      return res.url;
    },
  });

  return (
    <BlockNoteView
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={async () => {
        setBlog((blog) => ({
          ...blog,
          blocks: JSON.stringify(editor.document, null, 2),
        }));
      }}
      editor={editor}
      editable={editable}
    />
  );
};

export default RichTextEditor;
