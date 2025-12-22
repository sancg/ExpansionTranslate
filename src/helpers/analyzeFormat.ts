import { KeyArrayValue, StringList } from '../types/types';

const parseText = (text: string) => {
  let result: KeyArrayValue | StringList | string | null = {};
  let currentParent: string | null = null;

  const lines = text
    .split('\n')
    .map((line) => formatLineText(line))
    .filter(Boolean);

  // Building the array association
  lines.forEach((line) => {
    const parentMatch = line.match(/^\d+\.\s*(.+)/);

    if (parentMatch) {
      currentParent = parentMatch[1].trim();
      result[currentParent] = [];
    } else if (currentParent) {
      result[currentParent].push(line);
    }
  });

  if (!Object.entries(result).length) {
    return lines;
  }
  return result;
};

const formatLineText = (line: string): string => {
  return line.replace(/\t/g, ', ').trim();
};

export { parseText };
