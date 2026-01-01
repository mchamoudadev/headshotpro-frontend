"use client"
import { useCurrentUser } from "@/lib";
import { Button } from "../ui/button";
import Link from "next/link";

export const Hero = () => {
    const { data: currentUser } = useCurrentUser();
  return (
    <>
    {currentUser ? ( 
        <>
        <span className="text-lg">Welcome {currentUser?.user.name}</span>
       <Button asChild>
        <Link href="/dashboard/user">Go to Dashboard</Link>
  
       </Button>
       <Button asChild>
        <Link href="/dashboard/admin">Go to Admin Dashboard</Link>
       </Button>
       <h1 className="text-2xl font-bold">Hello</h1>
       </>
       ) : (
        <Link href="/auth/login" className="text-red-500">Login</Link>
       )}
       </>
  );
};