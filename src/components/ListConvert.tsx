import { useEffect, useState } from "react";
import styles from "./ListConvert.module.css";
import { MdCopyAll } from "react-icons/md";
import {
  associativeArrayPhp,
  keyValuePhp,
  List,
  parseText,
  textToArray,
} from "../helpers/analyzeFormat";

enum ParseResultType {
  KeyValuePhp,
  List,
  String,
  Unknown,
}

const getParseResultType = (result: any): ParseResultType => {
  if (typeof result === "object" && !Array.isArray(result)) {
    return ParseResultType.KeyValuePhp;
  } else if (Array.isArray(result)) {
    return ParseResultType.List;
  } else if (typeof result === "string") {
    return ParseResultType.String;
  } else {
    return ParseResultType.Unknown;
  }
};

const ListTextToPhpArray = () => {
  const [inputText, setInputText] = useState<string>("");
  const [formatResult, setFormatResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (formatResult) {
      handleCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    return () => {};
  }, [formatResult]);

  const handleConvert = () => {
    const usableText = parseText(inputText);
    const resultType = getParseResultType(usableText);

    console.log({ usableText, resultType });
    let newFormatResult = "";
    switch (resultType) {
      case ParseResultType.KeyValuePhp:
        newFormatResult = associativeArrayPhp(usableText as keyValuePhp);
        break;
      case ParseResultType.List:
        newFormatResult = textToArray(usableText as List);
        break;
      default:
        newFormatResult = "Unknown format";
    }

    setFormatResult(newFormatResult);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        rows={10}
        cols={40}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (e.currentTarget.value !== "") {
              handleConvert();
            } else {
              alert("Nothing to convert");
            }
          }
        }}
        placeholder="Paste your list here..."
      />
      <button
        className={styles.button}
        onClick={() => {
          if (inputText !== "") {
            handleConvert();
          } else {
            alert("Nothing to convert");
          }
        }}
      >
        Convert
      </button>

      <div className={styles.snippetContainer}>
        <div className={styles.header}>
          <span className={styles.language}>PHP</span>
          <button className={styles.copyButton} onClick={handleCopy}>
            <MdCopyAll size={16} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className={styles.result}>
          <code>{formatResult}</code>
        </pre>
      </div>
    </div>
  );
};

export default ListTextToPhpArray;
