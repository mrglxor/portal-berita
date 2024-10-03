import { redirect } from "next/navigation";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default function Dashboard({ user }) {
  if (
    user.role === "admin" ||
    user.role === "master" ||
    user.role === "provider"
  ) {
    return <AdminDashboard user={user} />;
  } else if (user.role === "user") {
    return <UserDashboard user={user} />;
  } else {
    return redirect("/auth");
  }
}
