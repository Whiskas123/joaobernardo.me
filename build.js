#!/usr/bin/env node
// Writes index.html, en/index.html and es/index.html from assets/data/site.js,
// so the project list is in the HTML itself rather than drawn by JavaScript.
//
// Runs on every push (.github/workflows/pages.yml). To preview locally after
// editing site.js: `node build.js`.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'assets/data/site.js'), 'utf8'), sandbox);
const SITE = sandbox.window.SITE;

const ORIGIN = 'https://joaobernardo.me';
const PATHS = { pt: '/', en: '/en/', es: '/es/' };

const esc = (s) =>
	String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A field is either a plain value (same in every language) or keyed by language.
function t(value, lang) {
	if (value === undefined || value === null) return '';
	if (typeof value === 'object' && !Array.isArray(value)) {
		return value[lang] !== undefined ? value[lang] : value.pt;
	}
	return value;
}

// Awards are plain text in the hover preview (it vanishes before a link in it
// could be clicked) and links in the popup.
function awards(p, lang, linked) {
	return (p.awards || [])
		.map((award) => {
			const label = esc(t(award.label, lang));
			const body =
				linked && award.url
					? `<a href="${esc(award.url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
					: label;
			return `<span class="honor">${body}</span>`;
		})
		.join('');
}

function entry(p, lang, ui) {
	const title = t(p.title, lang);
	const description = t(p.description, lang);
	const attrs = [`href="${esc(t(p.url, lang))}"`, `data-title="${esc(title)}"`];

	if (description) attrs.push(`data-description="${esc(description + awards(p, lang, false))}"`);
	if (p.modal || p.awards) {
		const long = t(p.modal, lang) || description;
		attrs.push(`data-modal-description="${esc(long + awards(p, lang, true))}"`);
	}
	if (p.thumb) attrs.push(`data-thumb="${esc(p.thumb)}"`);
	if (p.popup) attrs.push('data-modal');
	if (p.flagship) attrs.push('data-flagship');
	if (p.gallery && p.gallery.length) {
		attrs.push(`data-gallery="${esc(p.gallery.join('|'))}"`);
		const alts = t(p.galleryAlt, lang);
		if (Array.isArray(alts)) attrs.push(`data-gallery-alt="${esc(alts.join('|'))}"`);
	}

	// Type and venue read as one unit: "opinião · Público".
	const meta = [t(p.type, lang), t(p.venue, lang)].filter(Boolean).join(' · ');
	const parts = [];
	if (p.year) parts.push(`<span class="entry__year">${esc(p.year)}</span>`);
	if (meta) parts.push(`<span class="entry__type">${esc(meta)}</span>`);
	if (p.flagship) {
		const label = esc(ui.flagshipLabel || '');
		parts.push(`<span class="entry__star" role="img" title="${label}" aria-label="${label}">★</span>`);
	}
	parts.push(`<span class="entry__title">${esc(title)}</span>`);

	return `\t\t\t\t\t\t\t<li><a ${attrs.join(' ')}>${parts.join('')}</a></li>`;
}

function shelf(s, lang, ui) {
	const flagshipsFirst = Boolean(SITE.config && SITE.config.flagshipsFirst);
	// Newest first, so a new project needs no reordering by hand. With
	// flagshipsFirst on, the starred ones float to the top of their shelf.
	const items = SITE.projects
		.filter((p) => p.shelf === s.id)
		.sort((a, b) => {
			if (flagshipsFirst && Boolean(a.flagship) !== Boolean(b.flagship)) return a.flagship ? -1 : 1;
			return (b.year || 0) - (a.year || 0);
		});
	if (!items.length) return '';

	const style = [s.tilt && `--tilt: ${s.tilt}`, s.tiltHover && `--tilt-hover: ${s.tiltHover}`]
		.filter(Boolean)
		.join('; ');
	return `\t\t\t\t\t<div class="section">
\t\t\t\t\t\t<h2 class="sectionHeader"><span class="disc"><img src="${esc(s.disc)}" alt="" style="${esc(style)}"></span>${esc(t(s.name, lang))}</h2>
\t\t\t\t\t\t<ul>
${items.map((p) => entry(p, lang, ui)).join('\n')}
\t\t\t\t\t\t</ul>
\t\t\t\t\t</div>`;
}

// Only the Portuguese page redirects: it is the default URL, so a visitor
// whose browser is in English or Spanish is sent on to their language.
const REDIRECT = `
		<script>
			(function () {
				if (location.search.indexOf('lang=pt') !== -1) return;
				if (/bot|crawler|spider|googlebot|bingbot|yandex|slurp|duckduckbot|baiduspider|facebookexternalhit|linkedinbot|twitterbot/i.test(navigator.userAgent)) return;
				var lang = (navigator.language || '').toLowerCase();
				if (lang.indexOf('en') === 0) {
					window.location.replace('/en/');
				} else if (lang.indexOf('es') === 0) {
					window.location.replace('/es/');
				}
			})();
		</script>`;

function page(lang) {
	const ui = SITE.ui[lang];
	const url = ORIGIN + PATHS[lang];
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'João Bernardo Narciso',
		url,
		jobTitle: 'Data Visualization',
		description: ui.description,
		sameAs: ['https://www.linkedin.com/in/joaobernardonarciso/'],
	};
	const switcher = Object.keys(PATHS)
		.map((l) => {
			const href = l === 'pt' ? '/?lang=pt' : PATHS[l];
			const active = l === lang ? ' class="is-active" aria-current="page"' : '';
			return `\t\t\t<a href="${href}"${active} data-lang="${l}">${l.toUpperCase()}</a>`;
		})
		.join('\n\t\t\t<span aria-hidden="true">/</span>\n');

	return `<!doctype html>
<!-- GERADO por build.js a partir de assets/data/site.js. Não editar à mão. -->
<html lang="${lang}">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>João Bernardo Narciso</title>
		<meta name="description" content="${esc(ui.description)}" />
		<link rel="canonical" href="${url}" />
${Object.keys(PATHS).map((l) => `\t\t<link rel="alternate" hreflang="${l}" href="${ORIGIN + PATHS[l]}" />`).join('\n')}
		<link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="João Bernardo Narciso" />
		<meta property="og:description" content="${esc(ui.description)}" />
		<meta property="og:url" content="${url}" />
		<meta property="og:image" content="${ORIGIN}/assets/images/share.jpg" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:card" content="summary_large_image" />
		<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32.png" />
		<link rel="icon" type="image/png" sizes="64x64" href="/assets/images/favicon-64.png" />
		<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
		<link rel="stylesheet" href="/assets/css/reset.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=Sansation:wght@300;400;700&display=swap"
		/>
		<link rel="stylesheet" href="/assets/css/styles.css" />
		<script defer src="https://cloud.umami.is/script.js" data-website-id="e553c8a9-fc2c-4e93-b020-e9d1462095bc"></script>
		<script type="application/ld+json">
${JSON.stringify(jsonLd, null, '\t').replace(/</g, '\\u003c')}
		</script>
	</head>
	<body>${lang === 'pt' ? REDIRECT : ''}
		<nav class="bubbles" aria-label="${esc(ui.linksLabel)}">
			<a class="bubble bubble--cv" href="/assets/files/CV.pdf" target="_blank" rel="noopener noreferrer">CV</a>
			<a class="bubble bubble--linkedin" href="https://www.linkedin.com/in/joaobernardonarciso/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
			<a class="bubble bubble--email" href="mailto:joaobernardonarciso@gmail.com">E-mail</a>
		</nav>
		<div class="langSwitcher">
${switcher}
		</div>
		<main class="columns">
			<div class="leftColumn">
				<header>
					<div class="headerTitle"><h1 class="headerTitleTitle">${esc(ui.hello)}</h1><img src="/assets/images/gilexpo.webp" alt=""></div>
					<div class="headerDescription"><p>${ui.blurb}</p></div>
				</header>
				<div class="preview" aria-hidden="true" data-idle="${esc((SITE.config && SITE.config.idlePreview) || 'none')}">
					<img class="preview__thumb" alt="">
					<p class="preview__description"></p>
				</div>
			</div>
			<div class="rightColumn">
				<div class="portfolio" aria-label="${esc(ui.listLabel)}">
${SITE.shelves.map((s) => shelf(s, lang, ui)).filter(Boolean).join('\n')}
				</div>
			</div>
		</main>
		<div class="projectModal" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle" hidden>
			<div class="projectModal__backdrop" data-close></div>
			<div class="projectModal__card">
				<div class="projectModal__header">
					<h2 class="projectModal__title" id="projectModalTitle"></h2>
					<button class="projectModal__close" type="button" aria-label="${esc(ui.close)}" data-close>×</button>
				</div>
				<img class="projectModal__thumb" alt="" hidden>
				<div class="projectModal__gallery" role="group" aria-label="${esc(ui.gallery)}" hidden></div>
				<div class="projectModal__galleryNav" hidden>
					<button type="button" data-gallery-step="-1" aria-label="${esc(ui.galleryPrev)}">←</button>
					<button type="button" data-gallery-step="1" aria-label="${esc(ui.galleryNext)}">→</button>
				</div>
				<p class="projectModal__description"></p>
				<a class="projectModal__link" target="_blank" rel="noopener noreferrer">${esc(ui.open)} ↗</a>
			</div>
		</div>
		<script src="/assets/js/main.js" defer></script>
	</body>
</html>
`;
}

for (const lang of Object.keys(PATHS)) {
	const html = page(lang);

	// Self-check: a typo in site.js should fail the build, not ship a hole.
	assert.strictEqual((html.match(/<h1[ >]/g) || []).length, 1, `${lang}: expected exactly one <h1>`);
	assert(!/undefined|\[object Object\]/.test(html), `${lang}: a field rendered as undefined/[object Object]`);
	for (const p of SITE.projects) {
		assert(SITE.shelves.some((s) => s.id === p.shelf), `${p.id}: unknown shelf "${p.shelf}"`);
		assert(html.includes(esc(t(p.title, lang))), `${lang}: "${p.id}" is missing from the page`);
	}

	const out = path.join(__dirname, PATHS[lang], 'index.html');
	fs.writeFileSync(out, html);
	console.log('wrote', path.relative(__dirname, out));
}
