# Portfolio (static)

Мінімальне портфоліо, яке підтягує твої репозиторії з GitHub користувача **imtiredwhenitalk** через GitHub API.

## Як запустити

- Відкрий `web/Portfolio/index.html` у браузері.
- Або у VS Code: встанови Live Server і натисни **Go Live**.

## Як працює список проєктів

- Дані беруться з:
  - `https://api.github.com/users/imtiredwhenitalk`
  - `https://api.github.com/users/imtiredwhenitalk/repos?per_page=100&sort=updated`
- Сторінка показує до 8 нефоркнутих, неархівних репозиторіїв (топ по зірках або, якщо зірок нема, перші за оновленням).

## Якщо проєкти не завантажуються

GitHub API має ліміт для неавторизованих запитів. Просто перезавантаж сторінку або спробуй пізніше.

## GitHub Pages (опублікувати як сайт)

У цьому workspace я вже підготував папку `docs/` у корені (копія цього сайту), щоб GitHub Pages міг її підхопити.

1) Завантаж на GitHub репозиторій з папкою `docs/` (через GitHub Desktop або просто Upload files у веб-інтерфейсі).
2) В репозиторії відкрий: **Settings → Pages**
3) У **Build and deployment** вибери:
  - **Source**: Deploy from a branch
  - **Branch**: `main`
  - **Folder**: `/docs`
4) Збережи — через хвилину з’явиться посилання на сайт.

Порада: якщо ти хочеш адресу типу `https://imtiredwhenitalk.github.io/`, створи репозиторій з назвою `imtiredwhenitalk.github.io`.
