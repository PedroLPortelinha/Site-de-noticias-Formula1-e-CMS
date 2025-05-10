import React, { useState } from "react";
import { TextField, Button, Typography, Avatar, Box } from "@mui/material";
import logo from '/src/assets/logo.png';
import { Link } from "react-router-dom";


const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    description: "",
    photo: null,
    photoURL: logo
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const photoURL = URL.createObjectURL(file);
    setProfileData((prevData) => ({
      ...prevData,
      photo: file,
      photoURL
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("description", profileData.description);
      formData.append("photo", profileData.photo);

      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar perfil");
      }

      console.log("Perfil salvo com sucesso!");

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Box>
      {!isEditing ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt={profileData.name}
            src={profileData.photoURL || "logo.png"}
            sx={{ width: 170, height: 170, marginBottom: 2 }}
          />
          <Typography variant="h5">{profileData.name || "Fas1"}</Typography>
          <Typography variant="body1" align="center">
            {profileData.description || "Formula 1"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleEdit}
          >
            Editar Perfil
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Editar Perfil
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Nome"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Descrição"
            name="description"
            value={profileData.description}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: "10px" }}
          >
            Upload Foto
            <input
              type="file"
              hidden
              onChange={handlePhotoChange}
            />
          </Button>
          {profileData.photoURL && (
            <Box mt={2} display="flex" justifyContent="center">
              <Avatar
                alt="Foto do perfil"
                src={profileData.photoURL}
                sx={{ width: 150, height: 150 }}
              />
            </Box>
          )}
           <Link to="/">
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
              Salvar
            </Button>
          </Link>
        </form>
      )}
    </Box>
  );
};

export default Profile;
