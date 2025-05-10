import React, { useEffect, useState } from "react";
import Input from "../components/input";
import Select from "../components/select";
import EditTiptap from "./EditTiptap"; // Updated import
import Logo from "../assets/logo.png";

function createEntity(entityType, entityData) {
  fetch(`http://localhost:5000/${entityType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entityData),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(`${entityType.slice(0, -1)} criado com sucesso:`, data))
    .catch((err) => console.log(err));
}

export default function EntityForm({ entityType, fields, apiEndpoints }) {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.initialValue || "" }), {})
  );
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const entityData = { ...formData, isActive: true };
    createEntity(entityType, entityData);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.id]: field.initialValue || "" }), {}));
    window.location.reload(); // Reload the page
  };

  useEffect(() => {
    if (apiEndpoints && apiEndpoints.categories) {
      fetch(apiEndpoints.categories, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCategoryOptions(
            data.map((category) => ({ value: category.id, label: category.name }))
          );
        })
        .catch((err) => console.log(err));
    }
  }, [apiEndpoints]);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTiptapChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Criar {entityType}</h2>
      <form onSubmit={handleSubmit} className="flex">
        <div className="w-2/5 pr-4">
          {fields.map((field) => {
            if (field.type === "select") {
              return (
                <Select
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  options={[{ value: "", label: "Escolha uma categoria" }, ...categoryOptions]}
                  required={field.required}
                />
              );
            }
            if (field.type !== "tiptap") {
              return (
                <Input
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  value={formData[field.id]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                />
              );
            }
            return null;
          })}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Criar
          </button>
        </div>
        <div className="border-r border-gray-300 mx-4"></div> {/* Divider */}
        <div className="w-3/5 pl-4 flex justify-center items-center"> {/* Center the content */}
          {fields.some((field) => field.type === "tiptap") ? (
            fields.map((field) => {
              if (field.type === "tiptap") {
                return (
                  <EditTiptap
                    key={field.id}
                    content={formData[field.id]}
                    onChange={(content) => handleChange(field.id, content)}
                  />
                );
              }
              return null;
            })
          ) : (
            <img src={Logo} alt="Logo" />
          )}
        </div>
      </form>
    </div>
  );
}
