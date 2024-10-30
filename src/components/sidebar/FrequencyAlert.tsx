import { useState } from "react";
import FrequencyOptions from "./FrequencyOptions";
import FrequencyModal from "./FrequencyModal";

type Frequency = "Daily" | "Weekly" | "Monthly";

const FrequencyAlert = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFrequencyChange = (frequency: Frequency) => {
    setSelectedFrequency(frequency);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFrequency(null);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-transparent">
      <h2 className="mb-4 text-xl font-medium text-text-third">
        Select Frequency
      </h2>

      <FrequencyOptions
        selectedFrequency={selectedFrequency}
        onFrequencyChange={handleFrequencyChange}
      />

      {isModalOpen && selectedFrequency && (
        <FrequencyModal
          frequency={selectedFrequency}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default FrequencyAlert;
