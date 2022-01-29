export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

type ClassNameArg = string | { [key: string]: any };

export function classnames(...classNames: ClassNameArg[]): string {
  const classNamesList = new Set<string>();

  for (const className of classNames) {
    if (typeof className === "string" && className !== "") {
      classNamesList.add(className);
    } else if (Array.isArray(className)) {
      classNamesList.add(classnames(className));
    } else if (typeof className === "object") {
      for (const [conditionalClassName, isValid] of Object.entries(className)) {
        if (Boolean(isValid)) {
          classNamesList.add(conditionalClassName);
        }
      }
    }
  }

  return Array.from(classNamesList).join(" ");
}
