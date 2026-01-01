"use client";
import { useCurrentUser } from "@/lib";
import { Button } from "../ui/button";
import Link from "next/link";

export const Hero = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="flex flex-col items-center justify-center">
      {/* navigation */}
      <nav className="flex items-center justify-between">
        <Link href="/">Home</Link>
        <Link href="/courses/1">Headshot Pro Build</Link>
        <Link href="/courses/2">HTML and CSS</Link>
        <Link href="/courses/3">React</Link>
      </nav>

      <h1 className="text-2xl font-bold">
        Headshot Pro Build - Professional AI Headshot Generator
      </h1>
      <p className="text-lg">
        Create stunning professional headshots with AI-powered technology.
        Perfect for LinkedIn, resumes, and professional profiles.
      </p>
      <Button asChild>
        <Link href="/courses/1">Get Started</Link>
      </Button>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold">Features</h2>
        <ul className="list-disc list-inside">
          <li>AI-powered headshot generator</li>
          <li>Perfect for LinkedIn, resumes, and professional profiles</li>
          <li>
            Create stunning professional headshots with AI-powered technology
          </li>
        </ul>
      </div>
    </div>
  );
};
