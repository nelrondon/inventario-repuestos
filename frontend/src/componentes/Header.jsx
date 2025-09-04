import "./Header.css";

import { useAuth } from "../context/AuthContext";
import { LogoutIcon, MenuIcon, PlusIcon, HomeIcon, SquaresIcon } from "./Icons";
import { NavLink } from "react-router-dom";

import { useState } from "react";

const Link = ({ to, children, icon, ...props }) => {
  return (
    <li>
      <NavLink to={to} {...props}>
        {icon}
        <span className="label">{children}</span>
      </NavLink>
    </li>
  );
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    console.log("Logout");
  };

  return (
    <>
      <header className={`app-header ${isMenuOpen ? "" : "close"}`}>
        <div className="logo">
          <h2>
            <button onClick={handleMenu}>
              <MenuIcon />
            </button>
            <span className="label">Gestión de Repuestos</span>
          </h2>
        </div>
        <nav className="nav-menu">
          <ul className="menu">
            <Link to="/" icon={<HomeIcon />}>
              Dashboard
            </Link>
            <Link to="/añadir-repuesto" icon={<PlusIcon />}>
              Añadir Repuestos
            </Link>

            <Link to="/info/model/" icon={<SquaresIcon />}>
              Repuestos por Modelo
            </Link>

            <Link to="/info/fab/" icon={<SquaresIcon />}>
              Repuestos por Fabricante
            </Link>

            <Link to="/stock/" icon={<SquaresIcon />}>
              Registro completo de Repuestos
            </Link>
          </ul>
        </nav>
        <div className="user-actions">
          <button>
            <h2 className="user-name" onClick={handleLogout}>
              <LogoutIcon />
              <span className="label">{user.username}</span>
            </h2>
          </button>
        </div>
      </header>
    </>
  );
}
