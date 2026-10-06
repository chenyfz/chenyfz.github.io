type Content = { title?: string; description: string; muted?: string };

export default function SectionText({ content }: { content: readonly Content[] }) {
  return <div className="space-y-4">
    {content.map((item, index) => <div key={index} className="space-y-1.5">
      {item.title && <h4 className="page-muted">{item.title}</h4>}
      <p className="leading-relaxed">{item.description}</p>
      {item.muted && <p className="page-muted leading-relaxed">{item.muted}</p>}
    </div>)}
  </div>;
}
