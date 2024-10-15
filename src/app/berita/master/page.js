import BeritaMaster from "../../Components/BeritaMaster";
import { authMiddleware } from "../../../../middleware/authMiddleware";
import { redirect } from "next/navigation";

export default async function Master() {
  let user;
  try {
    user = await authMiddleware();
  } catch (error) {
    return redirect("/auth");
  }

  return (
    <div>
      <BeritaMaster user={user} />
    </div>
  );
}
