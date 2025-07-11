import { useEffect, useState } from 'react';
import styles from './ListConvert.module.css';
import { MdCopyAll } from 'react-icons/md';

type Props = {
  formatResult: string;
};
export const ResultBox = ({ formatResult }: Props) => {
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
    <div className={styles.snippetContainer + ' rounded-xl'}>
      <div className='flex justify-between h-13 items-center bg-[#2f2f2f] text-white px-4 py-2 rounded-t-xl'>
        <span className={styles.language}>PHP</span>
        <button className={styles.copyButton} onClick={handleCopy}>
          <MdCopyAll size={16} /> {isCopy ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className={styles.result}>
        <code className='font-mono text-sm text-gray-400'>{formatResult}</code>
      </pre>
    </div>
  );
};
