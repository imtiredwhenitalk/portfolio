# Portfolio (static)

A minimal portfolio that fetches your repositories from the GitHub user **imtiredwhenitalk** via the GitHub API.

## How to run

- Open `index.html` in your browser.
- Or in VS Code: install **Live Server** and click **Go Live**.

## How the projects list works

- Data is fetched from:
  - `https://api.github.com/users/imtiredwhenitalk`
  - `https://api.github.com/users/imtiredwhenitalk/repos?per_page=100&sort=updated`
- The page shows up to 8 repositories that are:
  - not forks
  - not archived
  - not empty (size > 0)

## If projects don't load

The GitHub API has a rate limit for unauthenticated requests. Just refresh the page or try again later.

## GitHub Pages (publish as a website)

This repository is already ready for GitHub Pages (it is a static site).

1) Push the repository to GitHub.
2) In the repository, open: **Settings → Pages**
3) In **Build and deployment**, choose:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/(root)`
4) Save — in a minute you will get the website link.

Tip: if you want an address like `https://imtiredwhenitalk.github.io/`, create a repository named `imtiredwhenitalk.github.io`.
