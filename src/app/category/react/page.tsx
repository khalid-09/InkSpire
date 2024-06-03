import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/lib/data/user";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const CategoryReactPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
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

      {
        <pre>
          {JSON.stringify(await getUserById(session?.user?.id!), null, 2)}
        </pre>
      }
    </div>
  );
};

export default CategoryReactPage;
