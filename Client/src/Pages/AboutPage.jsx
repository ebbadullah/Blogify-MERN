"use client"

import { motion } from "framer-motion"
import AnimatedSection from "../Components/UI/AnimatedSection"
import { fadeIn, staggerContainer, textVariant } from "../Utils/motion"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
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
            About Us
          </motion.h1>
          <motion.p variants={fadeIn("up", 0.2)} initial="hidden" animate="show" className="mt-4 text-lg text-gray-300">
            Learn more about our mission, values, and the team behind Blogify.
          </motion.p>
        </div>
      </motion.div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="lg:text-center">
            <h2 className="text-base text-black font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
              Empowering Writers, Inspiring Readers
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're on a mission to create a platform where writers can share their knowledge and readers can discover
              valuable insights.
            </p>
          </AnimatedSection>

          <div className="mt-16">
            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
            >
              {[
                {
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  ),
                  title: "Global Reach",
                  description:
                    "Our platform connects writers and readers from around the world, fostering a global community of knowledge sharing.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                  title: "Fast & Modern",
                  description:
                    "Built with the latest technologies to ensure a fast, responsive, and enjoyable experience for all users.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  ),
                  title: "Engaged Community",
                  description:
                    "Join discussions, share feedback, and connect with like-minded individuals in our thriving community.",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  ),
                  title: "Quality Content",
                  description:
                    "We prioritize high-quality, valuable content that educates, inspires, and entertains our readers.",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn("up", 0.1 * index)} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                    {feature.icon}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-black">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="lg:text-center mb-12">
            <h2 className="text-base text-black font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
              Meet the People Behind Blogify
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {[
              {
                image: "https://res.cloudinary.com/dfnpekedc/image/upload/v1741934327/gteytlkmewgayj6lfn8x.jpg",
                name: "Ebad Ullah",
                role: "Founder & CEO",
              },
              {
                image:
                  "https://media.licdn.com/dms/image/v2/D4D03AQEM-EAMBGfWCw/profile-displayphoto-shrink_800_800/B4DZOMEa7oHoAw-/0/1733221789867?e=1751500800&v=beta&t=_yBBYgeV3lpC9cYXqiPRZSUypgIOlg2sHIN_UpWmfX4",
                name: "Arshil Mirza",
                role: "CTO",
              },
              {
                image:
                  "https://media.licdn.com/dms/image/v2/D4D03AQGI1mmPcsVEwA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1700293270350?e=1751500800&v=beta&t=UTVDtNthGj0zGOR5kDp5dak9kaYxbDrGwDspTnr-3w4",
                name: "Khubaib khan",
                role: "Lead Designer",
              },
            ].map((member, index) => (
              <motion.div key={index} variants={fadeIn("up", 0.1 * index)} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56 overflow-hidden"
                >
                  <img
                    className="h-full w-full object-cover"
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - Team member`}
                  />
                </motion.div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-black">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  <div className="mt-2 flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="lg:text-center">
            <h2 className="text-base text-black font-semibold tracking-wide uppercase">Join Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
              Be Part of Our Journey
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Whether you're a writer looking to share your knowledge or a reader seeking valuable insights, we welcome
              you to join our community.
            </p>
            <div className="mt-8 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex rounded-md shadow"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-300"
                >
                  Get Started
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-3 inline-flex">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-black text-base font-medium rounded-md text-black hover:bg-gray-50 transition-colors duration-300"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
