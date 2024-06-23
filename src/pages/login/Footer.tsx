import { Link } from "react-router-dom";
import CloudSvg from "../../images/CloudSvg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="loginpage_footer">
      <div className="loginpage_footer-info">
        <Link style={{ marginTop: "2px" }} to={"/"}>
          <CloudSvg height="30px" />
        </Link>
        © 2024 Cloudoria, Inc.
      </div>
    </footer>
  );
};

export default Footer;
