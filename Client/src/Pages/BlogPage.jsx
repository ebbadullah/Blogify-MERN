import { motion } from "framer-motion"
import BlogSection from "../Components/Blog/BlogSection"
import AnimatedSection from "../Components/UI/AnimatedSection"
import { fadeIn, textVariant } from "../Utils/motion"

const BlogPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="bg-black text-white py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1 variants={textVariant(0.1)} initial="hidden" animate="show" className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">Journal</motion.h1>
                    <motion.p variants={fadeIn("up", 0.2)} initial="hidden" animate="show" className="mt-6 text-xl md:text-2xl text-gray-300 font-light max-w-3xl">Insights, thoughts, and expertise from our writers on web development, design, and technology.</motion.p>
                </div>
            </motion.div>

            <AnimatedSection>
                <BlogSection />
            </AnimatedSection>
        </div>
    )
}

export default BlogPage