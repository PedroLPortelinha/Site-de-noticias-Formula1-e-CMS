import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Pilotos() {
  const DriversList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchDrivers = async () => {
        setLoading(true);
        setTimeout(async () => {  
          try {
            const response = await fetch("https://api.openf1.org/v1/drivers?session_key=latest");
            const data = await response.json();
            const uniqueDrivers = removeDuplicates(data, "driver_number");
            setDrivers(uniqueDrivers);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching drivers data:", error);
            setLoading(false);
          }
        }, 2000);  
      };

      fetchDrivers();
    }, []);

    const removeDuplicates = (data, key) => {
      return [...new Map(data.map((item) => [item[key], item])).values()];
    };

    const groupByTeam = (drivers) => {
      return drivers.reduce((groups, driver) => {
        const team = driver.team_name;
        if (!groups[team]) {
          groups[team] = [];
        }
        groups[team].push(driver);
        return groups;
      }, {});
    };

    const getTeamColorClass = (teamColour) => {
      const colorMap = {
        "3671C6": "bg-blue-600",
        "64C4FF": "bg-blue-300",
        "6692FF": "bg-blue-400",
        FF8000: "bg-orange-500",
        "0093CC": "bg-blue-500",
        229971: "bg-teal-500",
        E80020: "bg-red-600",
        "27F4D2": "bg-cyan-400",
        "52E252": "bg-green-400",
        B6BABD: "bg-gray-400",
      };

      return colorMap[teamColour] || "bg-gray-600";
    };

    if (loading) {
      return (
        <div className="container mx-auto min-h-screen px-4 py-48 flex align-center justify-center">
          <CircularProgress />
        </div>
      );
    }

    const groupedDrivers = groupByTeam(drivers);

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">F1 Drivers 2024</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.keys(groupedDrivers).map((team) => (
            <div key={team}>
              <h2 className="text-xl font-semibold mb-4">{team}</h2>
              <ul className="flex flex-wrap gap-4">
                {groupedDrivers[team].map((driver) => (
                  <li
                    key={driver.driver_number}
                    className="rounded-lg shadow-lg"
                  >
                    <div
                      className={`${getTeamColorClass(
                        driver.team_colour
                      )} p-6 rounded-lg flex flex-col items-center`}
                    >
                      <img
                        src={driver.headshot_url}
                        alt={driver.full_name}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {driver.first_name} {driver.last_name}
                      </h3>
                      <p className="mb-1">
                        <strong>Country:</strong> {driver.country_code}
                      </p>
                      <p className="mb-1">
                        <strong>Number:</strong> {driver.driver_number}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <DriversList />;
}
