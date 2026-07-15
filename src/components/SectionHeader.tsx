import Reveal from './Reveal';
import DecodeText from './DecodeText';

interface SectionHeaderProps {
  /** the shell command that "produces" this section */
  cmd: string;
  title: string;
  note?: string;
}

/** Section header framed as a shell prompt: lagan@kali:~$ <cmd> */
export default function SectionHeader({ cmd, title, note }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
        <span className="whitespace-nowrap">
          <span className="text-accent">lagan@kali</span>
          <span className="text-faint">:~$</span>
        </span>
        <span className="truncate text-fg">{cmd}</span>
        <span className="rule-dashed min-w-4 flex-1" />
        {note && <span className="dim-label hidden whitespace-nowrap sm:inline">{note}</span>}
      </div>
      <h2 className="mt-5 font-mono text-3xl font-bold tracking-tightest text-fg sm:text-4xl md:text-5xl">
        <DecodeText text={title} />
      </h2>
    </Reveal>
  );
}
