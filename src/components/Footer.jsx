import React from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-[#f5fdfd] dark:bg-[#0d1515] text-gray-800 dark:text-gray-100 px-14 py-10 shadow-inner">
        <aside>
          <img
            src="https://i.ibb.co.com/MyHfjgLn/novous-logo-design.png"
            alt="Booking"
            className="w-24 h-24"
          />
          <p>
            <strong> NOVUS</strong> Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="">
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Link>
              <FaFacebook size={32} />
            </Link>
            <Link>
              <FaYoutube size={32} />
            </Link>
            <Link>
              <FaWhatsapp size={32} />
            </Link>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
