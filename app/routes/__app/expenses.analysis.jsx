import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Error from "~/components/util/Error";
import { getExpenses } from "~/data/expenses.server";
import { isUserLoggedIn } from "~/data/auth.server";

const ExpensesAnalysis = () => {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses || []} />
      <ExpenseStatistics expenses={expenses || []} />
    </main>
  );
};

export const loader = async ({ request }) => {
  const userId = await isUserLoggedIn(request);
  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      {
        message: "No expenses found",
        statusCode: 404,
      },
      {
        statusCode: 404,
        statusText: "Expenses not found",
      }
    );
  }
  return expenses;
};

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <main>
      <Error title={caught.statusText}>
        {caught.data?.message || "Something went wrong. Please try again"}
      </Error>
    </main>
  );
};

export default ExpensesAnalysis;
