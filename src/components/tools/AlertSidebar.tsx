"use client";

import { useState } from "react";
import Input from "@/components/sidebar/Input";
import Form from "@/components/sidebar/Form";
import AlertFrequency from "../sidebar/alertSiderbar/alertFrequency";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function AlertSidebar() {
  const initialState = {
    topic: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const { topic } = state;

  const { value: user } = useLocalStorage("user", {
    accessToken: "",
    email: "",
  });
  const accessToken = user?.accessToken;
  const email = user?.email;

  const setTopic = (topic: string) => {
    setState((prev) => ({ ...prev, topic: topic }));
  };

  const allFieldsFilled = !!topic;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (allFieldsFilled) {
        const metadata = {
          topic,
        };
        setLoading(true);
        console.log(metadata);
        setLoading(false);
      }
    }
  };

  return (
    <Form
      heading="Set alerts"
      variant="alert"
      allFilled={allFieldsFilled}
      loading={loading}
      onSubmit={handleSubmit}
    >
      {/* Topic Input */}
      <Input
        label="Alert Topic"
        placeholder="Type topic"
        value={topic}
        setValue={setTopic}
      />

      {/* Alert frequency */}
      {/* <FrequencyAlert /> */}
      <AlertFrequency />

      <div className="text-text-third">
        <p className="text-lg font-medium leading-4"> Alert Method</p>
        <span className="text-xs font-medium">
          Alerts will be sent on {email}
        </span>
      </div>
    </Form>
  );
}
