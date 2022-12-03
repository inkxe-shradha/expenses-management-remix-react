import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation";

const ExpensesDetails = () => {
  const navigation = useNavigate();
  const onClose = () => {
    navigation("..");
  };
  return (
    <Modal onClose={onClose}>
      <ExpenseForm />
    </Modal>
  );
};

// This is the optional method to get the single expense data from the server
// export const loader = async ({ params }) => {
//   const expenseId = params.expenseId;
//   return await getExpense(expenseId);
// };

// Executing the Post requests
export const action = async ({ request, params }) => {
  const expenseId = params.expenseId;
  if (request.method === "POST") {
    const formData = await request.formData();
    try {
      validateExpenseInput(Object.fromEntries(formData));
    } catch (error) {
      return error;
    }
    await updateExpense(expenseId, Object.fromEntries(formData));
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    return json({
      expenses: expenseId,
      message: "Expenses deleted successfully",
    });
  }
  return redirect("/expenses");
};

export default ExpensesDetails;
