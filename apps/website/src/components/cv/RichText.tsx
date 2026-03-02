import React from 'react';

type RichTextMode = 'inline' | 'block';

interface RichTextProps {
  text: string;
  isDark: boolean;
  mode?: RichTextMode;
  className?: string;
}

function parseInline(text: string, linkClass: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^\)]+\))/g;
  let cursor = 0;
  let tokenMatch = tokenRegex.exec(text);

  while (tokenMatch) {
    const token = tokenMatch[0];
    const tokenIndex = tokenMatch.index;

    if (tokenIndex > cursor) {
      nodes.push(text.slice(cursor, tokenIndex));
    }

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={`bold-${tokenIndex}`}>{token.slice(2, -2)}</strong>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isExternal = /^https?:\/\//.test(href);
        nodes.push(
          <a
            key={`link-${tokenIndex}`}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            className={`underline underline-offset-4 transition ${linkClass}`}
          >
            {label}
          </a>
        );
      } else {
        nodes.push(token);
      }
    }

    cursor = tokenIndex + token.length;
    tokenMatch = tokenRegex.exec(text);
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function renderBlocks(text: string, isDark: boolean, linkClass: string): React.ReactNode[] {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];

  type ListEntry = { level: number; content: string };

  let paragraphLines: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listEntries: ListEntry[] = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    const content = paragraphLines.join(' ').trim();
    if (content) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="leading-relaxed">
          {parseInline(content, linkClass)}
        </p>
      );
    }
    paragraphLines = [];
  };

  const flushList = () => {
    if (!listType || !listEntries.length) return;

    const normalized: ListEntry[] = [];
    let previousLevel = 0;
    for (const entry of listEntries) {
      const level = Math.max(0, Math.min(entry.level, previousLevel + 1));
      normalized.push({ level, content: entry.content });
      previousLevel = level;
    }

    type TreeNode = { content: string; children: TreeNode[] };
    const root: TreeNode = { content: '', children: [] };
    const stack: Array<{ level: number; node: TreeNode }> = [{ level: -1, node: root }];

    for (const entry of normalized) {
      while (stack.length > 1 && stack[stack.length - 1].level >= entry.level) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].node;
      const node: TreeNode = { content: entry.content, children: [] };
      parent.children.push(node);
      stack.push({ level: entry.level, node });
    }

    const renderTree = (nodes: TreeNode[], depth: number): React.ReactElement => {
      const ListTag: 'ul' | 'ol' = (listType ?? 'ul') as 'ul' | 'ol';
      const baseClass = listType === 'ul' ? 'list-disc' : 'list-decimal';
      const depthIndent = depth === 0 ? 'pl-6' : 'pl-5';
      return (
        <ListTag className={`${baseClass} space-y-1 ${depthIndent}`}>
          {nodes.map((node, index) => (
            <li key={`${depth}-${index}`} className="leading-relaxed">
              {parseInline(node.content, linkClass)}
              {node.children.length > 0 ? renderTree(node.children, depth + 1) : null}
            </li>
          ))}
        </ListTag>
      );
    };

    blocks.push(React.cloneElement(renderTree(root.children, 0), { key: `list-${blocks.length}` }));
    listType = null;
    listEntries = [];
  };

  for (const rawLine of lines) {
    const raw = rawLine.replace(/\t/g, '  ');
    const line = raw.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();

      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const headingClass = isDark ? 'text-white/90' : 'text-neutral-900';
      const sizeClass = level === 2 ? 'text-[1.06em]' : 'text-[1em]';
      blocks.push(
        <h4 key={`h-${blocks.length}`} className={`${headingClass} ${sizeClass} font-medium`}>
          {parseInline(content, linkClass)}
        </h4>
      );
      continue;
    }

    const unorderedMatch = raw.match(/^(\s*)-\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listEntries.push({
        level: Math.floor(unorderedMatch[1].length / 2),
        content: unorderedMatch[2].trim()
      });
      continue;
    }

    const orderedMatch = raw.match(/^(\s*)\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listEntries.push({
        level: Math.floor(orderedMatch[1].length / 2),
        content: orderedMatch[2].trim()
      });
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export default function RichText({ text, isDark, mode = 'inline', className = '' }: RichTextProps) {
  const linkClass =
    'text-[var(--primary-color)] decoration-[var(--primary-color)]/85 hover:text-[var(--primary-hover)] hover:decoration-[var(--primary-hover)]/95';

  if (mode === 'inline') {
    return <span className={className}>{parseInline(text, linkClass)}</span>;
  }

  return <div className={`space-y-2.5 ${className}`}>{renderBlocks(text, isDark, linkClass)}</div>;
}
