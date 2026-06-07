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
