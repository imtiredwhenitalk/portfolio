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
  gistsStatus: document.getElementById("gistsStatus"),
  gistsGrid: document.getElementById("gistsGrid"),
};

function setStatus(targetEl, message, { isError = false } = {}) {
  if (!targetEl) return;
  targetEl.textContent = message;
  targetEl.classList.toggle("error", isError);
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function repoCard(repo) {
  const name = escapeHtml(repo.name);
  const desc = escapeHtml(repo.description ?? "No description");
  const lang = escapeHtml(repo.language ?? "—");
  const stars = repo.stargazers_count ?? 0;
  const updated = formatDate(repo.pushed_at ?? repo.updated_at);
  const url = repo.html_url;
  const forkBadge = repo.fork ? `<span class="badge" title="Fork">Fork</span>` : "";
  const archivedBadge = repo.archived ? `<span class="badge" title="Archived">Archived</span>` : "";

  return `
    <article class="project">
      <div class="projectTop">
        <a class="projectName" href="${url}" target="_blank" rel="noreferrer">${name}</a>
        <div class="badges" aria-label="Metadata">
          <span class="badge" title="Language">${lang}</span>
          <span class="badge" title="Stars">★ ${stars}</span>
          ${forkBadge}
          ${archivedBadge}
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

function gistCard(gist) {
  const url = gist.html_url;
  const filesCount = gist?.files ? Object.keys(gist.files).length : 0;
  const updated = formatDate(gist.updated_at ?? gist.created_at);

  const title = escapeHtml(
    (gist.description && gist.description.trim()) ||
      (gist?.files ? Object.keys(gist.files)[0] : "Gist") ||
      "Gist"
  );

  const visibility = gist.public ? "Public" : "Secret";

  return `
    <article class="project">
      <div class="projectTop">
        <a class="projectName" href="${url}" target="_blank" rel="noreferrer">${title}</a>
        <div class="badges" aria-label="Metadata">
          <span class="badge" title="Visibility">${visibility}</span>
          <span class="badge" title="Files">${filesCount} file(s)</span>
        </div>
      </div>
      <p class="projectDesc">${escapeHtml(gist.description ?? "No description")}</p>
      <div class="projectMeta">
        <span class="small">Updated: ${updated}</span>
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
    copy.sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0));
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
    setStatus(elements.status, "No repositories to show.", { isError: true });
    return;
  }

  elements.grid.innerHTML = sorted.map(repoCard).join("");
  setStatus(elements.status, `Showing: ${sorted.length} repositories.`);

  const cards = elements.grid.querySelectorAll(".project");
  cards.forEach((el, i) => {
    el.style.animationDelay = `${Math.min(i, 10) * 55}ms`;
    requestAnimationFrame(() => el.classList.add("isVisible"));
  });
}

function parseNextLink(linkHeader) {
  if (!linkHeader) return null;
  const parts = linkHeader.split(",");
  for (const part of parts) {
    const [urlPartRaw, ...params] = part.split(";").map((s) => s.trim());
    const rel = params.find((p) => p.startsWith("rel="));
    if (rel && rel.includes('rel="next"')) {
      const match = urlPartRaw.match(/^<(.+)>$/);
      return match ? match[1] : null;
    }
  }
  return null;
}

async function fetchJsonResponse(url) {
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

  return { data, res };
}

function withPerPage(url, perPage = 100) {
  const u = new URL(url);
  u.searchParams.set("per_page", String(perPage));
  return u.toString();
}

async function fetchAllPages(url, { maxPages = 10 } = {}) {
  const items = [];
  let nextUrl = url;
  let pages = 0;

  while (nextUrl && pages < maxPages) {
    pages += 1;
    const { data, res } = await fetchJsonResponse(nextUrl);
    if (Array.isArray(data)) items.push(...data);

    const link = res.headers.get("Link");
    nextUrl = parseNextLink(link);
  }

  return items;
}

