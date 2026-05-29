/**
 * Crea y retorna el componente Footer de Rick & Morty.
 * @returns {HTMLElement} El elemento footer listo para ser insertado en el DOM.
 */
export function createFooter() {
    const footer = document.createElement('footer');
    footer.className = "w-full bg-[var(--rm-bg-secondary)] border-t border-[var(--rm-border)] mt-auto text-xs text-[var(--rm-text-muted)]";
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full border-2 border-[var(--rm-accent-plasma)] bg-[radial-gradient(circle_at_40%_40%,var(--rm-accent-portal),var(--rm-accent-plasma),var(--rm-bg-secondary))] flex-shrink-0"></div>
            <div>
              <p class="text-sm font-medium text-[var(--rm-text-primary)] leading-tight">Rick & Morty Explorer</p>
              <p class="text-xs text-[var(--rm-text-muted)] leading-tight">Multiverso C-137</p>
            </div>
          </div>
          <nav class="flex items-center gap-5">
            <a href="https://rickandmortyapi.com/documentation" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--rm-accent-plasma)] transition-colors text-[var(--rm-text-secondary)]">Docs</a>
            <a href="https://github.com/afuh/rick-and-morty-api" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--rm-accent-plasma)] transition-colors text-[var(--rm-text-secondary)]">GitHub</a>
          </nav>
        </div>
        <hr class="border-[var(--rm-border)]" />
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--rm-text-secondary)]">
          <p class="text-center md:text-left">
            Datos desde la <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" class="text-[var(--rm-accent-plasma)] hover:text-[var(--rm-accent-portal)] transition-colors"> API pública de Rick & Morty </a>
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] text-[var(--rm-text-muted)]">
            <div class="flex gap-3 border-r border-[var(--rm-border)] pr-4">
              <span>Chars: <strong class="text-[var(--rm-text-primary)]">826</strong></span>
              <span>Locs: <strong class="text-[var(--rm-text-primary)]">126</strong></span>
              <span>Epis: <strong class="text-[var(--rm-text-primary)]">51</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 text-[10px] text-[var(--rm-success)] bg-[var(--rm-bg-primary)] border border-[var(--rm-border-accent)] rounded px-2 py-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--rm-success)] animate-pulse"></span> Server: Cronenberg Safe
              </span>
              <span>© 2026 | C-137</span>
            </div>
          </div>
        </div>
      </div>
    `;
    return footer;
}