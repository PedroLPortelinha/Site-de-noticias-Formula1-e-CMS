import React from "react";
import EntityForm from "../components/postForm";

const newsFields = [
  { id: "title", label: "Título", type: "text", required: true },
  { id: "resumo", label: "Resumo", type: "text", required: true },
  { id: "image", label: "Link da imagem", type: "text", required: true },
  { id: "date", label: "Data de Publicação", type: "date", required: true },
  { id: "category", label: "Categoria", type: "select", required: true },
  { id: "content", label: "Conteúdo", type: "tiptap", required: true },
];

const apiEndpoints = {
  categories: "http://localhost:5000/categories",
};

export default function AddNews() {
  return <EntityForm entityType="posts" fields={newsFields} apiEndpoints={apiEndpoints} />;
}
