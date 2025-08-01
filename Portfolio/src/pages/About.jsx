import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );

      // Animate each paragraph
      gsap.fromTo(
        paragraphRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paragraphRefs.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    // Ensure trigger positions are recalculated after layout shift
    ScrollTrigger.refresh();

    return () => ctx.revert(); // clean up
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-gray-900 text-white py-10 px-6 md:px-20 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 mb-12"
        >
          About Me
        </h2>

        {/* Paragraphs */}
        {[
          <>
            Hi! I'm <span className="text-blue-400 font-semibold">RITIK PAL</span>, a passionate and creative{" "}
            <span className="text-red-400 font-semibold">Frontend / Full Stack / UI/UX</span> developer with a knack
            for turning ideas into beautiful and functional digital experiences. I love working with modern technologies
            to build responsive, accessible, and performance-driven web applications.
          </>,
          <>
            I specialize in technologies like{" "}
            <span className="text-blue-300">React</span>,{" "}
            <span className="text-purple-300">Tailwind CSS</span>, and{" "}
            <span className="text-yellow-300">JavaScript</span>, and I'm always eager to learn more and push my
            boundaries.
          </>,
          <>
            When I'm not coding, you'll find me exploring design trends, contributing to open-source projects, or
            sipping coffee while planning the next side project. Let's connect and build something amazing together!
          </>,
        ].map((content, index) => (
          <p
            key={index}
            ref={(el) => (paragraphRefs.current[index] = el)}
            className="text-lg leading-relaxed mb-6"
          >
            {content}
          </p>
        ))}
      </div>
    </section>
  );
};

export default About;
