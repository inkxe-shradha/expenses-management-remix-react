import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { isUserLoggedIn } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation";

const AddExpenses = () => {
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

// Executing the Post requests
export const action = async ({ request }) => {
  const userId = await isUserLoggedIn(request);
  const formData = await request.formData();
  try {
    validateExpenseInput(Object.fromEntries(formData));
  } catch (error) {
    return error;
  }
  await addExpense(Object.fromEntries(formData), userId);
  return redirect("/expenses");
};

export default AddExpenses;
