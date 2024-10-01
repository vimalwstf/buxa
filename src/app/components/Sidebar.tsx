
"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ProgressBar from "./progressBar/ProgressBar";


const Sidebar = () => {
  const [useCase, setUseCase] = useState("");
  const [keywords, setKeywords] = useState("");
  const [researchLevel, setResearchLevel] = useState(0);


  const [language, setLanguage] = useState("");
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [toneOpen, setToneOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const handlePersonalitySelect = (selectedTag: tagType) => {
    const updatedTags = personalityTags.map((tag) =>
      tag.name === selectedTag.name
        ? { ...tag, isSelected: !tag.isSelected }
        : tag
    );

    if (selectedTag.isSelected) {
      const updatedTags = selectedPersonalityTags.filter(
        (tag) => tag.name !== selectedTag.name
      );
      setSelectedPersonalityTags(updatedTags);
    } else {
      setSelectedPersonalityTags((prevSelected) => [
        ...prevSelected,
        { ...selectedTag, isSelected: true },
      ]);
    }
    setPersonalityTags(updatedTags);
  };

  const handleToneSelect = (selectedTag: tagType) => {
    const updatedTags = toneTags.map((tag) =>
      tag.name === selectedTag.name
        ? { ...tag, isSelected: !tag.isSelected }
        : tag
    );

    if (selectedTag.isSelected) {
      const updatedTags = selectedToneTags.filter(
        (tag) => tag.name !== selectedTag.name
      );
      setSelectedToneTags(updatedTags);
    } else {
      setSelectedToneTags((prevSelected) => [
        ...prevSelected,
        { ...selectedTag, isSelected: true },
      ]);
    }
    setToneTags(updatedTags);
  };
  // Check if all fields are filled
  const allFieldsFilled =
    useCase && keywords && language;

  return (
    <div className="min-h-[85vh] w-full max-w-xs bg-gray-100 rounded-md border border-gray-300 p-4">
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
      <ProgressBar/>

      {/* Personality dropdown */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            setPersonalityOpen(!personalityOpen);
            setToneOpen(false);
            setLanguageOpen(false);
          }}
        >
          <label className="block font-medium">Set personality</label>
          {personalityOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {personalityOpen ? (
          <SelectionBox
            tags={personalityTags}
            placeholder="Search another personality"
            handleSelect={handlePersonalitySelect}
          />
        ) : (
          <div className="flex flex-wrap">
            {selectedPersonalityTags.map((tag) => (
              <div
                key={tag.name}
                className="flex flex-row items-center gap-2 border-2 border-gray-200 px-2 py-1 rounded-lg m-1"
              >
                <span>{tag.name}</span>
                <LiaTimesSolid
                  className="cursor-pointer"
                  onClick={() => handlePersonalitySelect(tag)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tone dropdown */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            setToneOpen(!toneOpen);
            setPersonalityOpen(false);
            setLanguageOpen(false);
          }}
        >
          <label className="block font-medium">Set tone</label>
          {toneOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div> */}
      <ProgressBar/>

    

    

      {/* Language dropdown */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            setLanguageOpen(!languageOpen);
            setToneOpen(false);
            setPersonalityOpen(false);
          }}
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
        className={`flex gap-1 justify-center items-center cursor-pointer w-full px-4 py-2 mt-4 font-bold rounded-md ${
          allFieldsFilled
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!allFieldsFilled}
      >
        <CiPen className="text-black"/>
        Write for me
      </button>
    </div>
  );
};

export default Sidebar;