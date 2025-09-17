import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  text?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function PlaceholderImage({ text, width = 300, height = 300, className }: PlaceholderImageProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("bg-muted", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill="currentColor" fillOpacity={0.1} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        fontSize={width * 0.1}
        fontFamily="system-ui"
        fillOpacity={0.3}
      >
        {text || "No Image"}
      </text>
    </svg>
  );
}

export function generatePlaceholderDataURL(text = "No Image", width = 300, height = 300): string {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#f1f5f9" />
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="#94a3b8"
        font-size="${width * 0.1}"
        font-family="system-ui"
      >
        ${text}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
