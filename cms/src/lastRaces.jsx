import React from "react";
import EntityTable from "./components/lastTable";

const raceFields = [
  { id: "name", label: "Nome" },
  { id: "location", label: "Localização", align: "right" },
  { id: "date", label: "Data da Corrida", align: "right" },
];

export default function LastRaces() {
  return (
    <EntityTable
      entityType="races"
      apiUrl="http://localhost:5000/races"
      fields={raceFields}
      title="Últimas Corridas"
    />
  );
}
