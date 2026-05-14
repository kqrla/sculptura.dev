// hand-drawn svg doodles used across the landing page to give it
// an analog notebook feel. each doodle is a small inline svg so it
// scales crisply and inherits opacity/positioning from its parent.
// colors reference the spring-meadows palette via css variables.

export function SketchUnderline({ className = "", color = "var(--terracotta)", style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 30 2, 60 12, 95 6 S 160 2, 198 9"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchCircle({ className = "", color = "var(--horizon)", style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 60"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M60 4 C 95 4, 116 16, 116 30 C 116 46, 92 56, 58 56 C 24 56, 4 46, 4 30 C 4 14, 26 4, 62 4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchArrow({ className = "", color = "var(--olive)", style, flip = false }) {
  return (
    <svg
      className={className}
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
      viewBox="0 0 100 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8 C 28 6, 50 22, 60 44"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 36 L 62 46 L 54 52"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchStar({ className = "", color = "var(--buttercup)", style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M20 4 L20 36 M4 20 L36 20 M8 8 L32 32 M32 8 L8 32" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SketchSpiral({ className = "", color = "var(--lavender)", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path
        d="M30 30 m -2 0 a 2 2 0 1 1 4 0 a 4 4 0 1 1 -8 0 a 8 8 0 1 1 16 0 a 12 12 0 1 1 -24 0"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchScribble({ className = "", color = "var(--neptune)", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 30" fill="none" aria-hidden="true">
      <path
        d="M2 20 C 10 4, 18 28, 26 14 S 42 26, 50 12 S 68 24, 78 10"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function SketchSparkle({ className = "", color = "var(--rose)", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 C 12 8, 14 10, 22 12 C 14 14, 12 16, 12 22 C 12 16, 10 14, 2 12 C 10 10, 12 8, 12 2 Z"
        fill={color}
        opacity="0.7"
      />
    </svg>
  );
}

export function SketchHeart({ className = "", color = "var(--herald)", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 27 C 6 20, 2 14, 6 9 C 9 5, 14 7, 16 11 C 18 7, 23 5, 26 9 C 30 14, 26 20, 16 27 Z"
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// a small handwritten note with an arrow used as a margin annotation.
// pass `rotate` (degrees) to add a casual tilt.
export function HandNote({
  text,
  className = "",
  color = "var(--terracotta)",
  rotate = -4,
  arrow = "down-left",
  style,
}) {
  const arrows = {
    "down-left": "M4 4 C 14 12, 22 22, 32 38 M22 32 L 32 40 L 26 44",
    "down-right": "M40 4 C 30 12, 22 22, 12 38 M22 32 L 12 40 L 18 44",
    "up-left": "M4 44 C 14 36, 22 26, 32 10 M22 16 L 32 8 L 26 4",
    "up-right": "M40 44 C 30 36, 22 26, 12 10 M22 16 L 12 8 L 18 4",
    right: "M2 12 L 38 12 M30 6 L 40 12 L 30 18",
    left: "M40 12 L 4 12 M14 6 L 4 12 L 14 18",
  };
  return (
    <div
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      <span
        className="font-hand text-lg md:text-xl leading-none whitespace-nowrap"
        style={{ color }}
      >
        {text}
      </span>
      <svg
        viewBox="0 0 44 48"
        fill="none"
        className="w-8 h-8 mt-1"
        style={{ color }}
      >
        <path
          d={arrows[arrow]}
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
