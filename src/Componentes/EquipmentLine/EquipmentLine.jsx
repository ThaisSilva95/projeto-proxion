import React, { useState } from "react";

function EquipmentLine({ equipamento, defeitos }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsSelected(event.target.checked);
  };

  const rowClasses = `flex flex-row gap-2 p-1 w-full cursor-pointer rounded-md transition-all duration-200 ${
    isSelected ? "bg-[#00aaad21] border border-indigo-500" : ""
  }`;

  return (
    <tr className={rowClasses}>
      <td className="text-xs w-1/3 flex items-center justify-start gap-2">
        <input
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
        {equipamento}
      </td>
      <td className="text-xs w-2/3">{defeitos}</td>
    </tr>
  );
}

export default EquipmentLine;
