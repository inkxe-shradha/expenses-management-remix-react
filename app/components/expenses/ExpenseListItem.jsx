import { Link, useFetcher } from "@remix-run/react";

function ExpenseListItem({ title, id, amount }) {
  // * Used fort the submit the form manually with out any adding form/action request where remix should wait for the responseHeaders
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    // tbd
    if (confirm("Are you sure you want to delete")) {
      fetcher.submit(null, {
        method: "delete",
        action: `/expenses/${id}`,
      });
    }
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
