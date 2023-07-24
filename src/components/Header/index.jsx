import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 px-20 py-2.5 h-20 border-b-2 border-zinc-100"
    >
      <div className="flex items-center">
        <img id="logo" src={logo} alt="logo" className="max-h-16" />
        <Link className="ml-3 font-black text-xl text-key" to="/">
          PDFSUMMARY
        </Link>
      </div>

      <div className="flex">
        <Link className="bg-key px-5 py-3 rounded-md font-bold text-white">
          {" "}
          지금 요약하기{" "}
        </Link>
      </div>
    </div>
  );
};

export default Header;
