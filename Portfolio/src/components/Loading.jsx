import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Loading = ({ fadeOut }) => {
  const container = useRef();
  const portfolioRef = useRef();
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [visible, setVisible] = useState(true); // control rendering

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => setShowPortfolio(true),
    });

    tl.from(container.current.querySelectorAll("span"), {
      y: 500,
      x: 50,
      opacity: 0,
      scale: 0.8,
      rotation: 10,
      duration: 1.5,
      ease: "back.out(1.7)",
      stagger: 0.15,
    });
  }, []);

  useEffect(() => {
    if (showPortfolio && portfolioRef.current) {
      gsap.fromTo(
        portfolioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [showPortfolio]);

  useEffect(() => {
    if (fadeOut && container.current) {
      gsap.to(container.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });
      if (portfolioRef.current) {
        gsap.to(portfolioRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }

      // Remove from DOM after fade-out (matches duration above)
      const timeout = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [fadeOut]);

  if (!visible) return null;

  return (
    <div
      className="overflow-y-hidden relative w-full min-h-screen flex flex-col items-center justify-center
        bg-[url(https://images.unsplash.com/photo-1621302698884-a02929870bf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGRhcmslMjBzdGFycyUyMGFuZCUyMG5pZ2h0fGVufDB8fDB8fHww)]
        bg-no-repeat bg-cover bg-center"
      style={{ overflowX: "hidden" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      <div
        ref={container}
        className="relative z-10 flex flex-wrap justify-center gap-1 md:gap-2 whitespace-normal md:whitespace-nowrap items-center overflow-visible text-center max-w-full px-2"
        style={{ lineHeight: 1, overflow: "visible" }}
      >
        {"WELCOME".split("").map((letter, index) => (
          <span
            key={index}
            className="font-bold bg-gradient-to-r from-red-600 via-green-400 to-blue-700 bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(2rem, 8vw, 4rem)",
              lineHeight: 1,
              minWidth: 0,
            }}
          >
            {letter}
          </span>
        ))}
        <span
          className="font-bold text-white"
          style={{
            fontSize: "clamp(2rem, 10vw, 4rem)",
            lineHeight: 1,
            minWidth: 0,
          }}
        >
          💝
        </span>
      </div>

      {showPortfolio && (
        <h2
          ref={portfolioRef}
          className="relative z-10 mt-6 text-center max-w-full px-2 
          text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500
          text-2xl sm:text-3xl md:text-5xl lg:text-6xl drop-shadow-lg select-none"
          style={{ lineHeight: 1.1 }}
        >
          To My Portfolio
        </h2>
      )}
    </div>
  );
};

export default Loading;
