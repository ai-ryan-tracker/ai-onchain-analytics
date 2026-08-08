import "./Footer.css";
import { Link, NavLink } from "react-router-dom";
import { FaGithubAlt } from "react-icons/fa";
import { RiBehanceFill } from "react-icons/ri";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="pb-3 pb-lg-0">
      <div className="container py-5">
        <div className="row d-flex justify-content-center justify-content-lg-between align-items-center">
          <div className="col-10 col-lg-3 logoIco">
            <Link
              className="nav-prand d-flex justify-content-center align-items-center gap-2 text-decoration-none"
              to="/home"
            >
              <img src="/images/softgalaxy.svg" alt="SoftGalaxy icon" width="25px" />
              <span className="F1">
                <span className="lemon">SOFT</span>GALAXY
              </span>
            </Link>
          </div>
          <div className="col-10 col-lg-3 d-flex justify-content-center mb-2 mt-2 mb-lg-0 mt-lg-0 linklist">
            <ul className="list-unstyled m-0 d-block d-lg-flex text-center gap-lg-5">
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/nfts">
                  Marketplace
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/rankings">
                  Rankings
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/trading">
                  Trading
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/transactions">
                  Transactions
                </NavLink>
              </li>
              <li className="my-2 my-lg-0">
                <NavLink className="F5" to="/support">
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block">
        <hr />
        <div className="d-flex justify-content-center copyriter py-4">
          <p className="F3">
            Â© 2024 SoftGalaxy. All Right Reserved by
            <a href="https://ahmedabdalalim.pages.dev/" target="_blank">
              <img
                src="https://raw.githubusercontent.com/ahmed-abd-alalim/ahmed-abd-alalim/main/assets/3A.png"
                alt="3A"
                width="18px"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
