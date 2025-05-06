import React from "react";

export default function TechnologiesFilter({ technologies, setSelectValue }) {
  return (
    <div className="filter">
      <select
        data-testid="select"
        onChange={(e) => setSelectValue(e.target.value)}
      >
        <option value="0">Selectionner une technologie</option>
        {technologies.map((technology) => (
          <option key={technology.id} value={technology.id}>
            {technology.name}
          </option>
        ))}
      </select>
    </div>
  );
}
