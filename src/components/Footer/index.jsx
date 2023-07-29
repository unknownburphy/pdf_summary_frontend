import Minho from "../../assets/images/minho.png";
import Ran from "../../assets/images/ran.png";
import Hyun from "../../assets/images/donghyun.png";
import Min from "../../assets/images/dongmin.png";

const Footer = () => {
  return (
    <div id="footer-wrapper" className="w-full">
      <div className="bg-key w-full h-full">
        <div className="mb-32">
          <div className="pt-24 mb-20 font-black text-5xl text-white font-pre">
            MAKER 🧑‍💻
          </div>
          <div className="flex flex-row justify-center items-center gap-12">
            <div className="flex flex-col justify-center items-center">
              <img
                id="Minho"
                src={Minho}
                alt="Minho"
                className="max-h-60 mb-1 rounded-md border-[1px] border-gray-300"
              />
              <div className="font-pre font-bold text-m text-white ">
                minhouu
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img
                id="Min"
                src={Min}
                alt="Min"
                className="max-h-60 mb-1 rounded-md border-[1px] border-gray-300"
              />
              <div className="font-pre font-bold text-m text-white ">
                unknownburphy
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img
                id="Hyun"
                src={Hyun}
                alt="Hyun"
                className="max-h-60 mb-1 rounded-md border-[1px] border-gray-300"
              />
              <div className="font-pre font-bold text-m text-white ">
                daeguhighman
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img
                id="Ran"
                src={Ran}
                alt="Ran"
                className="max-h-60 mb-1 rounded-md border-[1px] border-gray-300"
              />
              <div className="font-pre font-bold text-m text-white">
                rannie-kim
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 pb-24">
          <div className="pt-24 mb-10 font-black text-5xl text-gray-800 font-pre">
            ADVISER 🧑‍🏫
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="flex flex-row gap-12 justify-center items-center">
              <div className="font-pre font-bold text-2xl text-gray-700">
                styu12
              </div>
              <div className="font-pre font-bold text-2xl text-gray-700">
                BDlhj
              </div>
              <div className="font-pre font-bold text-2xl text-gray-700">
                hunkim98
              </div>
              <div className="font-pre font-bold text-2xl text-gray-700">
                & SNU LIKELION🦁
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <footer class="bg-white w-full shadow dark:bg-gray-800">
          <div class="w-full mx-auto justify-center max-w-screen-xl p-4 flex items-center">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 <a class="hover:underline">TEAM CPTN™</a>. All Rights
              Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
