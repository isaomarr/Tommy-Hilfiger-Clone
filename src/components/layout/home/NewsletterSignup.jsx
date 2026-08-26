import React, { useState } from 'react'
import bgImg from '../../../assets/images/04_HP_Tile08_01_dt.jpg'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="relative w-full">
      <img src={bgImg} alt="" className="w-full h-80 object-cover" />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-6">
        <h2 className="text-3xl font-light mb-2">Join Us</h2>
        <p className="text-sm mb-6">Be the first to know about new arrivals and exclusive offers.</p>
        {submitted ? (
          <p className="text-sm">Thank you! You've been added to the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-black text-sm"
            />
            <button type="submit" className="bg-white text-black px-6 py-3 text-sm font-medium">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default NewsletterSignup
