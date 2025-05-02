/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const baseUrl = "http://localhost:1337";
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectValue, setSelectValue] = useState("");

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

  return (
    <main>
      <section className="projects">
        <h1>Mes projets</h1>
        <div className="filter">
          <select onChange={(e) => setSelectValue(e.target.value)}>
            <option value="0">Selectionner une technologie</option>
            {technologies.map((technology) => (
              <option key={technology.id} value={technology.id}>
                {technology.name}
              </option>
            ))}
          </select>
        </div>
        <div className="projectContainer">
          {projects.map((project) => (
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
          ))}
        </div>
      </section>
      <ContactForm />
    </main>
  );
}

export default App;
