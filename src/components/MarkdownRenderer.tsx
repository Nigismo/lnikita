import React from "react";

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Pattern order matters: images before links, bold before italic
  const regex = /!\[([^\]]*)\]\(([^)]+)\)|(\[([^\]]+)\]\(([^)]+)\))|\*\*(.+?)\*\*|\*(.+?)\*|~~(.+?)~~|`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined || match[2] !== undefined) {
      // Image ![alt](url)
      nodes.push(
        <img key={key++} src={match[2]} alt={match[1] || ""} className="my-4 max-w-full rounded-lg" loading="lazy" />
      );
    } else if (match[4] !== undefined) {
      // Link [text](url)
      nodes.push(
        <a key={key++} href={match[5]} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          {match[4]}
        </a>
      );
    } else if (match[6] !== undefined) {
      nodes.push(<strong key={key++}>{match[6]}</strong>);
    } else if (match[7] !== undefined) {
      nodes.push(<em key={key++}>{match[7]}</em>);
    } else if (match[8] !== undefined) {
      nodes.push(<del key={key++}>{match[8]}</del>);
    } else if (match[9] !== undefined) {
      nodes.push(
        <code key={key++} className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">{match[9]}</code>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={key++} className="my-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="text-sm font-mono">{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Table detection
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableRows.push(lines[i]);
        i++;
      }
      if (tableRows.length >= 2) {
        const parseRow = (row: string) =>
          row.split("|").slice(1, -1).map((c) => c.trim());
        const header = parseRow(tableRows[0]);
        // skip separator row (index 1)
        const body = tableRows.slice(2).map(parseRow);
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto">
            <table className="w-full border-collapse border border-border text-sm">
              <thead>
                <tr>
                  {header.map((h, j) => (
                    <th key={j} className="border border-border bg-muted px-3 py-2 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="border border-border px-3 py-2">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="my-4 border-l-4 border-primary/40 pl-4 italic text-muted-foreground">
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{parseInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="mt-6 mb-2 font-display text-lg font-semibold">{parseInline(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="mt-8 mb-3 font-display text-xl font-semibold">{parseInline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(<h1 key={key++} className="mt-6 mb-4 font-display text-2xl font-bold">{parseInline(line.slice(2))}</h1>);
      i++;
      continue;
    }

    // List item
    if (line.startsWith("- ")) {
      elements.push(<li key={key++} className="ml-4 list-disc text-muted-foreground">{parseInline(line.slice(2))}</li>);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<br key={key++} />);
      i++;
      continue;
    }

    // Paragraph
    elements.push(<p key={key++} className="text-muted-foreground leading-relaxed">{parseInline(line)}</p>);
    i++;
  }

  return <div className={className}>{elements}</div>;
}
