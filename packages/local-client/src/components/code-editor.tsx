import React, { useCallback, useRef } from "react";

import MonacoEditor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import prettier from "prettier";
import parser from "prettier/parser-babel";
import useSave from "../hooks/useSave";

import { registerSnippets } from "../snippets/monaco-snippets";
import JSXHighlighter from "../utils/JSXHighlighter";

import "./syntax-highlights.css";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue?: string;
  autoFormat?: boolean;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = "",
  autoFormat = true,
  onChange,
}) => {
  const timer = useRef<NodeJS.Timer>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const prettifyContent = useCallback(() => {
    try {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const model = editor.getModel();
        if (!model) return;

        const formatted = prettier.format(model.getValue(), {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
        });

        editor.setValue(formatted);
        editor.setPosition({ lineNumber: model.getLineCount() + 1, column: 0 });
      }, 250);
    } catch (error) {
      // Parse error
    }
  }, [editorRef]);

  useSave(() => {
    if (autoFormat) prettifyContent();
  });

  const onEditorMount: OnMount = async (monacoEditor, monaco) => {
    await registerSnippets(monaco);

    const jsxHighlighter = new JSXHighlighter(monacoEditor);
    monacoEditor.onDidChangeModelContent(() => {
      onChange(monacoEditor.getValue());
      jsxHighlighter.highlightJSX();
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    editorRef.current = monacoEditor;
  };

  return (
    <main className="editor">
      <MonacoEditor
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={initialValue}
        onMount={onEditorMount}
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        wrapperProps={{ className: "editor-wrapper" }}
      />
    </main>
  );
};

export default CodeEditor;
