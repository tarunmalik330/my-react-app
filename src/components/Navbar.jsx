import React, { useContext } from "react";
import { FormContext } from "../context/AppContext";
import { NAV_LINKS } from "../utils/helper";
import About from "../components/About";
import UserEducation from "../components/UserEducation";
import UserExperience from "../components/UserExperience";

const Navbar = () => {
  const {
    activeStep,
    setActiveStep,
    formStatus,
    completedSteps,
    setCompletedSteps,
    handleInputChange,
  } = useContext(FormContext);
  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      const prevStep = activeStep - 1;
      setActiveStep(prevStep);
      setCompletedSteps(completedSteps.filter((s) => s <= prevStep));
    }
  };
  const isFormComplete = Object.values(formStatus).every((status) => status);
  const handleSubmit = () => {
    if (isFormComplete) {
      handleInputChange(4, true); // Mark Step 4 as filled
      setCompletedSteps([...completedSteps, 4]); // Add Step 4 to completed steps
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <nav className="p-4">
        <ul className="flex justify-between">
          {NAV_LINKS.map((obj, index) => {
            const stepNumber = index + 1;
            const isFilled = formStatus[stepNumber];
            return (
              <li key={index}>
                <button
                  onClick={() => setActiveStep(stepNumber)}
                  className={`nav_links relative ${
                    index !== NAV_LINKS.length - 4
                      ? "after:absolute after:h-1 after:w-[250px] after:right-[60px] after:bg-[#CDCDCD]"
                      : ""
                  } ${
                    stepNumber === 1
                      ? formStatus[1]
                        ? "!bg-blue-600 after:!bg-blue-600 !text-white !border-transparent"
                        : "!bg-[#690210] after:!bg-[#690210] !text-white !border-transparent"
                      : stepNumber <= activeStep
                      ? isFilled || (stepNumber === 4 && isFormComplete) // Ensure step 4 turns blue after form submission
                        ? "!bg-blue-600 after:!bg-blue-600 !text-white !border-transparent"
                        : "!bg-[#690210] after:!bg-[#690210] !text-white !border-transparent"
                      : "bg-transparent text-black"
                  }`}
                >
                  {obj}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-5">
        {activeStep === 1 && (
          <About onInputChange={(filled) => handleInputChange(1, filled)} />
        )}
        {activeStep === 2 && (
          <UserEducation
            onInputChange={(filled) => handleInputChange(2, filled)}
          />
        )}
        {activeStep === 3 && (
          <UserExperience
            onInputChange={(filled) => handleInputChange(3, filled)}
          />
        )}
      </div>
      <div className="flex gap-3 justify-center pt-8">
        <button
          onClick={handlePrev}
          type="button"
          className="py-[14px] px-6 text-[#690210] text-base font-medium border border-solid border-[#690210] rounded-[8px] cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="py-[14px] px-6 text-white text-base font-medium border border-solid border-transparent bg-[#690210] rounded-[8px] cursor-pointer"
        >
          Next
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={`py-[14px] px-6 text-white text-base font-medium border border-solid border-transparent rounded-[8px] cursor-pointer ${
            isFormComplete ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Navbar;
