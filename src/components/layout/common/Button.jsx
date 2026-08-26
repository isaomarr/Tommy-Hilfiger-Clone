import React from 'react'
import { Link } from 'react-router-dom'

const variantClasses = {
  primary: 'bg-[#0a1a3c] text-white hover:bg-[#132a5c]',
  secondary: 'bg-white text-black border border-black hover:bg-gray-100',
  outline: 'bg-transparent text-[#0a1a3c] border border-[#0a1a3c] hover:bg-[#0a1a3c]/5',
  text: 'bg-transparent text-[#0a1a3c] underline hover:no-underline p-0',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  fullWidth = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const classes = `inline-block font-medium tracking-wide text-center transition disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${variant === 'text' ? '' : sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export default Button
