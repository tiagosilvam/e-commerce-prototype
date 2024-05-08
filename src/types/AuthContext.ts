type AuthContext = {
  user: User | null;
  signIn: ({ username, password }: Credentials) => Promise<boolean>;
  signOut: () => void;
  loading: boolean;
};
