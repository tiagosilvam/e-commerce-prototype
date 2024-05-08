import { AuthContext } from "contexts";
import { useContext } from "react";

export default function useSession() {
  const { user, signIn, signOut, loading } = useContext(AuthContext);
  return { user, signIn, signOut, loading };
}
