import React from 'react';
import { GrShare } from "react-icons/gr";
import { IoLogoGithub } from "react-icons/io";


const ProjectCard = ({ title, description, videoSrc, tryLink, githubLink }) => (
  <div className="project-card">
    <div className="project-info">
      <div className="project-title">{title}</div>
      <div className="project-description">{description}</div>

      {/* Project Video */}
        <video className="project-video" controls autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
       
      </video>

      
      <div className="project-links">
        <a className="project-link" href={tryLink} target="_blank" rel="noopener noreferrer">
          <GrShare />
        </a>
        <a className="project-link" href={githubLink} target="_blank" rel="noopener noreferrer">
          <IoLogoGithub />
        </a>
      </div>
    </div>
  </div>
);

const ProjectSection = () => {
  const projects = [
    {
      title: 'Github UserFinder',
      description: 'A cool project to find github user details.',
      videoSrc: 'video/githubUserFinder.mp4',
      tryLink: 'https://coderritikpal-github-userfinder.netlify.app/',
      githubLink: 'https://github.com/coder-ritikpal/SHERYIANS-COHORT-WebDev-/tree/main/PROJECT%20ASYNC/Github%20user%20finder'
    },
    {
      title: 'Todo Project',
      description: 'A todo app for your daily task built with react.',
      videoSrc: 'video/todo.mp4',
      tryLink: 'https://coderritikpal-react-todo-app.netlify.app/',
      githubLink: 'https://github.com/coder-ritikpal/SHERYIANS-COHORT-WebDev-/tree/main/REACT/React-Todo'
    },
     {
      title: 'Todo Project',
      description: 'A todo app for your daily task built with react.',
      videoSrc: 'video/todo.mp4',
      tryLink: 'https://coderritikpal-react-todo-app.netlify.app/',
      githubLink: 'https://github.com/coder-ritikpal/SHERYIANS-COHORT-WebDev-/tree/main/REACT/React-Todo'
    }
  ];

  return (
    <section  className=' w-full  '>
    <h2 className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 mb-12 animate-heading">
          Projects
        </h2>
    <div className="projects-container">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          videoSrc={project.videoSrc}
          tryLink={project.tryLink}
          githubLink={project.githubLink}
        />
      ))}
    </div>
    </section>
  );
};

export default ProjectSection;
