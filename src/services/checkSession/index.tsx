// Create a new component for the session check and redirection logic
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SessionCheck = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return children;
};

export default SessionCheck;
