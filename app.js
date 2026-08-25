const wall = document.getElementById('ad-wall');
const slotCount = document.getElementById('slot-count');
const loadedCount = document.getElementById('loaded-count');

function pickFormat(index) {
  // Weighted distribution: standard banners dominate, with occasional
  // larger/native units to make the wall visually varied.
  const pattern = [0, 1, 2, 0, 5, 0, 6, 1, 2, 3, 0, 4];
  return AD_FORMATS[pattern[index % pattern.length]];
}

function createSlot(index) {
  const format = pickFormat(index);
  const slot = document.createElement('article');
  slot.className = 'ad-slot';
  slot.dataset.slot = `AD #${String(index + 1).padStart(3, '0')}`;
  slot.dataset.size = format.size;
  slot.setAttribute('aria-label', `Advertisement ${index + 1}, ${format.size}`);

  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.textContent = `${format.size.toUpperCase()} · AD SLOT ${String(index + 1).padStart(3, '0')}`;
  slot.appendChild(placeholder);

  return slot;
}

function renderWall() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < AD_SLOT_COUNT; i += 1) {
    fragment.appendChild(createSlot(i));
  }
  wall.appendChild(fragment);
  slotCount.textContent = AD_SLOT_COUNT;
  loadedCount.textContent = AD_SLOT_COUNT;
}

renderWall();
