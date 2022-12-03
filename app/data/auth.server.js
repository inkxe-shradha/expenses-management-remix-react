import { prisma } from "./database.server";
import { compare, hash } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRETS = process.env.SESSION_SECRETS;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRETS],
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 60 * 24 * 60, // 30 days
    path: "/",
  },
});

const createUserSession = async (userId, redirectPath = "/") => {
  const session = await sessionStorage.getSession();
  session.set("user", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const signup = async ({ email, password }) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (user) {
    const error = new Error("Email already exists. Please try again.");
    error.status = 422;
    throw error;
  }
  const passwordHash = await hash(password, 12);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
    return await createUserSession(user.id, "/expenses");
  } catch (error) {
    console.log("error creating", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (user) {
    const isPasswordCorrect = await compare(password, user.password);
    if (isPasswordCorrect) {
      return await createUserSession(user.id, "/expenses");
    } else {
      const error = new Error("Invalid email or password. Please try again.");
      error.status = 401;
      throw error;
    }
  } else {
    const error = new Error("Invalid email or password. Please try again.");
    error.status = 401;
    throw error;
  }
};

export const getUserFormSessions = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("user");
  if (!userId) {
    return null;
  }
  return userId;
};

export const removeUserFormSessions = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};

export const isUserLoggedIn = async (request) => {
  const session = await getUserFormSessions(request);
  if (!session) {
    // * throw redirect means remix will cancel the function operation and related to where it been called and return the redirected url provided
    throw redirect("/auth?mode=login");
  }
  return session;
};
