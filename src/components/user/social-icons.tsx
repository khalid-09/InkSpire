import { FaFacebook, FaYoutube } from "react-icons/fa6";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Link as LinkIcon } from "lucide-react";
import { SocialLinks } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SocialIconsProps {
  socialLinks: SocialLinks[];
}

const SocialIcons = ({
  socialLinks: [{ youtube, twitter, instagram, facebook, github, website }],
}: SocialIconsProps) => {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <Link href={youtube!} className={cn("", !youtube && "hidden")}>
        <FaYoutube className="h-6 w-6" />
      </Link>
      <Link href={instagram!} className={cn("", !youtube && "hidden")}>
        <InstagramLogoIcon className="h-6 w-6" />
      </Link>
      <Link href={twitter!} className={cn("", !twitter && "hidden")}>
        <TwitterLogoIcon className="h-6 w-6" />
      </Link>
      <Link href={facebook!} className={cn("", !facebook && "hidden")}>
        <FaFacebook className="h-6 w-6" />
      </Link>
      <Link href={github!} className={cn("", !github && "hidden")}>
        <GitHubLogoIcon className="h-6 w-6" />
      </Link>
      <Link href={website!} className={cn("", !website && "hidden")}>
        <LinkIcon className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default SocialIcons;
