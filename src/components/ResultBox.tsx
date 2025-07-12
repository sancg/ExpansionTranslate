import { useEffect, useState } from 'react';
import styles from './ListConvert.module.css';
import { MdCopyAll } from 'react-icons/md';

type Props = {
  formatResult: string;
  lang?: string;
};

export default function ResultBox({ formatResult, lang = 'PHP' }: Props) {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    if (!!formatResult) {
      navigator.clipboard.writeText(formatResult);
    }
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000);
  };

  useEffect(() => {
    if (formatResult) {
      handleCopy();
    }

    return () => {};
  }, [formatResult]);

  return (
    <div className={styles.snippetContainer + ' rounded-xl border-[#333]'}>
      <div className='flex justify-between h-13 items-center bg-[#2f2f2f] text-white px-4 py-2 rounded-t-l'>
        <span className={styles.language}>{lang}</span>
        <button className={styles.copyButton} onClick={handleCopy}>
          <MdCopyAll size={16} /> {isCopy ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className={styles.result}>
        <code className='font-mono text-sm text-gray-400'>{formatResult}</code>
      </pre>
    </div>
  );
}
