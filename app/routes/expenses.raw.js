import { isUserLoggedIn } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

// Resources Routes
// ! Render the resource directly without loading any of the UI/Components
export const loader = async ({ request }) => {
  const userId = await isUserLoggedIn(request);
  return await getExpenses(userId);
};
