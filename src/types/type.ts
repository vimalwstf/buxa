export type DataObject = {
  id: string;
  content: string;
  wordCount: number;
  isFavorite: boolean;
  updatedAt: string;
};

export type DocumentInfo = {
  id: string;
  name: string;
  words: number;
  modified: string;
  favourite: boolean;
  metadata?: string;
  keyword?: string;
  tag?: string;
};
