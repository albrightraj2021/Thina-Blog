import React from 'react';
import { assets } from '../srcAssest';
import { footer_data } from '../srcAssest';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section with Logo and Description */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-6 md:mb-0 md:w-1/4">
            <img src={assets.logo_light} alt="Logo" className="h-8 mb-4" />
            <p className="text-gray-400 text-sm">
              Your trusted source for insightful articles and engaging content.
            </p>

          </div>

          {/* Quick Links Sections */}
          {footer_data.map((section, index) => (
            <div key={index} className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => {
                  const isExternal = link.url.startsWith('http');
                  return (
                    <li key={linkIndex}>
                      {isExternal ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition duration-200"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.url}
                          className="text-gray-400 hover:text-white transition duration-200"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>


        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Thina Blog . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;