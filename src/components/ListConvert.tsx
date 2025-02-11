import { useState } from "react";
import styles from "./ListConvert.module.css";
import { MdCopyAll } from "react-icons/md";

const ListTextToPhpArray = () => {
  const [inputText, setInputText] = useState<string>("");
  const [formatResult, setFormatResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parseText = (text: string) => {
    const result: Record<string, string[]> = {};

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    let currentParent: string | null = null;

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

    console.log({ lines, result });

    // Error on formatting
    const isParsable = Object.entries(result).length;
    if (!!isParsable) {
      // Converting as associative array
      const phpLikeFormat = Object.entries(result)
        .map(([key, values]) => `"${key}" => [${values.map((v) => `"${v}"`).join(", ")}]`)
        .join(",\n");

      setFormatResult(phpLikeFormat);
    } else if (!!lines.length) {
      // Converting as normal array
      const arr_convert = `[${lines.map((entry) => `"${entry}"`).join(",\n")}]`;
      setFormatResult(arr_convert);
    } else {
      setFormatResult("The result cannot be converted");
    }
  };

  const handleConvert = () => {
    parseText(inputText);
    // handleCopy();
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        // rows={10}
        cols={400}
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
