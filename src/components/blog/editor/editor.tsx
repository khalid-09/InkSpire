"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBlog } from "@/context/blog-context";
import EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";

const uploadByUrl = (file: File) => {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(file);
    } catch (err) {
      reject(err);
    }
  });

  return link.then((url) => {
    return { success: 1, file: { url } };
  });
};

const uploadByFile = async (file: File) => {
  const [res] = await uploadFiles("imageUploader", { files: [file] });
  if (res) {
    return { success: 1, file: { url: res.url } };
  }
};

interface EditorProps {
  data?: string;
  readOnly?: boolean;
}

const NewEditor = ({ data, readOnly = false }: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();
  const { setBlog } = useBlog();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const Image = (await import("@editorjs/image")).default;
    const List = (await import("@editorjs/list")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Marker = (await import("@editorjs/marker")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const Quote = (await import("@editorjs/quote")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        placeholder: "Let`s write an awesome story!",
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Type heading...",
              levels: [1, 2, 3, 4],
              defaultLevel: 1,
            },
          },
          table: Table,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByUrl,
                uploadByFile,
              },
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          code: Code,
          inlineCode: InlineCode,
          embed: Embed,
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
        },
        onChange: async () => {
          if (readOnly) return;
          if (ref.current) {
            const outputData = await ref.current.save();
            setBlog((blog) => ({
              ...blog,
              blocks: JSON.stringify(outputData),
            }));
          }
        },
        readOnly,
        data: data ? JSON.parse(data) : undefined,
      });
      ref.current = editor;
    }
  }, [setBlog, readOnly, data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <>
      <div className="min-h-56 w-full" id="editorjs" />
    </>
  );
};

export default NewEditor;
