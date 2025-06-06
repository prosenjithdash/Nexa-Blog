import BlogDetailsCard from '@/components/ui/BlogDetailsCard';
import { Blog } from '@/types';
import React from 'react';

export const generateStaticParams = async () => {

    const res = await fetch("http://localhost:8000/blogs");
    const blogs = await res.json();
    // return [
    //     {
    //         blogId: "1",
    //     },
    //     {
    //         blogId: "2",
    //     },
    //     {
    //         blogId: "3",
    //     }
    // ]

    return blogs.slice(0, 3).map((blog: Blog) => ({
        blogId:blog.id,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params;

    const res = await fetch(`http://localhost:8000/blogs/${blogId}`);
    const blog = await res.json();

  return {
    title: blog.title,
  }
}

const BlogDetailsPage = async({ params }:{params:Promise<{blogId:string}>}) => {
    // console.log(await params)
    const { blogId } = await params;

    const res = await fetch(`http://localhost:8000/blogs/${blogId}`);
    const blog = await res.json();
    // console.log(blog)
    return (
        <div className='my-10'>
            <BlogDetailsCard blog={blog}/>
        </div>
    );
};

export default BlogDetailsPage;