"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

const FullCountUp = ({ end, duration = 2.5, className = "" }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      let startTime
      const animationDuration = duration * 1000 // convert to ms

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / animationDuration, 1)

        // Use easeOutExpo for a nice effect that speeds up at the beginning and slows down at the end
        const easeOutExpo = 1 - Math.pow(2, -10 * progress)
        setCount(Math.floor(easeOutExpo * end))

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          setCount(end)
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [isInView, end, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  )
}

export default FullCountUp
