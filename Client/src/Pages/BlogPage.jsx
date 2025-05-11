

import { motion } from "framer-motion"
import BlogSection from "../components/Blog/BlogSection"
import AnimatedSection from "../Components/UI/AnimatedSection"
import { fadeIn, textVariant } from "../Utils/motion"

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-black text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            variants={textVariant(0.1)}
            initial="hidden"
            animate="show"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Our Blog
          </motion.h1>
          <motion.p variants={fadeIn("up", 0.2)} initial="hidden" animate="show" className="mt-4 text-lg text-gray-300">
            Insights, thoughts, and expertise from our writers on web development, design, and technology.
          </motion.p>
        </div>
      </motion.div>

      <AnimatedSection>
        <BlogSection />
      </AnimatedSection>
    </div>
  )
}

export default BlogPage
