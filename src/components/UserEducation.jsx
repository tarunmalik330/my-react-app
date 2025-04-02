import React, { useState, useContext } from "react";
import { FormContext } from "../context/AppContext";

const UserEducation = () => {
  const { updateFormStatus } = useContext(FormContext);

  // ✅ Corrected state definition
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    year: "",
    grade: "",
  });

  // ✅ Function to check if all fields are filled
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // ✅ Check if all fields are filled
      const isFilled = Object.values(updatedData).every(
        (val) => val.trim() !== ""
      );

      // ✅ Update form status in context
      updateFormStatus(2, isFilled);

      return updatedData;
    });
  };

  return (
    <div className="container mx-auto max-w-[1100px] pt-16">
      <h1 className="text-center text-4xl font-bold text-green-600">
        User Education
      </h1>
      <form className="mt-12 flex-col gap-5 mx-auto flex w-full max-w-[800px]">
        <input
          required
          type="text"
          name="degree"
          placeholder="Enter degree"
          value={formData.degree}
          onChange={handleChange}
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
        <input
          required
          type="text"
          name="institution"
          placeholder="Enter institution"
          value={formData.institution}
          onChange={handleChange}
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
        <input
          required
          type="number"
          name="year"
          value={formData.year}
          placeholder="Enter year"
          onChange={handleChange}
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
        <input
          required
          type="text"
          name="grade"
          value={formData.grade}
          placeholder="Enter grade or percentage"
          onChange={handleChange}
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
      </form>
    </div>
  );
};

export default UserEducation;
