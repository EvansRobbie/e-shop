export const parseCallbackUrl = (url: string) => {
  const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
  return res;
};
