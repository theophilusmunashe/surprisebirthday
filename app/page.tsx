"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Gift, 
  Sparkles, 
  Heart, 
  PartyPopper,
  Music,
  Camera,
  Users,
  Star,
  ChevronDown
} from "lucide-react"
import { ConfettiEffect } from "@/components/confetti-effect"
import { RSVPModal } from "@/components/rsvp-modal"

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showRSVP, setShowRSVP] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Intersection Observer hooks for scroll animations
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [detailsRef, detailsInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [ctaRef, ctaInView] = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleRSVPClick = () => {
    setShowConfetti(true)
    setShowRSVP(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  const floatingElements = [
    { icon: Gift, color: "text-pink-400", size: "h-8 w-8", delay: 0 },
    { icon: Star, color: "text-yellow-400", size: "h-6 w-6", delay: 1 },
    { icon: Sparkles, color: "text-purple-400", size: "h-7 w-7", delay: 2 },
    { icon: Heart, color: "text-red-400", size: "h-6 w-6", delay: 0.5 },
    { icon: PartyPopper, color: "text-orange-400", size: "h-8 w-8", delay: 1.5 },
    { icon: Music, color: "text-blue-400", size: "h-7 w-7", delay: 2.5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-peach-50 to-pink-50 overflow-hidden">
      {showConfetti && <ConfettiEffect />}
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute hidden sm:block"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index * 10)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            <element.icon className={`${element.size} ${element.color} opacity-20`} />
          </motion.div>
        ))}
      </div>

      {/* Mouse Follower - Hidden on mobile */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-pink-100/30 to-peach-100/30" />
        
        <div className="relative mx-auto max-w-6xl text-center w-full">
          <AnimatePresence>
            {heroInView && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-orange-200 to-pink-200 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-orange-800 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <PartyPopper className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                  Surprise Party Alert!
                </motion.div>

                <motion.h1 
                  className="font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="block text-gray-800 mb-2 sm:mb-0">Join Us for</span>
                  <motion.span 
                    className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Mabel's 21st Birthday!
                  </motion.span>
                </motion.h1>

                <motion.p 
                  className="mx-auto mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Help us make{" "}
                  <span className="font-bold text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text">
                    Mabel Tadakadzwa Makwanise's
                  </span>{" "}
                  special day absolutely unforgettable with love, laughter, and magical memories
                </motion.p>

                <motion.div 
                  className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 font-bold px-8 sm:px-10 py-4 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl w-full sm:w-auto min-h-[56px] touch-manipulation"
                      onClick={handleRSVPClick}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        RSVP Now!
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-orange-400 text-orange-600 hover:bg-orange-400 hover:text-white font-bold px-8 sm:px-10 py-4 sm:py-4 text-base sm:text-lg rounded-full bg-white/80 backdrop-blur-sm shadow-lg w-full sm:w-auto min-h-[56px] touch-manipulation"
                    >
                      <Gift className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                      Gift Ideas
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Taglines under CTAs */}
                <motion.div
                  className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4 px-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-2 shadow">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      Please RSVP before <span className="font-bold text-orange-600">27 August 2025</span>.
                    </span>
                  </div>

                  <a href="#details" className="group inline-flex flex-col items-center justify-center">
                    <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      Scroll down for more details
                    </span>
                    <div className="mt-1 flex -space-y-2">
                      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                        <ChevronDown className="h-5 w-5 text-orange-500/80 group-hover:text-orange-600" />
                      </motion.div>
                      <motion.div animate={{ y: [3, 9, 3] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}>
                        <ChevronDown className="h-5 w-5 text-pink-500/80 group-hover:text-pink-600" />
                      </motion.div>
                      <motion.div animate={{ y: [6, 12, 6] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
                        <ChevronDown className="h-5 w-5 text-purple-500/80 group-hover:text-purple-600" />
                      </motion.div>
                    </div>
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Event Details Section */}
      <motion.section 
        id="details"
        ref={detailsRef}
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-white/50 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Party Details
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0">Everything you need to know for the big celebration</p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Calendar,
                title: "Date",
                content: "Saturday, August 30th, 2025",
                color: "from-orange-400 to-red-400",
                delay: 0
              },
              {
                icon: Clock,
                title: "Time",
                content: "12:00 PM - 8:00 PM",
                color: "from-pink-400 to-purple-400",
                delay: 0.2
              },
              {
                icon: MapPin,
                title: "Location",
                content: "9 New March, Hillside",
                color: "from-blue-400 to-cyan-400",
                delay: 0.4
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={detailsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                      <motion.div 
                        className={`rounded-2xl bg-gradient-to-r ${item.color} p-3 sm:p-4 shadow-lg flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-orange-50 to-pink-50"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Let's Make It Magical
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-0">An unforgettable celebration awaits</p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">What to Expect</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: Gift, text: "Delicious birthday cake & treats", color: "text-pink-500" },
                      { icon: Music, text: "Music, dancing & great vibes", color: "text-purple-500" },
                      { icon: Users, text: "Surprise guests & friends", color: "text-blue-500" },
                      { icon: Camera, text: "Photo booth & memories", color: "text-green-500" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-orange-50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                        whileHover={{ x: 10 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
                        </motion.div>
                        <span className="text-gray-700 text-base sm:text-lg">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Important Notes</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: Heart, text: "This is a SURPRISE party - keep it secret!", color: "text-red-500" },
                      { icon: Sparkles, text: "Color theme: Orange & Peach", color: "text-orange-500" },
                      { icon: Clock, text: "Please arrive by 11:45 AM", color: "text-blue-500" },
                      { icon: Gift, text: "Your presence is the perfect gift!", color: "text-purple-500" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-pink-50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        whileHover={{ x: -10 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: -360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
                        </motion.div>
                        <span className="text-gray-700 text-base sm:text-lg">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100"
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 sm:mb-8"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 20px rgba(255,165,0,0.5)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to Celebrate?
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Let's toast to 21 amazing years of Mabel! Your presence will make her day absolutely perfect and create memories that will last a lifetime.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 sm:px-0"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 font-bold px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl rounded-full shadow-2xl w-full sm:w-auto min-h-[56px] touch-manipulation"
                onClick={handleRSVPClick}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2 sm:mr-3"
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </motion.div>
                RSVP for Mabel's Party
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <RSVPModal open={showRSVP} onOpenChange={setShowRSVP} />
    </div>
  )
}
