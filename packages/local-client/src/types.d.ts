/// <reference types="monaco-editor"/>
/// <reference types="@babel/types"/>

declare module "monaco-jsx-highlighter" {
  type MonacoAPI = import("monaco-editor");
  type ParseCallback = (input: string) => import("@babel/types").File;
  type TraverseCallback = (input: import("@types/babel__traverse")) => void;
  type MonacoEditor = import("monaco-editor").editor.ICodeEditor;

  type HighlightCallback = (ast: import("@babel/types").File) => any;
  type ErrorCallback = (error: Error<any>) => any;

  type AST = import("@babel/types").File;
  type ASTPromiseGetter = (forceUpdate: boolean) => Promise<AST>;

  type OnDispose = () => void;

  interface HighlightOptions {
    parser?: "babel";
    isHighlightGlyph?: boolean;
    iShowHover?: boolean;
    isUseSeparateElementStyles?: boolean;
    isThrowJSXParseErrors?: boolean;
  }

  declare class MonacoJSXHighlighter {
    constructor(
      monacoRef: MonacoAPI,
      parseRef: ParseCallback,
      traverseRef: TraverseCallback,
      monacoEditor: MonacoEditor,
      options?: HighlightOptions
    );

    resetState(): void;
    resetDeltaDecorations(): void;
    getAstPromise: ASTPromiseGetter;

    highLightOnDidChangeModelContent(
      debounceTime?: number,
      afterHighlight?: HighlightCallback,
      onHighlighError?: ErrorCallback,
      getAstPromise?: ASTPromiseGetter,
      onParseAstError?: ErrorCallback
    ): OnDispose;

    highlightCode(
      afterHighlight?: HighlightCallback,
      onHighlighError?: ErrorCallback,
      getAstPromise?: ASTPromiseGetter,
      onJsParserErrors?: ErrorCallback
    ): Promise<any>;

    highlight(ast: AST, jsxTraverseAst?: any): Promise<AST>;
  }

  export default MonacoJSXHighlighter;
}
