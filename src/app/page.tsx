import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const HomePage = () => {
  return (
    <section className="md:mt-72  mt-36 items-start flex md:flex-row flex-col px-4 gap-10">
      <div className="w-full md:w-2/3">
        <h2 className="text-primary uppercase mb-10 text-2xl">
          Recently published
        </h2>
        <div className="space-y-10">
          <div className="space-y-4">
            <h6 className="text-xl font-bold">
              Snappy UI Optimization with useDeferredValue
            </h6>
            <p>
              useDeferredValue is one of the most underrated React hooks. It
              allows us to dramatically improve the performance of our
              applications in certain contexts. I recently used it to solve a
              gnarly performance problem on this blog, and in this tutorial,
              I'll show you how! ⚡
            </p>
            <Button variant="secondary">
              Read more
              <ArrowRightIcon />
            </Button>
          </div>
          <div className="space-y-4">
            <h6 className="text-xl font-bold">
              Snappy UI Optimization with useDeferredValue
            </h6>
            <p>
              useDeferredValue is one of the most underrated React hooks. It
              allows us to dramatically improve the performance of our
              applications in certain contexts. I recently used it to solve a
              gnarly performance problem on this blog, and in this tutorial,
              I'll show you how! ⚡
            </p>
            <Button variant="secondary">
              Read more
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full md:w-1/3">
        <h4 className="text-muted-foreground text-start uppercase text-xl">
          Top categories
        </h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="px-3 py-2 text-base">
            React
          </Badge>
          <Badge variant="secondary" className="px-3 py-2 text-base">
            CSS
          </Badge>
          <Badge variant="secondary" className="px-3 py-2 text-base">
            Animations
          </Badge>
          <Badge variant="secondary" className="px-3 py-2 text-base">
            Perfromance
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
