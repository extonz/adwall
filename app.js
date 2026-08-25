const wall = document.getElementById('ad-wall');
const slotCount = document.getElementById('slot-count');
const loadedCount = document.getElementById('loaded-count');

function pickFormat(index) {
  const pattern = [0, 1, 2, 5, 0, 6, 1, 2, 3, 0, 5, 4];
  return AD_FORMATS[pattern[index % pattern.length]];
}

function loadScript(src, async = true) {
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  script.referrerPolicy = 'no-referrer-when-downgrade';
  document.head.appendChild(script);
  return script;
}

function loadBanner(slot, format) {
  const config = document.createElement('script');
  config.textContent = `window.atOptions = ${JSON.stringify({
    key: format.key,
    format: 'iframe',
    height: format.height,
    width: format.width,
    params: {},
  })};`;
  slot.appendChild(config);

  const invoke = document.createElement('script');
  invoke.src = `${AD_PROVIDER_ORIGIN}/${format.key}/invoke.js`;
  invoke.async = true;
  slot.appendChild(invoke);
}

function loadNative(slot, index) {
  const containerId = `native-${index + 1}`;
  const container = document.createElement('div');
  container.id = `container-${AD_FORMATS[6].key}-${containerId}`;
  container.className = 'native-container';
  slot.appendChild(container);

  const invoke = document.createElement('script');
  invoke.src = `${AD_PROVIDER_ORIGIN}/${AD_FORMATS[6].key}/invoke.js`;
  invoke.async = true;
  slot.appendChild(invoke);
}

function createSlot(index) {
  const format = pickFormat(index);
  const slot = document.createElement('article');
  slot.className = 'ad-slot';
  slot.dataset.slot = `AD #${String(index + 1).padStart(3, '0')}`;
  slot.dataset.size = format.size;
  slot.setAttribute('aria-label', `Advertisement ${index + 1}, ${format.size}`);

  const label = document.createElement('div');
  label.className = 'slot-label';
  label.textContent = `AD #${String(index + 1).padStart(3, '0')} · ${format.size.toUpperCase()}`;
  slot.appendChild(label);

  if (format.type === 'native') {
    loadNative(slot, index);
  } else {
    loadBanner(slot, format);
  }

  return slot;
}

function loadSpecialProviderScripts() {
  for (const src of SPECIAL_SCRIPTS) loadScript(src);
}

function renderWall() {
  // These provider-level scripts are loaded once, as supplied by the owner.
  loadSpecialProviderScripts();

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < AD_SLOT_COUNT; i += 1) {
    fragment.appendChild(createSlot(i));
  }
  wall.appendChild(fragment);
  slotCount.textContent = AD_SLOT_COUNT;
  loadedCount.textContent = AD_SLOT_COUNT;
}

renderWall();
