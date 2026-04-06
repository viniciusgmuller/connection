import React from 'react';

interface RichTextNode {
  type?: string;
  tag?: string;
  text?: string;
  format?: number;
  children?: RichTextNode[];
}

interface RichTextProps {
  content: any;
  className?: string;
}

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  // Text node
  if (node.text !== undefined) {
    let el: React.ReactNode = node.text;
    if (node.format) {
      if (node.format & 1) el = <strong key={index}>{el}</strong>;
      if (node.format & 2) el = <em key={index}>{el}</em>;
      if (node.format & 8) el = <u key={index}>{el}</u>;
    }
    return el;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case 'heading':
      const Tag = (node.tag || 'h3') as keyof React.JSX.IntrinsicElements;
      return <Tag key={index} className="font-heading text-lg text-text-light mb-2 mt-4 first:mt-0">{children}</Tag>;
    case 'paragraph':
      return <p key={index} className="mb-2 last:mb-0">{children}</p>;
    case 'list':
      if (node.tag === 'ol') return <ol key={index} className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>;
      return <ul key={index} className="list-disc pl-5 mb-2 space-y-1">{children}</ul>;
    case 'listitem':
      return <li key={index}>{children}</li>;
    case 'link':
      return <a key={index} className="underline text-gold">{children}</a>;
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
