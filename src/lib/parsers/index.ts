import { KeyArrayValue, Parser, StringList } from '../../types/types';

const linkedArray: Parser = {
  name: 'Associative Array',
  enabled: true,
  canHandle: (input) => typeof input === 'object' && !Array.isArray(input),
  parse: (convertedText: KeyArrayValue) => {
    const fixedText = Object.entries(convertedText)
      .map(([key, values]) => `"${key}" => [${values.map((v) => `"${v}"`).join(', ')}]`)
      .join(',\n');

    return fixedText;
  },
};

const arrayAsString: Parser = {
  name: 'Array',
  enabled: true,
  canHandle: (input) => Array.isArray(input),
  parse: (convertedText: StringList) => {
    return `[${convertedText.map((entry) => `"${entry}"`).join(', ')}]`;
  },
};

export { linkedArray, arrayAsString };
