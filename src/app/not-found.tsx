import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="mt-80 flex flex-col items-center gap-7 px-3 text-center">
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
