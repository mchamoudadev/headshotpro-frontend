import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { UserProvider } from "@/lib/context";
import { getCurrentUserServer } from "@/lib/util/auth-server";
import { redirect } from "next/navigation";

const DashboardRootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Server side checking if user is authenticated

  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      {/* Dashboard Layout */}
      <DashboardLayout>{children}</DashboardLayout>
    </UserProvider>
  );
};

export default DashboardRootLayout;
