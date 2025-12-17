import { getCurrentUserServer } from "@/lib/util/auth-server";
import { redirect } from "next/navigation";

const DashboardLayout = async({children} : {children: React.ReactNode}) => {

  // Server side checking if user is authenticated

  const user = await getCurrentUserServer();

  if(!user) {
    redirect('/login');
  }

  return children
}

export default DashboardLayout;