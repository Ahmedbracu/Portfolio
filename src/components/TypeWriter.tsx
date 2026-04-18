import { useState, useEffect } from 'react';

interface TypeWriterProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  delayBeforeDelete?: number;
  loop?: boolean;
}

export function TypeWriter({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  delayBeforeDelete = 2000,
  loop = true,
}: TypeWriterProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (strings.length === 0) return;

    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBeforeDelete);
      return () => clearTimeout(waitTimeout);
    }

    const fullString = strings[currentStringIndex];

    if (isDeleting) {
      if (currentText === '') {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          let nextIndex = currentStringIndex + 1;
          if (nextIndex >= strings.length) {
              if (!loop) return;
              nextIndex = 0;
          }
          setCurrentStringIndex(nextIndex);
        }, 0);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(fullString.substring(0, currentText.length - 1));
        }, backSpeed);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText === fullString) {
        const timeout = setTimeout(() => {
          setIsWaiting(true);
        }, 0);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(fullString.substring(0, currentText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isDeleting, isWaiting, currentStringIndex, strings, typeSpeed, backSpeed, delayBeforeDelete, loop]);

  return (
    <span>
      {currentText}
      <span className="typing-cursor"></span>
    </span>
  );
}
