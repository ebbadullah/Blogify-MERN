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
			image: "https://media.licdn.com/dms/image/v2/D4E03AQEDg9DLKgXgwA/profile-displayphoto-shrink_800_800/B4EZY1uDJjG0Ac-/0/1744657990902?e=1752105600&v=beta&t=4kvicuirWhURAdC4UzT7guN0cGsm_JDSLCuRuHefX-A",
			name: "Anshrah Khan",
			quote: "Blogify has transformed the way I share my travel experiences. The platform is so easy to use, and I've connected with readers from all over the world!",
		},
		{
			image: "https://media.licdn.com/dms/image/v2/C4D03AQHAsHKTHf7MRw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646502524541?e=1752105600&v=beta&t=ZH9TdjazF65BKf0BDXPKKJjvyXSk9z_lYw2o3p909Eo",
			name: "Laila Hassan",
			quote: "As a tech blogger, I needed a platform that could handle code snippets and technical content. Blogify exceeded my expectations with its powerful editor and clean design.",
		},
		{
			image: "https://media.licdn.com/dms/image/v2/D4D03AQE4Aoxk5s1tnQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718269696630?e=1752105600&v=beta&t=NpeVyloKEkCICIbq6UbLOoxWnGCFNLu4keCmkUwpEM8",
			name: "Sana Yasir",
			quote: "I started my food blog on Blogify last year, and I've already gained over 10,000 followers! The analytics tools have been invaluable for understanding what my audience enjoys.",
		},
		{
			image: "https://media.licdn.com/dms/image/v2/D4D03AQEnUw11W3ZTMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728170985458?e=2147483647&v=beta&t=bvIWa91h3XcqKgFaGwbhbRXg_T2HjbXxAlKa2ladDp0",
			name: "Ahmed Khan",
			quote: "The community aspect of Blogify is what sets it apart. I've received constructive feedback that has helped me improve my writing and grow my audience significantly.",
		},
		{
			image: "https://media.licdn.com/dms/image/v2/D4D03AQHHFhfsVcHNJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698611108124?e=2147483647&v=beta&t=F3OKjPhn6qV4_G75Tm2efIjqQfwnzB8S5u4APRhYJvE",
			name: "Fatima Ali",
			quote: "I love how easy it is to customize my blog's appearance on Blogify. The templates are modern and professional, and I can make my blog truly reflect my personal brand.",
		},
		{
			image: "https://media.licdn.com/dms/image/v2/D4E03AQGpUVRwomxQhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692849556097?e=2147483647&v=beta&t=vjFAv9XieuNvP0AsaTxmjQ3DQVskeM1DL4TBHjAQZN0",
			name: "Hassan Raza",
			quote: "The SEO tools built into Blogify have helped my content rank higher in search results. My traffic has doubled since I started implementing their optimization suggestions.",
		},
	]

	return (
		<div className="min-h-screen bg-white">
			<motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className="bg-black text-white shadow-lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0 flex items-center">
								<svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="font-serif font-bold text-xl tracking-tight">BLOGIFY</span>
							</div>
						</div>
					</div>
				</div>
			</motion.nav>

			{/* Hero Section */}
			<section className="relative bg-black text-white py-24 md:py-32 lg:py-40">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></motion.div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" className="text-center">
						<motion.h1 variants={textVariant(0.1)} className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
							<span className="block">Welcome to Blogify</span>
							<span className="block text-gray-300 mt-4 font-light">A Modern Blogging Platform</span>
						</motion.h1>

						<motion.p variants={fadeIn("up", 0.2)} className="mt-8 max-w-lg mx-auto text-xl md:text-2xl text-gray-300 font-light sm:max-w-3xl leading-relaxed">
							Discover stories, thinking, and expertise from writers on any topic. Join our community of creators and readers today.
						</motion.p>

						<motion.div variants={fadeIn("up", 0.3)} className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link to="/auth?mode=signup" className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-black bg-white hover:bg-gray-200 transition-colors duration-300 shadow-lg">
									Join Now
								</Link>
							</motion.div>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link to="/auth" className="w-full flex items-center justify-center px-8 py-4 border border-white/30 text-lg font-medium rounded-full text-white hover:bg-white/10 transition-colors duration-300">
									Login
								</Link>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 md:py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div variants={staggerContainer(0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="grid grid-cols-2 gap-8 md:grid-cols-4">
						{[{ number: 10000, label: "Active Users", suffix: "+" }, { number: 50000, label: "Blog Posts", suffix: "+" }, { number: 100, label: "Countries", suffix: "+" }, { number: 1000000, label: "Monthly Views", suffix: "+" }].map((stat, index) => (
							<motion.div key={index} variants={fadeIn("up", 0.1 * index)} whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-xl shadow-md text-center">
								<div className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
									<FullCountUp end={stat.number} duration={2.5} />
									{stat.suffix}
								</div>
								<p className="text-gray-600 font-light text-lg">{stat.label}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 md:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-3">Why Choose Us</h2>
						<p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
							Everything You Need to Create, <br className="hidden md:block" />
							Publish, and Grow
						</p>
					</AnimatedSection>

					<motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-16">
						<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
							{[{ icon: <BookOpen className="h-7 w-7" />, title: "Easy to Use", description: "Our intuitive interface makes it simple to create and manage your blog posts. No technical skills required." }, { icon: <Users className="h-7 w-7" />, title: "Global Reach", description: "Share your ideas with readers from around the world and build your audience." }, { icon: <TrendingUp className="h-7 w-7" />, title: "Analytics & Growth", description: "Track your performance with detailed analytics and grow your readership." }].map((feature, index) => (
								<motion.div key={index} variants={fadeIn("up", 0.1 * index)} className="bg-gray-50 p-8 rounded-xl transition-transform duration-300 hover:transform hover:scale-105 shadow-md">
									<div className="flex items-center justify-center h-14 w-14 rounded-full bg-black text-white mx-auto mb-6">
										{feature.icon}
									</div>
									<h3 className="text-2xl font-serif font-medium text-gray-900 text-center mb-3">{feature.title}</h3>
									<p className="text-gray-600 text-center font-light leading-relaxed">{feature.description}</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="py-16 md:py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-3">Testimonials</h2>
						<p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">What Our Users Say</p>
						<p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 font-light leading-relaxed">Join thousands of satisfied bloggers on our platform.</p>
					</AnimatedSection>

					<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
						<TestimonialSlider testimonials={testimonials} />
					</motion.div>
				</div>
			</section>

			{/* Featured Blogs Preview */}
			<section className="py-16 md:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-sm uppercase tracking-widest text-gray-500 font-medium mb-3">Featured Content</h2>
						<p className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">Explore Our Best Articles</p>
						<p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 font-light leading-relaxed">Discover thought-provoking articles from our community of writers.</p>
					</AnimatedSection>

					<motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="grid gap-10 md:grid-cols-3">
						{[{
							image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
							category: "Technology",
							date: "Apr 12, 2023",
							title: "The Future of Web Development in 2023",
							excerpt: "Explore the latest trends and technologies shaping the future of web development. From WebAssembly to Edge Computing, discover what's next.",
							author: { name: "Lina Fatima", image: "https://media.licdn.com/dms/image/v2/D4D03AQHHFhfsVcHNJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698611108124?e=2147483647&v=beta&t=F3OKjPhn6qV4_G75Tm2efIjqQfwnzB8S5u4APRhYJvE" },
							comments: 24,
						}, {
							image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
							category: "React",
							date: "Mar 28, 2023",
							title: "Mastering React Hooks: A Comprehensive Guide",
							excerpt: "Learn how to leverage React Hooks to write cleaner, more efficient code. This guide covers everything from useState to custom hooks.",
							author: { name: "Ali Yasir", image: "https://media.licdn.com/dms/image/v2/D4E03AQGpUVRwomxQhA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692849556097?e=2147483647&v=beta&t=vjFAv9XieuNvP0AsaTxmjQ3DQVskeM1DL4TBHjAQZN0" },
							comments: 18,
						}, {
							image: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
							category: "CSS",
							date: "Mar 15, 2023",
							title: "Building Responsive UIs with Tailwind CSS",
							excerpt: "Discover how to create beautiful, responsive user interfaces using Tailwind CSS. This tutorial walks you through the utility-first approach.",
							author: { name: "Muhammad Ismail", image: "https://media.licdn.com/dms/image/v2/D4D03AQEnUw11W3ZTMg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728170985458?e=2147483647&v=beta&t=bvIWa91h3XcqKgFaGwbhbRXg_T2HjbXxAlKa2ladDp0" },
							comments: 32,
						}].map((blog, index) => (
							<motion.div key={index} variants={fadeIn("up", 0.1 * index)} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
								<motion.div className="relative h-56 overflow-hidden">
									<motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="w-full h-full object-cover" src={blog.image} alt={blog.title} />
									<div className="absolute top-4 left-4">
										<span className="bg-black text-white text-xs px-3 py-1.5 rounded-full uppercase tracking-wide font-medium">{blog.category}</span>
									</div>
								</motion.div>
								<div className="p-6">
									<div className="text-gray-500 text-sm mb-3 font-light">{blog.date}</div>
									<h3 className="text-2xl font-serif font-medium mb-3 text-gray-900 line-clamp-2">{blog.title}</h3>
									<p className="text-gray-600 mb-6 line-clamp-3 font-light leading-relaxed">{blog.excerpt}</p>
									<div className="flex items-center justify-between pt-4 border-t border-gray-100">
										<div className="flex items-center">
											<img className="h-10 w-10 rounded-full object-cover mr-3 ring-2 ring-white" src={blog.author.image || "/placeholder.svg"} alt={blog.author.name} />
											<span className="text-sm font-medium text-gray-900">{blog.author.name}</span>
										</div>
										<div className="flex items-center text-gray-500 text-sm">
											<MessageSquare className="h-4 w-4 mr-1" />
											<span>{blog.comments}</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 md:py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<AnimatedSection>
						<motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-black rounded-xl shadow-xl overflow-hidden">
							<div className="px-8 py-16 md:p-16 lg:p-20">
								<div className="max-w-xl">
									<h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-6">Ready to start your blogging journey?</h2>
									<p className="text-xl text-gray-300 font-light leading-relaxed mb-8">Join thousands of writers who have already started their journey with Blogify. It's free to get started!</p>
									<motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
										<Link to="/auth?mode=signup" className="inline-flex items-center px-8 py-4 bg-white border border-transparent rounded-full shadow-lg text-base font-medium text-black hover:bg-gray-100 transition-all duration-300">
											Get started today
											<ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
										</Link>
									</motion.div>
								</div>
							</div>
						</motion.div>
					</AnimatedSection>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-black text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-12">
						<motion.div variants={fadeIn("right", 0.1)} className="col-span-1 md:col-span-2">
							<div className="flex items-center mb-6">
								<svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="font-serif font-bold text-2xl tracking-tight">BLOGIFY</span>
							</div>
							<p className="text-gray-400 mb-6 font-light leading-relaxed text-lg">A modern platform for writers and readers to connect through engaging content. Share your stories, ideas, and expertise with the world.</p>
						</motion.div>

						<motion.div variants={fadeIn("up", 0.2)}>
							<h3 className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-6">Resources</h3>
							<ul className="space-y-4">
								{["Help Center", "Blog", "Tutorials"].map((item, index) => (
									<motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
										<a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300 font-light">{item}</a>
									</motion.li>
								))}
							</ul>
						</motion.div>

						<motion.div variants={fadeIn("up", 0.3)}>
							<h3 className="text-sm uppercase tracking-widest text-gray-400 font-medium mb-6">Legal</h3>
							<ul className="space-y-4">
								{["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
									<motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
										<a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300 font-light">{item}</a>
									</motion.li>
								))}
							</ul>
						</motion.div>
					</motion.div>

					<motion.div variants={fadeIn("up", 0.4)} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 pt-8 border-t border-gray-800">
						<p className="text-base text-gray-400 text-center font-light">&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
					</motion.div>
				</div>
			</footer>
		</div>
	)
}

export default WelcomePage