function renderGists(gists) {
  if (!elements.gistsGrid) return;

  const sorted = [...gists].sort((a, b) => {
    const ad = new Date(a.updated_at ?? a.created_at ?? 0).getTime();
    const bd = new Date(b.updated_at ?? b.created_at ?? 0).getTime();
    return bd - ad;
  });

  if (!sorted.length) {
    elements.gistsGrid.innerHTML = "";
    setStatus(elements.gistsStatus, "No gists to show.", { isError: false });
    return;
  }

  elements.gistsGrid.innerHTML = sorted.map(gistCard).join("");
  setStatus(elements.gistsStatus, `Showing: ${sorted.length} gists.`);

  const cards = elements.gistsGrid.querySelectorAll(".project");
  cards.forEach((el, i) => {
    el.style.animationDelay = `${Math.min(i, 10) * 55}ms`;
    requestAnimationFrame(() => el.classList.add("isVisible"));
  });
}

async function init() {
  if (elements.year) elements.year.textContent = String(new Date().getFullYear());
  if (elements.githubLink) elements.githubLink.href = `https://github.com/${GITHUB_USER}`;
  if (elements.githubUser) {
    elements.githubUser.href = `https://github.com/${GITHUB_USER}`;
    elements.githubUser.textContent = GITHUB_USER;
  }

  setStatus(elements.status, "Loading repositories…");
  setStatus(elements.gistsStatus, "Loading gists…");

  try {
    const reposUrl = withPerPage(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`, 100);
    const gistsUrl = withPerPage(`https://api.github.com/users/${GITHUB_USER}/gists`, 100);

    const [profileResp, repos, gists] = await Promise.all([
      fetchJsonResponse(`https://api.github.com/users/${GITHUB_USER}`),
      fetchAllPages(reposUrl, { maxPages: 10 }),
      fetchAllPages(gistsUrl, { maxPages: 10 }),
    ]);

    const profile = profileResp?.data;

    if (profile?.name && elements.title) {
      elements.title.textContent = `Portfolio — ${profile.name}`;
    } else if (elements.title) {
      elements.title.textContent = `Portfolio — ${GITHUB_USER}`;
    }


    if (profile?.bio && elements.subtitle) {
      elements.subtitle.textContent = profile.bio;
    }

    if (profile?.avatar_url && elements.avatar) {
      elements.avatar.src = profile.avatar_url;
      elements.avatar.alt = `Avatar ${GITHUB_USER}`;
    }

    const reposList = Array.isArray(repos) ? repos : [];
    const gistsList = Array.isArray(gists) ? gists : [];

    logDebug({
      user: GITHUB_USER,
      fetchedRepos: reposList.length,
      fetchedGists: gistsList.length,
      profile: {
        name: profile?.name,
        bio: profile?.bio,
        html_url: profile?.html_url,
      },
    });

    renderRepos(reposList);
    renderGists(gistsList);

    if (elements.sort) {
      elements.sort.addEventListener("change", () => renderRepos(reposList));
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    setStatus(
      elements.status,
      `Failed to load data from GitHub (no internet or API rate limit). Error: ${message}`,
      { isError: true }
    );

    setStatus(
      elements.gistsStatus,
      `Failed to load GitHub gists. Error: ${message}`,
      { isError: true }
    );

    logDebug({
      error: message,
      note:
        "Try refreshing later. GitHub API has a rate limit for unauthenticated requests.",
    });

    if (elements.grid) elements.grid.innerHTML = [
      {
        name: "GitHub projects",
        description: "Enable internet access and the repository list will appear here.",
        language: "—",
        stargazers_count: 0,
        pushed_at: new Date().toISOString(),
        html_url: `https://github.com/${GITHUB_USER}`,
      },
    ]
      .map(repoCard)
      .join("");

    if (elements.gistsGrid) {
      elements.gistsGrid.innerHTML = [
        {
          description: "GitHub gists",
          public: true,
          files: { "README.md": {} },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          html_url: `https://gist.github.com/${GITHUB_USER}`,
        },
      ]
        .map(gistCard)
        .join("");
    }
  }
}

init();
