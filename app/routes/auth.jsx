import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation";
import styles from "~/styles/auth.css";
import { login, signup } from "~/data/auth.server";
import { redirect } from "@remix-run/node";

const auth = () => {
  return (
    <main>
      <AuthForm />
    </main>
  );
};

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  try {
    if (authMode === "login") {
      /* empty */
      return await login(credentials);
    } else {
      /* SignUp */
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return {
        credentials: error.message,
      };
    } else {
      throw error;
    }
  }
};

export default auth;
