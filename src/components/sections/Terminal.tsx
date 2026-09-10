import { useRef, useState, type KeyboardEvent } from 'react';
import { runCommand } from '../../utils/terminal';
import { usePreferences } from '../Preferences';
import { getSiteText } from '../../utils/i18n';
import { supportingText } from '../../content/supporting-sections';

if (typeof document !== 'undefined') void import('./supporting-sections.css');

export function Terminal() {
  const { language } = usePreferences();
  const siteText = getSiteText(language);
  const text = supportingText[language];
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const [cleared, setCleared] = useState(false);
  const log = useRef<HTMLDivElement>(null);
  function execute(value: string) {
    const command = value.trim();
    if (!command) return;
    setCleared(command.toLowerCase() === 'clear');
    setCommands(previous => command.toLowerCase() === 'clear' ? [] : [...previous, command].slice(-50));
    setHistory(previous => [...previous, command].slice(-100));
    setCursor(Math.min(history.length + 1, 100));
    setInput('');
    requestAnimationFrame(() => {
      if (log.current) log.current.scrollTop = (log.current.lastElementChild as HTMLElement | null)?.offsetTop ?? 0;
    });
  }
  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const next = Math.max(0, Math.min(history.length, cursor + (event.key === 'ArrowUp' ? -1 : 1)));
    setCursor(next);
    setInput(history[next] ?? '');
  }
  return <details className="terminal terminal-compact">
    <summary className="terminal-disclosure">{text.terminal}{' '}<small>{text.optional}</small></summary>
    <div className="terminal-content">
    <p className="terminal-intro" id="terminal-instructions">{text.intro}</p>
    <div className="terminal-log" ref={log} role="log" aria-label={text.output} aria-live="polite" aria-relevant="additions text" tabIndex={0}>
      {cleared && <p className="terminal-intro">{text.cleared}</p>}
      {commands.map((command, index) => <div className="terminal-entry" key={index}><p><span className="terminal-prompt" aria-hidden="true">$</span> {command}</p><pre>{runCommand(command, language)}</pre></div>)}
    </div>
    <form onSubmit={event => { event.preventDefault(); execute(input); }} className="terminal-form"><label htmlFor="terminal-command" className="terminal-prompt"><span aria-hidden="true">$</span><span className="sr-only">{siteText.terminal.input}</span></label><input id="terminal-command" aria-describedby="terminal-instructions" value={input} onChange={event => setInput(event.target.value)} onKeyDown={navigateHistory} autoComplete="off" autoCapitalize="none" spellCheck={false} /><button type="submit">{siteText.terminal.submit}</button></form>
    <div className="terminal-shortcuts" role="group" aria-label={text.shortcuts}>{Object.entries(siteText.terminal.help).map(([command, description]) => <button type="button" key={command} aria-label={`${siteText.terminal.submit} ${command}: ${description}`} onClick={() => execute(command)}>{command}</button>)}</div>
    </div>
  </details>;
}
