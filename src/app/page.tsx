import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, Link2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

const HomePage = () => {
  return (
    <section className="md:mt-72 mt-36 items-start flex md:flex-row flex-col px-4 gap-10">
      <div className="w-full md:w-2/3">
        <h2 className="text-primary uppercase tracking-wider mb-10 text-2xl">
          Recently published
        </h2>
        <div className="space-y-10">
          <article className="relative">
            <Link href="/react/use-deferred-value" className="group space-y-4">
              <Link2Icon className="group-hover:block hidden transition absolute top-1 -left-5" />
              <h3 className="text-xl transition group-hover:text-purple-700 dark:group-hover:text-cyan-400 font-bold">
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
      <div className="space-y-4 w-full md:w-1/3">
        <h4 className="text-muted-foreground tracking-wide text-start uppercase mb-10 text-2xl">
          Top categories
        </h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="px-3 transition hover:scale-105 py-2 text-sm"
          >
            <Link href="/category/react">React</Link>
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 transition hover:scale-105 py-2 text-sm"
          >
            CSS
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 transition hover:scale-105 py-2 text-sm"
          >
            Animations
          </Badge>
          <Badge
            variant="secondary"
            className="px-3 transition hover:scale-105 py-2 text-sm"
          >
            Perfromance
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
