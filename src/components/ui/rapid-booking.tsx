import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { User, Phone, Calendar, Clock, GamepadIcon, CreditCard, CheckCircle2, AlertCircle, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RapidBooking() {
  const [name, setName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [consoleType, setConsoleType] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  // ... (keep all the existing validation and handleSubmit functions)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto p-4"
    >
      <Card className="border-2 hover:border-[#098637] transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="space-y-1">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CardTitle className="text-3xl font-bold text-center text-[#098637]">Quick Booking</CardTitle>
            <p className="text-center text-sm text-gray-500 mt-2">Book your gaming session in minutes</p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Keep existing name and contact fields */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Keep existing console type field */}

              <motion.div 
                className="space-y-2"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <Label className="text-sm font-medium flex items-center gap-1">
                  Payment Method {errors.paymentType && <AlertCircle className="h-4 w-4 text-red-500" />}
                </Label>
                <RadioGroup
                  value={paymentType}
                  onValueChange={setPaymentType}
                  className="grid grid-cols-1 gap-3"
                >
                  <Label
                    htmlFor="credit"
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      paymentType === 'credit'
                        ? 'border-[#098637] bg-[#098637]/5'
                        : 'border-gray-200 hover:border-[#098637]/50'
                    }`}
                  >
                    <RadioGroupItem value="credit" id="credit" />
                    <CreditCard className="h-4 w-4 text-[#098637]" />
                    <div className="space-y-1">
                      <span className="font-medium">Credit/Debit Card</span>
                      <p className="text-xs text-gray-500">Pay securely with your card</p>
                    </div>
                  </Label>

                  <Label
                    htmlFor="wallet"
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      paymentType === 'wallet'
                        ? 'border-[#098637] bg-[#098637]/5'
                        : 'border-gray-200 hover:border-[#098637]/50'
                    }`}
                  >
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Wallet className="h-4 w-4 text-[#098637]" />
                    <div className="space-y-1">
                      <span className="font-medium">Digital Wallet</span>
                      <p className="text-xs text-gray-500">Google Pay, Apple Pay, or PayPal</p>
                    </div>
                  </Label>

                  <Label
                    htmlFor="cash"
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      paymentType === 'cash'
                        ? 'border-[#098637] bg-[#098637]/5'
                        : 'border-gray-200 hover:border-[#098637]/50'
                    }`}
                  >
                    <RadioGroupItem value="cash" id="cash" />
                    <svg
                      className="h-4 w-4 text-[#098637]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div className="space-y-1">
                      <span className="font-medium">Cash</span>
                      <p className="text-xs text-gray-500">Pay at location</p>
                    </div>
                  </Label>
                </RadioGroup>
                {errors.paymentType && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.paymentType}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Keep existing date and time fields */}

            {/* Keep existing submit button */}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}