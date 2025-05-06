/* eslint-disable react-hooks/exhaustive-deps */

/**
 * Import des composants et des hooks
 */

import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";
import ContactForm from "./ContactForm";
import TechnologiesFilter from "./TechnologiesFilter";

function App() {
  /**
   * Initialisation des variables
   * @param {string} baseUrl: URL de l'API
   * @param {Array} projects: Tableau des projets
   * @param {Array} technologies: Tableau des technologies
   * @param {string} selectValue: Valeur de la technologie sélectionnée
   */
  const baseUrl = "http://localhost:1337";
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  /**
   * Fonction permettant de récupérer les projets et les technologies
   */
  const fetchProjects = async () => {
    try {
      const request = await fetch(
        baseUrl + "/api/projects?populate=cover&populate=technologies"
      );
      const response = await request.json();
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Fonction permettant de récupérer les technologies
   */
  const fetchTechnologies = async () => {
    try {
      const request = await fetch(baseUrl + "/api/technologies");
      const response = await request.json();
      setTechnologies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTechnologies();
  }, []);

  /**
   * Fonction permettant de filtrer les projets en fonction de la technologie sélectionnée
   */
  useEffect(() => {
    let data = [...projects];
    if (selectValue == "0") {
      setProjects(data);
    } else {
      data = data.filter((project) =>
        project.technologies.some((tech) => tech.id == selectValue)
      );
      setProjects(data);
    }
  }, [selectValue]);

  /**
   * @returns {JSX.Element} Composant principal de l'application
   */
  return (
    <main>
      <section className="projects">
        <h1>Mes projets</h1>
        <TechnologiesFilter
          technologies={technologies}
          setSelectValue={setSelectValue}
        />
        <div className="projectContainer">
          {projects.map((project) => (
            <Card key={project.id} project={project} baseUrl={baseUrl} />
          ))}
        </div>
      </section>
      <ContactForm />
    </main>
  );
}

export default App;
