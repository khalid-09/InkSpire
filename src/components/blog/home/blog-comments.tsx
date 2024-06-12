import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircleMore } from "lucide-react";

const BlogComments = () => {
  return (
    <>
      <div className="hidden w-full md:block">
        <Sheet>
          <SheetTrigger>
            <Trigger />
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader>
              <SheetTitle>Comments</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="mt-8">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger>
            <Trigger />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Comments</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default BlogComments;

const Trigger = () => {
  return (
    <Button variant="outline" size="icon">
      <MessageCircleMore className="h-5 w-5" />
    </Button>
  );
};
