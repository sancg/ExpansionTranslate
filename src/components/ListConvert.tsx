import { useState } from 'react';
import ResultBox from './ResultBox';
import styles from './ListConvert.module.css';
import { parseText } from '../helpers/analyzeFormat';
import { getParser } from '../lib/parsers/ParserFactory';

const ListTextToPhpArray = () => {
  const [inputText, setInputText] = useState<string>('');
  const [formatResult, setFormatResult] = useState<string>('');

  const handleConvert = () => {
    const outputText = parseText(inputText);
    const parser = getParser(outputText)?.parse(outputText);
    parser ? setFormatResult(parser) : setFormatResult('Unknown Formatting ⚠️');

    console.log({ outputText, parser });
  };

  return (
    <div className={styles.container}>
      <textarea
        name='rawText'
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
