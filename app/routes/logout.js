import { removeUserFormSessions } from "~/data/auth.server";
export const action = async ({ request }) => {
  if (request.method === "POST") {
    return removeUserFormSessions(request);
  } else {
    throw new Error("Invalid request method: " + request.method);
  }
};
