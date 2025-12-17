import { UserRole } from '@/lib';
import { getCurrentUserServer } from '@/lib/util/auth-server';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminLayout = async({children} : {children: React.ReactNode}) => {
    const user = await getCurrentUserServer();

    if(!user || user.role !== UserRole.ADMIN) {
        redirect('/dashboard/user');
    }
  return children
}

export default AdminLayout