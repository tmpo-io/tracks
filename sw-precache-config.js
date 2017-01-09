module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/manifest.json',
    'dist/**.js',
    'dist/**.css',
    'dist/**.svg'
  ]
};
