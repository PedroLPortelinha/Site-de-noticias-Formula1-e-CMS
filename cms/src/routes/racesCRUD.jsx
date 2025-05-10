import React from "react";
import EntityForm from "../components/postForm";

const raceFields = [
  { id: "name", label: "Nome", type: "text", required: true },
  { id: "location", label: "Localização", type: "text", required: true },
  { id: "date", label: "Data da Corrida", type: "date", required: true },
  { id: "category", label: "Categoria", type: "select", required: true },
  { id: "image", label: "Link da imagem", type: "text", required: true },
];

const apiEndpoints = {
  categories: "http://localhost:5000/categories",
};

export default function AddRace() {
  return (
    <EntityForm entityType="races" fields={raceFields} apiEndpoints={apiEndpoints}
    />
  );
}
