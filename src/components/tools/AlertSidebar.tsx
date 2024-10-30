"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/sidebar/Input";
import Form from "@/components/sidebar/Form";
import FrequencyAlert from "../sidebar/FrequencyAlert";

export default function AlertSidebar() {
  const initialState = {
    topic: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const { topic } = state;

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const email = session?.user?.userData?.email;

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

      {/* TODO: Alert frequency */}
      <FrequencyAlert />

      <div className="text-text-third">
        <p className="text-lg font-medium leading-4"> Alert Method</p>
        <span className="text-xs font-medium">
          Alerts will be sent on {email}
        </span>
      </div>
    </Form>
  );
}
