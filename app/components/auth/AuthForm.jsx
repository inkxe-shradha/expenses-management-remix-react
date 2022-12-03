import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const currentMode = searchParams.get("mode") || "login";
  const navigation = useTransition();
  const validation = useActionData();
  const isSubmitting = navigation.state !== "idle";
  const submitButtonCaptions =
    currentMode === "login" ? "Login" : "Create User";
  const toggleButtonCaptions =
    currentMode === "login"
      ? "Create a new user"
      : "Login with an existing user";
  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {currentMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validation && (
        <ul>
          {Object.values(validation).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting...." : submitButtonCaptions}
        </button>
        <Link to={currentMode == "login" ? "?mode=signup" : "?mode=login"}>
          {isSubmitting ? "Submitting...." : toggleButtonCaptions}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
