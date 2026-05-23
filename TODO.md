# TODO

## Language (English + Kiswahili) switch
- [x] Implement language switch UI in `index.html`.
- [x] Add i18n keys (`data-i18n`) to all critical static text blocks in `index.html` (nav, hero, about, activities header, gallery header, leadership header, contact, footer).
- [x] Update `js/script.js` to include bilingual dictionary and `applyLanguage()` to translate:
  - gallery filter labels + badges
  - posts like/comment UI + comment placeholder + validation/success/error messages
  - dynamic time-ago labels (EN/SW)
  - activities + leadership generated titles/descriptions
  - any remaining text in JS.
- [x] Persist language in `localStorage` and initialize based on saved choice / browser language.
- [x] Update `<html lang>` and ensure aria-labels are translated.
- [x] Run a quick manual check in browser (toggle EN/SW; ensure no English leftovers in UI parts covered).

