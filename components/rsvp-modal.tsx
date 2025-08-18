"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Heart, 
  Send, 
  PartyPopper, 
  Sparkles, 
  Users, 
  Mail, 
  User, 
  MessageCircle,
  CheckCircle,
  Gift,
  Star,
  Phone
} from "lucide-react"

interface RSVPModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RSVPModal({ open, onOpenChange }: RSVPModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendance: "",
    guests: "1",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format the RSVP data for WhatsApp
      const whatsappMessage = formatRSVPForWhatsApp(formData)
      
      // Build wa.me link (no + sign, international format)
      const whatsappNumber = "263779790287"
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
      
      // Open immediately to keep it within the user gesture (prevents popup blockers)
      const win = window.open(whatsappURL, '_blank')

      // Fallback: if blocked, navigate current tab
      if (!win) {
        window.location.href = whatsappURL
      }
      
      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        onOpenChange(false)
        setIsSubmitted(false)
        setCurrentStep(0)
        setFormData({ name: "", email: "", phone: "", attendance: "", guests: "1", message: "" })
      }, 3000)
    } catch (error) {
      console.error('Error sending RSVP:', error)
      setIsSubmitting(false)
      // You could add error handling here if needed
    }
  }

  const formatRSVPForWhatsApp = (data: typeof formData) => {
    const attendanceText = data.attendance === "yes" ? "✅ YES - I'll be there!" : "❌ Sorry, can't make it"
    const guestText = data.attendance === "yes" ? `👥 Number of guests: ${data.guests}` : ""
    
    return `🎉 *RSVP for Mabel's 21st Birthday Party* 🎂

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}

🎊 *Attendance:* ${attendanceText}
${guestText ? guestText + '\n' : ''}
💌 *Message:* ${data.message || "No message provided"}

---
Sent via Mabel's Birthday RSVP Form 🎈`
  }

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== ""
      case 1:
        return formData.attendance !== ""
      case 2:
        return true
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] max-w-lg border-0 bg-gradient-to-br from-orange-50 to-pink-50">
          <motion.div 
            className="text-center py-8 sm:py-12 px-2 sm:px-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="mx-auto mb-4 sm:mb-6 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </motion.div>
            </motion.div>
            
            <motion.h3 
              className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              🎉 Thank You!
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Your RSVP has been sent via WhatsApp! We can't wait to celebrate Mabel's special day with you. 
              Get ready for an amazing party! 🎂✨
            </motion.p>

            <motion.div
              className="flex justify-center mt-6 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    delay: i * 0.1,
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] border-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-0 overflow-hidden">
        <div className="relative">
          {/* Header with animated background */}
          <div className="relative bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 p-4 sm:p-6 lg:p-8 text-white overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            
            <DialogHeader className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 sm:gap-3 mb-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8" />
                </motion.div>
                <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold">RSVP for Mabel's 21st Birthday!</DialogTitle>
              </motion.div>
              <DialogDescription className="text-orange-100 text-sm sm:text-base lg:text-lg">
                Join us for an unforgettable celebration filled with joy, laughter, and magical moments
              </DialogDescription>
            </DialogHeader>

            {/* Progress indicator */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {[0, 1, 2].map((step) => (
                <motion.div
                  key={step}
                  className={`h-2 w-6 sm:w-8 rounded-full ${
                    step <= currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Form content */}
          <div className="p-4 sm:p-6 lg:p-8 max-h-[60vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Let's get to know you!</h3>
                      <p className="text-sm sm:text-base text-gray-600">Tell us who you are</p>
                    </div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <User className="h-4 w-4 text-orange-500" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your beautiful name"
                        className="border-2 border-orange-200 focus:border-orange-400 rounded-xl p-3 sm:p-4 text-base sm:text-lg min-h-[48px] touch-manipulation"
                        required
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <Mail className="h-4 w-4 text-pink-500" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="border-2 border-pink-200 focus:border-pink-400 rounded-xl p-3 sm:p-4 text-base sm:text-lg min-h-[48px] touch-manipulation"
                        required
                      />
                    </motion.div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <Phone className="h-4 w-4 text-purple-500" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="border-2 border-purple-200 focus:border-purple-400 rounded-xl p-3 sm:p-4 text-base sm:text-lg min-h-[48px] touch-manipulation"
                        required
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 2: Attendance */}
                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Will you join the celebration?</h3>
                      <p className="text-sm sm:text-base text-gray-600">We hope to see you there!</p>
                    </div>

                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label className="text-gray-700 font-medium text-base sm:text-lg">Your Response</Label>
                      <RadioGroup
                        value={formData.attendance}
                        onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                        className="space-y-4"
                        required
                      >
                        <motion.div 
                          className="flex items-center space-x-3 p-3 sm:p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer touch-manipulation"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RadioGroupItem value="yes" id="yes" className="text-green-500" />
                          <Label htmlFor="yes" className="flex items-center gap-2 sm:gap-3 cursor-pointer text-base sm:text-lg">
                            <PartyPopper className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                            Yes, I'll be there! 🎉
                          </Label>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-3 p-3 sm:p-4 rounded-xl border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all cursor-pointer touch-manipulation"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RadioGroupItem value="no" id="no" className="text-red-500" />
                          <Label htmlFor="no" className="flex items-center gap-2 sm:gap-3 cursor-pointer text-base sm:text-lg">
                            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                            Sorry, can't make it 😢
                          </Label>
                        </motion.div>
                      </RadioGroup>
                    </motion.div>

                    <AnimatePresence>
                      {formData.attendance === "yes" && (
                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Label htmlFor="guests" className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                            <Users className="h-4 w-4 text-purple-500" />
                            Number of Guests (including yourself)
                          </Label>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <motion.button
                              type="button"
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold text-lg sm:text-xl shadow-lg touch-manipulation"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                const current = parseInt(formData.guests)
                                if (current > 1) {
                                  setFormData({ ...formData, guests: (current - 1).toString() })
                                }
                              }}
                            >
                              -
                            </motion.button>
                            <div className="flex-1 text-center">
                              <div className="text-2xl sm:text-3xl font-bold text-gray-800 bg-white rounded-xl p-3 sm:p-4 border-2 border-purple-200 shadow-inner">
                                {formData.guests}
                              </div>
                            </div>
                            <motion.button
                              type="button"
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold text-lg sm:text-xl shadow-lg touch-manipulation"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                const current = parseInt(formData.guests)
                                if (current < 5) {
                                  setFormData({ ...formData, guests: (current + 1).toString() })
                                }
                              }}
                            >
                              +
                            </motion.button>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 text-center">Maximum 5 guests per RSVP</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Step 3: Message */}
                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Share your wishes!</h3>
                      <p className="text-sm sm:text-base text-gray-600">Leave a special message for Mabel</p>
                    </div>

                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="message" className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        Birthday Message (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share a birthday wish, memory, or just let Mabel know how excited you are to celebrate with her..."
                        rows={4}
                        className="border-2 border-blue-200 focus:border-blue-400 rounded-xl p-3 sm:p-4 text-base sm:text-lg resize-none min-h-[100px] touch-manipulation"
                      />
                    </motion.div>

                    <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 sm:p-6 text-center">
                      <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-gray-700 font-medium text-sm sm:text-base">
                        Your presence is the greatest gift, but your words will make her day even more special! 💝
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="order-2 sm:order-1"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl border-2 border-gray-300 disabled:opacity-50 min-h-[48px] touch-manipulation"
                  >
                    Previous
                  </Button>
                </motion.div>

                <div className="flex gap-3 order-1 sm:order-2">
                  {currentStep < 2 ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:flex-none"
                    >
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation"
                      >
                        Next Step
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 sm:flex-none"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold disabled:opacity-50 min-h-[48px] touch-manipulation"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <motion.div
                              className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="text-sm sm:text-base">Sending RSVP...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-sm sm:text-base">Send RSVP</span>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
