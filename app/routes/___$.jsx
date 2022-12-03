import { redirect } from "@remix-run/node";
// Remix Spat Routes
export const loader = ({ params }) => {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  throw new Response("Not found page", {
    status: 404,
    message: "Page not found",
  });
};
