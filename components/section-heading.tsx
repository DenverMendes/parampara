import { ArrowUpRight } from 'lucide-react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  action?: { label: string; href: string };
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  action,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {(copy || action) && (
        <div className="section-heading-aside">
          {copy && <p>{copy}</p>}
          {action && (
            <a href={action.href}>
              {action.label} <ArrowUpRight />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
