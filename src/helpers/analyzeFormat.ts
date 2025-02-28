export type keyValuePhp = Record<string, string[]>;
export type List = string[];

const associativeArrayPhp = (convertedText: keyValuePhp) => {
  const fixedText = Object.entries(convertedText)
    .map(([key, values]) => `"${key}" => [${values.map((v) => `"${v}"`).join(", ")}]`)
    .join(",\n");

  return fixedText;
};

const textToArray = (convertedText: List) => {
  const list = `[${convertedText.map((entry) => `"${entry}"`).join(", ")}]`;
  return list;
};

const parseText = (text: string) => {
  let result: keyValuePhp | List | string | null = {};
  let currentParent: string | null = null;

  const lines = text
    .split("\n")
    .map((line) => line.trim())
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

export { associativeArrayPhp, textToArray, parseText };
