import React from 'react'
import AccountShell from './AccountShell'

const Payment = () => {
  return (
    <AccountShell title="Payment">
      <p className="text-sm text-gray-500">
        No saved payment methods. This demo doesn't store card details — you'll enter payment info at checkout each
        time.
      </p>
    </AccountShell>
  )
}

export default Payment
