import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import styles from "~/styles/expenses.css";

// pathless layout routes -> Used for sharing the css links files with the nested routes and used routs components
// !it is a special feature when we used this double underscore no new routes is added to the routes
const ExpensesAppLayouts = () => {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
};

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default ExpensesAppLayouts;
