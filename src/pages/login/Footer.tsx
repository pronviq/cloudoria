import { Link, useNavigate } from "react-router-dom";
import "./Footer.scss";
import CloudSvg from "../../images/CloudSvg";
import { startTransition } from "react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="loginpage_footer">
      <div className="loginpage_footer-info">
        <Link
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            startTransition(() => navigate("/"));
          }}
          style={{ marginTop: "2px" }}
          to={"/"}
        >
          <CloudSvg height="30px" />
        </Link>
        © 2024 Cloudoria, Inc.
      </div>
    </footer>
  );
};

export default Footer;
