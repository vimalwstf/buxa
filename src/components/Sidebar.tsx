"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import SelectionBox from "./SelectionBox";
import ProgressBar from "./ProgressBar";
import { FaPenNib } from "react-icons/fa";
import axios from "axios";
import LanguageDropdown from "./LanguageDropdown";
import UseCaseDropdown from "./UseCaseDropdown";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { updateCredit } from "@/lib/user/userSlice";

type tagType = {
  name: string;
  isSelected: boolean;
};

const personalities = [
  { name: "informative", isSelected: false },
  { name: "formal", isSelected: false },
  { name: "storyteller", isSelected: false },
  { name: "visionary", isSelected: false },
  { name: "proactive", isSelected: false },
  { name: "empathetic", isSelected: false },
  { name: "humorous/playful", isSelected: false },
  { name: "conversational/friendly", isSelected: false },
  { name: "analytical", isSelected: false },
  { name: "persuasive", isSelected: false },
];

const tones = [
  { name: "Professional", isSelected: false },
  { name: "Fact-driven", isSelected: false },
  { name: "Knowledgeable", isSelected: false },
];

const Sidebar = ({
  handleDocumentSubmit,
}: {
  handleDocumentSubmit: (data: {
    id: string;
    name: string;
    modified: string;
    favourite: boolean;
    words: number;
  }) => void;
}) => {
  const [useCase, setUseCase] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [researchLevel, setResearchLevel] = useState(2);
  const [personalityTags, setPersonalityTags] =
    useState<tagType[]>(personalities);
  const [toneTags, setToneTags] = useState<tagType[]>(tones);
  const [selectedPersonalityTags, setSelectedPersonalityTags] = useState<
    tagType[]
  >([]);
  const [selectedToneTags, setSelectedToneTags] = useState<tagType[]>([]);
  const [language, setLanguage] = useState("English");
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toneOpen, setToneOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const handlePersonalitySelect = (selectedTag: tagType) => {
    const updatedTags = personalityTags.map((tag) =>
      tag.name === selectedTag.name
        ? { ...tag, isSelected: !tag.isSelected }
        : tag,
    );
    if (selectedTag.isSelected) {
      const updatedSelected = selectedPersonalityTags.filter(
        (tag) => tag.name !== selectedTag.name,
      );
      setSelectedPersonalityTags(updatedSelected);
    } else {
      setSelectedPersonalityTags((prevSelected) => [
        ...prevSelected,
        { ...selectedTag, isSelected: true },
      ]);
    }
    setPersonalityTags(updatedTags);
  };

  const handleToneSelect = (selectedTag: tagType) => {
    const updatedTags = toneTags.map((tag) => ({
      ...tag,
      isSelected: tag.name === selectedTag.name ? !tag.isSelected : false,
    }));
    setToneTags(updatedTags);

    if (selectedTag.isSelected) {
      setSelectedToneTags([]);
    } else {
      setSelectedToneTags([{ ...selectedTag, isSelected: true }]);
    }
  };

  const allFieldsFilled =
    useCase &&
    primaryKey &&
    selectedPersonalityTags.length > 0 &&
    selectedToneTags.length > 0 &&
    language;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (allFieldsFilled) {
        const metadata = {
          useCase: useCase,
          title: primaryKey,
          researchLevel: researchLevel,
          personality: selectedPersonalityTags.map((tag) => tag.name),
          tone: selectedToneTags.length > 0 ? selectedToneTags[0].name : "",
          language: language,
        };
        setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents`,
            { metadata },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          // console.log(response.data);
          if (response?.data?.status) {
            dispatch(updateCredit(response?.data?.credits));
            const data = {
              id: response.data.data.id,
              name: response.data.data.content,
              modified: response.data.data.updatedAt,
              favourite: response.data.data.isFavorite,
              words: response.data.data.wordCount,
            };
            handleDocumentSubmit(data);
            // Reset all state variables
            setUseCase("");
            setPrimaryKey("");
            setResearchLevel(0);
            setLanguage("");
            setSelectedPersonalityTags([]);
            setSelectedToneTags([]);
            setPersonalityTags(personalities);
            setToneTags(tones);
            enqueueSnackbar("Document generated successfully", {
              variant: "success",
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              autoHideDuration: 2000
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Failed to generate document",{
            variant:"error",
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            autoHideDuration:2000
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="element h-full pb-32 sm:min-h-[87vh] overflow-y-scroll w-full rounded-md border-2 border-primary-light bg-primary-light p-4 ">
      <h2 className="text-[1.3rem] font-semibold mb-4 text-text-light">
        Write with AI
      </h2>
      <form onSubmit={handleSubmit}>
        {/* UseCase Drop-down */}
        <UseCaseDropdown
          selectedUseCase={useCase}
          setUseCase={setUseCase}
          setToneOpen={setToneOpen}
        />

        {/* primaryKeyword input */}
        <div className="mb-4">
          <label className="block text-text-third font-medium mb-2 hover:text-white">
            Primary Keywords
          </label>
          <input
            type="text"
            value={primaryKey}
            onChange={(e) => setPrimaryKey(e.target.value)}
            placeholder="AI writing assistant"
            className="w-full px-4 py-2 border font-semibold text-sm text-gray-50 border-gray-100 rounded-md outline-none"
          />
        </div>

        {/* Research level slider */}
        <ProgressBar
          researchLevel={researchLevel}
          setResearchLevel={setResearchLevel}
        />

        {/* Personality dropdown */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer text-text-third hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setPersonalityOpen(!personalityOpen);
              setToneOpen(false);
            }}
          >
            <label className="block font-medium mb-2">
              Set personality
            </label>
            {personalityOpen ? (
              <FiChevronUp/>
            ) : (
              <FiChevronDown />
            )}
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
                  className="flex flex-row items-center gap-2 border-2 px-2 py-1 rounded-lg m-1"
                >
                  <span>{tag.name}</span>
                  <LiaTimesSolid
                    className="cursor-pointer text-primary-green"
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
            className="flex justify-between items-center cursor-pointer text-text-third hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setToneOpen(!toneOpen);
              setPersonalityOpen(false);
            }}
          >
            <label className="block font-medium mb-2">
              Set tone
            </label>
            {toneOpen ? (
              <FiChevronUp/>
            ) : (
              <FiChevronDown/>
            )}
          </div>
          {toneOpen ? (
            <SelectionBox
              tags={toneTags}
              placeholder="Search another tone"
              handleSelect={handleToneSelect}
            />
          ) : (
            <div className="flex flex-wrap">
              {selectedToneTags.map((tag) => (
                <div
                  key={tag.name}
                  className="flex flex-row items-center gap-2 border-2 px-2 py-1 rounded-lg m-1 cursor-pointer"
                >
                  <span>{tag.name}</span>
                  <LiaTimesSolid
                    className="cursor-pointer text-primary-green"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToneSelect(tag);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <LanguageDropdown
          selectedLanguage={language}
          setLanguage={setLanguage}
          setToneOpen={setToneOpen}
        />
        <button
          type="submit"
          className={`flex gap-2 justify-center items-center cursor-pointer w-full px-4 py-2 mt-8 font-semibold rounded-md ${
            allFieldsFilled
              ? "bg-primary-green text-black"
              : "bg-text-third text-white hover:cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          <FaPenNib
            className={`text-lg
            ${allFieldsFilled ? " text-black" : " text-white "}`}
          />
          {loading ? "Writing..." : "Write for me"}
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
