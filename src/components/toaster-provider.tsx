"use client";

import { useTheme } from "next-themes";
import { Toaster } from "./ui/sonner";

const ToasterProvider = () => {
  const { theme } = useTheme();
  if (theme === "dark") {
    return (
      <Toaster position="top-center" theme="dark" richColors closeButton />
    );
  }

  return <Toaster position="top-center" theme="light" richColors closeButton />;
};

export default ToasterProvider;
