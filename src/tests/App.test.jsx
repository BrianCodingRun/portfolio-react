import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "../Card";

const mockProjects = [
  {
    id: 4,
    title: "MovieStream",
    description:
      "Application de recherche de films réalisé avec React et l'API The Movie Database.",
    url: "https://moviestream.briancoupama.re/",
    technologies: [
      {
        id: 9,
        name: "wordpress",
      },
      {
        id: 11,
        name: "css",
      },
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
      {
        id: 9,
        name: "php",
      },
      {
        id: 14,
        name: "html",
      },
    ],
    cover: {
      id: 13,
      url: "https://picsum.photos/200/300",
    },
  },
];

const baseUrl = "http://localhost:1337";

describe("Technologie filter", () => {
  it("affiche tous les projets au chargement", () => {
    render(<Card project={mockProjects} baseUrl={baseUrl} />);
    expect(screen.getByText("MovieStream")).toBeInTheDocument();
    expect(screen.getByText("Ghibli app")).toBeInTheDocument();
  });
});
