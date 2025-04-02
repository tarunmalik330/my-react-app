import React, { useState, useContext } from "react";
import { FormContext } from "../context/AppContext";

const UserExperience = () => {
  const { handleInputChange } = useContext(FormContext);
  const [formData, setFormData] = useState({ jobTitle: "", companyName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // ✅ Check if all fields are filled
    const isFilled =
      updatedForm.jobTitle.trim() !== "" &&
      updatedForm.companyName.trim() !== "";
    handleInputChange(3, isFilled);
  };

  return (
    <div className="container mx-auto max-w-[1100px] pt-16">
      <h1 className="text-center text-4xl font-bold text-green-600">
        User Experience
      </h1>
      <form className="mt-12 flex-col gap-5 mx-auto flex w-full max-w-[800px]">
        <input
          required
          type="text"
          placeholder="Enter job title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
        <input
          required
          type="text"
          placeholder="Enter company name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
      </form>
    </div>
  );
};

export default UserExperience;
