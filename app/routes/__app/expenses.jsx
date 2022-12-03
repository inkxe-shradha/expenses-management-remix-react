import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { isUserLoggedIn } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

const Expenses = () => {
  const expensesList = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expenses</span>
          </Link>
          <a href="/expenses/raw" target={"_blank"}>
            <FaDownload />
            <span>Download</span>
          </a>
        </section>
        {expensesList && expensesList.length > 0 ? (
          <ExpensesList expenses={expensesList || []} />
        ) : (
          <section id="no-expenses">
            <p>No expenses found</p>
            <p>
              {" "}
              Start <Link to="add">add some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
};

export const loader = async ({ request }) => {
  // ! since loader runs in parallel, we nee to add the userSession check in each and every loader of the child routes of this parent routes session.
  const userId = await isUserLoggedIn(request);
  return await getExpenses(userId);
};

export default Expenses;
