# Tailwindcss classes extractor for VS Code

Extract Tailwindcss classes from HTML tag class attributes, generate CSS file and transforms initial HTML.

[mayoujin/vscode-twclasses-extractor](https://github.com/mayoujin/vscode-twclasses-extractor) of VS Code version.

No doubts that Tailwindcss utility framework is effective for rapid template layout coding and prototyping.
Furthermore, there are huge amount useful ready to use templates and UI kits in Tailwind classes form that we want to adopt in our projects.
However in modern frontend development it implies we to use templates in components framework layouts
and want to keep it simple, readable and clean.
So it is required to separate styles classes list from layout html or jsx template.
With this tool we could extract TW classes from class attributes and put in css files in form of @apply at-rules
or composes list in case of css modules. Later link them to html with BEM classes or css modules mechanisms.

## Usage

Open any HTML file with tw classes and do the following:

1. Open the command palette
    - Press `Cmd + Shift + P` on macOS or `Ctrl + Shift + P` on Windows / Linux
    - Go to `View` → `Command Palette`
1. Typing the `TailwindCss: Extract classes from HTML` and select

Then, the new styles file document with extracted classes would be created in new tab.
When in processed document they would be replaced with generated tw- prefixed classes names.

## Example

Source:

```html
<ul class="flex flex-col text-xl">
  <li class="ml-4 mb-1 font-light">One</li>
  <li class="ml-4 mb-1 font-light">Two</li>
</ul>
```

After processing the new styles file would be created:
```css
/* styles file */
ul.tw-b38b66d6 {
    @apply flex flex-col text-xl;
}
li.tw-ff72ee5f {
    @apply ml-4 mb-1 font-light;
}
```

Initial Html would be transformed to
```html
<ul class="tw-b38b66d6">
    <li class="tw-ff72ee5f">One</li>
    <li class="tw-ff72ee5f">Two</li>
</ul>
```

