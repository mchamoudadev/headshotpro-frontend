"use client";
import { useUser } from '@/lib/context';
import React from 'react'

const UserPage = () => {

  const { user } = useUser();

  return (
    <div>
      <h1>User Page</h1>
      <p>Welcome {user?.name}</p>
    </div>
  )
}

export default UserPage