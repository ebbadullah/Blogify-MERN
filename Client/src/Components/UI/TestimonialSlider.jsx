"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const TestimonialSlider = ({ testimonials }) => {
  const [width, setWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const carousel = useRef()

  useEffect(() => {
    // Calculate the width of the carousel container minus the visible part
    const updateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [testimonials])

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0) // Loop back to the first slide
    }
  }

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(testimonials.length - 1) // Loop to the last slide
    }
  }

  // Calculate the drag constraints based on the number of testimonials
  const calculateDragConstraints = () => {
    if (carousel.current) {
      const itemWidth = carousel.current.offsetWidth / (window.innerWidth >= 768 ? 3 : 1)
      return -(itemWidth * (testimonials.length - (window.innerWidth >= 768 ? 3 : 1)))
    }
    return 0
  }

  return (
    <div className="relative">
      {/* Carousel */}
      <motion.div ref={carousel} className="overflow-hidden cursor-grab" whileTap={{ cursor: "grabbing" }}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: calculateDragConstraints() }}
          animate={{ x: -activeIndex * (carousel.current?.offsetWidth / (window.innerWidth >= 768 ? 3 : 1)) || 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="min-w-[100%] md:min-w-[33.33%] px-4 py-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-lg shadow-sm h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      className="h-12 w-12 rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-black">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full ${
              activeIndex === index ? "bg-black" : "bg-gray-300"
            } transition-colors duration-300`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialSlider
