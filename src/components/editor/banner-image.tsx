import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface BannerImageProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const BannerImage = ({ image, setImage }: BannerImageProps) => {
  return (
    <div
      className={`relative h-80  w-full overflow-hidden rounded-lg border-b border-t ${!image ? "hidden" : ""}`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt="Blog-Banner-Image"
            fill
            className="absolute object-cover"
            sizes="100vw"
          />
          {!image.includes("utfs.io") && (
            <div className="absolute bottom-0 right-0 mr-10 flex h-[20%] w-[20%] items-center justify-center md:mr-0">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImage(res.at(0)?.url!);
                  toast.success("Banner Image Updated!");
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message);
                }}
                className="w-fit transition-all ut-button:bg-primary ut-button:hover:bg-primary/80 ut-allowed-content:hidden"
              />
            </div>
          )}
        </>
      )}
      {/* <UploadDropzone
        className="h-full w-full space-y-6 border bg-[url('/blog-banner.png')] bg-cover bg-center ut-allowed-content:hidden ut-label:hidden ut-upload-icon:hidden  dark:border-muted  dark:brightness-50 dark:saturate-50"
        appearance={{
          label: "text-muted-foreground hover:text-muted-foreground text-base",
          uploadIcon: "text-muted-foreground ",
          allowedContent: "text-base text-muted-foreground",
          button:
            "bg-muted-foreground dark:text-background cursor-pointer text-base font-semibold",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res.at(0)?.url);
          setImage(res.at(0)?.url!);
          toast.success("Image uploaded successfully");
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
      /> */}
    </div>
  );
};

export default BannerImage;
