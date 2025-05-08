"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import BlogSection from "../components/Blog/BlogSection"
import { ArrowRight, ChevronDown, Mail, Star, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "../Components/UI/AnimatedSection"
import { fadeIn, staggerContainer, textVariant, zoomIn, cardVariants } from "../Utils/motion"
import FullCountUp from "../Components/UI/FullCountUp"

const HomePage = () => {
  useEffect(() => {
    // Check if we should show the welcome toast (only after login/signup)
    const shouldShowWelcomeToast = localStorage.getItem("showWelcomeToast")

    if (shouldShowWelcomeToast) {
      // Get user data from JWT token
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      const userName = userData.name || "User"

      // Show welcome toast
      toast.success(
        <div className="flex flex-col">
          <span className="font-bold">Welcome, {userName}!</span>
          <span className="text-sm">You're successfully logged in</span>
        </div>,
        {
          icon: "👋",
          duration: 5000,
        },
      )

      // Remove the flag so toast doesn't show again on page refresh
      localStorage.removeItem("showWelcomeToast")
    }
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section - Modern with gradient and pattern */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"
          ></motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" className="text-center">
            <motion.div variants={fadeIn("up", 0.1)} className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white">
                Version 2.0 Released
                <span className="ml-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              </span>
            </motion.div>

            <motion.h1
              variants={textVariant(0.3)}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
            >
              <span className="block">Welcome to Blogify</span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                A Modern Blogging Platform
              </span>
            </motion.h1>

            <motion.p variants={fadeIn("up", 0.5)} className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
              Discover stories, thinking, and expertise from writers on any topic. Join our community of creators and
              readers today.
            </motion.p>

            <motion.div variants={fadeIn("up", 0.7)} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/create-blog"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Writing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/blogs"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                Explore Blogs
              </Link>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.9)} className="mt-16">
              <a
                href="#featured"
                className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
              >
                <span className="text-sm font-medium mb-2">Scroll to discover</span>
                <ChevronDown className="h-6 w-6 animate-bounce" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: 10000, label: "Active Users", suffix: "+" },
              { number: 50000, label: "Blog Posts", suffix: "+" },
              { number: 100, label: "Countries", suffix: "+" },
              { number: 1000000, label: "Monthly Views", suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={zoomIn(0.1 * index, 0.5)}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform hover:scale-105 transition-all duration-300"
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="text-4xl font-bold"
                >
                  <FullCountUp end={stat.number} duration={2.5} />
                  {stat.suffix}
                </motion.p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="featured" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Blogify</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to create, publish, and grow your blog.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Users className="h-7 w-7" />,
                title: "Global Community",
                description:
                  "Connect with readers and writers from around the world. Share ideas, get feedback, and grow your audience.",
              },
              {
                icon: <Star className="h-7 w-7" />,
                title: "Premium Features",
                description:
                  "Enjoy advanced editing tools, custom domains, monetization options, and detailed analytics.",
              },
              {
                icon: <TrendingUp className="h-7 w-7" />,
                title: "Growth & Analytics",
                description:
                  "Track your performance with detailed analytics and insights to help grow your readership.",
              },
            ].map((feature, index) => (
              <AnimatedSection
                key={index}
                variants={cardVariants}
                delay={0.1 * index}
                className="bg-white p-8 rounded-2xl shadow-xl transition-transform duration-300 hover:translate-y-[-8px]"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-black text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Newsletter Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-12 border border-white/10">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative max-w-xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold mb-6"
              >
                Join Our Newsletter
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-300 mb-8"
              >
                Get the latest articles, resources, and updates directly in your inbox. No spam, unsubscribe anytime.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </motion.button>
              </motion.form>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 text-sm text-gray-400"
              >
                We care about your data. Read our{" "}
                <a href="#" className="text-white hover:underline">
                  Privacy Policy
                </a>
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 bg-gradient-to-r from-gray-900 to-black rounded-3xl text-white">
            <div className="md:max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Ready to start your blogging journey?</h2>
              <p className="text-gray-300">
                Join thousands of writers who have already started their journey with Blogify. It's free to get started!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/auth?mode=signup"
                  className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-300 text-center"
                >
                  Sign Up Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/blogs"
                  className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-colors duration-300 text-center"
                >
                  Explore Blogs
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default HomePage
