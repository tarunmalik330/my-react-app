import React, { createContext, useState, useContext } from "react";

// const AppContext = createContext(); // call react api
export const FormContext = createContext();

export const useAppContext = () => useContext(FormContext); //  custom hook
const AppProvider = ({ children }) => {
  // const [user, setUser] = useState("John Doe");
  // const [theme, setTheme] = useState("light");
  const [activeStep, setActiveStep] = useState(1);
  const [formStatus, setFormStatus] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [completedSteps, setCompletedSteps] = useState([]);
  // Function to update form status when filled
  const updateFormStatus = (step, isFilled) => {
    setFormStatus((prev) => ({ ...prev, [step]: isFilled }));
  };
  const handleInputChange = (step, isFilled) => {
    setFormStatus((prevStatus) => ({
      ...prevStatus,
      [step]: isFilled,
    }));

    if (isFilled) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
    } else {
      setCompletedSteps(completedSteps.filter((s) => s !== step));
    }
  };
  return (
    <div>
      {/* <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
        {children}
      </AppContext.Provider> */}
      <FormContext.Provider
        value={{
          activeStep,
          setActiveStep,
          formStatus,
          updateFormStatus,
          completedSteps,
          setCompletedSteps,
          handleInputChange,
        }}
      >
        {children}
      </FormContext.Provider>
    </div>
  );
};

export default AppProvider;
