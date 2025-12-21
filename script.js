const GITHUB_USER = "imtiredwhenitalk";

const elements = {
  avatar: document.getElementById("avatar"),
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  status: document.getElementById("status"),
  grid: document.getElementById("projectsGrid"),
  sort: document.getElementById("sortSelect"),
  githubLink: document.getElementById("githubLink"),
  githubUser: document.getElementById("githubUser"),
  year: document.getElementById("year"),
  debugDetails: document.getElementById("debugDetails"),
  debugLog: document.getElementById("debugLog"),
};

function setStatus(message, { isError = false } = {}) {
  elements.status.textContent = message;
  elements.status.classList.toggle("error", isError);
}

function logDebug(obj) {
  try {
    elements.debugLog.textContent = JSON.stringify(obj, null, 2);
  } catch {
    elements.debugLog.textContent = String(obj);
  }
}

function formatDate(iso) {
  try {
    const dt = new Date(iso);
    // Choose locale: en-GB (21 Dec 2025) or en-US (Dec 21, 2025).
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(dt);
  } catch {
    return "—";
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function repoCard(repo) {
  const name = escapeHtml(repo.name);
  const desc = escapeHtml(repo.description ?? "No description");
  const lang = escapeHtml(repo.language ?? "—");
  const stars = repo.stargazers_count ?? 0;
  const updated = formatDate(repo.pushed_at ?? repo.updated_at);
  const url = repo.html_url;

  return `
    <article class="project">
      <div class="projectTop">
        <a class="projectName" href="${url}" target="_blank" rel="noreferrer">${name}</a>
        <div class="badges" aria-label="Metadata">
          <span class="badge" title="Language">${lang}</span>
          <span class="badge" title="Stars">★ ${stars}</span>
        </div>
      </div>
      <p class="projectDesc">${desc}</p>
      <div class="projectMeta">
        <span class="small">Updated: ${updated}</span>
        ${repo.homepage ? `<a class="small" href="${repo.homepage}" target="_blank" rel="noreferrer">Demo</a>` : ""}
      </div>
    </article>
  `;
}

function sortRepos(repos, mode) {
  const copy = [...repos];
  if (mode === "name") {
    copy.sort((a, b) => (a.name || "").localeCompare(b.name || "", "en"));
    return copy;
  }
  if (mode === "stars") {
    copy.sort(
      (a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
    );
    return copy;
  }
  copy.sort((a, b) => {
    const ad = new Date(a.pushed_at ?? a.updated_at ?? 0).getTime();
    const bd = new Date(b.pushed_at ?? b.updated_at ?? 0).getTime();
    return bd - ad;
  });
  return copy;
}

function renderRepos(repos) {
  const sorted = sortRepos(repos, elements.sort.value);

  if (!sorted.length) {
    elements.grid.innerHTML = "";
    setStatus("No repositories to show.", { isError: true });
    return;
  }

  elements.grid.innerHTML = sorted.map(repoCard).join("");
  setStatus(`Shown: ${sorted.length} repositories.`);

  // Trigger subtle reveal animations (respects prefers-reduced-motion via CSS).
  const cards = elements.grid.querySelectorAll(".project");
  cards.forEach((el, i) => {
    el.style.animationDelay = `${Math.min(i, 10) * 55}ms`;
    // Next frame so styles apply before class is added.
    requestAnimationFrame(() => el.classList.add("isVisible"));
  });
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      typeof data === "object" && data && data.message
        ? data.message
        : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

function takeTopRepos(repos) {
  // “My work”: remove forks, archived repos, and empty ones.
  const filtered = repos
    .filter((r) => !r.fork)
    .filter((r) => !r.archived)
    .filter((r) => (r.size ?? 0) > 0);

  // Take top 8 by stars; if none, just take first 8.
  const byStars = [...filtered].sort(
    (a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0)
  );
  const top = byStars.slice(0, 8);
  return top.length ? top : filtered.slice(0, 8);
}

async function init() {
  elements.year.textContent = String(new Date().getFullYear());
  elements.githubLink.href = `https://github.com/${GITHUB_USER}`;
  elements.githubUser.href = `https://github.com/${GITHUB_USER}`;
  elements.githubUser.textContent = GITHUB_USER;

  setStatus("Loading repositories…");

  try {
    const [profile, repos] = await Promise.all([
      fetchJson(`https://api.github.com/users/${GITHUB_USER}`),
      fetchJson(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
      ),
    ]);

    if (profile?.name) {
      elements.title.textContent = `Portfolio — ${profile.name}`;
    } else {
      elements.title.textContent = `Portfolio — ${GITHUB_USER}`;
    }

    if (profile?.bio) {
      elements.subtitle.textContent = profile.bio;
    }

    const chosen = takeTopRepos(Array.isArray(repos) ? repos : []);

    logDebug({
      user: GITHUB_USER,
      fetchedRepos: Array.isArray(repos) ? repos.length : null,
      showing: chosen.length,
      profile: {
        name: profile?.name,
        bio: profile?.bio,
        html_url: profile?.html_url,
      },
    });

    renderRepos(chosen);

    elements.sort.addEventListener("change", () => renderRepos(chosen));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    setStatus(
      `Failed to load data from GitHub (maybe no internet connection or API rate limit). Error: ${message}`,
      { isError: true }
    );

    logDebug({
      error: message,
      note: "Try opening the page later or just refresh. The GitHub API has a rate limit for unauthenticated requests.",
    });

    // Minimal offline fallback (so the page doesn't look empty)
    elements.grid.innerHTML = [
      {
        name: "Projects from GitHub",
        description: "Turn on the internet and your repositories will appear here.",
        language: "—",
        stargazers_count: 0,
        pushed_at: new Date().toISOString(),
        html_url: `https://github.com/${GITHUB_USER}`,
      },
    ]
      .map(repoCard)
      .join("");
  }
}

init();
