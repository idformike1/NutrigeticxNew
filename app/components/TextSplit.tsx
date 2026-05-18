"use client";

import React from "react";

interface TextSplitProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export default function TextSplit({ text, className, charClassName }: TextSplitProps) {
  // Split text into words then characters to preserve whitespace correctly
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className={`inline-block split-char ${charClassName || ""}`}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {/* Add space after word if it's not the last word */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block split-char" aria-hidden="true">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
