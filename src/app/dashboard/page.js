import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Dashboard from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("87A6F3_secureAccessToken_45BC2D")?.value;

  if (!token) {
    return redirect("/auth");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return <Dashboard user={decoded} />;
  } catch (error) {
    return redirect("/auth");
  }
}
