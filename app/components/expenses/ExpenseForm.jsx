import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useParams,
  useSubmit,
  useTransition,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // fields something like 2023-09-10
  const validationError = useActionData();
  const expenseData = useLoaderData();
  const params = useParams();

  // Remix routes matches and get the data from the parent routes which is the another options of fetching the data rather than use the useLoaderData
  const matches = useMatches();
  const matchData = matches
    .find((match) => match.id === "routes/__app/expenses")
    .data.find((ele) => ele.id === params.expenseId);
  const formDefaultValue = {
    title: expenseData?.title || matchData?.title || "",
    amount: expenseData?.amount || matchData?.amount || 0,
    date:
      expenseData?.date.slice(0, 10) ||
      matchData?.date.slice(0, 10) ||
      new Date().toISOString().slice(0, 10),
  };

  // Handel the form submission manually
  const submit = useSubmit();
  /**
   * Handel the form submission manually
   * @param {Event} e
   */
  const submitHandler = (e) => {
    e.preventDefault();
    submit(e.target, {
      method: "post",
    });
  };

  const { state } = useTransition();
  const isSubmitting = state !== "idle";

  return (
    <Form
      method="post"
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={formDefaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={formDefaultValue.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={formDefaultValue.date}
          />
        </p>
      </div>
      {validationError && (
        <ul>
          {Object.values(validationError).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
