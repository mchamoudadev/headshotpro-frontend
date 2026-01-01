import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`
  );
  const { data } = await response.json();
  const { title, description } = data;
  return {
    title: `${title} - Professional AI Headshot Generator`,
    description: `${description}`,
  };
}

const CoursePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`
  );
  const { data } = await response.json();
  const { title, description } = data;
  if (!data) {
    return <div className="max-w-7xl mx-auto">Course not found</div>;
  }
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg">Description: {description}</p>
      <Button asChild>
        <Link href={`/courses/${id}`}>Get Started</Link>
      </Button>
    </div>
  );
};

export default CoursePage;
