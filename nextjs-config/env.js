const resolve = require('./resolve');

const getCommitInfo = (path, format) =>
  require('child_process').execSync(`git log -1 --pretty="format:${format}" ${path}`).toString();
/*
const smartphoneLandingPagePath = resolve('src/external-assets/landing-pages/smartphone/index.html');
const smartphoneLandingPageHash = getCommitInfo(smartphoneLandingPagePath, '%H');
const smartphoneLandingPageDate = getCommitInfo(smartphoneLandingPagePath, '%cI');

module.exports = {
  SMARTPHONE_LANDING_PAGE_HASH: smartphoneLandingPageHash,
  SMARTPHONE_LANDING_PAGE_DATE: smartphoneLandingPageDate,
};
*/