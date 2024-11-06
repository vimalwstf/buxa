"use client";

import ComboDropdown from "@/components/sidebar/ComboDropdown";
import Dropdown from "@/components/sidebar/Dropdown";
import Form from "@/components/sidebar/Form";
import Input from "@/components/sidebar/Input";
import ProgressBar from "@/components/sidebar/ProgressBar";
import { useAppDispatch } from "@/lib/hooks";
import { updateCredit } from "@/lib/user/userSlice";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
// import ToggleButton from "../sidebar/ToggleButton";

const useCases = [
  "Blog Ideas and outlines",
  "Tech Event Ideas",
  "Business Ideas",
  "Marketing Events",
];
const languages = [
  "English",
  // "Hindi",
  // "French",
  // "Pashto",
  // "German",
  // "Urdu",
  // "Spanish",
];
const personalities = [
  "informative",
  "formal",
  "storyteller",
  "visionary",
  "proactive",
  "empathetic",
  "humorous/playful",
  "conversational/friendly",
  "analytical",
  "persuasive",
];

const tones = ["Professional", "Fact-driven", "Knowledgeable"];

export default function WriteSidebar({
  handleDocumentSubmit,
}: {
  handleDocumentSubmit: (data: {
    id: string;
    name: string;
    modified: string;
    favourite: boolean;
    words: number;
  }) => void;
}) {
  const initialState = {
    useCase: "",
    keywords: "",
    researchLevel: 2,
    personalityTags: [] as string[],
    toneTags: [] as string[],
    language: "English",
    dropdown: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  // const [writeFromMyContent, setWriteFromMyContent] = useState(true);
  const {
    useCase,
    keywords,
    researchLevel,
    personalityTags,
    toneTags,
    language,
    dropdown,
  } = state;

  const dispatch = useAppDispatch();

  // const { data: session } = useSession();
  // const accessToken = session?.user?.accessToken;
  // const accessToken = localStorage.getItem("token");

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const accessToken = parsedUser?.accessToken;

  const setDropdown = (name: string) => {
    setState((prev) => ({ ...prev, dropdown: name }));
  };
  const setResearchLevel = (level: number) => {
    setState((prev) => ({ ...prev, researchLevel: level }));
  };
  const setKeywords = (keywords: string) => {
    setState((prev) => ({ ...prev, keywords: keywords }));
  };
  const handleDropdownSelect = (type: "useCase" | "language") => {
    return (option: string) => {
      setState((prev) => ({ ...prev, [type]: option }));
    };
  };
  const handleTagSelect = (type: "personality" | "tone") => {
    return (tag: string) => {
      setState((prev) => {
        const updatedTags =
          type === "personality"
            ? prev.personalityTags.includes(tag)
              ? prev.personalityTags.filter((t) => t !== tag)
              : [...prev.personalityTags, tag]
            : prev.toneTags.includes(tag)
            ? []
            : [tag];

        return {
          ...prev,
          [type === "personality" ? "personalityTags" : "toneTags"]:
            updatedTags,
        };
      });
    };
  };

  const allFieldsFilled = !!(
    useCase &&
    keywords &&
    researchLevel &&
    language &&
    personalityTags.length > 0 &&
    toneTags.length > 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (allFieldsFilled) {
        const metadata = {
          useCase,
          title: keywords,
          researchLevel,
          personality: personalityTags,
          tone: toneTags[0],
          language,
        };

        setLoading(true);
        try {
          // console.log("hsjfdg")
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents`,
            { metadata },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

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
            setState(initialState);
            enqueueSnackbar("Document generated successfully", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              }
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Failed to generate document", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            }
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    // <div className="">
    <Form
      heading="Write with AI"
      variant="write"
      loading={loading}
      allFilled={allFieldsFilled}
      onSubmit={handleSubmit}
    >
      {/* UseCase Drop-down */}
      <Dropdown
        name="use case"
        selected={useCase}
        options={useCases}
        label="Choose use case"
        handleSelect={handleDropdownSelect("useCase")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* primaryKeyword input */}
      <Input
        label="Primary Keywords"
        placeholder="AI writing assistant"
        value={keywords}
        setValue={setKeywords}
      />

      {/* Research level slider */}
      <ProgressBar
        researchLevel={researchLevel}
        setResearchLevel={setResearchLevel}
      />

      {/* Personality dropdown */}
      <ComboDropdown
        name="personality"
        searchLabel="Search another personality"
        selectedTags={personalityTags}
        allTags={personalities}
        handleSelect={handleTagSelect("personality")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Tone dropdown */}
      <ComboDropdown
        name="tone"
        searchLabel="Search another tone"
        selectedTags={toneTags}
        allTags={tones}
        handleSelect={handleTagSelect("tone")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Language dropdown */}
      <Dropdown
        name="language"
        selected={language}
        options={languages}
        label="Set language"
        handleSelect={handleDropdownSelect("language")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/*  Write from my content component */}
      {/* <ToggleButton label="Write from my content" /> */}
    </Form>
    // </div>
  );
}
