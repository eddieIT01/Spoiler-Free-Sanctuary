import defaultGuides from '../data/guides'

const STORAGE_KEY = 'sfs_guides_v1'

export function getGuides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // ignore
  }
  return defaultGuides
}

export function saveGuides(guides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guides))
    // dispatch event so UI can update
    window.dispatchEvent(new CustomEvent('sfs:guides-updated'))
  } catch (e) {
    console.error('Failed to save guides', e)
  }
}
