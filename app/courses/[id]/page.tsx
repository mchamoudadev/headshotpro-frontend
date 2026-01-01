import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {

    const { id } = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`);
    const { data } = await response.json();
    const { title, description } = data;
  return {
    title: `${title} - Professional AI Headshot Generator`,
    description: `${description}`,
  }
}


const CoursePage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    return <div className="max-w-7xl mx-auto">Course Page for {id}</div>;
};

export default CoursePage;