// Site scripts for joaobernardo.me
//
// Everything on the page comes from assets/data/site.js — projects, section
// names and translations alike. Nothing here needs editing to add a project.

const LANG = (document.documentElement.lang || 'pt').slice(0, 2);

// Picks the right language out of a field that may be either a plain value
// (same in every language) or an object keyed by language.
function t(value, fallback) {
	if (value === undefined || value === null) return fallback !== undefined ? fallback : '';
	if (typeof value === 'object' && !Array.isArray(value)) {
		return value[LANG] !== undefined ? value[LANG] : value.pt;
	}
	return value;
}

const SITE = window.SITE || { shelves: [], projects: [], ui: {}, config: {} };
const UI = (SITE.ui && (SITE.ui[LANG] || SITE.ui.pt)) || {};


// ── Render the portfolio list ────────────────────────────────────────────────

(function renderPortfolio() {
	const portfolio = document.querySelector('.portfolio');
	if (!portfolio) return;

	const flagshipsFirst = Boolean(SITE.config && SITE.config.flagshipsFirst);

	portfolio.textContent = '';
	portfolio.setAttribute('aria-label', UI.listLabel || '');

	SITE.shelves.forEach((shelf) => {
		const items = SITE.projects.filter((p) => p.shelf === shelf.id);
		if (!items.length) return;

		// Newest first, so a new project needs no reordering by hand. With
		// flagshipsFirst on, the starred ones float to the top of their shelf.
		items.sort((a, b) => {
			if (flagshipsFirst && Boolean(a.flagship) !== Boolean(b.flagship)) {
				return a.flagship ? -1 : 1;
			}
			return (b.year || 0) - (a.year || 0);
		});

		const section = document.createElement('div');
		section.className = 'section';

		const header = document.createElement('div');
		header.className = 'sectionHeader';
		header.textContent = t(shelf.name);

		const discWrap = document.createElement('span');
		discWrap.className = 'disc';
		const discImg = document.createElement('img');
		discImg.src = shelf.disc;
		discImg.alt = '';
		if (shelf.tilt) discImg.style.setProperty('--tilt', shelf.tilt);
		if (shelf.tiltHover) discImg.style.setProperty('--tilt-hover', shelf.tiltHover);
		discWrap.appendChild(discImg);
		header.prepend(discWrap);

		const list = document.createElement('ul');
		items.forEach((p) => list.appendChild(buildEntry(p)));

		section.appendChild(header);
		section.appendChild(list);
		portfolio.appendChild(section);
	});
})();


function buildEntry(p) {
	const title = t(p.title);
	const li = document.createElement('li');
	const a = document.createElement('a');

	a.href = t(p.url);
	a.dataset.title = title;

	// Awards hang off the description so they show in both the hover preview
	// and the popup, the way they always have.
	const description = t(p.description) + renderAwards(p.awards);
	if (description) a.dataset.description = description;

	if (p.modal) a.dataset.modalDescription = t(p.modal) + renderAwards(p.awards);
	if (p.thumb) a.dataset.thumb = p.thumb;
	if (p.popup) a.setAttribute('data-modal', '');

	if (p.gallery && p.gallery.length) {
		a.dataset.gallery = p.gallery.join('|');
		const alts = t(p.galleryAlt);
		if (Array.isArray(alts)) a.dataset.galleryAlt = alts.join('|');
	}

	if (p.year) {
		const year = document.createElement('span');
		year.className = 'entry__year';
		year.textContent = p.year;
		a.appendChild(year);
	}

	// Type and venue read as one unit: "opinião · Público".
	const type = t(p.type);
	const venue = t(p.venue);
	if (type || venue) {
		const meta = document.createElement('span');
		meta.className = 'entry__type';
		meta.textContent = [type, venue].filter(Boolean).join(' · ');
		a.appendChild(meta);
	}

	if (p.flagship) {
		const star = document.createElement('span');
		star.className = 'entry__star';
		star.textContent = '★';
		star.title = UI.flagshipLabel || '';
		star.setAttribute('aria-label', UI.flagshipLabel || '');
		star.setAttribute('role', 'img');
		a.appendChild(star);
	}

	const name = document.createElement('span');
	name.className = 'entry__title';
	name.textContent = title;
	a.appendChild(name);

	li.appendChild(a);
	return li;
}


