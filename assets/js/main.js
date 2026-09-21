// Site scripts for joaobernardo.me

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
		previewThumb.alt = link.textContent.trim();
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


// Persist language preference when user clicks the switcher.



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


// Project popup: a modal instead of navigating. Always on mobile; on desktop
// only for links that opt in with `data-modal` (projects with a photo gallery).
(function () {
	const mobileMQ = window.matchMedia('(max-width: 768px)');
	const lang = (document.documentElement.lang || 'en').slice(0, 2);
	const labels = {
		pt: { open: 'Abrir', close: 'Fechar', gallery: 'Fotografias do projeto' },
		en: { open: 'Open', close: 'Close', gallery: 'Project photographs' },
		es: { open: 'Abrir', close: 'Cerrar', gallery: 'Fotografías del proyecto' },
	};
	const t = labels[lang] || labels.en;
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
			'<button class="projectModal__close" type="button" aria-label="' + t.close + '" data-close>×</button>' +
			'</div>' +
			'<img class="projectModal__thumb" alt="">' +
			'<div class="projectModal__gallery" role="group" aria-label="' + t.gallery + '" hidden></div>' +
			'<p class="projectModal__description"></p>' +
			'<a class="projectModal__link" target="_blank" rel="noopener noreferrer">' + t.open + ' ↗</a>' +
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
		const title = link.textContent.trim();
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
