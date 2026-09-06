# tom renard

my personal website. live at [tomrenard.site](https://tomrenard.site).

```bash
pnpm dev       # local dev
pnpm build     # production build
pnpm resume    # regenerate public/Tom_Renard_Resume.pdf
```

## Content

Pages are MDX in `app/`. Components available inside MDX are registered in
`mdx-components.tsx`.

`content/resume.ts` is the single source for the employment history. The `/work`
page and the resume PDF both render from it, so they cannot drift. Set
`onResume: false` on a bullet to keep it on the site but off the one page resume.

`pnpm resume` renders that data to print styled HTML and prints it with the
locally installed Chrome, so there is no extra dependency. Override the browser
with `CHROME_PATH` if needed.
