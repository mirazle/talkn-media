export const urlToCh = (url: string): string => {
  return url.replace('https:/', '').replace('http:/', '');
  // return decodeURI(url.replace('https:/', '').replace('http:/', ''));
};
