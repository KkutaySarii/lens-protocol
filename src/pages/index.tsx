import SignInButton from "../components/SignInButton";
import useLogin from "../lib/auth/useLogin";

export default function Home() {
  const { mutate: requestLogin } = useLogin();
  return <SignInButton />;
}
