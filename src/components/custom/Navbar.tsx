"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 shadow-md bg-myCustom-bgSecondary text-myCustom-textPrimary">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-2xl font-bold mb-4 md:mb-0" href="#">
          Honest Opinion
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              className="w-full md:w-auto bg-myCustom-textPrimary text-myCustom-textSecondary font-semibold hover:bg-myCustom-textPrimary hover:scale-95 transition duration-300"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-myCustom-textPrimary text-myCustom-textSecondary font-semibold hover:bg-myCustom-textPrimary hover:scale-95 transition duration-300">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
