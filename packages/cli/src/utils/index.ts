interface AdditionalErrorInfo {
  port: number | string;
  filename: string;
}

export const getErrorMessage = (
  error: any,
  additionalInfo: AdditionalErrorInfo
) => {
  const { port, filename } = additionalInfo;

  switch (error.code) {
    case "EADDRINUSE":
      return `Port ${port} is already in use.`;
    case "EACCES":
      return `Port ${port} requires elevated privileges.`;
    case "EADDRNOTAVAIL":
      return `Port ${port} is not available.`;
    case "EINVAL":
      return `Port ${port} is not a valid port number.`;
    case "ENOENT":
      return `File ${filename} does not exist.`;
    default:
      return error.message;
  }
};
