"use client";

import { useState } from "react";
import BannerImage from "./banner-image";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
});

const BlogEditor = () => {
  const [image, setImage] = useState("/blog-banner.png");
  console.log(image);

  return (
    <section className="space-y-3">
      <main className="mt-10 flex flex-col items-center justify-between">
        {/* {image ? (
          <Image
            src={image}
            alt="Uploaded image"
            className="absolute object-cover"
            fill
          />
        ) : ( */}
        <BannerImage image={image} setImage={setImage} />
        {/* // )} */}
      </main>
      <RichTextEditor />
    </section>
  );
};

export default BlogEditor;
