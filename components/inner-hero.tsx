type InnerHeroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  copy: string;
  dark?: boolean;
};

export function InnerHero({ eyebrow, title, accent, copy, dark = false }: InnerHeroProps) {
  return (
    <section className={`inner-hero ${dark ? 'inner-hero-dark' : ''}`}>
      <p>{eyebrow}</p>
      <h1>{title}{accent && <><br /><em>{accent}</em></>}</h1>
      <span>{copy}</span>
    </section>
  );
}
