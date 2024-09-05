"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, label: "Step 1", svg: "check" },
  { id: 2, label: "Step 2", svg: "user" },
  { id: 3, label: "Step 3", svg: "file" },
];

const ProgressSteps: FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  const renderSVG = (svgType: string, isActive: boolean) => {
    switch (svgType) {
      case "check":
        return (
          <motion.svg className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-100"} lg:w-4 lg:h-4`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
          </motion.svg>
        );
      case "user":
        return (
          <motion.svg className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-100"} lg:w-5 lg:h-5`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
          </motion.svg>
        );
      case "file":
        return (
          <motion.svg className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-100"} lg:w-5 lg:h-5`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  return (
    <ol className="flex items-center justify-center mt-[124px] w-full">
      {steps.map((step, index) => (
        <li key={step.id} className="flex w-full items-center relative">
          {/* Step Circle */}
          <div className={`flex items-center justify-center z-10 w-10 h-10 ${activeStep >= step.id ? "bg-blue-100 text-blue-600 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-700 text-gray-500"} rounded-full cursor-pointer lg:h-12 lg:w-12 shrink-0`} onClick={() => handleStepClick(step.id)}>
            {renderSVG(step.svg, activeStep >= step.id)}
          </div>

          {/* Progress Line */}
          {index < steps.length - 1 && (
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full h-1 z-0 ${activeStep > step.id ? "bg-blue-100 dark:bg-blue-800" : "bg-gray-100 dark:bg-gray-700"}`}></div>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
};

export default ProgressSteps;
