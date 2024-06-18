import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import img from "../../public/404.png";

export const generateMetadata = (): Metadata => {
  return {
    title: "Sorry, Page Not Found! 😞",
    description:
      "The page you are looking for does not exist. Please check the URL and try again.",
  };
};

const NotFound = () => {
  return (
    <section className="mt-52 flex flex-col items-center gap-7 px-3 text-center">
      <Image
        src={img}
        height={400}
        width={400}
        alt="Not Found 404 Image"
        className="rounded-md object-cover"
      />
      <H1>It seems we could not find your requested resource! 😞</H1>
      <div>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/" className="flex items-center gap-3">
            <span>Go Home</span>
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
