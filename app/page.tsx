
import { Hero } from "@/components/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Professional AI Headshot Generator",
  description:
    "Transform your photos into professional headshots with AI. Get studio-quality results in minutes. Perfect for LinkedIn, resumes, corporate profiles, and more.",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Welcome to Headshot Pro Build</h1>
      <Hero />
    </div>
  );
}
