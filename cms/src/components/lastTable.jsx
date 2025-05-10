import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { Alert, Typography } from "@mui/material";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

function createData(data, fields) {
  return fields.reduce((acc, field) => {
    if (field.id === "date") {
      const formattedDate = dayjs(data[field.id]);
      acc[field.id] = `${formattedDate.format("ll")} (${dayjs(data[field.id]).fromNow()})`;
    } else {
      acc[field.id] = data[field.id];
    }
    return acc;
  }, { ...data });
}

async function handleExclude(row, setRows, entityType) {
  try {
    const confirmar = window.confirm("Tem certeza que deseja deletar a postagem?");

    if (!confirmar) return; 

    const response = await fetch(`http://localhost:5000/${entityType}/${row.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setRows((prevRows) => prevRows.filter((item) => item.id !== row.id));
      console.log(`${entityType} excluded successfully:`, row);
    } else {
      console.error(`Failed to exclude ${entityType}:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error excluding ${entityType}:`, error);
  }
}

async function handleToggleActive(row, setRows, entityType) {
  const updatedRow = { ...row, isActive: !row.isActive };

  try {
    const response = await fetch(`http://localhost:5000/${entityType}/${row.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isActive: !row.isActive}),
    });

    if (response.ok) {
      setRows((prevRows) =>
        prevRows.map((item) => (item.id === row.id ? updatedRow : item))
      );
      console.log(`${entityType} updated successfully:`, updatedRow);
    } else {
      console.error(`Failed to update ${entityType}:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error updating ${entityType}:`, error);
  }
}

export default function EntityTable({ entityType, apiUrl, fields, title }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const formattedData = data.map((item) => createData(item, fields));
      setRows(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${entityType}:`, error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, fields, entityType]);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" padding={2} component="div">
        {title}
      </Typography>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label={`tabela com os ${entityType} mais recentes`}
      >
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={field.id} align={field.align || "left"}>
                {field.label}
              </TableCell>
            ))}
            <TableCell align="center">Ativar</TableCell>
            <TableCell align="center">Excluir</TableCell>
            <TableCell align="center">Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={fields.length + 3} align="center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {fields.map((field) => (
                  <TableCell key={field.id} align={field.align || "left"}>
                    {row[field.id]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Switch
                    checked={row.isActive}
                    onChange={() => handleToggleActive(row, setRows, entityType)}
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                    onClick={() => handleExclude(row, setRows, entityType)}
                  >
                    Excluir
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                    onClick={() => navigate(`/edit/${entityType}/${row.id}`)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
