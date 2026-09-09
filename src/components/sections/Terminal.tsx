import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { siteText } from '../../content';
import { runCommand } from '../../utils/terminal';

export function Terminal() {
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const log = useRef<HTMLDivElement>(null);
  function execute(event: FormEvent) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    setCommands(previous => command.toLowerCase() === 'clear' ? [] : [...previous, command].slice(-50));
    setHistory(previous => [...previous, command].slice(-100));
    setCursor(Math.min(history.length + 1, 100));
    setInput('');
    requestAnimationFrame(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; });
  }
  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const next = Math.max(0, Math.min(history.length, cursor + (event.key === 'ArrowUp' ? -1 : 1)));
    setCursor(next);
    setInput(history[next] ?? '');
  }
  return <div className="terminal">
    <div className="terminal-bar"><span className="terminal-lights" aria-hidden="true"><i /><i /><i /></span><span>{siteText.terminal.title}</span><span aria-hidden="true">⌘</span></div>
    <div className="terminal-log" ref={log} role="log" aria-live="polite" aria-relevant="additions text">
      <p className="terminal-intro">{siteText.terminal.intro}</p>
      {commands.map((command, index) => <div className="terminal-entry" key={index}><p><span className="terminal-prompt">{siteText.terminal.prompt}</span> {command}</p><pre>{runCommand(command)}</pre></div>)}
    </div>
    <form onSubmit={execute} className="terminal-form"><label htmlFor="terminal-command" className="terminal-prompt"><span aria-hidden="true">{siteText.terminal.prompt}</span><span className="sr-only">{siteText.terminal.input}</span></label><input id="terminal-command" value={input} onChange={event => setInput(event.target.value)} onKeyDown={navigateHistory} autoComplete="off" autoCapitalize="none" spellCheck={false} /><button type="submit" aria-label={siteText.terminal.submit}>↵</button></form>
    <div className="terminal-shortcuts">{Object.keys(siteText.terminal.help).filter(command => command !== 'clear').map(command => <button type="button" key={command} onClick={() => { setInput(command); document.getElementById('terminal-command')?.focus(); }}>{command}</button>)}</div>
  </div>;
}
