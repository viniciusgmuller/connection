import React from 'react';

interface RichTextNode {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  indent?: number;
  children?: RichTextNode[];
  url?: string;
  fields?: { newTab?: boolean; url?: string };
}

interface RichTextProps {
  content: any;
  className?: string;
}

function getAlignClass(format: number | string | undefined): string {
  if (typeof format === 'string') {
    switch (format) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return '';
    }
  }
  return '';
}

function getIndentStyle(indent: number | undefined): React.CSSProperties | undefined {
  if (!indent) return undefined;
  return { paddingLeft: `${indent * 2}rem` };
}

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  // Text node
  if (node.text !== undefined) {
    let el: React.ReactNode = node.text;
    if (node.format && typeof node.format === 'number') {
      if (node.format & 16) el = <code key={`code-${index}`} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-gold">{el}</code>;
      if (node.format & 1) el = <strong key={`b-${index}`}>{el}</strong>;
      if (node.format & 2) el = <em key={`i-${index}`}>{el}</em>;
      if (node.format & 4) el = <s key={`s-${index}`}>{el}</s>;
      if (node.format & 8) el = <u key={`u-${index}`}>{el}</u>;
      if (node.format & 32) el = <sub key={`sub-${index}`}>{el}</sub>;
      if (node.format & 64) el = <sup key={`sup-${index}`}>{el}</sup>;
    }
    return el;
  }

  // Linebreak
  if (node.type === 'linebreak') {
    return <br key={index} />;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));
  const align = getAlignClass(node.format);
  const indentStyle = getIndentStyle(node.indent);
  const blockClass = [align].filter(Boolean).join(' ') || undefined;

  switch (node.type) {
    case 'heading': {
      const Tag = (node.tag || 'h3') as keyof React.JSX.IntrinsicElements;
      const sizeClass = node.tag === 'h1' ? 'text-2xl' : node.tag === 'h2' ? 'text-xl' : 'text-lg';
      return <Tag key={index} className={`font-heading ${sizeClass} text-text-light mb-2 mt-4 first:mt-0 ${align}`} style={indentStyle}>{children}</Tag>;
    }
    case 'paragraph':
      return <p key={index} className={`mb-2 last:mb-0 ${align}`} style={indentStyle}>{children}</p>;
    case 'list':
      if (node.tag === 'ol') return <ol key={index} className={`list-decimal pl-5 mb-2 space-y-1 ${align}`} style={indentStyle}>{children}</ol>;
      return <ul key={index} className={`list-disc pl-5 mb-2 space-y-1 ${align}`} style={indentStyle}>{children}</ul>;
    case 'listitem':
      return <li key={index} style={indentStyle}>{children}</li>;
    case 'link': {
      const url = node.url || node.fields?.url || '#';
      const newTab = node.fields?.newTab;
      return (
        <a
          key={index}
          href={url}
          className="underline text-gold"
          {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    }
    case 'quote':
      return (
        <blockquote key={index} className={`border-l-4 border-gold/40 pl-4 italic text-text-cream/80 mb-2 ${align}`} style={indentStyle}>
          {children}
        </blockquote>
      );
    default:
      return <React.Fragment key={index}>{children}</React.Fragment>;
  }
}

export function RichText({ content, className }: RichTextProps) {
  const root = content?.root;
  if (!root?.children) return null;

  return (
    <div className={className}>
      {root.children.map((node: RichTextNode, i: number) => renderNode(node, i))}
    </div>
  );
}
