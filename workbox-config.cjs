// eslint-disable-next-line no-undef
module.exports = {
	globDirectory: '../wwwroot/',
	globPatterns: [
		'**/*.{webmanifest,html,png}'
	],
	swSrc: 'src/sw.temp',
	swDest: 'src/sw.ts',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/,
	// 	/^he/
	// ]
};
