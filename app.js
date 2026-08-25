const wall = document.getElementById('ad-wall');
const slotCount = document.getElementById('slot-count');
const loadedCount = document.getElementById('loaded-count');

function pickFormat(index) {
  const pattern = [0, 1, 2, 5, 0, 6, 1, 2, 3, 0, 5, 4];
  return AD_FORMATS[pattern[index % pattern.length]];
}

function providerUrl(path) {
  return `${AD_PROVIDER_ORIGIN}/${path}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function bannerDocument(format) {
  const options = JSON.stringify({
    key: format.key,
    format: 'iframe',
    height: format.height,
    width: format.width,
    params: {},
  });

  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden;width:100%;min-height:${format.height}px}body{display:flex;align-items:flex-start;justify-content:center}*{box-sizing:border-box}</style>
</head><body>
<script>var atOptions=${options};<\/script>
<script src="${providerUrl(`${format.key}/invoke.js`)}"></script>
</body></html>`;
}

function nativeDocument(format, index) {
  const containerId = `container-${format.key}-${index + 1}`;
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;background:transparent;width:100%;min-height:120px;overflow:hidden}#${escapeHtml(containerId)}{width:100%;min-height:120px}</style>
</head><body>
<div id="${escapeHtml(containerId)}"></div>
<script async data-cfasync="false" src="${providerUrl(`${format.key}/invoke.js`)}"></script>
</body></html>`;
}

function createAdFrame(format, index) {
  const frame = document.createElement('iframe');
  frame.className = 'ad-frame';
  frame.title = `Advertisement ${index + 1}`;
  frame.loading = 'eager';
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('allowtransparency', 'true');
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.style.width = format.width ? `${format.width}px` : '100%';
  frame.style.height = `${format.height || 120}px`;
  frame.srcdoc = format.type === 'native'
    ? nativeDocument(format, index)
    : bannerDocument(format);
  return frame;
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
  slot.appendChild(createAdFrame(format, index));
  return slot;
}

function loadSpecialProviderScripts() {
  // These two scripts were supplied as provider-level units. They are loaded
  // once, separately from the 200 isolated ad frames.
  for (const src of SPECIAL_SCRIPTS) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    document.head.appendChild(script);
  }
}

function renderWall() {
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
