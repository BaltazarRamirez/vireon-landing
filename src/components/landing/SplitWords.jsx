import { Fragment } from "react";

/**
 * Splits text into masked words (`.sw > .sw-i`) for GSAP reveals.
 * `parts` accepts strings or `{ text, className, br }` segments.
 */
function SplitWords({ parts }) {
  const segments = (Array.isArray(parts) ? parts : [parts]).map((part) =>
    typeof part === "string" ? { text: part } : part,
  );

  return segments.map((segment, segIndex) => {
    const words = segment.text.split(" ").filter(Boolean);
    return (
      <Fragment key={segIndex}>
        {segment.br ? <br className={segment.brClassName} /> : null}
        {words.map((word, index) => (
          <Fragment key={`${segIndex}-${index}`}>
            <span className="sw">
              <span className={`sw-i ${segment.className ?? ""}`}>{word}</span>
            </span>
            {index < words.length - 1 || segIndex < segments.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Fragment>
    );
  });
}

export default SplitWords;
