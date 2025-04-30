import BlogCard from "./BlogCard";
import FeaturedPost from "./FeaturedPost";
import PopularTags from "./PopularTags";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2023",
      excerpt:
        "Explore the latest trends and technologies shaping the future of web development. From WebAssembly to Edge Computing, discover what's next.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      category: "Technology",
      date: "Apr 12, 2023",
      readTime: 5,
      author: {
        name: "Lina Fatima",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4D03AQHHFhfsVcHNJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698611108124?e=2147483647&v=beta&t=F3OKjPhn6qV4_G75Tm2efIjqQfwnzB8S5u4APRhYJvE",
      },
    },
    {
      id: 2,
      title: "Mastering React Hooks: A Comprehensive Guide",
      excerpt:
        "Learn how to leverage React Hooks to write cleaner, more efficient code. This guide covers everything from useState to custom hooks.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "React",
      date: "Mar 28, 2023",
      readTime: 8,
      author: {
        name: "Muhammad Ismail",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4D03AQEnUw11W3ZTMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728170985458?e=2147483647&v=beta&t=bvIWa91h3XcqKgFaGwbhbRXg_T2HjbXxAlKa2ladDp0",
      },
    },
    {
      id: 3,
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt:
        "Discover how to create beautiful, responsive user interfaces using Tailwind CSS. This tutorial walks you through the utility-first approach.",
      image:
        "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      category: "CSS",
      date: "Mar 15, 2023",
      readTime: 6,
      author: {
        name: "Ali Nisar",
        avatar:
          "https://media.licdn.com/dms/image/v2/D4E03AQGpUVRwomxQhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692849556097?e=2147483647&v=beta&t=vjFAv9XieuNvP0AsaTxmjQ3DQVskeM1DL4TBHjAQZN0",
      },
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            Latest from the Blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover insights, tutorials, and thoughts on web development,
            design, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid gap-8 md:grid-cols-2">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <FeaturedPost post={blogPosts[0]} />
            <PopularTags />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
