import React from 'react';

const Skills = () => {
  return (
    <section className="flex flex-col items-center py-10 bg-gray-900 min-h-screen">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 mb-12 animate-heading">
        Skills
      </h1>
      <div className="skills-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Languages Section */}
        <section className="skills-card bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">💻Languages</h2>
          <ul className="text-red-300">
            <li>💻 JavaScript</li>
            <li>☕ Java</li>
            <li>🔧 C++</li>
            <li>🖥️ C</li>
            <li>🌐 HTML</li>
            <li>🎨 CSS</li>
            <li>📦 JSON</li>
          </ul>
        </section>

        {/* Frameworks Section */}
        <section className="skills-card bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">🌍Frameworks</h2>
          <ul className="text-gray-300">
            <li>⚛️ React</li>
            <li>🌳 Node.js</li>

            <li>💅 Tailwind</li>
            <li>✨ GSAP</li>


          </ul>
        </section>

        {/* Other Skills Section */}
        <section className="skills-card bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">📒Others</h2>
          <ul className="text-gray-300">
            <li>🔄 Version Control (Git, GitHub)</li>
            <li>📱 Responsive Design</li>
            <li>🎨 UI/UX Design</li>
            <li>📡 Networking</li>
          </ul>
        </section>

        {/* Soft Skills Section */}
        <section className="skills-card bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">🧠Soft Skills</h2>
          <ul className="text-gray-300">
            <li>🔄 Agile Methodologies</li>
            <li>👥 Team Management</li>
            <li>🗣️ Communication</li>
            <li>🧠 Creative Thinking</li>
            <li>🤔 Problem Solving</li>
            <li>🤝 Collaboration</li>
            <li>📅 Time Management</li>
            <li>🔍 Critical Thinking</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Skills;
