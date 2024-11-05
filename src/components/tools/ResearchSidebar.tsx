"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/sidebar/Dropdown";
import Input from "@/components/sidebar/Input";
import Form from "@/components/sidebar/Form";
import ToggleButton from "../sidebar/ToggleButton";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const allFormats = ["Article", "Blog Post", "Book", "Course", "Podcast"];
const focusAreas = ["Business", "Marketing", "Tech"];
const sources = ["Web", "Book", "Podcast", "YouTube"];
const timeRangeOptions = ["latest", "past_24hrs", "past_week"];

export default function ResearchSidebar({
  handleDocumentSubmit,
}: {
  handleDocumentSubmit: (
    data: [
      [
        {
          id: string;
          content: string[];
          isFavorite: boolean;
          updatedAt: string;
        }
      ]
    ]
  ) => void;
}) {
  const initialState = {
    topic: "",
    format: "",
    timeRange: "",
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
    timeRange,
    focus,
    source,
    deepDive,
    // researchFromWeb,
    dropdown,
  } = state;

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const setDropdown = (name: string) => {
    setState((prev) => ({ ...prev, dropdown: name }));
  };

  const togggleState = (name: "deepDive" | "researchFromWeb") => {
    return () => {
      setState((prev) => ({ ...prev, [name]: !prev[name] }));
    };
  };

  const setTopic = (topic: string) => {
    setState((prev) => ({ ...prev, topic: topic }));
  };
  const handleDropdownSelect = (
    type: "format" | "timeRange" | "focus" | "source"
  ) => {
    return (option: string) => {
      setState((prev) => ({ ...prev, [type]: option }));
    };
  };

  const allFieldsFilled = !!(topic && format && focus && source);
  // const allFieldsFilled = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (allFieldsFilled) {
        const metadata = {
          topic: topic.split(","),
          format,
          timeRange,
          focus,
          source,
          deepDive,
          // researchFromWeb,
        };

        setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/research`,
            { metadata },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response?.data?.status) {
            console.log(response.data);
            // dispatch(updateCredit(response?.data?.credits));
            // const data = {
            //   id: response.data.data.id,
            //   name: response.data.data.content,
            //   modified: response.data.data.updatedAt,
            //   favourite: response.data.data.isFavorite,
            //   words: response.data.data.wordCount,
            // };
            // handleDocumentSubmit();
            // Reset all state variables
            setState(initialState);
            enqueueSnackbar("Document generated successfully", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
          }
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Failed to generate document", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        } finally {
          setLoading(false);
        }
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

      {/* Date range picker */}
      <Dropdown
        name="timeRange"
        selected={timeRange}
        options={timeRangeOptions}
        label="Select date range"
        handleSelect={handleDropdownSelect("timeRange")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

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

      {/* Deep dive toggle */}
      <ToggleButton
        label="Deep Dive"
        isOn={deepDive}
        toggle={togggleState("deepDive")}
      />

      {/*  Research from web toggle */}
      {/* <ToggleButton
        label="Research from web"
        isOn={researchFromWeb}
        toggle={togggleState("researchFromWeb")}
      /> */}
    </Form>
  );
}
