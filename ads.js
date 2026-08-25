// AdWall provider formats supplied by the site owner.
// All 200 slots render on the initial page load. No automatic refresh.
const AD_FORMATS = [
  { type: 'banner', size: '728x90', width: 728, height: 90, key: '342200d7dd84270da74174ec43b1df62' },
  { type: 'banner', size: '468x60', width: 468, height: 60, key: 'b82141d9a63d75f321b572f1b5d7de0c' },
  { type: 'banner', size: '300x250', width: 300, height: 250, key: '92fc5a0a4897390ee56346daf4cc2898' },
  { type: 'banner', size: '160x300', width: 160, height: 300, key: '6934b21935d3c7afd0f379300d8ecd02' },
  { type: 'banner', size: '160x600', width: 160, height: 600, key: 'fe55c4b8af5fdb2505bd5cd17b23cfb6' },
  { type: 'banner', size: '320x50', width: 320, height: 50, key: '35a6cbda469035bd82bbfc64b44d6699' },
  { type: 'native', size: 'native', width: 0, height: 120, key: 'da6ec01579bd2e2095c2e305e4275f90' },
];

const AD_SLOT_COUNT = 200;
const AD_PROVIDER_ORIGIN = 'https://servicessitclaims.com';
const SPECIAL_SCRIPTS = [
  `${AD_PROVIDER_ORIGIN}/c7/3e/a0/c73ea0b2557f94dd9c14156906af9317.js`,
  `${AD_PROVIDER_ORIGIN}/57/41/9a/57419a539cf7a45fee8289bb518d24cc.js`,
];
const SMARTLINK_URL = `${AD_PROVIDER_ORIGIN}/q5ph7h40q?key=31572786d104a7b89ebf6d5d90ad490b`;
