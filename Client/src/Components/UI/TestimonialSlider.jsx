import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const TestimonialSlider = ({ testimonials }) => {
    const [width, setWidth] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const carousel = useRef()

    useEffect(() => {
        const updateWidth = () => {
            if (carousel.current) {
                setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
            }
        }

        updateWidth()
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [testimonials])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
        }, 5000)

        return () => clearInterval(interval)
    }, [testimonials.length])

    const calculateDragConstraints = () => {
        if (carousel.current) {
            const itemWidth = carousel.current.offsetWidth / (window.innerWidth >= 768 ? 3 : 1)
            return -(itemWidth * (testimonials.length - (window.innerWidth >= 768 ? 3 : 1)))
        }
        return 0
    }

    return (
        <div className="relative">
            <motion.div ref={carousel} className="overflow-hidden cursor-grab" whileTap={{ cursor: "grabbing" }}>
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: calculateDragConstraints() }}
                    animate={{ x: -activeIndex * (carousel.current?.offsetWidth / (window.innerWidth >= 768 ? 3 : 1)) || 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} className="min-w-[100%] md:min-w-[33.33%] px-4 py-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col">
                                <div className="flex items-center mb-6">
                                    <div className="flex-shrink-0">
                                        <motion.img whileHover={{ scale: 1.1 }} className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100" src={testimonial.image} alt={testimonial.name} />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-serif font-medium text-gray-900">{testimonial.name}</h3>
                                        <div className="flex text-yellow-400 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic font-light leading-relaxed flex-grow">"{testimonial.quote}"</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                    <motion.button key={index} onClick={() => setActiveIndex(index)} className={`h-3 w-3 rounded-full ${activeIndex === index ? "bg-black" : "bg-gray-300"} transition-colors duration-300`} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} aria-label={`Go to testimonial ${index + 1}`} />
                ))}
            </div>
        </div>
    )
}

export default TestimonialSlider