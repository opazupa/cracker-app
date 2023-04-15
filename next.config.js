/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  skipWaiting: false,
});

module.exports = withPWA({
  reactStrictMode: true,
});
