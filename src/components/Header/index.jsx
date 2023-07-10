import logo from "../.././logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 px-5 py-2.5 h-20 bg-slate-200"
    >
      <div className="flex items-center">
        <img id="logo" src={logo} alt="logo" className="max-h-16" />
        <Link className="ml-3 uppercase" to="/">
          pdfsummary
        </Link>
      </div>

      <div className="flex">
        <Link> menu1 </Link>
        <Link> menu2 </Link>
        <Link> 지금 요약하기 </Link>
      </div>
    </div>
  );
};

export default Header;
