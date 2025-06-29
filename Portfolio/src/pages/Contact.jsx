import React from 'react';
import {
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialGithub,
  SlSocialFacebook
} from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io5";

const Contact = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 bg-gray-900 min-h-screen">
      <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 mb-10 text-center animate-heading">
        Connect With Me
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {[
          {
            name: "Facebook",
            href: "https://m.facebook.com/profile.php?id=61554494747109",
            Icon: SlSocialFacebook
          },
          {
            name: "Instagram",
            href: "https://instagram.com/palritik156",
            Icon: SlSocialInstagram
          },
          {
            name: "Twitter",
            href: "https://twitter.com/palritik156",
            Icon: BsTwitterX
          },
          {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/ritik-pal-56381b215/",
            Icon: SlSocialLinkedin
          },
           {
            name: "WhatsApp",
            href: "https://wa.me/+919930973918",
            Icon: IoLogoWhatsapp
          },
          {
            name: "GitHub",
            href: "https://github.com/coder-ritikpal",
            Icon: SlSocialGithub
          }
        ].map(({ name, href, Icon }, index) => (
          <section
            key={index}
            className="w-full sm:w-64 p-6 bg-gray-800 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#adff2f] flex flex-col items-center text-center"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-container mb-4"
            >
              <Icon className="icon text-5xl text-white hover:text-[#adff2f] transition-colors duration-300" />
            </a>
            <p className="text-orange-300 text-xl sm:text-2xl font-medium">{name}</p>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Contact;
