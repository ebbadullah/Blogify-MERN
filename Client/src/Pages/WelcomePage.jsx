
import { Link } from "react-router-dom"
import { ArrowRight, Users, BookOpen, TrendingUp, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "../Components/UI/AnimatedSection"
import { fadeIn, staggerContainer, textVariant } from "../Utils/motion"
import FullCountUp from "../Components/UI/FullCountUp"
import TestimonialSlider from "../Components/UI/TestimonialSlider"

const WelcomePage = () => {
  const testimonials = [
    {
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQEDg9DLKgXgwA/profile-displayphoto-shrink_800_800/B4EZY1uDJjG0Ac-/0/1744657990902?e=1752105600&v=beta&t=4kvicuirWhURAdC4UzT7guN0cGsm_JDSLCuRuHefX-A",
      name: "Anshrah Khan",
      quote:
        "Blogify has transformed the way I share my travel experiences. The platform is so easy to use, and I've connected with readers from all over the world!",
    },
    {
      image:
        "https://media.licdn.com/dms/image/v2/C4D03AQHAsHKTHf7MRw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646502524541?e=1752105600&v=beta&t=ZH9TdjazF65BKf0BDXPKKJjvyXSk9z_lYw2o3p909Eo",
      name: "Laila Hassan",
      quote:
        "As a tech blogger, I needed a platform that could handle code snippets and technical content. Blogify exceeded my expectations with its powerful editor and clean design.",
    },
    {
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQE4Aoxk5s1tnQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718269696630?e=1752105600&v=beta&t=NpeVyloKEkCICIbq6UbLOoxWnGCFNLu4keCmkUwpEM8",
      name: "Sana Yasir",
      quote:
        "I started my food blog on Blogify last year, and I've already gained over 10,000 followers! The analytics tools have been invaluable for understanding what my audience enjoys.",
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEnUw11W3ZTMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728170985458?e=2147483647&v=beta&t=bvIWa91h3XcqKgFaGwbhbRXg_T2HjbXxAlKa2ladDp0",
      name: "Ahmed Khan",
      quote:
        "The community aspect of Blogify is what sets it apart. I've received constructive feedback that has helped me improve my writing and grow my audience significantly.",
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D4D03AQHHFhfsVcHNJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698611108124?e=2147483647&v=beta&t=F3OKjPhn6qV4_G75Tm2efIjqQfwnzB8S5u4APRhYJvE",
      name: "Fatima Ali",
      quote:
        "I love how easy it is to customize my blog's appearance on Blogify. The templates are modern and professional, and I can make my blog truly reflect my personal brand.",
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGpUVRwomxQhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692849556097?e=2147483647&v=beta&t=vjFAv9XieuNvP0AsaTxmjQ3DQVskeM1DL4TBHjAQZN0",
      name: "Hassan Raza",
      quote:
        "The SEO tools built into Blogify have helped my content rank higher in search results. My traffic has doubled since I started implementing their optimization suggestions.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navbar for Welcome Page - without login/signup buttons */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-black text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold text-xl tracking-tight">BLOGIFY</span>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced with background image */}
      <section className="relative bg-black text-white py-24 sm:py-32">
        {/* Background pattern overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" className="text-center">
            <motion.h1
              variants={textVariant(0.1)}
              className="text-5xl tracking-tight font-extrabold sm:text-6xl md:text-7xl"
            >
              <span className="block">Welcome to Blogify</span>
              <span className="block text-gray-300 mt-2">A Modern Blogging Platform</span>
            </motion.h1>

            <motion.p variants={fadeIn("up", 0.2)} className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
              Discover stories, thinking, and expertise from writers on any topic. Join our community of creators and
              readers today.
            </motion.p>

            <motion.div variants={fadeIn("up", 0.3)} className="mt-10 sm:flex sm:justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-md shadow">
                <Link
                  to="/auth?mode=signup"
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors duration-300"
                >
                  Join Now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
              >
                <Link
                  to="/auth"
                  className="w-full flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-gray-900 transition-colors duration-300"
                >
                  Login
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              { number: 10000, label: "Active Users" },
              { number: 50000, label: "Blog Posts" },
              { number: 100, label: "Countries" },
              { number: 1000000, label: "Monthly Views" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1 * index)}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-sm text-center"
              >
                <div className="text-4xl font-bold text-black">
                  <FullCountUp end={stat.number} duration={2.5} />
                </div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced with icons */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">Why Choose Blogify?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to create, publish, and grow your blog.
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: <BookOpen className="h-6 w-6" />,
                  title: "Easy to Use",
                  description:
                    "Our intuitive interface makes it simple to create and manage your blog posts. No technical skills required.",
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Global Reach",
                  description: "Share your ideas with readers from around the world and build your audience.",
                },
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Analytics & Growth",
                  description: "Track your performance with detailed analytics and grow your readership.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.1 * index)}
                  className="bg-gray-50 p-6 rounded-lg transition-transform duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-black text-center">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Now with Slider */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Join thousands of satisfied bloggers on our platform.
            </p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TestimonialSlider testimonials={testimonials} />
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">Featured Blogs</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Explore some of our most popular content.</p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
                category: "Technology",
                date: "Apr 12, 2023",
                title: "The Future of Web Development in 2023",
                excerpt:
                  "Explore the latest trends and technologies shaping the future of web development. From WebAssembly to Edge Computing, discover what's next.",
                author: {
                  name: "Lina Fatima",
                  image:
                    "https://media.licdn.com/dms/image/v2/D4D03AQHHFhfsVcHNJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698611108124?e=2147483647&v=beta&t=F3OKjPhn6qV4_G75Tm2efIjqQfwnzB8S5u4APRhYJvE",
                },
                comments: 24,
              },
              {
                image:
                  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                category: "React",
                date: "Mar 28, 2023",
                title: "Mastering React Hooks: A Comprehensive Guide",
                excerpt:
                  "Learn how to leverage React Hooks to write cleaner, more efficient code. This guide covers everything from useState to custom hooks.",
                author: {
                  name: "Ali Yasir",
                  image:
                    "https://media.licdn.com/dms/image/v2/D4E03AQGpUVRwomxQhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692849556097?e=2147483647&v=beta&t=vjFAv9XieuNvP0AsaTxmjQ3DQVskeM1DL4TBHjAQZN0",
                },
                comments: 18,
              },
              {
                image:
                  "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                category: "CSS",
                date: "Mar 15, 2023",
                title: "Building Responsive UIs with Tailwind CSS",
                excerpt:
                  "Discover how to create beautiful, responsive user interfaces using Tailwind CSS. This tutorial walks you through the utility-first approach.",
                author: {
                  name: "Muhammad Ismail",
                  image:
                    "https://media.licdn.com/dms/image/v2/D4D03AQEnUw11W3ZTMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728170985458?e=2147483647&v=beta&t=bvIWa91h3XcqKgFaGwbhbRXg_T2HjbXxAlKa2ladDp0",
                },
                comments: 32,
              },
            ].map((blog, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1 * index)}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-48 object-cover"
                  src={blog.image}
                  alt={blog.title}
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                      {blog.category}
                    </span>
                    <span className="ml-2 text-gray-500 text-sm">{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-2"
                        src={blog.author.image || "/placeholder.svg"}
                        alt={blog.author.name}
                      />
                      <span className="text-sm text-gray-700">{blog.author.name}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{blog.comments} comments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-black rounded-lg shadow-xl overflow-hidden"
            >
              <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Ready to start blogging?</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-gray-300">
                    Join thousands of writers who have already started their journey with Blogify. It's free to get
                    started!
                  </p>
                  <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/auth?mode=signup"
                      className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-black hover:bg-gray-200 transition-all duration-300"
                    >
                      Get started today
                      <ArrowRight className="ml-3 -mr-1 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn("right", 0.1)} className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold text-xl tracking-tight">BLOGIFY</span>
              </div>
              <p className="text-gray-400 mb-4">
                A modern platform for writers and readers to connect through engaging content. Share your stories,
                ideas, and expertise with the world.
              </p>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.2)}>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Resources</h3>
              <ul className="space-y-3">
                {["Help Center", "Blog", "Tutorials"].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.3)}>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 pt-8 border-t border-gray-700"
          >
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Blogify. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default WelcomePage
