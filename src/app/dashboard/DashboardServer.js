import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getServerSideProps = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("87A6F3_secureAccessToken_45BC2D")?.value;

  if (!token) {
    return { redirect: { destination: "/auth", permanent: false } };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      props: {
        user: decoded,
      },
    };
  } catch (error) {
    return { redirect: { destination: "/auth", permanent: false } };
  }
};
