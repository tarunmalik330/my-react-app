import React, { useState, useContext } from "react";
import { FormContext } from "../context/AppContext";

const About = () => {
  const { updateFormStatus } = useContext(FormContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Check if all fields are filled
    const isComplete = Object.values(newFormData).every(
      (val) => val.trim() !== ""
    );
    updateFormStatus(1, isComplete); // Update step 1 status in context
  };

  return (
    <div className="container mx-auto max-w-[1100px] pt-16">
      <h1 className="text-center text-4xl font-bold text-green-600">
        User Detail
      </h1>
      <form className="mt-12 flex-col gap-5 mx-auto flex w-full max-w-[800px]">
        <div className="flex gap-5 w-full">
          <input
            required
            type="text"
            placeholder="User Name"
            name="firstName"
            onChange={handleChange}
            className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
          />
        </div>
        <input
          required
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="User Email"
          className="text-black p-3 rounded-[8px] border border-solid border-black w-full placeholder:text-black placeholder:font-medium outline-none"
        />
      </form>
    </div>
  );
};

export default About;
