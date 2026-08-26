import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { memberIdFor } from '../../utils/memberId'
import AccountShell from './AccountShell'
import SignInInfoBlock from './SignInInfoBlock'

const Field = ({ label, value, addLabel, to }) => (
  <>
    <span className="text-gray-500">{label}</span>
    {value ? <span>{value}</span> : <Link to={to} className="underline">{addLabel}</Link>}
  </>
)

const Overview = () => {
  const { user } = useAuth()

  return (
    <AccountShell title="Overview">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-xl font-light">Personal Information</h2>
        <Link to="/account/personal" className="underline text-sm">
          Edit
        </Link>
      </div>

      <SignInInfoBlock user={user} />

      <div>
        <h3 className="font-medium mb-3">About Me</h3>
        <div className="grid grid-cols-[160px_1fr] gap-y-2 text-sm">
          <span className="text-gray-500">Hilfiger Club Member ID</span>
          <span>{memberIdFor(user.id)}</span>
          <span className="text-gray-500">Name</span>
          <span>
            {user.firstName} {user.lastName}
          </span>
          <Field label="Phone Number" value={user.phone} addLabel="Add Phone Number" to="/account/personal" />
          <Field
            label="Birthday"
            value={user.birthMonth ? `${user.birthMonth} ${user.birthDay}` : ''}
            addLabel="Add Birthday"
            to="/account/personal"
          />
          <Field label="Gender" value={user.gender} addLabel="Add Gender" to="/account/personal" />
        </div>
      </div>
    </AccountShell>
  )
}

export default Overview
