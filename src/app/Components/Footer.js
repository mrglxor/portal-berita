import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bottom-0 w-full lg:w-1/2 px-3 py-3 border border-hint rounded-tr-xl rounded-tl-xl mx-auto">
      <div className="flex items-center justify-between px-4">
        <p className="text-hint text-sm">
          Copyright @ 2024 All Rights Reserved
        </p>
        <div className="flex space-x-2">
          <a
            href="https://instagram.com/hansworry"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </a>
          <a
            href="https://wa.me/6283804506486"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </a>
          <a
            href="https://linkedin.com/in/muhamadfarhaninc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
