import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import axios, { AxiosResponse } from "axios";

type OnLoadArgs = esbuild.OnLoadArgs;
type OnLoadOptions = esbuild.OnLoadOptions;
type OnLoadResult = esbuild.OnLoadResult | null;
type Loader = esbuild.Loader;
type PluginBuild = esbuild.PluginBuild;

interface LoadResultArgs {
  loader: Loader;
  fetchResponse: AxiosResponse;
}

const fileCache = localForage.createInstance({
  name: "filecache",
});

const getLoadResult = ({
  loader,
  fetchResponse,
}: LoadResultArgs): OnLoadResult => {
  return {
    loader,
    contents: fetchResponse.data,
    resolveDir: new URL("./", fetchResponse.request.responseURL).pathname,
  };
};

const transformCSSResponse = (fetchResponse: AxiosResponse): AxiosResponse => {
  const escapedResponse = fetchResponse.data
    .replace(/\n/g, "")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');

  const cssInjectionScript = `
    const style = document.createElement('style');
    style.innerText = '${escapedResponse}';
    document.head.appendChild(style);
  `;

  return { ...fetchResponse, data: cssInjectionScript };
};

const Filters: { [key: string]: OnLoadOptions } = {
  Index: { filter: /^index\.js$/ },
  JS: { filter: /.jsx?$/ },
  CSS: { filter: /.css$/ },
  Any: { filter: /.*/ },
};

export const fetchPlugin = (textInput: string) => {
  return {
    name: "fetch-plugin",
    setup: (build: PluginBuild) => {
      build.onLoad(Filters.Index, async () => {
        return { loader: "jsx", contents: textInput };
      });

      build.onLoad(Filters.Any, async (args: OnLoadArgs) => {
        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad(Filters.CSS, async (args: OnLoadArgs) => {
        const fetchResponse = await axios.get(args.path);
        const result = getLoadResult({
          loader: "jsx",
          fetchResponse: transformCSSResponse(fetchResponse),
        });
        return await fileCache.setItem(args.path, result);
      });

      build.onLoad(Filters.Any, async (args: OnLoadArgs) => {
        const fetchResponse = await axios.get(args.path);
        const result = getLoadResult({ loader: "jsx", fetchResponse });
        return await fileCache.setItem(args.path, result);
      });
    },
  };
};
