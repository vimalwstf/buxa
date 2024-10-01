"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";


const Sidebar = () => {
  const [useCase, setUseCase] = useState("");
  const [keywords, setKeywords] = useState("");
  const [researchLevel, setResearchLevel] = useState(0);


  const [language, setLanguage] = useState("");

  const [languageOpen, setLanguageOpen] = useState(false);

  // Check if all fields are filled
  const allFieldsFilled =
    useCase && keywords && language;

  return (
    <div className="min-h-[85vh] w-full max-w-sm bg-gray-100 rounded-md border border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-4">Write with AI</h2>

      {/* Use case dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Choose use cases</label>
        <select
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select use case</option>
          <option value="Blog Ideas and outlines">
            Blog Ideas and outlines
          </option>
        </select>
      </div>

      {/* Primary Keywords input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Primary Keywords</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="AI writing assistant"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Research level slider */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Research level</label>
        <div className="flex items-center">
          <input
            type="range"
            value={researchLevel}
            onChange={(e) => setResearchLevel(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full"
          />
          <span className="ml-2 text-gray-600">
            {researchLevel < 50 ? "Low" : "High"}
          </span>
        </div>
      </div>

    

    

      {/* Language dropdown */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setLanguageOpen(!languageOpen)}
        >
          <label className="block font-medium">Set language</label>
          {languageOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {languageOpen && (
          <div className="mt-2 border border-gray-300 rounded-lg">
            {["English", "Hindi", "French", "Pashto", "German"].map((l) => (
              <button
                key={l}
                className={`block w-full text-left px-4 py-2 hover:bg-blue-100 ${
                  language === l ? "bg-blue-100" : ""
                }`}
                onClick={() => setLanguage(l)}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* button */}
      <button
        className={`w-full px-4 py-2 mt-4 font-bold rounded-md ${
          allFieldsFilled
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!allFieldsFilled}
      >
        Write for me
      </button>
    </div>
  );
};

export default Sidebar;
