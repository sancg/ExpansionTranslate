import { arrayAsString, linkedArray } from '.';
import { Parser } from '../../types/types';

const ParserStrategies: Parser[] = [arrayAsString, linkedArray];

export const getParser = (input: unknown): Parser | null => {
  return ParserStrategies.find((parser) => parser.canHandle(input)) || null;
};
