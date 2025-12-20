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
    return new Intl.DateTimeFormat("uk-UA", {
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
  const desc = escapeHtml(repo.description ?? "Без опису");
  const lang = escapeHtml(repo.language ?? "—");
  const stars = repo.stargazers_count ?? 0;
  const updated = formatDate(repo.pushed_at ?? repo.updated_at);
  const url = repo.html_url;

  return `
    <article class="project">
      <div class="projectTop">
        <a class="projectName" href="${url}" target="_blank" rel="noreferrer">${name}</a>
        <div class="badges" aria-label="Метадані">
          <span class="badge" title="Мова">${lang}</span>
          <span class="badge" title="Зірки">★ ${stars}</span>
        </div>
      </div>
      <p class="projectDesc">${desc}</p>
      <div class="projectMeta">
        <span class="small">Оновлено: ${updated}</span>
        ${repo.homepage ? `<a class="small" href="${repo.homepage}" target="_blank" rel="noreferrer">Демо</a>` : ""}
      </div>
    </article>
  `;
}

function sortRepos(repos, mode) {
  const copy = [...repos];
  if (mode === "name") {
    copy.sort((a, b) => (a.name || "").localeCompare(b.name || "", "uk"));
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
    setStatus("Немає репозиторіїв для показу.", { isError: true });
    return;
  }

  elements.grid.innerHTML = sorted.map(repoCard).join("");
  setStatus(`Показано: ${sorted.length} репозиторіїв.`);

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
    const msg = typeof data === "object" && data && data.message ? data.message : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

function takeTopRepos(repos) {
  // “Мої роботи”: прибираємо форки, архівні, і беремо найцікавіші.
  const filtered = repos
    .filter((r) => !r.fork)
    .filter((r) => !r.archived)
    .filter((r) => (r.size ?? 0) > 0);

  // Візьмемо топ 8 по зірках, а потім стабілізуємо по оновленню.
  const byStars = [...filtered].sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0));
  const top = byStars.slice(0, 8);
  return top.length ? top : filtered.slice(0, 8);
}

async function init() {
  elements.year.textContent = String(new Date().getFullYear());
  elements.githubLink.href = `https://github.com/${GITHUB_USER}`;
  elements.githubUser.href = `https://github.com/${GITHUB_USER}`;
  elements.githubUser.textContent = GITHUB_USER;

  setStatus("Завантажую репозиторії…");

  try {
    const [profile, repos] = await Promise.all([
      fetchJson(`https://api.github.com/users/${GITHUB_USER}`),
      fetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
    ]);

    if (profile?.name) {
      elements.title.textContent = `Портфоліо — ${profile.name}`;
    } else {
      elements.title.textContent = `Портфоліо — ${GITHUB_USER}`;
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
    const message = err instanceof Error ? err.message : "Невідома помилка";
    setStatus(
      `Не вдалося завантажити дані з GitHub (можливо, немає інтернету або ліміт запитів). Помилка: ${message}`,
      { isError: true }
    );

    logDebug({
      error: message,
      note:
        "Спробуй відкрити сторінку пізніше або просто оновити. GitHub API має ліміт для неавторизованих запитів.",
    });

    // Мінімальний fallback (щоб сторінка не виглядала пустою офлайн)
    elements.grid.innerHTML = [
      {
        name: "Проєкти з GitHub",
        description: "Увімкни інтернет, і тут з’явиться список репозиторіїв.",
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
