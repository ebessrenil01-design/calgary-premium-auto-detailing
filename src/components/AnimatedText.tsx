import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalChars = text.length;
  let charIndexCounter = 0;

  // Split into words so lines wrap naturally without breaking mid-word
  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`text-center font-medium leading-relaxed ${className}`}>
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        const renderedWord = (
          <span key={`word-${wIdx}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = charIndexCounter / totalChars;
              const end = Math.min(1, (charIndexCounter + 1) / totalChars);
              charIndexCounter += 1;

              return (
                <Character
                  key={`char-${charIndexCounter}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        // Account for space after word
        if (wIdx < words.length - 1) {
          const spaceStart = charIndexCounter / totalChars;
          const spaceEnd = Math.min(1, (charIndexCounter + 1) / totalChars);
          charIndexCounter += 1;

          return (
            <React.Fragment key={`frag-${wIdx}`}>
              {renderedWord}
              <Character
                key={`space-${charIndexCounter}`}
                char=" "
                progress={scrollYProgress}
                range={[spaceStart, spaceEnd]}
              />
            </React.Fragment>
          );
        }

        return renderedWord;
      })}
    </p>
  );
};
