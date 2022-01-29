import * as esbuild from "esbuild-wasm";

type OnResolveArgs = esbuild.OnResolveArgs;
type OnResolveOptions = esbuild.OnResolveOptions;
type PluginBuild = esbuild.PluginBuild;

const Filters: { [key: string]: OnResolveOptions } = {
  Index: { filter: /^index\.js$/ },
  Relative: { filter: /^\.{1,2}\/*/ },
  Package: { filter: /.*/ },
};

const generateUrl = (
  path: string,
  resolveDir?: string,
  baseHref: string = "https://unpkg.com"
) => {
  if (resolveDir) {
    return new URL(path, `${baseHref}${resolveDir}/`).href;
  }

  return new URL(path, baseHref).href;
};

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: PluginBuild) {
      build.onResolve(Filters.Index, async (args: OnResolveArgs) => {
        return { path: args.path, namespace: "jbook" };
      });

      build.onResolve(Filters.Relative, async (args: OnResolveArgs) => {
        return {
          path: generateUrl(args.path, args.resolveDir),
          namespace: "jbook",
        };
      });

      build.onResolve(Filters.Package, async (args: OnResolveArgs) => {
        return { path: generateUrl(args.path), namespace: "jbook" };
      });
    },
  };
};
