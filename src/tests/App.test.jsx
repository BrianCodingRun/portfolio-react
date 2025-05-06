import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "../Card";
import TechnologiesFilter from "../TechnologiesFilter";

const mockProjects = [
  {
    id: 4,
    title: "MovieStream",
    description:
      "Application de recherche de films réalisé avec React et l'API The Movie Database.",
    url: "https://moviestream.briancoupama.re/",
    technologies: [
      { id: 9, name: "wordpress" },
      { id: 11, name: "css" },
    ],
    cover: {
      id: 13,
      url: "https://picsum.photos/200/300",
    },
  },
  {
    id: 7,
    title: "Ghibli app",
    description:
      "Application de recherche de films réalisé avec React et l'API The Movie Database.",
    url: "https://moviestream.briancoupama.re/",
    technologies: [
      { id: 9, name: "php" },
      { id: 14, name: "html" },
    ],
    cover: {
      id: 13,
      url: "https://picsum.photos/200/300",
    },
  },
];

describe("Technologie filter", () => {
  it("affiche tous les projets au chargement", () => {
    render(
      <>
        {mockProjects.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </>
    );
    expect(screen.getByText("MovieStream")).toBeInTheDocument();
    expect(screen.getByText("Ghibli app")).toBeInTheDocument();
  });

  // Teste le filtrage par la catégorie "Web"
  it("filtre les projets par catégorie", () => {
    render(
      mockProjects.map((project) => (
        <TechnologiesFilter technologies={project.technologies} />
      ))
    );
    expect(screen.getByText("wordpress")).toBeInTheDocument();
    expect(screen.getByText("php")).toBeInTheDocument();
  });
});
