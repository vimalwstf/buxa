import { ResearchInfo } from "@/types/type";

export const DefaultDocument = {
  id: "0",
  name: "",
  words: 0,
  modified: "",
  favourite: false,
};

export const DefaultResearch: ResearchInfo = {
  id: "0",
  topic: "",
  content: [{ content: "", isDeleted: false }],
  isFavorite: false,
  updatedAt: "",
};
