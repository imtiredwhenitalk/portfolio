# Portfolio (static)

Minimal static portfolio that loads **all public repositories** and **gists** from the GitHub user **imtiredwhenitalk** via the GitHub API.

Also includes a separate **“Cases (Production)”** section for real deployed projects that may not be represented as public repos.

## How to run

- Open `web/Portfolio/index.html` in your browser.
- Or in VS Code: install Live Server and click **Go Live**.

## How projects work

Data sources:
  - `https://api.github.com/users/imtiredwhenitalk`
  - `https://api.github.com/users/imtiredwhenitalk/repos?per_page=100&sort=updated`
The page shows all repositories (with Fork/Archived badges when applicable).

## How gists work

Data source:
  - `https://api.github.com/users/imtiredwhenitalk/gists?per_page=100`

## If data doesn’t load

GitHub API has a rate limit for unauthenticated requests. Refresh the page or try again later.

## GitHub Pages (publish as a website)

This workspace already includes a root `docs/` folder (a copy of the site) so GitHub Pages can serve it.

1) Push a repository that contains the `docs/` folder (GitHub Desktop or “Upload files”).
2) In the repository open: **Settings → Pages**
3) In **Build and deployment** select:
  - **Source**: Deploy from a branch
  - **Branch**: `main`
  - **Folder**: `/docs`
4) Save — in about a minute you’ll get the website link.

Tip: if you want an address like `https://imtiredwhenitalk.github.io/`, create a repo named `imtiredwhenitalk.github.io`.
