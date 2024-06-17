import Image from "next/image";
import Link from "next/link";

interface UserSearchResultsProps {
  user:
    | {
        name: string | null;
        image: string | null;
        username: string | null;
      }
    | never;
}

const UserSearchResults = ({ user }: UserSearchResultsProps) => {
  return (
    <Link
      href={`/user/${user.username}`}
      className="mb-2 flex w-full items-center gap-5"
    >
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={user.image! || "/vercel.svg"}
          fill
          alt={user.name! || "User"}
          className="absolute object-cover"
        />
      </div>
      <div className="">
        <p className="text-base font-medium">{user.name}</p>
        <p className="text-sm text-muted-foreground">@{user.username}</p>
      </div>
    </Link>
  );
};

export default UserSearchResults;
