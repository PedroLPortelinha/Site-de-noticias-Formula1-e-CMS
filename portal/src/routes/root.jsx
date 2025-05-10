import Logo from "../assets/logo.webp";
import { Link, Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ScrollCar from "../components/scrollcar";

export default function Root() {
  const location = useLocation();

  let backgroundColorClass = "";
  let trailColor = "";
  let category = "";

  switch (true) {
    case location.pathname.startsWith("/formula2"):
      backgroundColorClass = "bg-blue-600";
      trailColor = "#2563eb";
      category = "2";
      break;
    case location.pathname.startsWith("/formula3"):
      backgroundColorClass = "bg-green-600";
      trailColor = "#16a34a";
      category = "3";
      break;
    default:
      backgroundColorClass = "bg-red-600";
      trailColor = "#dc2626";
      category = "1";
  }

  const showPilotosF1Link = location.pathname.includes("/");
  const showRacesLink = ["/", "/formula2", "/formula3"].some(path => location.pathname.startsWith(path));

  return (
    <div>
      <ScrollCar trailColor={trailColor} />
      <div className=" flex flex-col items-stretch justify-start min-h-screen bg-gray-100">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto pt-4 flex items-center justify-between">
            <Link to="/">
              <div className="flex text-black">
                <img src={Logo} alt="Logo" className="h-6 mr-2" />
                <h1 className="text-xl font-bold">Fas1</h1>
              </div>
            </Link>
            <div className="flex gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-black text-xl rounded-t hover:bg-red-600 hover:text-white relative p-2 ${
                    isActive ? "text-white bg-red-600" : ""
                  }`
                }
              >
                Fórmula 1
              </NavLink>
              <NavLink
                to="/formula2"
                className={({ isActive }) =>
                  `text-black text-xl rounded-t hover:bg-blue-600 hover:text-white relative p-2 ${
                    isActive ? "text-white bg-blue-600" : ""
                  }`
                }
              >
                Fórmula 2
              </NavLink>
              <NavLink
                to="/formula3"
                className={({ isActive }) =>
                  `text-black text-xl rounded-t hover:bg-green-600 hover:text-white relative p-2 ${
                    isActive ? "text-white bg-green-600" : ""
                  }`
                }
              >
                Fórmula 3
              </NavLink>
            </div>
          </nav>
        </header>
        <div
          className={`w-full ${backgroundColorClass} p-6 justify-center flex`}
        >
          <ul className="flex gap-10">
            {showPilotosF1Link && (
              <li>
                <Link
                  to="/formula1/pilotos"
                  className="text-white hover:text-gray-800"
                >
                  Pilotos F1
                </Link>
              </li>
            )}
            {showRacesLink && (
              <li>
                <Link
                  to={`/formula${category}/races/${category}`}
                  className="text-white hover:text-gray-800"
                >
                  Corridas
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Outlet />
        <footer className="bg-gray-200 py-4">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600">
              © 2024 Fas1 Portal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
