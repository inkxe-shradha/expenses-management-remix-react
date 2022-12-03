import styles from "~/styles/main.css";
import Error from "./components/util/Error";
const {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useCatch,
} = require("@remix-run/react");

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [
    // {
    //   rel: "stylesheet",
    //   href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    // },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const Document = ({ children, title }) => (
  <html lang="en">
    <head>
      <title>{title}</title>
      <Meta />
      <Links />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
// This will render the components in remix if any error is responses
export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught.data.message);
  return (
    <Document title={caught.statusText}>
      <main>
        <Error title={caught.statusText}>
          <p>
            {caught.data?.message || "Something went wrong. Please try again"}
          </p>
          <p>
            Back to <Link to="/">Home</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

// Handel the unhandled exceptions
export function ErrorBoundary({ error }) {
  return (
    <Document title="An Error Occurred">
      <main>
        <Error title="An Error Occurred">
          <p>{error.message || "Something went wrong. Please try again"}</p>
          <p>
            Back to <Link to="/">Home</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}
