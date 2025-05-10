import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export function Races() {
  const { category } = useParams();
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = () => {
      setLoading(true);
      setTimeout(() => {
        fetch("http://localhost:5000/races")
          .then((resp) => resp.json())
          .then((data) => {
            const filteredRaces = data
              .filter((race) => race.category === category && race.isActive)
              .sort((a, b) => new Date(a.date) - new Date(b.date));
            setRaces(filteredRaces);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, 2000); 
    };

    fetchRaces();
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen px-4 py-48 flex align-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Próximas Corridas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {races.map((race) => (
          <div key={race.id} className="w-full">
            <div className="bg-white shadow-md p-4 h-full flex flex-col">
              <div className="w-full mb-2">
                <img
                  src={race.image}
                  alt={race.name}
                  className="w-full h-60 transition-transform duration-500 ease-in-out transform mb-2"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{race.name}</h3>
              <p className="text-gray-600">{race.location}</p>
              <p className="text-gray-600">
                {new Date(race.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
