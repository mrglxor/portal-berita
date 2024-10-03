import { authMiddleware } from "../../../../middleware/authMiddleware";
import PublishedContent from "../../Components/PublishedContent";
import { redirect } from "next/navigation";

export default async function Published() {
  let user;
  try {
    user = await authMiddleware();
  } catch (error) {
    return redirect("/auth");
  }

  return (
    <div>
      <PublishedContent user={user} />
    </div>
  );
}
