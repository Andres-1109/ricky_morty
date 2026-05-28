export function renderComingSoon(container, { label, id, backPath, backLabel }) {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-screen bg-(--rm-bg-primary)">
      <p class="text-xl text-(--rm-text-muted)">
        ${label} ${id} page — coming soon
      </p>
      <a
        href="${backPath}"
        onclick="event.preventDefault(); window.__router.navigate('${backPath}')"
        class="mt-4 underline cursor-pointer text-(--rm-accent-plasma)"
      >
        Back to ${backLabel}
      </a>
    </div>
  `
}
