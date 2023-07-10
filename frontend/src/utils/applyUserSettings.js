export const applyUserSettings = (settings) => {
	const root = document.documentElement;

	if (settings.dark_mode) {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
};
