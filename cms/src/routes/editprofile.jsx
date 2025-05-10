import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    description: "",
    photo: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfileData((prevData) => ({
      ...prevData,
      photo: file
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados do perfil:", profileData);
    // Lembre-se de implementar a lógica para enviar os dados do perfil para o servidor
    // incluindo o envio da foto
  };

  return (
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
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
        Salvar
      </Button>
    </form>
  );
};

export default EditProfile;
