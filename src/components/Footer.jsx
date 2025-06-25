import React from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-teal-100 text-black py-5 px-10">
        <aside>
          <img
            src="https://i.ibb.co/8LdhJmBm/icons8-booking-48.png"
            alt="Booking"
          />
          <p>
            BOOKING. Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
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