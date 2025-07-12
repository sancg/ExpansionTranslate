import { useState } from 'react';
import styles from './ListConvert.module.css';
import {
  associativeArrayPhp,
  keyValuePhp,
  List,
  parseText,
  textToArray,
} from '../helpers/analyzeFormat';
import { ResultBox } from './ResultBox';

enum ParseResultType {
  KeyValuePhp,
  List,
  String,
  Unknown,
}

const getParseResultType = (result: any): ParseResultType => {
  if (typeof result === 'object' && !Array.isArray(result)) {
    return ParseResultType.KeyValuePhp;
  } else if (Array.isArray(result)) {
    return ParseResultType.List;
  } else if (typeof result === 'string') {
    return ParseResultType.String;
  } else {
    return ParseResultType.Unknown;
  }
};

const ListTextToPhpArray = () => {
  const [inputText, setInputText] = useState<string>('');
  const [formatResult, setFormatResult] = useState<string>('');

  const handleConvert = () => {
    const usableText = parseText(inputText);
    const resultType = getParseResultType(usableText);

    console.log({ usableText, resultType });
    let newFormatResult = '';
    switch (resultType) {
      case ParseResultType.KeyValuePhp:
        newFormatResult = associativeArrayPhp(usableText as keyValuePhp);
        break;
      case ParseResultType.List:
        newFormatResult = textToArray(usableText as List);
        break;
      default:
        newFormatResult = 'Unknown format';
    }

    setFormatResult(newFormatResult);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={
          styles.textarea +
          ' w-full h-32 p-2 border-1 border-[#333] rounded-xl max-h-48 shadow-2xs resize-y dark:bg-[#303030] '
        }
        rows={10}
        cols={40}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (e.currentTarget.value == '') {
              alert('Nothing to convert');
              e.preventDefault();
            } else {
              handleConvert();
            }
          }
        }}
        placeholder='Paste your list here...'
      />
      <button
        className={styles.button}
        onClick={() => {
          !inputText ? alert('Nothing to convert') : handleConvert();
        }}
      >
        Convert
      </button>
      <ResultBox formatResult={formatResult} />
    </div>
  );
};

export default ListTextToPhpArray;
