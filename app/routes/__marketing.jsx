import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFormSessions } from "~/data/auth.server";
import styles from "~/styles/marketing.css";

const MarketingLayout = () => {
  return (
    <>
      <MainHeader />
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

export const loader = async ({ request }) => {
  return await getUserFormSessions(request);
};
export default MarketingLayout;
