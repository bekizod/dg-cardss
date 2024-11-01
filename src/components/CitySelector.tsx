// components/CitySelector.tsx

import React, { useEffect, useState } from "react";

interface City {
  id: number;
  name: string;
}

interface CitySelectorProps {
  onCityChange: (city: string) => void;
}

export default function CitySelector({ onCityChange }: CitySelectorProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/data/cities.json");
        const data: City[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCityChange(city); // Call the callback with selected city
  };

  return (
    <div>
      <label htmlFor="city-selector" className="block mb-2">
        Select City:
      </label>
      <select
        id="city-selector"
        value={selectedCity}
        onChange={handleCityChange}
        className="border rounded p-2"
      >
        <option value="" disabled>Select a city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
