"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/sidebar/Dropdown";
import Input from "@/components/sidebar/Input";
import Form from "@/components/sidebar/Form";

const allFormats = ["Article", "Blog Post", "Book", "Course", "Podcast"];
const focusAreas = ["Business", "Marketing", "Tech"];
const sources = ["Web", "Book", "Podcast", "YouTube"];

export default function ResearchSidebar({
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
    topic: "",
    format: "",
    date: "",
    focus: "",
    source: "",
    deepDive: false,
    researchFromWeb: false,
    dropdown: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    topic,
    format,
    date,
    focus,
    source,
    deepDive,
    researchFromWeb,
    dropdown,
  } = state;

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const setDropdown = (name: string) => {
    setState((prev) => ({ ...prev, dropdown: name }));
  };

  const setTopic = (topic: string) => {
    setState((prev) => ({ ...prev, topic: topic }));
  };
  const handleDropdownSelect = (type: "format" | "focus" | "source") => {
    return (option: string) => {
      setState((prev) => ({ ...prev, [type]: option }));
    };
  };

  const allFieldsFilled = !!(topic && format && focus && source);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (allFieldsFilled) {
        const metadata = {
          topic,
          format,
          date,
          focus,
          source,
          deepDive,
          researchFromWeb,
        };
        setLoading(true);
        console.log(metadata);
        handleDocumentSubmit({
          favourite:false,
          id:"0",
          modified: "",
          name:"",
          words:0
        })
        setLoading(false);
      }
    }
  };

  return (
    <Form
      heading="Research with AI"
      variant="research"
      allFilled={allFieldsFilled}
      loading={loading}
      onSubmit={handleSubmit}
    >
      {/* Topic Input */}
      <Input
        label="Topic of Interest"
        placeholder="Type topic"
        value={topic}
        setValue={setTopic}
      />

      {/* Content format dropdown */}
      <Dropdown
        name="format"
        selected={format}
        options={allFormats}
        label="Preferred content format"
        handleSelect={handleDropdownSelect("format")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* TODO: Date range picker */}

      {/* Focus dropdown */}
      <Dropdown
        name="focus"
        selected={focus}
        options={focusAreas}
        label="Focus area"
        handleSelect={handleDropdownSelect("focus")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Source dropdown */}
      <Dropdown
        name="source"
        selected={source}
        options={sources}
        label="Source preference"
        handleSelect={handleDropdownSelect("source")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* TODO: Deep dive checkbox */}

      {/* TODO: Research from web checkbox */}
    </Form>
  );
}
