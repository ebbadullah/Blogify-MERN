import { motion } from "framer-motion"

const CategoryNav = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 min-w-max">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap ${activeCategory === category ? "text-black" : "text-gray-500 hover:text-gray-800"
                            } transition-colors duration-200`}
                    >
                        {category}
                        {activeCategory === category && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryNav
