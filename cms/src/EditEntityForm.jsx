import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './components/input';
import Select from './components/select';
import EditTiptap from './components/EditTiptap'; 
import CircularProgress from '@mui/material/CircularProgress';
import Logo from './assets/logo.png';

const postFields = [
  { id: "title", label: "Título", type: "text", required: true },
  { id: "content", label: "Conteúdo", type: "tiptap", required: true },
  { id: "resumo", label: "Resumo", type: "text", required: true },
  { id: "image", label: "Link da imagem", type: "text", required: true },
  { id: "category", label: "Categoria", type: "select", required: true }
];

const raceFields = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "location", label: "Localização", type: "text", required: true },
  { id: "date", label: "Data da Corridate", type: "text", required: true },
  { id: "category", label: "Categoria", type: "select", required: true },
  { id: "image", label: "Link da imagem", type: "text", required: true }
];

const apiEndpoints = {
  categories: 'http://localhost:5000/categories'
};

const entityFieldsMap = {
  posts: postFields,
  races: raceFields,
};

function updateEntity(entityType, entityId, entityData) {
  console.log('Updating entity:', entityType, entityId);
  fetch(`http://localhost:5000/${entityType}/${entityId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entityData),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(`${entityType.slice(0, -1)} atualizado com sucesso:`, data))
    .catch((err) => console.log(err));
}

export default function EditEntityForm() {
  const { entityType, id } = useParams();
  const fields = entityFieldsMap[entityType];
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(
    fields ? fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {}) : {}
  );
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      if (!entityType || !id || !fields) {
        console.error('Invalid entityType or id');
        return;
      }
  
      setLoading(true);
      fetch(`http://localhost:5000/${entityType}/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Post not found");
          }
          return response.json();
        })
        .then((data) => {
          if (!data.isActive) {
            throw new Error("Post is inactive");
          }
          setFormData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          setTimeout(fetchData, 3000);
        });
    };
  
    fetchData();
  }, [entityType, id, fields]);

  useEffect(() => {
    if (apiEndpoints && apiEndpoints.categories) {
      fetch(apiEndpoints.categories, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  }, []);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const entityData = { ...formData };
    if (!entityType || !id) {
      console.error('Cannot update entity: Invalid entityType or id');
      return;
    }
    updateEntity(entityType, id, entityData);
    navigate('/');
  };

  if (!fields) {
    return <div>Invalid entity type</div>;
  }

  if (loading) {
    return (
      <div className="flex align-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar {entityType}</h2>
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
            Editar
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