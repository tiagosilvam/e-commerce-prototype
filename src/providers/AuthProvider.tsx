import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "contexts";
import axios from "axios";

export const AuthProvider = ({
  children,
}: {
  children: Readonly<ReactNode>;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const storageUser = localStorage.getItem("auth");

  useEffect(() => {
    setTimeout(() => {
      if (storageUser) {
        setUser(jwtDecode(storageUser));
      }
      setLoading(false);
    }, 1500);
  }, [storageUser]);

  const signIn = async ({ username, password }: Credentials) => {
    await axios
      .post(`${process.env.REACT_APP_LOGIN_API_URL}/auth/login`, {
        username,
        password,
      })
      .then(({ data: user }: { data: User }) => {
        setUser(user);
        localStorage.setItem("auth", user.token);
        return true;
      });
    return false;
  };

  const signOut = () => {
    localStorage.removeItem("auth");
    setUser(null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
