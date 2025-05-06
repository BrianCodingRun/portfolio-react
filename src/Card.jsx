import React from "react";

function Card({ project, baseUrl }) {
  /**
   * Composant affichant un projet sous forme de carte
   *
   * @component
   * @param {Object} project - Les données du projet à afficher
   * @param {number} project.id - L'identifiant du projet
   * @param {string} project.title - Le titre du projet
   * @param {string} project.description - La description du projet
   * @param {Array} props.project.technologies - Les technologies utilisées dans le projet
   * @returns {JSX.Element} Carte de projet
   */

  return (
    <div className="projectCard" key={project.id}>
      <img src={baseUrl + project.cover.url} alt="" />
      <ul>
        {project.technologies.map((tech) => (
          <li key={tech.id}>{tech.name}</li>
        ))}
      </ul>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}

export default Card;
