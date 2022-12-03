import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import Logo from "../util/Logo";

function MainHeader() {
  const userId = useLoaderData();
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/price">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId ? (
              <Form id="logout-form" method="post" action="/logout">
                <button className="cta-alt"> Logout </button>
              </Form>
            ) : (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
