"use client";
import { useUser } from '@/lib/context';
import React from 'react'

const AdminPage = () => {
  const { user } = useUser();
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome {user?.name}</p>
    </div>
  )
}

export default AdminPage