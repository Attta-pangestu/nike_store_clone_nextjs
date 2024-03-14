// Create a new component for the session check and redirection logic
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "@/components/fragments/Navbar";

const SessionCheckNavbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("session check", session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return session && Object.keys(session).length > 0 ? (
    <Navbar session={session} />
  ) : null;
};

export default SessionCheckNavbar;
