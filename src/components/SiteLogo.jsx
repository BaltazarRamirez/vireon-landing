import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/vireon-logo.svg";
import { goToHome } from "../lib/goHome";

function SiteLogo({ className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Vireon · Inicio"
      onClick={(event) => goToHome(event, navigate, location)}
    >
      <img src={logo} alt="Vireon" className="h-9 w-auto sm:h-11 lg:h-12" />
    </Link>
  );
}

export default SiteLogo;
