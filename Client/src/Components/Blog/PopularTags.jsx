"use client"

import { motion } from "framer-motion"
import { Hash } from "lucide-react"

const PopularTags = () => {
  const tags = [
    { id: 1, name: "React", count: 24 },
    { id: 2, name: "JavaScript", count: 18 },
    { id: 3, name: "CSS", count: 12 },
    { id: 4, name: "Web Design", count: 9 },
    { id: 5, name: "Tailwind", count: 8 },
    { id: 6, name: "UX/UI", count: 7 },
    { id: 7, name: "Performance", count: 6 },
    { id: 8, name: "TypeScript", count: 5 },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
    >
      <div className="flex items-center mb-5">
        <Hash className="h-5 w-5 text-black mr-2" />
        <h3 className="text-xl font-bold text-gray-900">Popular Tags</h3>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {tags.map((tag) => (
          <motion.span
            key={tag.id}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-50 text-gray-800 hover:bg-gray-100 transition-colors duration-300 cursor-pointer border border-gray-200"
          >
            #{tag.name}
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">{tag.count}</span>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default PopularTags
