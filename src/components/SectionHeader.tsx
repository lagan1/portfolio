import Reveal from './Reveal';
import DecodeText from './DecodeText';

interface SectionHeaderProps {
  index: string;
  title: string;
  note?: string;
}

/** Blueprint-style section header: index tag, dimension line, decoded title. */
export default function SectionHeader({ index, title, note }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="dim-label text-accent">{index}</span>
        <span className="h-px flex-1 bg-line" />
        {note && <span className="dim-label hidden sm:inline">{note}</span>}
      </div>
      <h2 className="mt-5 font-serif text-4xl tracking-tightest text-fg sm:text-5xl md:text-6xl">
        <DecodeText text={title} />
      </h2>
    </Reveal>
  );
}
