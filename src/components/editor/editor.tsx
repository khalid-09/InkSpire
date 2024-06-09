"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { toast } from "sonner";
import { Button } from "../ui/button";
// import Header from "@editorjs/header";

const Editor = () => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Image = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        placeholder: "Let`s write an awesome story!",
        holder: "editorjs",
        tools: {
          header: Header,
          table: Table,
          embed: Embed,
          image: Image,
        },
      });
      ref.current = editor;
    }
  };

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
        if (ref.current) ref.current.destroy();
      };
    }
  }, [isMounted]);

  const handleSave = async () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log("Article data: ", outputData);
        toast.success(JSON.stringify(outputData, null, 2));
      });
    }
  };

  return (
    <>
      <div id="editorjs" className="" />
    </>
  );
};

export default Editor;
