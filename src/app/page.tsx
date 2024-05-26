import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className=" mt-10 flex flex-col items-start gap-10   md:flex-row">
      <div className="w-full md:w-2/3">
        <h2 className="mb-10 inline-block border-b-4 text-2xl uppercase tracking-wider text-primary">
          Recently published
        </h2>
        <div className="space-y-10">
          <article className="relative">
            <Link href="/react/use-deferred-value" className="group space-y-4">
              <Link2Icon className="absolute -left-5 top-1 hidden transition group-hover:block" />
              <h3 className="text-xl font-bold transition group-hover:text-purple-700 dark:group-hover:text-cyan-400">
                Snappy UI Optimization with useDeferredValue
              </h3>
              <p>
                useDeferredValue is one of the most underrated React hooks. It
                allows us to dramatically improve the performance of our
                applications in certain contexts. I recently used it to solve a
                gnarly performance problem on this blog, and in this tutorial,
                Ill show you how! ⚡
              </p>
              <Button variant="secondary">
                Read more
                <ArrowRightIcon />
              </Button>
            </Link>
          </article>
          <div className="space-y-4">
            <h6 className="text-xl font-bold">
              Snappy UI Optimization with useDeferredValue
            </h6>
            <p>
              useDeferredValue is one of the most underrated React hooks. It
              allows us to dramatically improve the performance of our
              applications in certain contexts. I recently used it to solve a
              gnarly performance problem on this blog, and in this tutorial, Ill
              show you how! ⚡
            </p>
            <Button variant="secondary">
              Read more
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 md:w-1/3">
        <h4 className="mb-10 text-start text-2xl uppercase tracking-wide text-muted-foreground">
          Top categories
        </h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="px-3 py-2 text-sm transition hover:scale-105"
          >
            <Link href="/category/react">React</Link>
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 py-2 text-sm transition hover:scale-105"
          >
            CSS
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 py-2 text-sm transition hover:scale-105"
          >
            Animations
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 py-2 text-sm transition hover:scale-105"
          >
            Perfromance
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