function renderAwards(awards) {
	if (!Array.isArray(awards) || !awards.length) return '';
	return awards
		.map((award) => {
			const label = t(award.label);
			const link = award.url
				? '<a href="' + award.url + '" target="_blank" rel="noopener noreferrer">' + label + '</a>'
				: label;
			return '<span class="honor">' + link + '</span>';
		})
		.join('');
}


// ── Page copy ────────────────────────────────────────────────────────────────

(function fillCopy() {
	const hello = document.querySelector('.headerTitleTitle');
	if (hello && UI.hello) hello.textContent = UI.hello;

	const blurb = document.querySelector('.headerDescription p');
	if (blurb && UI.blurb) blurb.innerHTML = UI.blurb;

	const bubbles = document.querySelector('.bubbles');
	if (bubbles && UI.linksLabel) bubbles.setAttribute('aria-label', UI.linksLabel);
})();


// ── Bubble pop sounds ────────────────────────────────────────────────────────

// Preload bubble pop sounds so playback is instant on click.
const popSounds = ['pop1.mp3', 'pop2.mp3', 'pop3.mp3'].map((file) => {
	const audio = new Audio(`/assets/audio/${file}`);
	audio.preload = 'auto';
	return audio;
});

function playRandomPop() {
	const sound = popSounds[Math.floor(Math.random() * popSounds.length)];
	// Clone so rapid successive clicks don't cut off the previous sound.
	const instance = sound.cloneNode();
	instance.volume = 0.7;
	instance.play().catch(() => {
		// Browsers may block autoplay; ignore silently.
	});
}

document.querySelectorAll('.bubble').forEach((bubble) => {
	bubble.addEventListener('click', playRandomPop);
});


// ── Hover preview ────────────────────────────────────────────────────────────

// Project preview: show thumbnail and description in left column on hover.
const preview = document.querySelector('.preview');
const previewThumb = preview?.querySelector('.preview__thumb');
const previewDescription = preview?.querySelector('.preview__description');

function showPreview(link) {
	if (!preview) return;
	const thumb = link.dataset.thumb || '';
	const description = link.dataset.description || '';
	if (!thumb && !description) return;

	if (thumb) {
		previewThumb.src = thumb;
		previewThumb.alt = link.dataset.title || '';
	} else {
		previewThumb.removeAttribute('src');
	}
	previewDescription.innerHTML = description;
	preview.classList.add('is-visible');
	preview.setAttribute('aria-hidden', 'false');
}

function hidePreview() {
	if (!preview) return;
	preview.classList.remove('is-visible');
	preview.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.section a[href]').forEach((link) => {
	link.addEventListener('mouseenter', () => showPreview(link));
	link.addEventListener('focus', () => showPreview(link));
	link.addEventListener('mouseleave', hidePreview);
	link.addEventListener('blur', hidePreview);
});

// Preload preview thumbnails so they appear instantly on hover.
document.querySelectorAll('.section a[data-thumb]').forEach((link) => {
	const src = link.dataset.thumb;
	if (!src) return;
	const img = new Image();
	img.src = src;
});


// ── Analytics ────────────────────────────────────────────────────────────────

// Auto-tag outbound links so Umami records clicks before navigation.
// https://umami.is/docs/track-outbound-links
(() => {
	const eventName = 'outbound-link-click';
	document.querySelectorAll('a').forEach((a) => {
		if (a.host && a.host !== window.location.host && !a.getAttribute('data-umami-event')) {
			a.setAttribute('data-umami-event', eventName);
			a.setAttribute('data-umami-event-url', a.href);
		}
	});
})();


// ── Project popup ────────────────────────────────────────────────────────────

