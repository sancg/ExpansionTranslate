type KeyArrayValue = Record<string, string[]>;
type StringList = string[];

interface Parser {
  name: string;
  enabled?: boolean;
  canHandle: (input: unknown) => boolean;
  parse: (input: any) => string;
}

export { Parser, KeyArrayValue, StringList };
