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


// Mobile project popup: tapping a project shows a modal instead of navigating.
(function () {
	const mobileMQ = window.matchMedia('(max-width: 768px)');
	const lang = (document.documentElement.lang || 'en').slice(0, 2);
	const labels = {
		pt: { open: 'Abrir', close: 'Fechar' },
		en: { open: 'Open', close: 'Close' },
		es: { open: 'Abrir', close: 'Cerrar' },
	};
	const t = labels[lang] || labels.en;
	let modal = null;

	function buildModal() {
		if (modal) return modal;
		modal = document.createElement('div');
		modal.className = 'projectModal';
		modal.hidden = true;
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('aria-modal', 'true');
		modal.innerHTML =
			'<div class="projectModal__backdrop" data-close></div>' +
			'<div class="projectModal__card">' +
			'<div class="projectModal__header">' +
			'<h2 class="projectModal__title"></h2>' +
			'<button class="projectModal__close" type="button" aria-label="' + t.close + '" data-close>×</button>' +
			'</div>' +
			'<img class="projectModal__thumb" alt="">' +
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

	function openModal(link) {
		const m = buildModal();
		const thumb = link.dataset.thumb || '';
		const description = link.dataset.description || '';
		const title = link.textContent.trim();
		m.querySelector('.projectModal__title').textContent = title;
		const thumbEl = m.querySelector('.projectModal__thumb');
		if (thumb) {
			thumbEl.src = thumb;
			thumbEl.alt = link.textContent.trim();
			thumbEl.hidden = false;
		} else {
			thumbEl.removeAttribute('src');
			thumbEl.hidden = true;
		}
		m.querySelector('.projectModal__description').innerHTML = description;
		m.querySelector('.projectModal__link').href = link.href;
		m.hidden = false;
		document.body.classList.add('is-modal-open');
	}

	function closeModal() {
		if (!modal) return;
		modal.hidden = true;
		document.body.classList.remove('is-modal-open');
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeModal();
	});

	// Use capture phase so we can prevent navigation before the link sees the click.
	document.addEventListener(
		'click',
		(e) => {
			if (!mobileMQ.matches) return;
			const link = e.target.closest('.section a[href]');
			if (!link) return;
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			openModal(link);
		},
		true
	);
})();
