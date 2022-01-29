import snippets from "./js-snippets";

export async function registerSnippets(monaco: any) {
  if (!monaco || !monaco.languages) {
    return;
  }

  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: () => {
      const suggestions = Object.values(snippets).map(
        ({ body, prefix, description = "" }) => {
          const snippet = Array.isArray(body) ? body.join("\n") : body;

          return {
            label: prefix,
            kind: monaco.languages.CompletionItemKind.Snippet,
            description,
            insertText: snippet,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          };
        }
      );

      return { suggestions };
    },
  });
}
