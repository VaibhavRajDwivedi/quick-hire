import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap justify-between gap-y-10">
        <div className="flex-1 min-w-[300px] pr-4">
          <p className="text-base leading-relaxed">
            "Elevate your brand with our creative professionals dedicated to bringing your vision to life."
            <br />
            "Empowering Freelancers, Elevating Projects."
          </p>
          <img
            src={logo || "/placeholder.svg"}
            alt="QuickHire Logo"
            className="h-24 mt-6"
          />
        </div>

        <div className="flex flex-wrap gap-8 flex-grow justify-between">
          <div className="min-w-[200px]">
            <h3 className="text-lg font-semibold mb-5 border-b-2 border-lime-500 inline-block pb-2">
              For Client
            </h3>
            <ul className="space-y-3">
              {[
                "How to hire",
                "Talent Marketplace",
                "Project Catalog",
                "Hire an agency",
                "Enterprise",
                "Any hire",
                "Contract-to-hire",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="hover:text-lime-400 hover:underline transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[200px]">
            <h3 className="text-lg font-semibold mb-5 border-b-2 border-lime-500 inline-block pb-2">
              For Talent
            </h3>
            <ul className="space-y-3">
              {[
                "How to find work",
                "Direct Contracts",
                "Find freelance jobs",
                "Win work with ads",
                "Exclusive resources",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="hover:text-lime-400 hover:underline transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[200px]">
            <h3 className="text-lg font-semibold mb-5 border-b-2 border-lime-500 inline-block pb-2">
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                "Help & support",
                "Reviews",
                "Blog",
                "Community",
                "Affiliate programme",
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="hover:text-lime-400 hover:underline transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[200px]">
            <h3 className="text-lg font-semibold mb-5 border-b-2 border-lime-500 inline-block pb-2">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about-us" className="hover:text-lime-400 hover:underline transition">
                  About us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-lime-400 hover:underline transition">
                  Investor relations
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-lime-400 hover:underline transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-lime-400 hover:underline transition">
                  Our impact
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-lime-400 hover:underline transition">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-lime-400 hover:underline transition">
                  Trust, safety & security
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-[200px]">
            <h3 className="text-lg font-semibold mb-5 border-b-2 border-lime-500 inline-block pb-2">
              Follow us
            </h3>
            <div className="flex gap-4 text-2xl">
              <Link to="https://www.facebook.com" className="hover:text-lime-400 transition">
                <i className="bx bxl-facebook"></i>
              </Link>
              <Link to="https://www.linkedin.com" className="hover:text-lime-400 transition">
                <i className="bx bxl-linkedin"></i>
              </Link>
              <Link to="https://discord.com" className="hover:text-lime-400 transition">
                <i className="bx bxl-discord-alt"></i>
              </Link>
              <Link to="https://www.youtube.com" className="hover:text-lime-400 transition">
                <i className="bx bxl-youtube"></i>
              </Link>
              <Link to="https://www.instagram.com" className="hover:text-lime-400 transition">
                <i className="bx bxl-instagram"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <hr className="border-gray-700" />
          <p className="text-center text-sm pt-6">
            <u>CodeCollab</u> &copy; <u>2024</u>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
