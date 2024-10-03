import { redirect } from "next/navigation";
import { authMiddleware } from "../../../middleware/authMiddleware";
import CreateForm from "../Components/CreateForm";

export default async function CreateArticlePage() {
  let user;
  try {
    user = await authMiddleware();
  } catch (error) {
    redirect("/auth");
  }

  return (
    <div>
      <CreateForm user={user} />
    </div>
  );
}
