import Breadcrumbs from "@/components/breadcrumbs";
import { H1, H2, P } from "@/components/typography";
import Link from "next/link";

const ReactBlogPage = () => {
  return (
    <section className="mt-20 p-6 ">
      <Breadcrumbs />
      <H1 className="mt-8">Snappy UI Optimization with useDeferredValues</H1>
      <article className="mt-20 flex flex-col items-start gap-20 md:flex-row">
        <div className="w-full space-y-8 text-lg md:w-2/3">
          <div id="introduction">
            <P>
              Over the years, React has given us a number of tools for
              optimizing the performance of our applications. One of the most
              powerful hidden gems is useDeferredValue. It can have a tremendous
              impact on user experience in certain situations! ⚡
            </P>
            <P>
              I recently used this hook to fix a gnarly performance issue on
              this blog, and it sorta blew my mind. The improvement on low-end
              devices felt illegal, like black magic.
            </P>
            <P>
              useDeferredValue has a bit of an intimidating reputation, and it
              is a pretty sophisticated tool, but it isn’t too scary with the
              right mental model. In this tutorial, I’ll show you exactly how it
              works, and how you can use it to dramatically improve the
              performance of your applications.
            </P>
          </div>
          <div id="theproblem">
            <H2 className="text-sky-400">The problem</H2>
            <P>
              A couple of years ago, I released Shadow Palette Generator, a tool
              for generating realistic shadows:
            </P>
            <P>
              By experimenting with sliders and other controls, you can design
              your own set of shadows. The CSS code is provided for you to
              copy/paste it into your own application.
            </P>
            <P>
              Here’s the problem: the controls in this UI are designed to
              provide immediate feedback; as the user slides the “Oomph” slider,
              for example, they see the effect of that change right away. This
              means that the UI is re-rendered dozens of times a second while
              one of these inputs is being dragged.
            </P>
            <P>
              Now, React is fast, and most of this UI is pretty easy to update.
              The problem is the syntax-highlighted code snippet at the bottom:
            </P>
          </div>
        </div>
        <aside className="hidden w-full md:block md:w-1/3">
          <h4 className="mb-4 text-xl uppercase tracking-wide">
            Table of contents
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/react/use-deferred-value#introduction">
                Introduction
              </Link>
            </li>
            <li>
              <Link href="/react/use-deferred-value#theproblem">
                The problem
              </Link>
            </li>
          </ul>
        </aside>
      </article>
    </section>
  );
};

export default ReactBlogPage;
