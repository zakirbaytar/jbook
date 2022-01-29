import { parse } from "@babel/parser";
import babelTraverse from "@babel/traverse";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import { debounce } from ".";

const babelParser = (code: string) =>
  parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

class JSXHighlighter extends MonacoJSXHighlighter {
  constructor(editor: monaco.editor.IStandaloneCodeEditor) {
    super(monaco, babelParser, babelTraverse, editor);
  }

  highlightJSX = debounce<any>(() => this.highlightCode(), 250);
}

export default JSXHighlighter;
