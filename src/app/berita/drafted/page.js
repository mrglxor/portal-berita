import DraftedContent from "../../Components/DraftedContent";
import { authMiddleware } from "../../../../middleware/authMiddleware";
import { redirect } from "next/navigation";

export default async function Drafted() {
  let user;
  try {
    user = await authMiddleware();
  } catch (error) {
    return redirect("/auth");
  }

  return (
    <div>
      <DraftedContent user={user} />
    </div>
  );
}
