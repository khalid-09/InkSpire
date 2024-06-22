"use client";

import { SocialLinks, User } from "@prisma/client";
import { H4, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { useForm } from "react-hook-form";
import {
  EditProfileSchema,
  editProfileSchema,
} from "@/lib/validation/edit-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { AtSign, Link, Mail, User as UserIcon } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { toast } from "sonner";
import prisma from "@/db/db";
import { updateImage } from "@/actions/user";

type socialLinks = {
  socialLinks: SocialLinks[];
};

interface EditProfileFormProps {
  user: User & socialLinks;
}

const maxBioLength = 200;

const EditProfileForm = ({
  user: {
    id,
    name,
    username,
    email,
    bio,
    image,
    socialLinks: [{ youtube, github, website, instagram, twitter, facebook }],
  },
}: EditProfileFormProps) => {
  const [characterCount, setCharacterCount] = useState(
    bio?.length ?? "Bio".length,
  );
  const [img, setImg] = useState(image || "");

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: username!,
      bio: bio! || "Bio",
      youtubeLink: youtube! || "http://",
      githubLink: github! || "http://",
      personalLink: website! || "http://",
      instaLink: instagram! || "http://",
      fbLink: facebook! || "http://",
      twitterLink: twitter! || "http://",
    },
  });

  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: EditProfileSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-0 md:flex-row md:pl-4">
      <section className="w-full space-y-5 md:w-[25%]">
        <H4>Edit Profile</H4>
        <div className="relative h-40 w-40 overflow-hidden rounded-full">
          <Image
            src={image!}
            alt={name || ""}
            className="absolute object-cover"
            fill
          />
        </div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImg(res.at(0)?.url!);
            toast.promise(updateImage(res.at(0)?.url!), {
              loading: "Uploading Image...",
              success: ({ type, message }) => {
                if (type === "error") {
                  return message;
                }
                return message;
              },
              error: (err) => {
                if (err instanceof Error) {
                  console.error(err.message);
                  return "Something went wrong, try again later!";
                } else {
                  console.error("Unexpected error:", err);
                  return "An unexpected error occurred!";
                }
              },
            });
          }}
          onUploadError={(error: Error) => {
            toast.error("Something went wrong, try again later!");
            console.error(error.message);
          }}
        />
      </section>
      <section className="w-full space-y-8 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative flex items-center">
            <Input
              className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
              placeholder={name!}
              disabled={true}
            />
            <UserIcon className="absolute left-3 h-5 w-5" />
          </div>
          <div className="relative flex items-center">
            <Input
              className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
              placeholder={email!}
              disabled={true}
            />
            <Mail className="absolute left-3 h-5 w-5" />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        {...field}
                        className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                      />
                      <AtSign className="absolute left-3 h-5 w-5" />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Username will be used to search and will be visible to all
                    users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Bio"
                      className="min-h-32 resize-none bg-muted dark:bg-background"
                      onChange={(e) => {
                        const count = e.target.value.length;
                        setCharacterCount(count);
                        field.onChange(e);
                        console.log(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="tabular-nums">
                    {maxBioLength - characterCount} characters left.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <P>Add your social media handles below</P>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="youtubeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                          />
                          <FaYoutube className="absolute left-3 h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="instaLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                          />
                          <InstagramLogoIcon className="absolute left-3 h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="fbLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                          />
                          <FaFacebook className="absolute left-3 h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="twitterLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                          />
                          <TwitterLogoIcon className="absolute left-3 h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="githubLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                          />
                          <GitHubLogoIcon className="absolute left-3 h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="personalLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative flex items-center">
                          <Input
                            {...field}
                            className="w-full rounded-full bg-muted px-9 py-5 dark:bg-background"
                          />
                          <Link className="absolute left-3 h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default EditProfileForm;
