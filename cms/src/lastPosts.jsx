import React from "react";
import EntityTable from "./components/lastTable";

const postFields = [
  { id: "title", label: "Título" },
  { id: "date", label: "Publicação", align: "right" },
];

export default function LastPosts() {
  return (
    <EntityTable
      entityType="posts"
      apiUrl="http://localhost:5000/posts"
      fields={postFields}
      title="Últimos Posts"
    />
  );
}
