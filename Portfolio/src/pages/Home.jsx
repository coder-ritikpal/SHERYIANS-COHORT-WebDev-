import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { SlSocialLinkedin } from "react-icons/sl";
import { FiGithub, FiMail } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5";

const words = ['Developer', 'Programmer', 'Designer', 'Coder'];

const Home = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textRef = useRef(null);
  const imageRef = useRef(null);
  const socialRef = useRef([]);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      setText(prev =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }

      setTypingSpeed(isDeleting ? 120 : 250);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(textRef.current, {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out'
    })
      .from(imageRef.current, {
        opacity: 0,
        x: 200,
        duration: 1,
        ease: 'power3.out',
        rotate: 180
      }, "-=0.5")
      .from(socialRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, "-=0.3");
  }, []);

  return (
    <section
      id="home"
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-20 sm:pt-10 pt-0 bg-gray-950"
      style={{ gap: '1rem' }}
    >
      {/* Text Content */}
      <div
        ref={textRef}
        className="w-full md:w-1/1.5 text-center md:text-left flex flex-col justify-center space-y-4 sm:space-y-5"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-snug">
          Hi, I'm <span className="text-green-400 font-[Algerian]">RITIK PAL</span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          I'm <span className="text-red-500">{text}</span>
          <span className="animate-pulse text-white">|</span>
        </h2>
        <p className="text-white text-sm text-center sm:text-base md:text-md leading-relaxed mx-auto md:mx-0 max-w-md">
          I’m passionate about crafting creative digital experiences. From front-end development to UI/UX design — I love bringing ideas to life through code and design thinking.
        </p>

        {/* Social Icons */}
        <div
          className="flex justify-center md:justify-start space-x-5 mt-4 text-white text-2xl"
          ref={(el) => (socialRef.current = el?.children)}
        >
          <a href="https://github.com/coder-ritikpal" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub className="transition duration-300 hover:text-gray-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
          </a>
          <a href="https://wa.me/+919930973918" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <IoLogoWhatsapp className="transition duration-300 hover:text-green-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]" />
          </a>
          <a href="https://www.linkedin.com/in/ritik-pal-56381b215/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <SlSocialLinkedin className="transition duration-300 hover:text-blue-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,119,255,0.6)]" />
          </a>
          <a href="mailto:palritik156@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="GMail">
            <FiMail className="transition duration-300 hover:text-red-500 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]" />
          </a>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:justify-start gap-4">
          <a
            href="/ritik-pal-resume.pdf"
            download
            className="border border-green-400 text-green-400 px-5 py-2 rounded-full shadow hover:bg-green-400 hover:text-black transition duration-300 text-sm sm:text-base"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="bg-gradient-to-r from-blue-500 to-red-500 border border-white text-white px-5 py-2 rounded-full hover:from-green-400 hover:to-green-300 hover:text-black transition duration-300 text-sm sm:text-base"
          >
            Connect With Me
          </a>
        </div>
      </div>

      {/* Profile Image */}
      <div
        ref={imageRef}
        className="w-full flex justify-center md:justify-end items-center mt-10 md:mt-0"
      >
        <div className="relative">
          <div className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-green-400 blur-2xl opacity-70 animate-pulse z-0" />
          <img
            src="img/profile-img.jpg"
            alt="Ritik Pal Profile"
            className="relative z-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-green-400 shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
