"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib";
import Link from "next/link";


export default function Home() {

  const { data: currentUser } = useCurrentUser();

 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
     <h1 className="text-2xl font-bold">Logo</h1>
     {currentUser ? ( 
      <>
      <span className="text-lg">Welcome {currentUser?.user.name}</span>
     <Button asChild>
      <Link href="/dashboard/user">Go to Dashboard</Link>

     </Button>
     <Button asChild>
      <Link href="/dashboard/admin">Go to Admin Dashboard</Link>
     </Button>
     </>
     ) : (
      <Link href="/login" className="text-red-500">Login</Link>
     )}
    </div>
  
  );
}
