import React from 'react';

import Navbar from './Navbar';
import Home from '../pages/Home';
import About from '../pages/About';
import Skills from '../pages/Skills';
import Project from '../pages/Project';
import Contact from '../pages/Contact';
import Footer from './Footer';

const sectionsData = [
  { id: 'home', component: <Home /> },
  { id: 'about', component: <About /> },
  { id: 'skills', component: <Skills /> },
  { id: 'project', component: <Project /> },
  { id: 'contact', component: <Contact /> },
];

const sectionClass =
  'pt-[40px] sm:pt-[30px] md:pt-[50px] min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-80px)] flex items-center justify-center';

const MainContent = () => {
  return (
    <div className="bg-gray-950 w-screen max-w-full overflow-x-hidden text-white">
      <Navbar />
      {sectionsData.map(({ id, component }) => (
        <div key={id} id={id} >
          {component}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default MainContent;
