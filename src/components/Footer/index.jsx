import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/summary') return null;
  return (
    <div id="footer-wrapper" className="w-full">
      <div className="bg-gray-50 w-full h-80">
        <div>hi</div>
        <span></span>
      </div>
    </div>
  );
};

export default Footer;
