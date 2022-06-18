import { parse } from 'path';

export const getNameFromPath = async (url: string) => {
  const { name } = parse(url);
  return name;
};
