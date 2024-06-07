"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { uploadFiles } from "@/lib/uploadthing";

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: () => void;
  editable?: boolean;
}

const RichTextEditor = ({
  initialContent,
  onChange,
  editable,
}: RichTextEditorProps) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles("imageUploader", { files: [file] });
      return res.url;
    },
  });

  console.log(editor.document);

  return (
    <section className="h-[900px]">
      <BlockNoteView
        theme="dark"
        className="h-full py-3"
        editor={editor}
        onChange={onChange}
      />
    </section>
  );
};

export default RichTextEditor;
