import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 items-center justify-center flex-col">
            <Outlet />
          </section>

          <img
            src="/public/assets/images/side-img.svg"
            alt="logo"
            className="h-screen w-1/2 object-cover hidden xl:block bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
