export function footer() {
    const footer = document.createElement('footer')
    footer.className = "w-full bg-(--rm-bg-secondary) border-t border-(--rm-border) mt-auto text-xs text-(--rm-text-muted)"
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full border-2 border-(--rm-accent-plasma) bg-[radial-gradient(circle_at_40%_40%,var(--rm-accent-portal),var(--rm-accent-plasma),var(--rm-bg-secondary))] flex-shrink-0"></div>
            <div>
              <p class="text-sm font-medium text-(--rm-text-primary) leading-tight">Rick & Morty Explorer</p>
              <p class="text-xs text-(--rm-text-muted) leading-tight">C-137 Multiverse</p>
            </div>
          </div>
          <nav class="flex items-center gap-5">
            <a href="https://rickandmortyapi.com/documentation" target="_blank" rel="noopener noreferrer" class="hover:text-(--rm-accent-plasma) transition-colors text-(--rm-text-secondary)">Docs</a>
            <a href="https://github.com/afuh/rick-and-morty-api" target="_blank" rel="noopener noreferrer" class="hover:text-(--rm-accent-plasma) transition-colors text-(--rm-text-secondary)">GitHub</a>
          </nav>
        </div>
        <hr class="border-(--rm-border)" />
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-(--rm-text-secondary)">
          <p class="text-center md:text-left">
            Data from the <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" class="text-(--rm-accent-plasma) hover:text-(--rm-accent-portal) transition-colors"> public Rick & Morty API </a>
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] text-(--rm-text-muted)">
            <div class="flex gap-3 border-r border-(--rm-border) pr-4">
              <span>Chars: <strong class="text-(--rm-text-primary)">826</strong></span>
              <span>Locs: <strong class="text-(--rm-text-primary)">126</strong></span>
              <span>Epis: <strong class="text-(--rm-text-primary)">51</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 text-[10px] text-(--rm-success) bg-(--rm-bg-primary) border border-(--rm-border-accent) rounded px-2 py-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-(--rm-success) animate-pulse"></span> Server: Cronenberg Safe
              </span>
              <span>© 2026 | C-137</span>
            </div>
          </div>
        </div>
      </div>
    `
    return footer
}
