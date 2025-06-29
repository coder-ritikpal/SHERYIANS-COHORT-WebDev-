import React, { useRef } from "react";


const About = () => {

  return (
    <section
      id="about"
      className="bg-gray-900 text-white py-10 my-5 px-6 md:px-20 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="about-heading text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 mb-12">
          About Me
        </h2>

        <p className="about-paragraph text-lg leading-relaxed mb-6">
          Hi! I'm <span className="text-blue-400 font-semibold">RITIK PAL</span>, a
          passionate and creative{" "}
          <span className="text-red-400 font-semibold">Frontend / Full Stack / UI/UX</span>{" "}
          developer with a knack for turning ideas into beautiful and functional digital
          experiences. I love working with modern technologies to build responsive,
          accessible, and performance-driven web applications.
        </p>

        <p className="about-paragraph text-lg leading-relaxed mb-6">
          I specialize in technologies like{" "}
          <span className="text-blue-300">React</span>,{" "}
          <span className="text-purple-300">Tailwind CSS</span>, and{" "}
          <span className="text-yellow-300">JavaScript</span>, and I'm always eager to
          learn more and push my boundaries.
        </p>

        <p className="about-paragraph text-lg leading-relaxed">
          When I'm not coding, you'll find me exploring design trends, contributing to
          open-source projects, or sipping coffee while planning the next side project.
          Let's connect and build something amazing together!
        </p>
      </div>
    </section>
  );
};

export default About;
