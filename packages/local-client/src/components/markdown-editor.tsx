import React, { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useActions } from "../hooks/useActions";
import { useOutsideClick } from "../hooks/useOutsideClick";

import { Cell } from "../state";

import "./markdown-editor.css";

const MarkdownEditor: React.FC<Cell> = ({ id, content }) => {
  const { updateCell } = useActions();
  const [isEditing, setIsEditing] = useState(false);

  const markdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(markdownRef, () => {
    setIsEditing(false);
  });

  if (isEditing) {
    return (
      <section className="markdown-cell" ref={markdownRef}>
        <main className="editor">
          <MDEditor
            value={content}
            onChange={(value) => updateCell(id, value ?? "")}
          />
        </main>
      </section>
    );
  }

  return (
    <section className="markdown-cell">
      <main className="preview" onClick={() => setIsEditing(true)}>
        <MDEditor.Markdown source={content || "Click to edit"} />
      </main>
    </section>
  );
};

export default MarkdownEditor;
