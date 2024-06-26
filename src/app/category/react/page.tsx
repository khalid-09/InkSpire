import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const CategoryReactPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-6 md:flex-row md:gap-12">
      <Card>
        <Link href="/react/use-deferred-value" className="group">
          <CardHeader>
            <CardTitle className="text-xl font-bold transition group-hover:text-purple-700 dark:group-hover:text-cyan-400">
              Snappy UI Optimization with useDeferredValue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              useDeferredValue is one of the most underrated React hooks. It
              allows us to dramatically improve the performance of our
              applications in certain contexts. I recently used it to solve a
              gnarly performance problem on this blog, and in this tutorial, Ill
              show you how! ⚡
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">Read more</Button>
          </CardFooter>
        </Link>
      </Card>
      <Card>
        <Link href="/react/use-deferred-value" className="group">
          <CardHeader>
            <CardTitle className="text-xl font-bold transition group-hover:text-purple-700 dark:group-hover:text-cyan-400">
              Snappy UI Optimization with useDeferredValue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              useDeferredValue is one of the most underrated React hooks. It
              allows us to dramatically improve the performance of our
              applications in certain contexts. I recently used it to solve a
              gnarly performance problem on this blog, and in this tutorial, Ill
              show you how! ⚡
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">Read more</Button>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default CategoryReactPage;