// Project popup: a modal instead of navigating. Always on mobile; on desktop
// only for links that opt in with `popup: true` (projects with a gallery or a
// longer description).
(function () {
	const mobileMQ = window.matchMedia('(max-width: 768px)');
	let modal = null;
	let lastFocused = null;

	function buildModal() {
		if (modal) return modal;
		modal = document.createElement('div');
		modal.className = 'projectModal';
		modal.hidden = true;
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('aria-modal', 'true');
		modal.setAttribute('aria-labelledby', 'projectModalTitle');
		modal.innerHTML =
			'<div class="projectModal__backdrop" data-close></div>' +
			'<div class="projectModal__card">' +
			'<div class="projectModal__header">' +
			'<h2 class="projectModal__title" id="projectModalTitle"></h2>' +
			'<button class="projectModal__close" type="button" aria-label="' + (UI.close || 'Close') + '" data-close>×</button>' +
			'</div>' +
			'<img class="projectModal__thumb" alt="">' +
			'<div class="projectModal__gallery" role="group" aria-label="' + (UI.gallery || '') + '" hidden></div>' +
			'<p class="projectModal__description"></p>' +
			'<a class="projectModal__link" target="_blank" rel="noopener noreferrer">' + (UI.open || 'Open') + ' ↗</a>' +
			'</div>';
		document.body.appendChild(modal);

		modal.addEventListener('click', (e) => {
			if (e.target.dataset && e.target.dataset.close !== undefined) {
				closeModal();
			}
		});
		return modal;
	}

	// `data-gallery` holds pipe-separated image paths; captions are optional and
	// line up with them positionally in `data-gallery-alt`.
	function fillGallery(galleryEl, link, title) {
		const sources = (link.dataset.gallery || '')
			.split('|')
			.map((s) => s.trim())
			.filter(Boolean);
		const alts = (link.dataset.galleryAlt || '').split('|').map((s) => s.trim());

		galleryEl.textContent = '';
		galleryEl.hidden = sources.length === 0;
		if (!sources.length) return;

		sources.forEach((src, i) => {
			const img = document.createElement('img');
			img.className = 'projectModal__galleryItem';
			img.src = src;
			img.alt = alts[i] || `${title} (${i + 1}/${sources.length})`;
			img.loading = i === 0 ? 'eager' : 'lazy';
			img.decoding = 'async';
			galleryEl.appendChild(img);
		});
	}

	function openModal(link) {
		const m = buildModal();
		const thumb = link.dataset.thumb || '';
		// The hover preview shares the left column with the bubbles, so it keeps
		// the short copy; the modal has room for a fuller one when it exists.
		const description = link.dataset.modalDescription || link.dataset.description || '';
		const title = link.dataset.title || '';
		const hasGallery = Boolean(link.dataset.gallery);

		m.querySelector('.projectModal__title').textContent = title;

		// The gallery replaces the single thumbnail when a project has one.
		const thumbEl = m.querySelector('.projectModal__thumb');
		if (thumb && !hasGallery) {
			thumbEl.src = thumb;
			thumbEl.alt = title;
			thumbEl.hidden = false;
		} else {
			thumbEl.removeAttribute('src');
			thumbEl.hidden = true;
		}

		fillGallery(m.querySelector('.projectModal__gallery'), link, title);
		m.classList.toggle('projectModal--wide', hasGallery);

		m.querySelector('.projectModal__description').innerHTML = description;
		m.querySelector('.projectModal__link').href = link.href;
		m.hidden = false;
		document.body.classList.add('is-modal-open');

		// The hover preview in the left column would otherwise stay up behind it.
		hidePreview();

		lastFocused = document.activeElement;
		m.querySelector('.projectModal__close').focus();
	}

	function closeModal() {
		if (!modal || modal.hidden) return;
		modal.hidden = true;
		document.body.classList.remove('is-modal-open');
		if (lastFocused && lastFocused.focus) lastFocused.focus();
		lastFocused = null;
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal();
	});

	// Use capture phase so we can prevent navigation before the link sees the click.
	document.addEventListener(
		'click',
		(e) => {
			const link = e.target.closest('.section a[href]');
			if (!link) return;
			if (!mobileMQ.matches && !link.hasAttribute('data-modal')) return;
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			openModal(link);
		},
		true
	);
})();
