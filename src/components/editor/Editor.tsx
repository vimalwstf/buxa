"use client";
import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import dynamic from "next/dynamic";
type EditorProps = {
  value?: string; // htmlstring
  onChange?: (content: string) => void;
};

const toolbar = {
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
  },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: false },
  image: false,
};

const MyEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );
  useEffect(() => {
    if (value) {
      const contentBlock = htmlToDraft(value);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [value]);

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
  };
  const onEditorFocusChange = () => {
    if (onChange) {
      const htmlText = draftToHtml(
        convertToRaw(editorState.getCurrentContent()),
      );
      onChange(htmlText);
    }
  };
  return (
    <Editor
      onBlur={onEditorFocusChange}
      editorState={editorState}
      wrapperClassName="h-full flex flex-col overflow-hidden"
      editorClassName="custom-scrollbar max-w-[95vw] overflow-y-scroll bg-primary-light border-b border-2 border-gray-200 rounded-b rounded-[8px] p-2 break-words whitespace-normal"
      onEditorStateChange={onEditorStateChange}
      toolbar={toolbar}
    />
  );
};

export default dynamic(() => Promise.resolve(MyEditor), { ssr: false });
