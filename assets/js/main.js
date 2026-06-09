// Site scripts for joaobernardo.me

// Preload bubble pop sounds so playback is instant on click.
const popSounds = ['pop1.mp3', 'pop2.mp3', 'pop3.mp3'].map((file) => {
	const audio = new Audio(`assets/audio/${file}`);
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
	previewDescription.textContent = description;
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
