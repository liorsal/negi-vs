/**
 * Lior Accessibility Widget v2.0 (v0.6.0)
 * WCAG 2.1 AA & IS 5568 compliant
 * Self-contained widget - includes HTML, CSS, and JS
 * 
 * ✅ FULLY SELF-CONTAINED - No external dependencies except Google Fonts
 * ✅ Automatically injects all CSS and HTML into the page
 * ✅ Works with defer attribute
 * ✅ Compatible with Elementor, WordPress, and any HTML page
 * 
 * Usage:
 * <script src="https://cdn.jsdelivr.net/gh/liorsal/negi@main/widget-v2.js"
 *         data-logo-url="https://your-logo-url.com/logo.jpeg"
 *         defer></script>
 * 
 * Optional: data-logo-url - URL to your logo image (defaults to Vercel Storage)
 */

(function() {
  'use strict';

  // Prevent multiple initializations
  if (window.liorAccWidgetLoaded) {
    return;
  }
  window.liorAccWidgetLoaded = true;

  const doc = document;
  const root = doc.documentElement;

  // ============================================
  // LABELS FOR TRANSLATIONS (must be defined early)
  // ============================================
  const labels = {
    he: {
      settings: 'תפריט נגישות',
      increaseText: 'הגדלת טקסט',
      spacing: 'ריווח טקסט',
      highContrast: 'ניגודיות גבוהה',
      darkContrast: 'ניגודיות כהה',
      grayscale: 'גווני אפור',
      invert: 'היפוך צבעים',
      underlineLinks: 'קו תחתון לקישורים',
      highlightLinks: 'הדגשת קישורים',
      dyslexia: 'גופן נגיש (דיסלקסיה)',
      bigCursor: 'סמן עכבר גדול',
      noAnim: 'ביטול אנימציות',
      readingFocus: 'פוקוס קריאה',
      focusHighlight: 'הדגשת פוקוס',
      textToSpeech: 'קריאה בקול',
      reset: 'איפוס הגדרות',
      saveDefault: 'שמירה כהעדפת ברירת מחדל',
      saved: 'נשמר בהצלחה',
      resetDone: 'בוצע',
      enabled: 'הופעל',
      disabled: 'כובה',
      accessibilityDeclaration: 'הצהרת נגישות',
      visionMode: 'מצב לכבדי ראייה',
      dyslexiaMode: 'מצב לדיסלקציה',
      cognitiveMode: 'מצב לקושי קוגניטיבי',
      selectText: 'בחר טקסט להקראה'
    },
    en: {
      settings: 'Accessibility Settings',
      increaseText: 'Increase Text',
      spacing: 'Text Spacing',
      highContrast: 'High Contrast',
      darkContrast: 'Dark Contrast',
      grayscale: 'Grayscale',
      invert: 'Invert Colors',
      underlineLinks: 'Underline Links',
      highlightLinks: 'Highlight Links',
      dyslexia: 'Dyslexia Font',
      bigCursor: 'Big Cursor',
      noAnim: 'Disable Animations',
      readingFocus: 'Reading Focus',
      focusHighlight: 'Focus Highlight',
      textToSpeech: 'Text to Speech',
      reset: 'Reset Settings',
      saveDefault: 'Save as Default',
      saved: 'Saved Successfully',
      resetDone: 'Done',
      enabled: 'Enabled',
      disabled: 'Disabled',
      accessibilityDeclaration: 'Accessibility Statement',
      visionMode: 'Vision Mode',
      dyslexiaMode: 'Dyslexia Mode',
      cognitiveMode: 'Cognitive Mode',
      selectText: 'Select text to read'
    },
    ar: {
      settings: 'إعدادات إمكانية الوصول',
      increaseText: 'تكبير النص',
      spacing: 'تباعد النص',
      highContrast: 'تباين عالي',
      darkContrast: 'تباين داكن',
      grayscale: 'تدرج رمادي',
      invert: 'عكس الألوان',
      underlineLinks: 'تسطير الروابط',
      highlightLinks: 'تمييز الروابط',
      dyslexia: 'خط عسر القراءة',
      bigCursor: 'مؤشر كبير',
      noAnim: 'تعطيل الرسوم المتحركة',
      readingFocus: 'تركيز القراءة',
      focusHighlight: 'تمييز التركيز',
      textToSpeech: 'قراءة النص',
      reset: 'إعادة تعيين',
      saveDefault: 'حفظ كافتراضي',
      saved: 'تم الحفظ بنجاح',
      resetDone: 'تم',
      enabled: 'مفعل',
      disabled: 'معطل',
      accessibilityDeclaration: 'بيان إمكانية الوصول',
      visionMode: 'وضع الرؤية',
      dyslexiaMode: 'وضع عسر القراءة',
      cognitiveMode: 'وضع الإدراك',
      selectText: 'اختر النص للقراءة'
    }
  };

  // ============================================
  // CSS STYLES
  // ============================================
  const CSS = `
/* Lior Accessibility Widget - WCAG 2.1 AA & IS 5568 compliant */

:root {
  --lior-acc-z: 999999;
  --lior-acc-gap: 18px;
  --lior-acc-radius: 20px;
  --lior-acc-bg: #ffffff;
  --lior-acc-bg-subtle: #F2F2F7;
  --lior-acc-fg: #1a1a1a;
  --lior-acc-border: #E5E5EA;
  --lior-acc-shadow: 0 6px 18px rgba(0,0,0,0.06);
  --lior-acc-shadow-hover: 0 8px 24px rgba(0,0,0,0.1);
  --lior-acc-accent: #4A90E2;
  --lior-acc-accent-hover: #357ABD;
  --lior-acc-overlay: rgba(0,0,0,.5);
  --lior-acc-size: 78px;
  --lior-acc-panel-width: 360px;
  --lior-acc-focus-width: 3px;
  --lior-acc-focus-offset: 2px;
  --acc-fg: #111;
  --acc-bg: #fff;
  --acc-link: #0645ad;
}

:root.acc-high-contrast {
  --acc-fg: #000;
  --acc-bg: #fff;
  --acc-link: #0000ee;
}

:root.acc-dark-contrast {
  --acc-fg: #f4f4f4;
  --acc-bg: #000;
  --acc-link: #8ab4f8;
}

:root.acc-invert {
  --acc-fg: #fff;
  --acc-bg: #1b1b1b;
  --acc-link: #ffdd57;
}

:root.acc-grayscale {
  --acc-fg: #2b2b2b;
  --acc-bg: #f5f5f5;
  --acc-link: #4d4d4d;
}

/* Apply contrast and color modes - High Contrast (WCAG AAA standard) */
:root.acc-high-contrast body,
:root.acc-high-contrast body *:not(.lior-acc-root):not(.lior-acc-root *):not(.lior-acc-modal):not(.lior-acc-modal *) {
  background: #ffffff !important;
  color: #000000 !important;
  border-color: #000000 !important;
  outline-color: #000000 !important;
}
:root.acc-high-contrast body a:not(.lior-acc-root a):not(.lior-acc-modal a) {
  color: #0000ff !important;
  text-decoration: underline !important;
}
:root.acc-high-contrast body a:not(.lior-acc-root a):not(.lior-acc-modal a):visited {
  color: #551a8b !important;
}
:root.acc-high-contrast body a:not(.lior-acc-root a):not(.lior-acc-modal a):hover,
:root.acc-high-contrast body a:not(.lior-acc-root a):not(.lior-acc-modal a):focus {
  background-color: #ffff00 !important;
  color: #000000 !important;
}
:root.acc-high-contrast body button:not(.lior-acc-root button):not(.lior-acc-modal button),
:root.acc-high-contrast body input:not(.lior-acc-root input):not(.lior-acc-modal input),
:root.acc-high-contrast body select:not(.lior-acc-root select):not(.lior-acc-modal select),
:root.acc-high-contrast body textarea:not(.lior-acc-root textarea):not(.lior-acc-modal textarea) {
  background: #ffffff !important;
  color: #000000 !important;
  border: 2px solid #000000 !important;
}
:root.acc-high-contrast body img:not(.lior-acc-root img):not(.lior-acc-modal img) {
  opacity: 1 !important;
  filter: contrast(1.5) !important;
}

:root.acc-dark-contrast body,
:root.acc-dark-contrast body *:not(.lior-acc-root):not(.lior-acc-root *):not(.lior-acc-modal):not(.lior-acc-modal *) {
  background: var(--acc-bg) !important;
  color: var(--acc-fg) !important;
}
:root.acc-dark-contrast body a:not(.lior-acc-root a):not(.lior-acc-modal a) {
  color: var(--acc-link) !important;
}

:root.acc-invert body,
:root.acc-invert body *:not(.lior-acc-root):not(.lior-acc-root *):not(.lior-acc-modal):not(.lior-acc-modal *) {
  background: var(--acc-bg) !important;
  color: var(--acc-fg) !important;
}
:root.acc-invert body a:not(.lior-acc-root a):not(.lior-acc-modal a) {
  color: var(--acc-link) !important;
}

/* Grayscale mode - WCAG AAA compliant, highest standard */
:root.acc-grayscale {
  filter: grayscale(100%) !important;
}
:root.acc-grayscale html,
:root.acc-grayscale body {
  filter: grayscale(100%) !important;
}
:root.acc-grayscale body,
:root.acc-grayscale body *:not(.lior-acc-root):not(.lior-acc-root *):not(.lior-acc-modal):not(.lior-acc-modal *) {
  filter: grayscale(100%) !important;
  -webkit-filter: grayscale(100%) !important;
  -moz-filter: grayscale(100%) !important;
  -ms-filter: grayscale(100%) !important;
  -o-filter: grayscale(100%) !important;
}
:root.acc-grayscale body img:not(.lior-acc-root img):not(.lior-acc-modal img),
:root.acc-grayscale body video:not(.lior-acc-root video):not(.lior-acc-modal video),
:root.acc-grayscale body iframe:not(.lior-acc-root iframe):not(.lior-acc-modal iframe),
:root.acc-grayscale body svg:not(.lior-acc-root svg):not(.lior-acc-modal svg),
:root.acc-grayscale body canvas:not(.lior-acc-root canvas):not(.lior-acc-modal canvas),
:root.acc-grayscale body object:not(.lior-acc-root object):not(.lior-acc-modal object),
:root.acc-grayscale body embed:not(.lior-acc-root embed):not(.lior-acc-modal embed) {
  filter: grayscale(100%) !important;
  -webkit-filter: grayscale(100%) !important;
  -moz-filter: grayscale(100%) !important;
  -ms-filter: grayscale(100%) !important;
  -o-filter: grayscale(100%) !important;
}

/* Removed default link color override - let the page control its own link colors */

:root.acc-inc-text-1 { font-size: 118%; }
:root.acc-inc-text-2 { font-size: 150%; }
:root.acc-inc-text-3 { font-size: 200%; }
:root.acc-spacing body { letter-spacing: .03em; word-spacing: .08em; line-height: 1.7; }
.acc-underline-links a:not(.lior-acc-root a):not(.lior-acc-modal a) { text-decoration: underline !important; }
.acc-highlight-links a:not(.lior-acc-root a):not(.lior-acc-modal a) { outline: 2px solid currentColor; outline-offset: 2px; }
:root.acc-dyslexia body,
:root.acc-dyslexia body * {
  font-family: "LiorAccDyslexia", "Atkinson", system-ui, Arial, sans-serif !important;
  letter-spacing: .02em;
  word-spacing: .05em;
}
:root.acc-big-cursor,
:root.acc-big-cursor * {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="72" viewBox="0 0 48 72"><polygon points="0,0 0,72 18,54 33,69 39,63 24,48 42,48" fill="black" stroke="white" stroke-width="1"/></svg>') 0 0, auto !important;
}
:root.acc-big-cursor a,
:root.acc-big-cursor button,
:root.acc-big-cursor [role="button"],
:root.acc-big-cursor [role="link"],
:root.acc-big-cursor input,
:root.acc-big-cursor select,
:root.acc-big-cursor textarea {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="72" viewBox="0 0 48 72"><polygon points="0,0 0,72 18,54 33,69 39,63 24,48 42,48" fill="black" stroke="white" stroke-width="1"/></svg>') 0 0, pointer !important;
}
:root.acc-big-cursor input[type="text"],
:root.acc-big-cursor input[type="email"],
:root.acc-big-cursor input[type="url"],
:root.acc-big-cursor input[type="search"],
:root.acc-big-cursor input[type="password"],
:root.acc-big-cursor textarea {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="72" viewBox="0 0 48 72"><polygon points="0,0 0,72 18,54 33,69 39,63 24,48 42,48" fill="black" stroke="white" stroke-width="1"/></svg>') 0 0, text !important;
}
:root.acc-no-anim *,
:root.acc-no-anim *::before,
:root.acc-no-anim *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

.lior-acc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
  .lior-acc-panel {
    transform: translateY(0) scale(1) !important;
    opacity: 1 !important;
    filter: blur(0) !important;
  }
  .lior-acc-panel-body,
  .lior-acc-panel-header,
  .lior-acc-profiles-list,
  .lior-acc-category {
    animation: none !important;
  }
  .lior-acc-toggle:active,
  .lior-acc-profile-toggle:active,
  .lior-acc-reset:active,
  .lior-acc-link:active,
  .lior-acc-category-header:active,
  .lior-acc-save-profile-btn:active {
    transform: none !important;
  }
}

.lior-acc-skip {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 12px 16px;
  z-index: var(--lior-acc-z);
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
}
.lior-acc-skip:focus {
  top: 0;
  outline: var(--lior-acc-focus-width) solid #fff;
  outline-offset: var(--lior-acc-focus-offset);
}

.lior-acc-root {
  position: fixed;
  bottom: 18px;
  z-index: var(--lior-acc-z);
  font-family: "Rubik", "Assistant", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  direction: rtl;
  font-weight: 400;
  line-height: 1.4;
}
.lior-acc-pos-right { 
  right: 18px !important; 
  left: auto !important;
}
.lior-acc-pos-left { 
  left: 18px !important; 
  right: auto !important;
}

.lior-acc-button {
  position: fixed !important;
  width: var(--lior-acc-size);
  height: var(--lior-acc-size);
  border-radius: 50%;
  border: 1px solid var(--lior-acc-border);
  background: var(--lior-acc-bg);
  color: var(--lior-acc-fg);
  box-shadow: var(--lior-acc-shadow);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 28px;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  bottom: 18px !important;
}
.lior-acc-button:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}
.lior-acc-button:active {
  transform: scale(0.95);
}
.lior-acc-button-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.lior-acc-button:focus {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}
.lior-acc-button:focus:not(:focus-visible) {
  outline: none;
}
.lior-acc-button:focus-visible {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}

.lior-acc-overlay {
  position: fixed;
  inset: 0;
  background: var(--lior-acc-overlay);
  z-index: calc(var(--lior-acc-z) - 1);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.lior-acc-overlay[hidden] {
  display: none !important;
}
.lior-acc-overlay:not([hidden]) {
  opacity: 1;
}

/* Removed default body color override - let the page control its own colors */

.lior-acc-panel {
  position: fixed;
  bottom: calc(18px + var(--lior-acc-size) + 12px);
  right: 18px;
  left: auto;
  width: min(92vw, var(--lior-acc-panel-width));
  background: var(--lior-acc-bg-subtle) !important;
  color: #000000 !important;
  border: none;
  border-radius: var(--lior-acc-radius);
  box-shadow: var(--lior-acc-shadow);
  padding: 20px;
  z-index: var(--lior-acc-z);
  transform: translateY(30px) scale(0.95);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 85vh;
  overflow-y: auto;
  filter: blur(4px);
}
.lior-acc-panel[hidden] {
  display: none !important;
}
.lior-acc-panel.show,
.lior-acc-panel:not([hidden]) {
  transform: translateY(0) scale(1);
  opacity: 1;
  filter: blur(0);
}
.lior-acc-pos-left .lior-acc-panel { 
  right: auto; 
  left: 18px; 
}

.lior-acc-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  background: #ffffff !important;
  animation: slideInRight 0.4s ease 0.1s both;
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.lior-acc-panel-body {
  background: #ffffff !important;
  color: #000000 !important;
  animation: fadeInUp 0.5s ease 0.2s both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lior-acc-panel-header h2 { 
  font-size: 22px; 
  margin: 0; 
  font-weight: 600; 
  color: #000000 !important; 
  line-height: 1.3;
}
.lior-acc-close {
    border: 0;
    background: transparent;
    font-size: 32px;
    line-height: 1;
    cursor: pointer;
    font-weight: 300;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000 !important;
    transition: all 0.2s ease;
    border-radius: 50%;
  }
.lior-acc-close:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: rotate(90deg) scale(1.1);
}
.lior-acc-close:active {
  transform: rotate(90deg) scale(0.9);
}
.lior-acc-close:focus {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}
.lior-acc-close:focus:not(:focus-visible) {
  outline: none;
}
.lior-acc-close:focus-visible {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}

.lior-acc-theme-toggle {
  border: 0;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000 !important;
  transition: all 0.2s ease;
  border-radius: 50%;
}
.lior-acc-theme-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.lior-acc-theme-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-theme-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}
.lior-acc-theme-toggle:active {
  transform: scale(0.9);
}
.lior-acc-theme-toggle:focus {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}
.lior-acc-theme-toggle:focus:not(:focus-visible) {
  outline: none;
}
.lior-acc-theme-toggle:focus-visible {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}

/* Dark mode for widget */
.lior-acc-root.dark-mode .lior-acc-panel,
.lior-acc-root.dark-mode .lior-acc-panel-header,
.lior-acc-root.dark-mode .lior-acc-panel-body,
.lior-acc-root.dark-mode .lior-acc-toggle,
.lior-acc-root.dark-mode .lior-acc-reset,
.lior-acc-root.dark-mode .lior-acc-link,
.lior-acc-root.dark-mode .lior-acc-profile-toggle,
.lior-acc-root.dark-mode .lior-acc-category-header,
.lior-acc-root.dark-mode .lior-acc-category-content {
  background: #1a1a1a !important;
  color: #ffffff !important;
}
.lior-acc-root.dark-mode .lior-acc-panel-header h2,
.lior-acc-root.dark-mode .lior-acc-section-title,
.lior-acc-root.dark-mode .lior-acc-toggle,
.lior-acc-root.dark-mode .lior-acc-reset,
.lior-acc-root.dark-mode .lior-acc-link,
.lior-acc-root.dark-mode .lior-acc-profile-toggle,
.lior-acc-root.dark-mode .lior-acc-category-header {
  color: #ffffff !important;
}
.lior-acc-root.dark-mode .lior-acc-toggle[aria-pressed="true"] {
  background: #0066cc !important;
  color: #ffffff !important;
}
.lior-acc-root.dark-mode .lior-acc-close,
.lior-acc-root.dark-mode .lior-acc-theme-toggle {
  color: #ffffff !important;
}
.lior-acc-root.dark-mode .lior-acc-close:hover,
.lior-acc-root.dark-mode .lior-acc-theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}
.lior-acc-root.dark-mode .lior-acc-button {
  background: #1a1a1a !important;
  color: #ffffff !important;
  border-color: #555;
}

.lior-acc-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 0 0 18px 0;
  padding: 0;
  list-style: none;
}
.lior-acc-toggle {
  width: 100%;
  text-align: right;
  padding: 14px 18px;
  border-radius: 12px;
  border: none;
  background: #ffffff !important;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  color: #000000 !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 56px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  position: relative;
}
.lior-acc-toggle:hover {
  transform: translateX(-2px);
  box-shadow: var(--lior-acc-shadow-hover);
  background: #ffffff !important;
}
.lior-acc-toggle[aria-pressed="true"] {
  background: #ffffff !important;
  color: #000000 !important;
  box-shadow: 0 0 0 2px var(--lior-acc-accent);
  font-weight: 500;
}
.lior-acc-toggle-label {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.lior-acc-toggle-description {
  font-size: 13px;
  font-weight: 400;
  color: #666;
  line-height: 1.4;
  margin-top: 2px;
  text-align: right;
}
.lior-acc-toggle[aria-pressed="true"] .lior-acc-toggle-description {
  color: #4A90E2;
}
.lior-acc-icon {
  margin-inline-end: 10px;
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.lior-acc-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-toggle-switch {
  width: 44px;
  height: 26px;
  background: #ccc;
  border-radius: 20px;
  position: relative;
  transition: background 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  margin-inline-start: 12px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  cursor: pointer;
}
.lior-acc-toggle-switch::after {
  content: "";
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.lior-acc-toggle[aria-pressed="true"] .lior-acc-toggle-switch {
  background: var(--lior-acc-accent);
}
.lior-acc-toggle[aria-pressed="true"] .lior-acc-toggle-switch::after {
  transform: translateX(18px);
}
.lior-acc-toggle:focus {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}
.lior-acc-toggle:focus:not(:focus-visible) {
  outline: none;
}
.lior-acc-toggle:focus-visible {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}

.lior-acc-reset {
  border: none;
  background: #ffffff !important;
  border-radius: 12px;
  padding: 14px 18px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  color: #000000 !important;
  width: 100%;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeInUp 0.5s ease 0.65s both;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  text-align: right;
  direction: rtl;
}
.lior-acc-reset > span:first-child {
  text-align: right;
  flex: 1;
  margin-inline-end: auto;
}
.lior-acc-reset-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-inline-start: 10px;
}
.lior-acc-reset-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-reset:hover {
  transform: translateY(-2px);
  box-shadow: var(--lior-acc-shadow-hover);
  background: var(--lior-acc-bg-subtle) !important;
}
.lior-acc-reset:focus {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}
.lior-acc-reset:focus:not(:focus-visible) {
  outline: none;
}
.lior-acc-reset:focus-visible {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}

@media (max-width: 768px) {
  .lior-acc-panel {
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: 85vh;
    max-height: 85vh;
    border-radius: 24px 24px 0 0;
    padding: 0;
    transform: translateY(100%);
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease-out;
  }
  .lior-acc-panel.show,
  .lior-acc-panel:not([hidden]) {
    transform: translateY(0);
    opacity: 1;
    filter: blur(0);
  }
  .lior-acc-panel-header {
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--lior-acc-border);
    position: relative;
  }
  .lior-acc-panel-header::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
    transition: opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s;
  }
  .lior-acc-panel.show .lior-acc-panel-header::before {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .lior-acc-panel-header h2 {
    margin-top: 10px;
  }
  .lior-acc-panel-header h2::after {
    content: ' v0.6.0';
    font-size: 12px;
    font-weight: 400;
    color: #999;
    margin-inline-start: 4px;
  }
  .lior-acc-panel-body {
    max-height: calc(85vh - 60px);
    overflow-y: auto;
    padding: 16px 20px;
    -webkit-overflow-scrolling: touch;
  }
  .lior-acc-pos-left .lior-acc-panel {
    left: 0;
    right: 0;
  }
  .lior-acc-button {
    font-size: 22px;
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
  }
  .lior-acc-panel-header h2 {
    font-size: 18px !important;
  }
  .lior-acc-close {
    font-size: 24px !important;
    width: 32px !important;
    height: 32px !important;
  }
  .lior-acc-settings-label {
    font-size: 11px !important;
    margin-bottom: 6px;
  }
  .lior-acc-toggle {
    font-size: 14px !important;
    padding: 14px 16px !important;
    min-height: 56px;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .lior-acc-toggle:active {
    transform: scale(0.98);
    transition: transform 0.08s ease;
  }
  .lior-acc-mode-button {
    font-size: 13px !important;
    padding: 8px 10px !important;
    margin-bottom: 6px;
  }
  .lior-acc-reset {
    font-size: 14px !important;
    padding: 14px 16px !important;
    min-height: 56px;
  }
  .lior-acc-reset:active {
    transform: scale(0.98);
    transition: transform 0.08s ease;
  }
  .lior-acc-link {
    font-size: 14px !important;
    padding: 14px 16px !important;
    min-height: 56px;
  }
  .lior-acc-link:active {
    transform: scale(0.98);
    transition: transform 0.08s ease;
  }
  .lior-acc-list {
    gap: 6px;
    margin-bottom: 10px;
  }
  .lior-acc-profile-toggle {
    font-size: 13px !important;
    padding: 10px 12px !important;
  }
  .lior-acc-category-header {
    font-size: 13px !important;
    padding: 10px 12px !important;
  }
  .lior-acc-section-title {
    font-size: 15px !important;
    margin-top: 20px;
    margin-bottom: 12px;
  }
  .lior-acc-list {
    gap: 8px;
  }
  .lior-acc-category-header {
    padding: 14px 16px;
    font-size: 15px;
  }
  .lior-acc-category-header:active {
    transform: scale(0.98);
    transition: transform 0.08s ease;
  }
}
@media (max-width: 480px) {
  .lior-acc-panel {
    font-size: 14px;
  }
  .lior-acc-panel-header h2 {
    font-size: 17px !important;
  }
  .lior-acc-section-title {
    font-size: 14px !important;
  }
  .lior-acc-toggle {
    font-size: 13px !important;
    padding: 12px 14px !important;
  }
  .lior-acc-toggle-description {
    font-size: 12px !important;
  }
}

@media (prefers-color-scheme: dark) {
  .lior-acc-panel {
    background: #ffffff !important;
    color: #000000 !important;
    border-color: #555;
  }
  .lior-acc-button {
    background: #333;
    color: #fff;
    border-color: #555;
  }
  .lior-acc-toggle {
    background: #ffffff !important;
    color: #000000 !important;
    border-color: #555;
  }
  .lior-acc-toggle[aria-pressed="true"] {
    background: #e6f1ff !important;
    border-color: #0066cc;
  }
  .lior-acc-reset {
    background: #ffffff !important;
    color: #000000 !important;
    border-color: #555;
  }
  .lior-acc-profile-toggle {
    background: #ffffff !important;
    color: #000000 !important;
    border-color: #555;
  }
  .lior-acc-profile-toggle:hover {
    background: #e6f1ff !important;
  }
  .lior-acc-profile-toggle[aria-pressed="true"] {
    background: #e6f1ff !important;
    border-color: #0066cc;
  }
  .lior-acc-category {
    border-color: #555;
  }
  .lior-acc-category-header {
    background: #ffffff !important;
    color: #000000 !important;
  }
  .lior-acc-category-header:hover {
    background: #e6f1ff !important;
  }
  .lior-acc-category-header[aria-expanded="true"] {
    background: #e6f1ff !important;
    border-color: #555;
  }
  .lior-acc-category-content {
    background: #ffffff !important;
  }
}

.acc-reading-focus body > *:not(main):not(#lior-acc-root) {
  opacity: 0.2 !important;
  pointer-events: none;
}
.acc-reading-focus body > *:not(main):not(#lior-acc-root) * {
  opacity: 0.2 !important;
  pointer-events: none;
}
.acc-reading-focus main,
.acc-reading-focus main * {
  opacity: 1 !important;
  pointer-events: auto !important;
  position: relative;
  z-index: 1;
}
.acc-reading-focus #lior-acc-root,
.acc-reading-focus #lior-acc-root * {
  opacity: 1 !important;
  pointer-events: auto !important;
  z-index: 999999 !important;
}

/* Focus highlight mode */
.acc-focus-highlight *:focus,
.acc-focus-highlight *:focus-visible {
  outline: 4px solid #ff6b00 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 6px #ff6b00 !important;
  border-radius: 4px !important;
  background-color: rgba(255, 107, 0, 0.1) !important;
}
.acc-focus-highlight button:focus,
.acc-focus-highlight a:focus,
.acc-focus-highlight input:focus,
.acc-focus-highlight select:focus,
.acc-focus-highlight textarea:focus {
  outline: 4px solid #ff6b00 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 6px #ff6b00 !important;
}

.lior-acc-toast {
  position: fixed;
  bottom: 100px;
  right: 18px;
  background: #333;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: calc(var(--lior-acc-z) + 1);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  font-size: 14px;
  max-width: 300px;
}
.lior-acc-toast.show {
  opacity: 1;
  transform: translateY(0);
}
.lior-acc-pos-left .lior-acc-toast {
  right: auto;
  left: 18px;
}

.lior-acc-profiles-section {
  margin-bottom: 20px;
}
.lior-acc-save-profile-btn {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: none;
  background: var(--lior-acc-accent) !important;
  color: #ffffff !important;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  margin-top: 12px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
}
.lior-acc-save-profile-btn:hover {
  background: var(--lior-acc-accent-hover) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}
.lior-acc-save-profile-btn.saved {
  background: #10b981 !important;
  animation: saveSuccess 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes saveSuccess {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
.lior-acc-save-icon.saved {
  animation: iconRotate 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes iconRotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg);
  }
}
.lior-acc-save-profile-btn:active {
  transform: translateY(0);
}
.lior-acc-save-profile-btn.disabled {
  background: #E5E5EA !important;
  color: #8E8E93 !important;
  cursor: not-allowed;
  box-shadow: none !important;
}
.lior-acc-save-profile-btn.disabled:hover {
  transform: none;
  box-shadow: none !important;
  background: #E5E5EA !important;
}
.lior-acc-save-profile-btn.saving {
  background: #10b981 !important;
}
.lior-acc-save-profile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
@media (max-width: 768px) {
  .lior-acc-profiles-section {
    margin-bottom: 20px;
  }
  .lior-acc-save-profile-btn {
    position: sticky;
    bottom: 0;
    margin-top: 20px;
    margin-bottom: 0;
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 10;
    background: var(--lior-acc-accent) !important;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
  }
  .lior-acc-save-profile-btn:active {
    transform: scale(0.97);
    box-shadow: 0 1px 4px rgba(74, 144, 226, 0.5);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }
  .lior-acc-save-profile-btn.disabled:active {
    transform: none;
    box-shadow: none;
  }
  .lior-acc-panel-body {
    padding-bottom: 80px; /* Space for sticky button */
  }
}
.lior-acc-save-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.lior-acc-save-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-save-profile-btn:hover .lior-acc-save-icon {
  transform: scale(1.1);
}
.lior-acc-save-hint {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  text-align: right;
  line-height: 1.4;
  padding: 0 4px;
}
.lior-acc-active-profile-indicator {
  font-size: 13px;
  color: var(--lior-acc-accent);
  font-weight: 500;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 8px;
  text-align: right;
}
.lior-acc-profile-toggle.active {
  box-shadow: 0 0 0 2px var(--lior-acc-accent) !important;
  background: rgba(74, 144, 226, 0.05) !important;
  transform: translateY(-1px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.lior-acc-section-title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 16px;
  margin-top: 20px;
  color: #000000 !important;
  text-align: right;
  line-height: 1.4;
}
.lior-acc-section-title:first-child {
  margin-top: 0;
}
.lior-acc-profiles-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: fadeInUp 0.5s ease 0.3s both;
}
@media (max-width: 768px) {
  .lior-acc-profiles-list {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: visible;
    padding: 0 0 12px 0;
    gap: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
    display: flex !important;
  }
  .lior-acc-profiles-list::-webkit-scrollbar {
    display: none;
  }
  .lior-acc-profiles-list .lior-acc-profile-toggle {
    white-space: nowrap;
    padding: 8px 16px;
    border-radius: 999px;
    border: 1.5px solid #E5E5EA;
    font-size: 14px;
    min-width: auto;
    width: auto;
    flex-shrink: 0;
    margin-bottom: 0;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .lior-acc-profiles-list .lior-acc-profile-toggle:active {
    transform: scale(0.96);
    transition: transform 0.1s ease;
  }
  .lior-acc-profiles-list .lior-acc-profile-toggle[aria-pressed="true"],
  .lior-acc-profiles-list .lior-acc-profile-toggle.active {
    background: #0a7cff !important;
    color: #ffffff !important;
    border-color: #0a7cff;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(10, 124, 255, 0.3);
  }
  .lior-acc-profiles-list .lior-acc-profile-toggle.active::after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-inline-start: 6px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='20 6 9 17 4 12' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: middle;
  }
  .lior-acc-profiles-list .lior-acc-profile-icon {
    display: none;
  }
  .lior-acc-profiles-list .lior-acc-profile-switch {
    display: none;
  }
  .lior-acc-profiles-list .lior-acc-profile-delete {
    display: none;
  }
  .lior-acc-profiles-list .lior-acc-profile-name {
    flex: none;
  }
}
.lior-acc-profiles-list .lior-acc-profile-toggle {
  animation: fadeInScale 0.4s ease both;
}
.lior-acc-profiles-list .lior-acc-profile-toggle:nth-child(1) { animation-delay: 0.35s; }
.lior-acc-profiles-list .lior-acc-profile-toggle:nth-child(2) { animation-delay: 0.4s; }
.lior-acc-profiles-list .lior-acc-profile-toggle:nth-child(3) { animation-delay: 0.45s; }
.lior-acc-profiles-list .lior-acc-profile-toggle:nth-child(4) { animation-delay: 0.5s; }
.lior-acc-profiles-list .lior-acc-profile-toggle:nth-child(5) { animation-delay: 0.55s; }
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.lior-acc-profile-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 18px;
  border: none;
  border-radius: 12px;
  background: #ffffff !important;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  color: #000000 !important;
  text-align: right;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  margin-bottom: 12px;
}
.lior-acc-profile-toggle:hover {
  background: var(--lior-acc-bg-subtle) !important;
  transform: translateX(-2px);
  box-shadow: var(--lior-acc-shadow-hover);
}
.lior-acc-profile-toggle[aria-pressed="true"] {
  background: #ffffff !important;
  box-shadow: 0 0 0 2px var(--lior-acc-accent);
  transform: translateY(-1px);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.lior-acc-profile-icon {
  width: 18px;
  height: 18px;
  margin-inline-end: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.lior-acc-profile-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-profile-name {
  flex: 1;
}
.lior-acc-profile-delete {
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline-start: 8px;
  opacity: 0.6;
  transition: opacity 0.2s;
  flex-shrink: 0;
}
.lior-acc-profile-delete:hover {
  opacity: 1;
}
.lior-acc-profile-delete svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-profile-switch {
  width: 44px;
  height: 24px;
  background: #ccc;
  border-radius: 12px;
  position: relative;
  transition: background 0.3s;
  flex-shrink: 0;
  margin-inline-start: 12px;
}
.lior-acc-profile-switch::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  top: 2px;
  right: 2px;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.lior-acc-profile-toggle[aria-pressed="true"] .lior-acc-profile-switch {
  background: var(--lior-acc-accent);
}
.lior-acc-profile-toggle[aria-pressed="true"] .lior-acc-profile-switch::after {
  transform: translateX(-20px);
}

.lior-acc-settings-section {
  margin-bottom: 20px;
}
.lior-acc-category {
  margin-bottom: 12px;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  animation: fadeInScale 0.4s ease both;
}
.lior-acc-category:nth-child(1) { animation-delay: 0.4s; }
.lior-acc-category:nth-child(2) { animation-delay: 0.45s; }
.lior-acc-category:nth-child(3) { animation-delay: 0.5s; }
.lior-acc-category:nth-child(4) { animation-delay: 0.55s; }
.lior-acc-category:nth-child(5) { animation-delay: 0.6s; }
.lior-acc-category-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  background: #ffffff !important;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  color: #000000 !important;
  text-align: right;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  gap: 10px;
}
.lior-acc-category-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.lior-acc-category-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-category-header:hover {
  background: var(--lior-acc-bg-subtle) !important;
}
.lior-acc-category-header[aria-expanded="true"] {
  background: var(--lior-acc-bg-subtle) !important;
}
.lior-acc-category-arrow {
  transition: transform 0.3s;
  font-size: 12px;
  margin-inline-start: 12px;
}
.lior-acc-category-header[aria-expanded="true"] .lior-acc-category-arrow {
  transform: rotate(180deg);
}
.lior-acc-category-content {
  padding: 12px 18px 18px 18px;
  background: #ffffff !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 1;
  max-height: 1000px;
  overflow: hidden;
}
.lior-acc-category-content[hidden] {
  display: none;
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.lior-acc-category-content--opening {
  animation: slideDown 0.18s ease-out;
}
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

.lior-acc-settings-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: right;
  font-weight: 600;
}
@media (prefers-color-scheme: dark) {
  .lior-acc-settings-label {
    color: #aaa;
  }
}

.lior-acc-link {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: right;
  padding: 14px 18px;
  border-radius: 12px;
  border: none;
  background: #ffffff !important;
  color: #000000 !important;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  margin-top: 0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeInUp 0.5s ease 0.7s both;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  direction: rtl;
}
.lior-acc-link > span:first-child {
  text-align: right;
  flex: 1;
  margin-inline-end: auto;
}
.lior-acc-link-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-inline-start: 10px;
}
.lior-acc-link-icon svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lior-acc-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--lior-acc-shadow-hover);
  background: var(--lior-acc-bg-subtle) !important;
}
.lior-acc-link:hover,
.lior-acc-link:focus {
  background: #e6f1ff;
  border-color: var(--lior-acc-accent);
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}
@media (prefers-color-scheme: dark) {
  .lior-acc-link {
    background: #ffffff !important;
    color: #000000 !important;
  }
  .lior-acc-link:hover,
  .lior-acc-link:focus {
    background: #e6f1ff !important;
  }
}

.lior-acc-modal {
  position: fixed;
  inset: 0;
  z-index: calc(var(--lior-acc-z) + 10);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
@media (max-width: 768px) {
  .lior-acc-modal {
    align-items: flex-end;
    padding: 0;
  }
  .lior-acc-modal-content {
    width: 100%;
    max-width: 100%;
    height: 85vh;
    max-height: 85vh;
    border-radius: 24px 24px 0 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .lior-acc-modal-body {
    max-height: calc(85vh - 60px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
  }
}
.lior-acc-modal[hidden] {
  display: none !important;
}

.lior-acc-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.lior-acc-modal-content {
  position: relative;
  background: #ffffff !important;
  color: #000000 !important;
  border: 1px solid var(--lior-acc-border);
  border-radius: var(--lior-acc-radius);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 700px;
  max-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  transform: scale(0.95);
  opacity: 0;
  transition: all 0.3s ease;
  overflow: hidden;
}
.lior-acc-modal-content * {
  color: #000000 !important;
}
.lior-acc-modal.show .lior-acc-modal-content,
.lior-acc-modal:not([hidden]) .lior-acc-modal-content {
  transform: scale(1);
  opacity: 1;
}
.lior-acc-modal:not(.show):not([hidden]) .lior-acc-modal-content {
  transform: scale(0.95);
  opacity: 0;
}

.lior-acc-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--lior-acc-border);
  background: #ffffff !important;
}
.lior-acc-modal-header h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #000000 !important;
}

.lior-acc-modal-close {
  border: 0;
  background: transparent;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  font-weight: 300;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000 !important;
  border-radius: 50%;
  transition: background 0.2s;
}
.lior-acc-modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
}
.lior-acc-modal-close:focus {
  outline: var(--lior-acc-focus-width) solid var(--lior-acc-accent);
  outline-offset: var(--lior-acc-focus-offset);
}

.lior-acc-modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  direction: rtl;
  text-align: right;
  background: #ffffff !important;
  color: #000000 !important;
}
.lior-acc-modal-body * {
  color: #000000 !important;
}
.lior-acc-modal-body h3 {
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
  color: #000000 !important;
}
.lior-acc-modal-body h2 {
  font-size: 26px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 16px;
  color: #000000 !important;
}
.lior-acc-modal-body h3:first-child {
  margin-top: 0;
}
.lior-acc-modal-body p {
  line-height: 1.6;
  margin-bottom: 12px;
  color: #000000 !important;
}
.lior-acc-modal-body ul {
  margin-bottom: 16px;
  padding-inline-start: 24px;
}
.lior-acc-modal-body li {
  line-height: 1.6;
  margin-bottom: 8px;
  color: #000000 !important;
}
.lior-acc-modal-body small {
  color: #000000 !important;
}
.lior-acc-modal-body a {
  color: #0066cc !important;
  text-decoration: underline;
}
.lior-acc-modal-body a:hover,
.lior-acc-modal-body a:focus {
  text-decoration: none;
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  color: #0052a3 !important;
}
.lior-acc-modal-body strong {
  font-weight: 600;
  color: #000000 !important;
}

.lior-acc-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 24px 0;
}

.lior-acc-feature-category {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.lior-acc-feature-category:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.lior-acc-feature-category h4 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #000000 !important;
  padding-bottom: 8px;
  border-bottom: 2px solid #0066cc;
}

.lior-acc-feature-category ul {
  margin: 0;
  padding-inline-start: 20px;
  list-style-type: disc;
}

.lior-acc-feature-category li {
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 6px;
  color: #000000 !important;
}

.lior-acc-feature-category li strong {
  font-weight: 700;
  color: #0066cc !important;
}

@media (prefers-color-scheme: dark) {
  .lior-acc-modal-content {
    background: #ffffff !important;
    color: #000000 !important;
  }
  .lior-acc-modal-header {
    background: #ffffff !important;
  }
  .lior-acc-modal-header h2 {
    color: #000000 !important;
  }
  .lior-acc-modal-body {
    background: #ffffff !important;
    color: #000000 !important;
  }
  .lior-acc-modal-body * {
    color: #000000 !important;
  }
  .lior-acc-modal-close {
    color: #000000 !important;
  }
  .lior-acc-modal-close:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .lior-acc-feature-category {
    background: #f8f9fa !important;
    border-color: #e0e0e0 !important;
  }
  .lior-acc-feature-category h4 {
    color: #000000 !important;
  }
  .lior-acc-feature-category li {
    color: #000000 !important;
  }
}

@media (max-width: 600px) {
  .lior-acc-modal {
    padding: 10px;
  }
  .lior-acc-modal-content {
    max-height: 95vh;
  }
  .lior-acc-modal-header {
    padding: 16px;
  }
  .lior-acc-modal-header h2 {
    font-size: 20px;
  }
  .lior-acc-modal-body {
    padding: 16px;
  }
  .lior-acc-modal-body h3 {
    font-size: 18px;
  }
  .lior-acc-features-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .lior-acc-feature-category {
    padding: 12px;
  }
  .lior-acc-feature-category h4 {
    font-size: 16px;
  }
  .lior-acc-feature-category li {
    font-size: 13px;
  }
}

`;

  // ============================================
  // SVG ICONS (Monochrome, Notion/Apple style)
  // ============================================
  const icons = {
    eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    bookOpen: '<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    zap: '<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    type: '<svg viewBox="0 0 24 24"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    monitor: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    play: '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    rotateCcw: '<svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    fileText: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    save: '<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    contrast: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg>',
    grayscale: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    spacing: '<svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    highlight: '<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    mouse: '<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/></svg>',
    focus: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M23 12h-6m-6 0H1"/></svg>',
    volume: '<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    delete: '<svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    accessibility: '<svg viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M19 10v-2a2 2 0 0 0-2-2h-1M5 10V8a2 2 0 0 1 2-2h1m0 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M7 20h10"/><path d="M12 20v-8"/><path d="M8 12l4-4 4 4"/></svg>',
    check: '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  // ============================================
  // HTML TEMPLATE
  // ============================================
  const getHTML = (logoUrl) => `
<div id="lior-acc-root" class="lior-acc-root lior-acc-pos-right" dir="rtl" lang="he">
  <div id="lior-acc-live-region" class="lior-acc-sr-only" role="status" aria-live="polite" aria-atomic="true"></div>
  <button id="lior-acc-button" class="lior-acc-button" type="button"
    aria-haspopup="dialog" aria-controls="lior-acc-panel" aria-expanded="false"
    aria-label="פתח תפריט נגישות">
    <img src="${logoUrl || 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-Z5pQb64527QqrgGwIDqkDyFB7uVs96.jpeg'}" alt="" aria-hidden="true" class="lior-acc-button-icon">
  </button>
  <div id="lior-acc-overlay" class="lior-acc-overlay" hidden></div>
  <div id="lior-acc-panel" class="lior-acc-panel" role="dialog" aria-modal="true" aria-labelledby="lior-acc-title" hidden>
    <div class="lior-acc-panel-header">
      <h2 id="lior-acc-title">תפריט נגישות</h2>
      <div style="display: flex; gap: 8px; align-items: center;">
        <button id="lior-acc-theme-toggle" class="lior-acc-theme-toggle" type="button" aria-label="החלף מצב כהה/בהיר" title="מצב כהה/בהיר">
          <span class="lior-acc-theme-icon">${icons.moon}</span>
        </button>
        <button id="lior-acc-close" class="lior-acc-close" type="button" aria-label="סגור">×</button>
      </div>
    </div>
    <div class="lior-acc-panel-body">
      <div class="lior-acc-profiles-section">
        <h3 class="lior-acc-section-title">פרופילים</h3>
        <div id="lior-acc-active-profile-indicator" class="lior-acc-active-profile-indicator" style="display: none;"></div>
        <div id="lior-acc-custom-profiles-list" class="lior-acc-profiles-list"></div>
        <div class="lior-acc-profiles-list">
          <button class="lior-acc-profile-toggle" data-profile="vision" type="button" aria-pressed="false">
            <span class="lior-acc-profile-icon">${icons.eye}</span>
            <span class="lior-acc-profile-name">ראייה</span>
            <span class="lior-acc-profile-switch"></span>
          </button>
          <button class="lior-acc-profile-toggle" data-profile="learning" type="button" aria-pressed="false">
            <span class="lior-acc-profile-icon">${icons.bookOpen}</span>
            <span class="lior-acc-profile-name">לקויות למידה מורכבות</span>
            <span class="lior-acc-profile-switch"></span>
          </button>
          <button class="lior-acc-profile-toggle" data-profile="epilepsy" type="button" aria-pressed="false">
            <span class="lior-acc-profile-icon">${icons.zap}</span>
            <span class="lior-acc-profile-name">אפילפסיה</span>
            <span class="lior-acc-profile-switch"></span>
          </button>
          <button class="lior-acc-profile-toggle" data-profile="adhd" type="button" aria-pressed="false">
            <span class="lior-acc-profile-icon">${icons.target}</span>
            <span class="lior-acc-profile-name">קשב וריכוז</span>
            <span class="lior-acc-profile-switch"></span>
          </button>
          <button class="lior-acc-profile-toggle" data-profile="dyslexia" type="button" aria-pressed="false">
            <span class="lior-acc-profile-icon">${icons.type}</span>
            <span class="lior-acc-profile-name">דיסלקציה</span>
            <span class="lior-acc-profile-switch"></span>
          </button>
        </div>
        <button id="lior-acc-save-profile" class="lior-acc-save-profile-btn" type="button">
          <span class="lior-acc-save-icon">${icons.save}</span>
          <span class="lior-acc-save-text">שמור פרופיל מותאם</span>
        </button>
        <p class="lior-acc-save-hint">שמור את כל ההגדרות כפרופיל שאפשר להפעיל בלחיצה אחת בכל ביקור באתר.</p>
      </div>

      <div class="lior-acc-settings-section">
        <h3 class="lior-acc-section-title">הגדרות</h3>
        
        <div class="lior-acc-category">
          <button class="lior-acc-category-header" type="button" aria-expanded="false">
            <span class="lior-acc-category-icon">${icons.monitor}</span>
            <span>תצוגה</span>
            <span class="lior-acc-category-arrow">▼</span>
          </button>
          <div class="lior-acc-category-content" hidden>
            <ul class="lior-acc-list">
              <li><button class="lior-acc-toggle" data-toggle="inc-text" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.search}</span> הגדלת טקסט</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מגדיל טקסט, מוסיף ניגודיות ומקטין בהירות</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="high-contrast" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.contrast}</span> ניגודיות גבוהה</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">משפר את הניגודיות בין טקסט לרקע</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="dark-contrast" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.moon}</span> ניגודיות כהה</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מעביר למצב כהה עם ניגודיות גבוהה</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="grayscale" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.grayscale}</span> גווני אפור</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מציג את האתר בגווני אפור בלבד</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="invert" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.refresh}</span> היפוך צבעים</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">הופך את כל הצבעים באתר</span>
              </button></li>
            </ul>
          </div>
        </div>

        <div class="lior-acc-category">
          <button class="lior-acc-category-header" type="button" aria-expanded="false">
            <span class="lior-acc-category-icon">${icons.type}</span>
            <span>טקסט</span>
            <span class="lior-acc-category-arrow">▼</span>
          </button>
          <div class="lior-acc-category-content" hidden>
            <ul class="lior-acc-list">
              <li><button class="lior-acc-toggle" data-toggle="spacing" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.spacing}</span> ריווח טקסט</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מגדיל ריווח בין מילים, אותיות ושורות</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="dyslexia" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.bookOpen}</span> גופן נגיש (דיסלקסיה)</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">משנה לגופן מותאם לקריאה קלה יותר</span>
              </button></li>
            </ul>
          </div>
        </div>

        <div class="lior-acc-category">
          <button class="lior-acc-category-header" type="button" aria-expanded="false">
            <span class="lior-acc-category-icon">${icons.link}</span>
            <span>קישורים</span>
            <span class="lior-acc-category-arrow">▼</span>
          </button>
          <div class="lior-acc-category-content" hidden>
            <ul class="lior-acc-list">
              <li><button class="lior-acc-toggle" data-toggle="underline-links" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.link}</span> קו תחתון לקישורים</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מוסיף קו תחתון לכל הקישורים</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="highlight-links" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.highlight}</span> הדגשת קישורים</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מדגיש קישורים עם מסגרת בולטת</span>
              </button></li>
            </ul>
          </div>
        </div>

        <div class="lior-acc-category">
          <button class="lior-acc-category-header" type="button" aria-expanded="false">
            <span class="lior-acc-category-icon">${icons.compass}</span>
            <span>ניווט</span>
            <span class="lior-acc-category-arrow">▼</span>
          </button>
          <div class="lior-acc-category-content" hidden>
            <ul class="lior-acc-list">
              <li><button class="lior-acc-toggle" data-toggle="big-cursor" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.mouse}</span> סמן עכבר גדול</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מגדיל את סמן העכבר לזיהוי קל יותר</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="reading-focus" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.eye}</span> פוקוס קריאה</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מפשט משפטים מורכבים לטקסט קריא</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-toggle="focus-highlight" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.target}</span> הדגשת פוקוס</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מדגיש את האלמנט הממוקד בצבע בולט</span>
              </button></li>
              <li><button class="lior-acc-toggle" data-action="text-to-speech" type="button">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.volume}</span> קריאה בקול</span>
                </span>
                <span class="lior-acc-toggle-description">מקריא את הטקסט הנבחר בקול</span>
              </button></li>
            </ul>
          </div>
        </div>

        <div class="lior-acc-category">
          <button class="lior-acc-category-header" type="button" aria-expanded="false">
            <span class="lior-acc-category-icon">${icons.play}</span>
            <span>אנימציות</span>
            <span class="lior-acc-category-arrow">▼</span>
          </button>
          <div class="lior-acc-category-content" hidden>
            <ul class="lior-acc-list">
              <li><button class="lior-acc-toggle" data-toggle="no-anim" aria-pressed="false">
                <span class="lior-acc-toggle-label">
                  <span><span class="lior-acc-icon" aria-hidden="true">${icons.pause}</span> ביטול אנימציות</span>
                  <span class="lior-acc-toggle-switch"></span>
                </span>
                <span class="lior-acc-toggle-description">מבטל כל האנימציות והמעברים באתר</span>
              </button></li>
            </ul>
          </div>
        </div>
      </div>
      
      <button id="lior-acc-reset" class="lior-acc-reset" type="button">
        <span>איפוס הגדרות</span>
        <span class="lior-acc-reset-icon">${icons.rotateCcw}</span>
      </button>
      <button id="lior-acc-declaration" class="lior-acc-link" type="button">
        <span>הצהרת נגישות</span>
        <span class="lior-acc-link-icon">${icons.fileText}</span>
      </button>
    </div>
  </div>
</div>

<!-- Accessibility Declaration Modal -->
<div id="lior-acc-declaration-modal" class="lior-acc-modal" role="dialog" aria-modal="true" aria-labelledby="lior-acc-declaration-title" hidden>
  <div class="lior-acc-modal-overlay"></div>
  <div class="lior-acc-modal-content">
    <div class="lior-acc-modal-header">
      <h2 id="lior-acc-declaration-title">הצהרת הנגישות שלנו</h2>
      <button id="lior-acc-declaration-close" class="lior-acc-modal-close" type="button" aria-label="סגור">×</button>
    </div>
    <div class="lior-acc-modal-body">
      <p><strong>עודכן לאחרונה:</strong> 11.11.2025</p>

      <p>אנחנו רואים חשיבות עליונה בהנגשת האתר לכלל הגולשים, מתוך אמונה שכל אדם ראוי לחוויית גלישה שוויונית, פשוטה ומהנה.  

      הנגשה טובה מאפשרת לאנשים עם מוגבלות לגלוש באופן עצמאי ונוח, בהתאם לערכי השוויון, הכבוד והעצמאות שאנחנו מאמינים בהם.</p>

      <h3>התאמות נגישות שבוצעו באתר</h3>
      
      <div class="lior-acc-features-grid">
        <div class="lior-acc-feature-category">
          <h4>🔤 טקסט ותצוגה</h4>
          <ul>
            <li>הגדלת טקסט (עד שלבים שונים)</li>
            <li>הקטנת טקסט</li>
            <li>ריווח שורות</li>
            <li>ריווח בין מילים</li>
            <li>ריווח בין אותיות</li>
            <li>יישור טקסט לשמאל / לימין</li>
            <li>הדגשת כותרות</li>
            <li>הדגשת קישורים</li>
          </ul>
        </div>

        <div class="lior-acc-feature-category">
          <h4>🎨 צבע וניגודיות</h4>
          <ul>
            <li>ניגודיות גבוהה (בהירה על כהה)</li>
            <li>ניגודיות כהה (כהה על בהיר)</li>
            <li>גווני אפור</li>
            <li>היפוך צבעים</li>
            <li>מצב רקע בהיר / כהה</li>
            <li>כיבוי צבעים</li>
          </ul>
        </div>

        <div class="lior-acc-feature-category">
          <h4>👓 אלמנטים גרפיים</h4>
          <ul>
            <li>ביטול אנימציות (Transitions, GIF וכו')</li>
            <li>הסרת תמונות</li>
            <li>שינוי רוויה של תמונות</li>
            <li>הוספת מסגרת לקישורים</li>
            <li>הגדלת סמן העכבר</li>
            <li>הוספת הדגשה לסמן העכבר</li>
            <li>מגדיל מסך מובנה (Zoom Focus)</li>
          </ul>
        </div>

        <div class="lior-acc-feature-category">
          <h4>🧠 מצבים חכמים</h4>
          <ul>
            <li><strong>מצב לכבדי ראייה</strong> — ניגודיות גבוהה, טקסט גדול וקישורים מודגשים</li>
            <li><strong>מצב לדיסלקציה</strong> — גופן נגיש + ריווח + ביטול אנימציות</li>
            <li><strong>מצב לקשיי קשב (ADHD)</strong> — פוקוס קריאה + הדגשות + צמצום הסחות</li>
            <li><strong>מצב למשתמשי מקלדת בלבד</strong> — ניווט באמצעות מקשים בלבד</li>
          </ul>
        </div>

        <div class="lior-acc-feature-category">
          <h4>🗣️ עזרי קריאה והאזנה</h4>
          <ul>
            <li>קריאה בקול (Text-to-Speech)</li>
            <li>פוקוס קריאה (הכהיית הסביבה והשארת אזור טקסט ממוקד)</li>
            <li>סמן טקסט קריאה (קו עוקב אחר מיקום הקריאה)</li>
            <li>תמיכה מלאה בקוראי מסך (NVDA, JAWS, VoiceOver)</li>
            <li>תמיכה בניווט מקלדת (Tab / Shift+Tab / Enter)</li>
          </ul>
        </div>

        <div class="lior-acc-feature-category">
          <h4>🧰 הגדרות כלליות</h4>
          <ul>
            <li>תפריט נגישות מלא</li>
            <li>בחירת שפה (עברית / אנגלית)</li>
            <li>שמירת הגדרות למשתמש בין ביקורים</li>
            <li>איפוס הגדרות לנקודת ההתחלה</li>
            <li>תמיכה בדפדפנים: Chrome, Safari, Edge, Firefox</li>
          </ul>
        </div>
      </div>

      <h3>עמידה בתקנים</h3>
      <p>האתר עומד בדרישות תקן ישראלי ת״י 5568 לרמה AA ומבוסס על הנחיות התקן הבינלאומי WCAG 2.1.  

      האתר נבדק בתצוגה בדפדפנים מובילים (Chrome, Firefox, Safari, Edge) ובמכשירים ניידים שונים.</p>

      <h3>טכנולוגיה בשימוש</h3>
      <p>האתר מבוסס על טכנולוגיות <strong>HTML5, CSS3 ו-JavaScript</strong> תוך הקפדה על שימוש ב-ARIA Labels לתיאור אלמנטים גרפיים.  

      המערכת תומכת גם בהגדלת טקסט מערכתית וב־Keyboard Navigation מלא.</p>

      <h3>שירות לקוחות ונגישות אנושית</h3>
      <p>אנחנו ממשיכים לשפר את נגישות האתר והמערכת שלנו באופן שוטף.  

      אם נתקלת בבעיה או קושי בגלישה, או שיש לך הצעה לשיפור — נשמח מאוד לשמוע ממך.</p>

      <p><strong>איש קשר לנגישות:</strong><br>
      אימייל: <a href="mailto:accessibility@example.com">accessibility@example.com</a><br>
      טלפון: <a href="tel:03-1234567">03-1234567</a></p>

      <h3>הצהרה כללית</h3>
      <p>האתר נבדק באופן שוטף ומותאם לעדכונים טכנולוגיים חדשים, אך ייתכן שעדיין קיימים אזורים מסוימים באתר שטרם הונגשו במלואם.  

      אנחנו מחויבים להמשיך לפעול לשיפור חוויית הנגישות של כלל המשתמשים.</p>

      <p style="font-size:.9rem; opacity:.8; margin-top:1em;">© 2025 מערכת הנגישות של ליאור – כל הזכויות שמורות.</p>
    </div>
  </div>
</div>
`;

  // ============================================
  // INJECT CSS
  // ============================================
  function injectCSS() {
    if (doc.getElementById('lior-acc-styles')) return;
    
    // Inject Google Fonts link
    if (!doc.getElementById('lior-acc-fonts')) {
      const fontLink = doc.createElement('link');
      fontLink.id = 'lior-acc-fonts';
      fontLink.rel = 'preconnect';
      fontLink.href = 'https://fonts.googleapis.com';
      doc.head.appendChild(fontLink);
      
      const fontLink2 = doc.createElement('link');
      fontLink2.rel = 'preconnect';
      fontLink2.href = 'https://fonts.gstatic.com';
      fontLink2.crossOrigin = 'anonymous';
      doc.head.appendChild(fontLink2);
      
      const fontLink3 = doc.createElement('link');
      fontLink3.rel = 'stylesheet';
      fontLink3.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Assistant:wght@400;500;600;700&display=swap';
      doc.head.appendChild(fontLink3);
    }
    
    // Inject CSS styles
    const style = doc.createElement('style');
    style.id = 'lior-acc-styles';
    style.textContent = CSS;
    doc.head.appendChild(style);
  }

  // ============================================
  // INJECT HTML
  // ============================================
  function injectHTML(logoUrl) {
    if (doc.getElementById('lior-acc-root')) return;
    
    // Ensure body exists
    if (!doc.body) {
      // Wait for body to be available
      const checkBody = setInterval(() => {
        if (doc.body) {
          clearInterval(checkBody);
          injectHTML(logoUrl);
        }
      }, 10);
      return;
    }
    
    const container = doc.createElement('div');
    container.innerHTML = getHTML(logoUrl);
    
    // Get the widget root element
    const widgetRoot = container.querySelector('#lior-acc-root');
    if (widgetRoot) {
      doc.body.appendChild(widgetRoot);
    }
    
    // Get the modal element
    const modal = container.querySelector('#lior-acc-declaration-modal');
    if (modal) {
      doc.body.appendChild(modal);
    }
  }

  // ============================================
  // JAVASCRIPT FUNCTIONALITY
  // ============================================
  const byId = (id) => doc.getElementById(id);
  const FOCUSABLE_SELECTOR = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  const TOGGLES = [
    'inc-text',
    'spacing',
    'high-contrast',
    'dark-contrast',
    'grayscale',
    'invert',
    'underline-links',
    'highlight-links',
    'dyslexia',
    'big-cursor',
    'no-anim',
    'reading-focus',
    'focus-highlight'
  ];

  const toggleButtons = new Map();
  const toggleState = new Map();
  const state = {
    open: false,
    lastFocused: null,
    currentLang: 'he'
  };

  // Global accessibility state - single source of truth
  const accessibilityState = {
    currentSettings: {},
    activeProfileId: null,
    profiles: [],
    settingsChangeCount: 0,
    lastChangeTime: null
  };

  // Unified storage key - single source of truth
  const STORAGE_KEY = 'lior_accessibility_state_v1';
  const GLOBAL_STORAGE_KEY = 'liorAccGlobalSettings'; // Legacy support
  const CUSTOM_PROFILES_KEY = 'liorAccCustomProfiles'; // Legacy support
  const storageKey = (name) => `acc-${name}`; // Legacy support

  const getFocusable = (container) =>
    Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((el) => {
      const isHidden = el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true';
      const visible = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
      return !isHidden && visible;
    });

  const inertTargets = () =>
    Array.from(doc.body.children).filter(
      (el) => el.id !== 'lior-acc-root' && el.tagName !== 'SCRIPT'
    );

  function setOutsideInert(isInert) {
    inertTargets().forEach((el) => {
      if (isInert) {
        if (el.dataset.accInert === 'true') return;
        if ('inert' in el) {
          el.inert = true;
        } else {
          el.setAttribute('aria-hidden', 'true');
        }
        el.dataset.accInert = 'true';
      } else if (el.dataset.accInert === 'true') {
        if ('inert' in el) {
          el.inert = false;
        } else {
          el.removeAttribute('aria-hidden');
        }
        delete el.dataset.accInert;
      }
    });
  }

  function announce(action, label) {
    const live = byId('lior-acc-live-region');
    if (!live) return;
    live.textContent = '';
    const message = `${label} ${action}`;
    requestAnimationFrame(() => {
      live.textContent = message;
    });
  }

  function applyToggle(name, isOn, skipProfileReset = false) {
    const className = `acc-${name}`;
    root.classList.toggle(className, !!isOn);
    toggleState.set(name, !!isOn);
    // Update global state
    accessibilityState.currentSettings[name] = !!isOn;
    
    if (!skipProfileReset) {
      accessibilityState.settingsChangeCount++;
      accessibilityState.lastChangeTime = Date.now();
      
      // If settings changed manually, clear active profile
      if (accessibilityState.activeProfileId) {
        accessibilityState.activeProfileId = null;
        updateActiveProfileIndicator();
        renderCustomProfiles();
      }
      
      // Persist state after change
      persistState();
    }
    
    const btn = toggleButtons.get(name);
    if (btn) {
      btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    }
    
    // Update save button state after settings change
    requestAnimationFrame(() => {
      updateSaveButtonState();
    });
  }
  
  function getCurrentSettingsSnapshot() {
    const settings = {};
    TOGGLES.forEach((name) => {
      settings[name] = toggleState.get(name) || false;
    });
    // Include text size level if exists
    const textLevel = toggleState.get('inc-text-level') || 0;
    if (textLevel > 0) {
      settings['inc-text-level'] = textLevel;
    }
    return settings;
  }
  
  function applySettingsToDOM(settings, skipProfileReset = false) {
    // Reset all first
    TOGGLES.forEach((name) => {
      root.classList.remove(`acc-${name}`);
      toggleState.set(name, false);
      accessibilityState.currentSettings[name] = false;
      const btn = toggleButtons.get(name);
      if (btn) btn.setAttribute('aria-pressed', 'false');
    });
    
    // Apply settings
    Object.keys(settings).forEach((name) => {
      if (name === 'inc-text-level') {
        const level = settings[name];
        if (level > 0 && level <= 3) {
          root.classList.remove('acc-inc-text-1', 'acc-inc-text-2', 'acc-inc-text-3');
          root.classList.add(`acc-inc-text-${level}`);
          toggleState.set('inc-text', true);
          toggleState.set('inc-text-level', level);
          accessibilityState.currentSettings['inc-text'] = true;
          accessibilityState.currentSettings['inc-text-level'] = level;
          const btn = toggleButtons.get('inc-text');
          if (btn) {
            btn.setAttribute('aria-pressed', 'true');
            const sizes = ['', '118%', '150%', '200%'];
            const label = btn.querySelector('.lior-acc-toggle-label span span')?.textContent?.replace(/\(.*?\)/, '').trim() || 'הגדלת טקסט';
            const labelEl = btn.querySelector('.lior-acc-toggle-label span');
            if (labelEl) {
                      labelEl.innerHTML = `<span class="lior-acc-icon" aria-hidden="true">${icons.search}</span> ${label} (${sizes[level]})`;
            }
          }
        }
      } else if (TOGGLES.includes(name)) {
        applyToggle(name, settings[name], skipProfileReset);
      }
    });
    
    if (!skipProfileReset) {
      accessibilityState.settingsChangeCount = 0;
    }
    
    updateProfileStates();
  }

  function persistToggle(name, isOn) {
    try {
      if (isOn) {
        localStorage.setItem(storageKey(name), '1');
      } else {
        localStorage.removeItem(storageKey(name));
      }
      saveGlobalSettings();
    } catch (err) {
      console.warn('Lior Accessibility: unable to persist state', err);
    }
  }

  function saveGlobalSettings() {
    try {
      // Update current settings in state
      accessibilityState.currentSettings = getCurrentSettingsSnapshot();
      
      // Save legacy format for backward compatibility
      const settings = {};
      TOGGLES.forEach((name) => {
        settings[name] = toggleState.get(name) || false;
      });
      localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(settings));
      
      // Save unified state
      persistState();
    } catch (err) {
      console.warn('Lior Accessibility: unable to save global settings', err);
    }
  }

  function loadGlobalSettings() {
    try {
      const saved = localStorage.getItem(GLOBAL_STORAGE_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        Object.keys(settings).forEach((name) => {
          if (TOGGLES.includes(name)) {
            applyToggle(name, settings[name]);
          }
        });
      }
    } catch (err) {
      console.warn('Lior Accessibility: unable to load global settings', err);
    }
  }

  function updateProfileStates() {
    const profileSettings = {
      'vision': ['high-contrast', 'inc-text', 'highlight-links'],
      'learning': ['dyslexia', 'spacing', 'reading-focus', 'big-cursor'],
      'epilepsy': ['no-anim', 'grayscale'],
      'adhd': ['no-anim', 'reading-focus', 'big-cursor'],
      'dyslexia': ['dyslexia', 'spacing', 'no-anim']
    };
    Object.keys(profileSettings).forEach(profile => {
      const settings = profileSettings[profile];
      const isActive = settings.every(name => toggleState.get(name));
      const profileBtn = doc.querySelector(`[data-profile="${profile}"]`);
      if (profileBtn) {
        profileBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      }
    });
  }

  function handleToggle(name) {
    if (!TOGGLES.includes(name)) {
      if (name === 'text-to-speech') {
        readSelection();
        return;
      }
      return;
    }
    
    // Special handling for inc-text with levels
    if (name === 'inc-text') {
      const currentLevel = toggleState.get('inc-text-level') || 0;
      const nextLevel = (currentLevel + 1) % 4; // 0, 1, 2, 3, then back to 0
      
      // Remove all text size classes
      root.classList.remove('acc-inc-text-1', 'acc-inc-text-2', 'acc-inc-text-3');
      
      if (nextLevel === 0) {
        toggleState.set('inc-text', false);
        toggleState.set('inc-text-level', 0);
        const btn = toggleButtons.get('inc-text');
        if (btn) btn.setAttribute('aria-pressed', 'false');
        announce('כובה', 'הגדלת טקסט');
      } else {
        root.classList.add(`acc-inc-text-${nextLevel}`);
        toggleState.set('inc-text', true);
        toggleState.set('inc-text-level', nextLevel);
        const btn = toggleButtons.get('inc-text');
        if (btn) {
          btn.setAttribute('aria-pressed', 'true');
          const sizes = ['', '118%', '150%', '200%'];
          const label = btn.textContent.replace(/\(.*?\)/, '').trim();
          btn.textContent = `${label} (${sizes[nextLevel]})`;
        }
        announce('הופעל', `הגדלת טקסט ${['', '118%', '150%', '200%'][nextLevel]}`);
      }
      
      try {
        localStorage.setItem(storageKey('inc-text-level'), nextLevel.toString());
        if (nextLevel === 0) {
          localStorage.removeItem(storageKey('inc-text'));
        } else {
          localStorage.setItem(storageKey('inc-text'), '1');
        }
        saveGlobalSettings();
      } catch (err) {
        console.warn('Lior Accessibility: unable to persist text size level', err);
      }
      
      updateProfileStates();
      return;
    }
    
    const nextState = !toggleState.get(name);
    applyToggle(name, nextState);
    persistToggle(name, nextState);
    updateProfileStates();
    const label = toggleButtons.get(name)?.textContent?.trim() || toggleButtons.get(name)?.getAttribute('aria-label') || name;
    announce(nextState ? t('enabled') : t('disabled'), label);
  }

  function restoreToggles() {
    const hasGlobal = localStorage.getItem(GLOBAL_STORAGE_KEY);
    if (hasGlobal) {
      loadGlobalSettings();
    } else {
      TOGGLES.forEach((name) => {
        if (name === 'inc-text') {
          // Restore text size level
          try {
            const level = parseInt(localStorage.getItem(storageKey('inc-text-level')) || '0', 10);
            if (level > 0 && level <= 3) {
              root.classList.add(`acc-inc-text-${level}`);
              toggleState.set('inc-text', true);
              toggleState.set('inc-text-level', level);
              const btn = toggleButtons.get('inc-text');
              if (btn) {
                btn.setAttribute('aria-pressed', 'true');
                const sizes = ['', '118%', '150%', '200%'];
                const label = btn.textContent.replace(/\(.*?\)/, '').trim();
                btn.textContent = `${label} (${sizes[level]})`;
              }
            }
          } catch (err) {
            // Ignore
          }
        } else {
          let saved = false;
          try {
            saved = localStorage.getItem(storageKey(name)) === '1';
          } catch (err) {
            saved = false;
          }
          applyToggle(name, saved);
        }
      });
    }
  }

  function detectLanguage() {
    const htmlLang = root.lang || doc.querySelector('html').getAttribute('lang') || 'he';
    const detected = htmlLang.split('-')[0];
    if (labels[detected]) {
      state.currentLang = detected;
    } else {
      state.currentLang = 'he';
    }
    return state.currentLang;
  }

  function t(key) {
    const lang = state.currentLang || 'he';
    return labels[lang]?.[key] || labels.he[key] || key;
  }

  function showToast(message) {
    let toast = byId('lior-acc-toast');
    if (!toast) {
      toast = doc.createElement('div');
      toast.id = 'lior-acc-toast';
      toast.className = 'lior-acc-toast';
      doc.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  let isSpeaking = false;
  let speechButton = null;

  function readSelection() {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      showToast('קריאה בקול לא נתמך בדפדפן זה');
      return;
    }

    // If already speaking, stop it
    if (isSpeaking || speechSynthesis.speaking) {
      speechSynthesis.cancel();
      isSpeaking = false;
      if (speechButton) {
        const icon = speechButton.querySelector('.lior-acc-icon');
        if (icon) icon.innerHTML = icons.volume;
      }
      showToast('קריאה הופסקה');
      return;
    }

    // Get selected text
    const selection = window.getSelection().toString().trim();
    if (!selection || selection.length === 0) {
      showToast('אנא בחר טקסט להקראה');
      return;
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(selection);
    utterance.lang = state.currentLang === 'he' ? 'he-IL' : state.currentLang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Handle end of speech
    utterance.onend = () => {
      isSpeaking = false;
      if (speechButton) {
        const icon = speechButton.querySelector('.lior-acc-icon');
        if (icon) icon.innerHTML = icons.volume;
      }
    };
    
    // Handle errors
    utterance.onerror = (event) => {
      isSpeaking = false;
      if (speechButton) {
        const icon = speechButton.querySelector('.lior-acc-icon');
        if (icon) icon.innerHTML = icons.volume;
      }
      showToast('שגיאה בקריאה בקול');
    };
    
    // Start speaking
    isSpeaking = true;
    speechSynthesis.speak(utterance);
    
    // Update button icon
    const button = doc.querySelector('[data-action="text-to-speech"]');
    if (button) {
      speechButton = button;
      const icon = button.querySelector('.lior-acc-icon');
      if (icon) {
        icon.innerHTML = icons.pause;
      }
    }
    
    showToast('מקריא את הטקסט הנבחר...');
  }

  function openPanel() {
    if (state.open) return;
    const button = byId('lior-acc-button');
    const panel = byId('lior-acc-panel');
    const overlay = byId('lior-acc-overlay');
    if (!button || !panel) return;
    state.lastFocused = doc.activeElement;
    state.open = true;
    button.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    panel.setAttribute('tabindex', '-1');
    // Prevent body scroll on mobile
    if (window.innerWidth <= 768) {
      doc.body.style.overflow = 'hidden';
    }
    
    requestAnimationFrame(() => {
      panel.classList.add('show');
    });
    if (overlay) {
      overlay.hidden = false;
      overlay.setAttribute('aria-hidden', 'false');
    }
    setOutsideInert(true);
    const focusable = getFocusable(panel);
    const focusTarget = focusable[0] || byId('lior-acc-close') || panel;
    focusTarget.focus();
    
    // Add swipe down to close on mobile
    if (window.innerWidth <= 768) {
      addSwipeToClose(panel);
    }
  }
  
  function addSwipeToClose(panel) {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    
    const handleTouchStart = (e) => {
      // Only allow swipe from header area (handle or header)
      const header = panel.querySelector('.lior-acc-panel-header');
      if (!header || !header.contains(e.target)) return;
      
      startY = e.touches[0].clientY;
      isDragging = true;
      panel.style.transition = 'none';
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      // Only allow downward swipe
      if (deltaY > 0) {
        panel.style.transform = `translateY(${deltaY}px)`;
        // Add slight opacity fade
        const opacity = Math.max(0.7, 1 - (deltaY / 300));
        panel.style.opacity = opacity;
      }
    };
    
    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      panel.style.transition = '';
      
      const deltaY = currentY - startY;
      const threshold = 100; // Minimum swipe distance to close
      
      if (deltaY > threshold) {
        closePanel();
      } else {
        // Snap back
        panel.style.transform = '';
        panel.style.opacity = '';
      }
    };
    
    // Remove old listeners if any
    panel.removeEventListener('touchstart', handleTouchStart);
    panel.removeEventListener('touchmove', handleTouchMove);
    panel.removeEventListener('touchend', handleTouchEnd);
    
    // Add new listeners
    panel.addEventListener('touchstart', handleTouchStart, { passive: true });
    panel.addEventListener('touchmove', handleTouchMove, { passive: true });
    panel.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  function closePanel() {
    if (!state.open) return;
    const button = byId('lior-acc-button');
    const panel = byId('lior-acc-panel');
    const overlay = byId('lior-acc-overlay');
    state.open = false;
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
    if (panel) {
      panel.classList.remove('show');
      
      // Restore body scroll on mobile
      if (window.innerWidth <= 768) {
        doc.body.style.overflow = '';
      }
      
      const body = panel.querySelector('.lior-acc-panel-body');
      const header = panel.querySelector('.lior-acc-panel-header');
      if (body) body.style.animation = 'none';
      if (header) header.style.animation = 'none';
      setTimeout(() => {
        panel.hidden = true;
        panel.setAttribute('aria-hidden', 'true');
        if (body) body.style.animation = '';
        if (header) header.style.animation = '';
      }, 400);
    }
    if (overlay) {
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
    }
    setOutsideInert(false);
    if (state.lastFocused && typeof state.lastFocused.focus === 'function') {
      state.lastFocused.focus();
    }
    state.lastFocused = null;
  }

  function handleDocumentKeydown(event) {
    const key = typeof event.key === 'string' ? event.key : '';
    if (event.altKey && key.toLowerCase() === 'a') {
      event.preventDefault();
      state.open ? closePanel() : openPanel();
      return;
    }
    if (!state.open) return;
    if (key === 'Escape') {
      event.preventDefault();
      closePanel();
      return;
    }
    if (key !== 'Tab') return;
    const panel = byId('lior-acc-panel');
    if (!panel) return;
    const focusable = getFocusable(panel);
    if (!focusable.length) {
      event.preventDefault();
      panel.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = doc.activeElement;
    if (event.shiftKey) {
      if (current === first || !panel.contains(current)) {
        event.preventDefault();
        last.focus();
      }
    } else if (current === last || !panel.contains(current)) {
      event.preventDefault();
      first.focus();
    }
  }

  function resetAll() {
    TOGGLES.forEach((name) => {
      applyToggle(name, false);
      persistToggle(name, false);
    });
    try {
      for (let i = localStorage.length - 1; i >= 0; i -= 1) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('acc-') || key === GLOBAL_STORAGE_KEY)) {
          localStorage.removeItem(key);
        }
      }
    } catch (err) {
      // no-op
    }
    Array.from(root.classList).forEach((cls) => {
      if (cls.startsWith('acc-')) root.classList.remove(cls);
    });
    TOGGLES.forEach((name) => toggleButtons.get(name)?.setAttribute('aria-pressed', 'false'));
    announce(t('resetDone'), t('reset'));
    showToast(t('resetDone'));
  }

  function saveAsDefault() {
    saveGlobalSettings();
    showToast(t('saved'));
    announce(t('saved'), t('saveDefault'));
  }

  function enableProfile(profile) {
    const profileSettings = {
      'vision': ['high-contrast', 'inc-text', 'highlight-links'],
      'learning': ['dyslexia', 'spacing', 'reading-focus', 'big-cursor'],
      'epilepsy': ['no-anim', 'grayscale'],
      'adhd': ['no-anim', 'reading-focus', 'big-cursor'],
      'dyslexia': ['dyslexia', 'spacing', 'no-anim']
    };
    const settings = profileSettings[profile];
    if (!settings) return;
    const isActive = settings.every(name => toggleState.get(name));
    
    // If already active, deactivate all profile settings
    if (isActive) {
      settings.forEach(name => {
        applyToggle(name, false);
        persistToggle(name, false);
      });
      // Clear any active custom profile
      if (accessibilityState.activeProfileId) {
        accessibilityState.activeProfileId = null;
        updateActiveProfileIndicator();
        renderCustomProfiles();
      }
    } else {
      // Deactivate other built-in profiles first
      Object.keys(profileSettings).forEach(otherProfile => {
        if (otherProfile !== profile) {
          const otherSettings = profileSettings[otherProfile];
          const otherIsActive = otherSettings.every(name => toggleState.get(name));
          if (otherIsActive) {
            otherSettings.forEach(name => {
              applyToggle(name, false);
              persistToggle(name, false);
            });
          }
        }
      });
      // Clear any active custom profile
      if (accessibilityState.activeProfileId) {
        accessibilityState.activeProfileId = null;
        updateActiveProfileIndicator();
        renderCustomProfiles();
      }
      // Activate this profile
      settings.forEach(name => {
        applyToggle(name, true);
        persistToggle(name, true);
      });
    }
    
    const profileNames = {
      'vision': 'ראייה',
      'learning': 'לקויות למידה מורכבות',
      'epilepsy': 'אפילפסיה',
      'adhd': 'קשב וריכוז',
      'dyslexia': 'דיסלקציה'
    };
    showToast(profileNames[profile] + ' ' + (!isActive ? t('enabled') : t('disabled')));
    const profileBtn = doc.querySelector(`[data-profile="${profile}"]`);
    if (profileBtn) {
      profileBtn.setAttribute('aria-pressed', !isActive ? 'true' : 'false');
    }
  }

  function enableMode(mode) {
    if (mode === 'vision') {
      enableProfile('vision');
    } else if (mode === 'dyslexia') {
      enableProfile('dyslexia');
    } else if (mode === 'cognitive') {
      enableProfile('adhd');
    }
  }

  function loadStateFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Try to migrate from old format
        migrateFromOldStorage();
        return;
      }

      const saved = JSON.parse(raw);

      // Basic validation
      if (!saved || typeof saved !== 'object') {
        migrateFromOldStorage();
        return;
      }

      // Load profiles
      if (Array.isArray(saved.profiles)) {
        accessibilityState.profiles = saved.profiles;
      }

      // Load active profile
      if (saved.activeProfileId) {
        accessibilityState.activeProfileId = saved.activeProfileId;
      }

      // Load current settings if exists
      if (saved.currentSettings && typeof saved.currentSettings === 'object') {
        accessibilityState.currentSettings = saved.currentSettings;
      }

      // Apply settings to DOM if we have active profile
      if (accessibilityState.activeProfileId) {
        const profile = accessibilityState.profiles.find(p => p.id === accessibilityState.activeProfileId);
        if (profile && profile.settings) {
          applySettingsToDOM(profile.settings, true);
          // Show notification only if profile was actually loaded
          setTimeout(() => {
            showToast('טענו את הפרופיל האחרון שלך ✓');
          }, 800);
        }
      } else if (saved.currentSettings && Object.keys(saved.currentSettings).length > 0) {
        // Apply saved settings even without active profile (user had custom settings)
        const hasActiveSettings = Object.values(saved.currentSettings).some(val => val === true || (typeof val === 'number' && val > 0));
        if (hasActiveSettings) {
          applySettingsToDOM(saved.currentSettings, true);
        }
      }
    } catch (err) {
      console.warn('Lior Accessibility: unable to load state from storage', err);
      migrateFromOldStorage();
    }
  }

  function migrateFromOldStorage() {
    // Try to load from old format and migrate
    try {
      const oldProfiles = localStorage.getItem(CUSTOM_PROFILES_KEY);
      if (oldProfiles) {
        const profilesData = JSON.parse(oldProfiles);
        if (Array.isArray(profilesData)) {
          accessibilityState.profiles = profilesData;
        } else if (typeof profilesData === 'object') {
          // Old format - convert to array
          accessibilityState.profiles = Object.keys(profilesData).map(name => ({
            id: crypto.randomUUID ? crypto.randomUUID() : 'profile-' + Date.now() + '-' + Math.random(),
            name: name,
            createdAt: profilesData[name].createdAt || Date.now(),
            settings: profilesData[name].settings || {},
            domain: null
          }));
        }
        // Save in new format
        persistState();
      }
    } catch (err) {
      console.warn('Lior Accessibility: unable to migrate from old storage', err);
    }
  }

  function persistState() {
    try {
      const stateToSave = {
        currentSettings: accessibilityState.currentSettings,
        activeProfileId: accessibilityState.activeProfileId,
        profiles: accessibilityState.profiles,
        lastSaved: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.warn('Lior Accessibility: unable to save state to storage', err);
    }
  }

  function saveCustomProfile(name, settings, domain = null) {
    try {
      const profile = {
        id: crypto.randomUUID ? crypto.randomUUID() : 'profile-' + Date.now() + '-' + Math.random(),
        name: name,
        createdAt: Date.now(),
        settings: { ...settings },
        domain: domain || null
      };

      accessibilityState.profiles.push(profile);
      accessibilityState.activeProfileId = profile.id;
      accessibilityState.currentSettings = { ...settings };
      persistState();
      renderCustomProfiles();
      
      // Animate save button and show success state
      const saveBtn = byId('lior-acc-save-profile');
      const saveText = saveBtn?.querySelector('.lior-acc-save-text');
      const saveIcon = saveBtn?.querySelector('.lior-acc-save-icon');
      if (saveBtn) {
        saveBtn.classList.add('saving');
        if (saveText) {
          const originalText = saveText.textContent;
          saveText.textContent = 'נשמר ✓';
          setTimeout(() => {
            saveBtn.classList.remove('saving');
            updateSaveButtonState();
          }, 2000);
        }
        if (saveIcon) {
          saveIcon.classList.add('saved');
          setTimeout(() => {
            saveIcon.classList.remove('saved');
          }, 600);
        }
      }
      
      showToast('פרופיל נשמר בהצלחה: ' + name);
      return profile.id;
    } catch (err) {
      console.warn('Lior Accessibility: unable to save custom profile', err);
      showToast('שגיאה בשמירת פרופיל');
      return null;
    }
  }

  function updateCustomProfile(profileId, settings) {
    try {
      const profile = accessibilityState.profiles.find(p => p.id === profileId);
      if (!profile) return false;
      
      profile.settings = { ...settings };
      profile.updatedAt = Date.now();
      accessibilityState.currentSettings = { ...settings };
      persistState();
      renderCustomProfiles();
      updateActiveProfileIndicator();
      
      // Animate save button and show success state
      const saveBtn = byId('lior-acc-save-profile');
      const saveText = saveBtn?.querySelector('.lior-acc-save-text');
      const saveIcon = saveBtn?.querySelector('.lior-acc-save-icon');
      if (saveBtn) {
        saveBtn.classList.add('saving');
        if (saveText) {
          saveText.textContent = 'נשמר ✓';
          setTimeout(() => {
            saveBtn.classList.remove('saving');
            updateSaveButtonState();
          }, 2000);
        }
        if (saveIcon) {
          saveIcon.classList.add('saved');
          setTimeout(() => {
            saveIcon.classList.remove('saved');
          }, 600);
        }
      }
      
      showToast('פרופיל עודכן: ' + profile.name);
      return true;
    } catch (err) {
      console.warn('Lior Accessibility: unable to update profile', err);
      return false;
    }
  }

  function deactivateProfile() {
    // Reset all settings
    const emptySettings = {};
    TOGGLES.forEach((name) => {
      emptySettings[name] = false;
    });
    
    applySettingsToDOM(emptySettings, true);
    
    // Clear active profile
    accessibilityState.activeProfileId = null;
    accessibilityState.currentSettings = {};
    accessibilityState.settingsChangeCount = 0;
    
    // Clear localStorage (legacy)
    TOGGLES.forEach((name) => {
      localStorage.removeItem(storageKey(name));
    });
    localStorage.removeItem(storageKey('inc-text-level'));
    localStorage.removeItem(GLOBAL_STORAGE_KEY);
    
    persistState(); // Save unified state
    updateProfileStates();
    renderCustomProfiles();
    updateActiveProfileIndicator();
    showToast('פרופיל כובה');
  }

  function loadCustomProfile(profileId) {
    try {
      const profile = accessibilityState.profiles.find(p => p.id === profileId);
      if (!profile || !profile.settings) return false;
      
      // Deactivate all built-in profiles first
      const profileSettings = {
        'vision': ['high-contrast', 'inc-text', 'highlight-links'],
        'learning': ['dyslexia', 'spacing', 'reading-focus', 'big-cursor'],
        'epilepsy': ['no-anim', 'grayscale'],
        'adhd': ['no-anim', 'reading-focus', 'big-cursor'],
        'dyslexia': ['dyslexia', 'spacing', 'no-anim']
      };
      
      Object.keys(profileSettings).forEach(builtInProfile => {
        const builtInSettings = profileSettings[builtInProfile];
        const isActive = builtInSettings.every(name => toggleState.get(name));
        if (isActive) {
          builtInSettings.forEach(name => {
            applyToggle(name, false, true); // Skip profile reset
            persistToggle(name, false);
          });
          const profileBtn = doc.querySelector(`[data-profile="${builtInProfile}"]`);
          if (profileBtn) {
            profileBtn.setAttribute('aria-pressed', 'false');
          }
        }
      });
      
      // Apply settings to DOM (skip profile reset to keep activeProfileId)
      applySettingsToDOM(profile.settings, true);
      
      // Update state
      accessibilityState.currentSettings = { ...profile.settings };
      accessibilityState.activeProfileId = profileId;
      accessibilityState.settingsChangeCount = 0;
      
      // Persist to localStorage (legacy support)
      Object.keys(profile.settings).forEach((name) => {
        if (name === 'inc-text-level') {
          localStorage.setItem(storageKey('inc-text-level'), profile.settings[name].toString());
          if (profile.settings[name] > 0) {
            localStorage.setItem(storageKey('inc-text'), '1');
          }
        } else if (TOGGLES.includes(name)) {
          persistToggle(name, profile.settings[name]);
        }
      });
      
      saveGlobalSettings();
      persistState(); // Save unified state
      updateProfileStates();
      renderCustomProfiles();
      updateActiveProfileIndicator();
      showToast('פרופיל נטען: ' + profile.name);
      return true;
    } catch (err) {
      console.warn('Lior Accessibility: unable to load custom profile', err);
      showToast('שגיאה בטעינת פרופיל');
      return false;
    }
  }

  function deleteCustomProfile(profileId) {
    try {
      const profile = accessibilityState.profiles.find(p => p.id === profileId);
      if (!profile) return false;
      
      const index = accessibilityState.profiles.findIndex(p => p.id === profileId);
      accessibilityState.profiles.splice(index, 1);
      
      if (accessibilityState.activeProfileId === profileId) {
        accessibilityState.activeProfileId = null;
        accessibilityState.currentSettings = {};
      }
      
      persistState();
      renderCustomProfiles();
      updateActiveProfileIndicator();
      showToast('פרופיל נמחק: ' + profile.name);
      return true;
    } catch (err) {
      console.warn('Lior Accessibility: unable to delete custom profile', err);
      return false;
    }
  }

  function renderCustomProfiles() {
    const container = byId('lior-acc-custom-profiles-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (accessibilityState.profiles.length === 0) {
      return;
    }
    
    accessibilityState.profiles.forEach((profile) => {
      const isActive = accessibilityState.activeProfileId === profile.id;
      
      const profileBtn = doc.createElement('button');
      profileBtn.className = 'lior-acc-profile-toggle';
      if (isActive) {
        profileBtn.classList.add('active');
      }
      profileBtn.setAttribute('data-profile-id', profile.id);
      profileBtn.setAttribute('type', 'button');
      profileBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      
      const iconSpan = doc.createElement('span');
      iconSpan.className = 'lior-acc-profile-icon';
      iconSpan.innerHTML = icons.save;
      
      const nameSpan = doc.createElement('span');
      nameSpan.className = 'lior-acc-profile-name';
      nameSpan.textContent = profile.name;
      
      const switchSpan = doc.createElement('span');
      switchSpan.className = 'lior-acc-profile-switch';
      
      const deleteBtn = doc.createElement('button');
      deleteBtn.className = 'lior-acc-profile-delete';
      deleteBtn.setAttribute('type', 'button');
      deleteBtn.setAttribute('aria-label', 'מחק פרופיל');
      deleteBtn.innerHTML = icons.delete;
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm('האם למחוק את הפרופיל "' + profile.name + '"?')) {
          deleteCustomProfile(profile.id);
        }
      };
      
      profileBtn.appendChild(iconSpan);
      profileBtn.appendChild(nameSpan);
      profileBtn.appendChild(switchSpan);
      profileBtn.appendChild(deleteBtn);
      
      profileBtn.addEventListener('click', () => {
        if (isActive) {
          // If profile is already active, deactivate it
          deactivateProfile();
        } else {
          // Load the profile
          loadCustomProfile(profile.id);
        }
      });
      
      container.appendChild(profileBtn);
    });
  }
  
  function updateActiveProfileIndicator() {
    const activeProfile = accessibilityState.profiles.find(p => p.id === accessibilityState.activeProfileId);
    const indicator = byId('lior-acc-active-profile-indicator');
    
    if (indicator) {
      if (activeProfile) {
        indicator.textContent = 'פרופיל פעיל: ' + activeProfile.name;
        indicator.style.display = 'block';
      } else {
        indicator.textContent = '';
        indicator.style.display = 'none';
      }
    }
    
    // Update save button state
    updateSaveButtonState();
  }
  
  function updateSaveButtonState() {
    const saveBtn = byId('lior-acc-save-profile');
    const saveText = saveBtn?.querySelector('.lior-acc-save-text');
    if (!saveBtn || !saveText) return;
    
    const currentSettings = getCurrentSettingsSnapshot();
    const hasActiveSettings = Object.values(currentSettings).some(val => val === true || (typeof val === 'number' && val > 0));
    
    // Check if current settings match active profile
    if (accessibilityState.activeProfileId) {
      const activeProfile = accessibilityState.profiles.find(p => p.id === accessibilityState.activeProfileId);
      if (activeProfile) {
        const settingsMatch = JSON.stringify(activeProfile.settings) === JSON.stringify(currentSettings);
        if (settingsMatch) {
          // Settings match - disable button
          saveBtn.classList.add('disabled');
          saveBtn.disabled = true;
          saveText.textContent = 'פרופיל שמור';
          return;
        } else {
          // Settings changed - enable update button
          saveBtn.classList.remove('disabled');
          saveBtn.disabled = false;
          saveText.textContent = 'עדכן פרופיל';
          return;
        }
      }
    }
    
    // No active profile or no match
    if (!hasActiveSettings) {
      saveBtn.classList.add('disabled');
      saveBtn.disabled = true;
      saveText.textContent = 'שמור פרופיל מותאם';
    } else {
      saveBtn.classList.remove('disabled');
      saveBtn.disabled = false;
      saveText.textContent = 'שמור פרופיל מותאם';
    }
  }

  function handleSaveProfile() {
    const hasActiveProfile = accessibilityState.activeProfileId !== null;
    const settings = getCurrentSettingsSnapshot();
    const hasActiveSettings = Object.values(settings).some(val => val === true || (typeof val === 'number' && val > 0));
    
    if (!hasActiveSettings) {
      showToast('אנא הפעל לפחות הגדרה אחת לפני שמירת פרופיל');
      return;
    }
    
    if (hasActiveProfile) {
      // Show update vs new save dialog
      const action = confirm('פרופיל פעיל זוהה. לעדכן את הפרופיל הקיים או לשמור כפרופיל חדש?\n\nOK = עדכון פרופיל נוכחי\nביטול = שמירה כפרופיל חדש');
      
      if (action) {
        // Update existing
        updateCustomProfile(accessibilityState.activeProfileId, settings);
      } else {
        // Save as new
        const name = prompt('הזן שם לפרופיל החדש:');
        if (name && name.trim() !== '') {
          const domainOnly = confirm('להחיל את הפרופיל הזה רק באתר הזה?');
          saveCustomProfile(name.trim(), settings, domainOnly ? location.hostname : null);
        }
      }
    } else {
      // Save as new
      const name = prompt('הזן שם לפרופיל:');
      if (!name || name.trim() === '') {
        return;
      }
      const domainOnly = confirm('להחיל את הפרופיל הזה רק באתר הזה?');
      saveCustomProfile(name.trim(), settings, domainOnly ? location.hostname : null);
    }
    
    renderCustomProfiles();
    updateActiveProfileIndicator();
  }

  function openAccessibilityDeclaration() {
    const modal = byId('lior-acc-declaration-modal');
    if (modal) {
      closePanel();
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => {
        modal.classList.add('show');
      });
      const closeBtn = byId('lior-acc-declaration-close');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 200);
      }
      doc.body.style.overflow = 'hidden';
    }
  }

  function closeAccessibilityDeclaration() {
    const modal = byId('lior-acc-declaration-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        doc.body.style.overflow = '';
      }, 300);
    }
  }

  function initAPI() {
    window.liorAcc = window.liorAcc || {};
    window.liorAcc.set = (name, isOn) => {
      if (!TOGGLES.includes(name)) {
        console.warn('Lior Accessibility: invalid toggle', name);
        return;
      }
      applyToggle(name, !!isOn);
      persistToggle(name, !!isOn);
      const label = toggleButtons.get(name)?.textContent?.trim() || toggleButtons.get(name)?.getAttribute('aria-label') || name;
      announce(isOn ? t('enabled') : t('disabled'), label);
    };
    window.liorAcc.enableMode = enableMode;
    window.liorAcc.readSelection = readSelection;
    window.liorAcc.saveAsDefault = saveAsDefault;
    window.liorAcc.t = t;
  }

  function updateLabels() {
    detectLanguage();
    const lang = state.currentLang;
    const title = byId('lior-acc-title');
    if (title) {
      title.textContent = t('settings');
      // Version is added via CSS ::after
    }
    doc.querySelectorAll('.lior-acc-toggle').forEach((btn) => {
      const name = btn.dataset.toggle || btn.dataset.action;
      if (!name) return;
      const camelKey = name === 'inc-text' ? 'increaseText' :
                      name === 'high-contrast' ? 'highContrast' :
                      name === 'dark-contrast' ? 'darkContrast' :
                      name === 'underline-links' ? 'underlineLinks' :
                      name === 'highlight-links' ? 'highlightLinks' :
                      name === 'big-cursor' ? 'bigCursor' :
                      name === 'no-anim' ? 'noAnim' :
                      name === 'reading-focus' ? 'readingFocus' :
                      name === 'focus-highlight' ? 'focusHighlight' :
                      name === 'text-to-speech' ? 'textToSpeech' : name;
      const label = t(camelKey);
      if (label && label !== camelKey) {
        btn.textContent = label;
      }
    });
    const reset = byId('lior-acc-reset');
    if (reset) reset.textContent = t('reset');
    
    const declaration = byId('lior-acc-declaration');
    if (declaration) declaration.textContent = t('accessibilityDeclaration');
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  function init() {
    const script = doc.currentScript || Array.from(doc.scripts).pop();
    // Use dataset for better compatibility
    const logoUrl = script?.dataset?.logoUrl || script?.getAttribute('data-logo-url') || null;
    
    injectCSS();
    injectHTML(logoUrl);
    
    // Wait for elements to be created and DOM to be ready
    const setupWidget = () => {
      const button = byId('lior-acc-button');
      const overlay = byId('lior-acc-overlay');
      const closeBtn = byId('lior-acc-close');
      const panel = byId('lior-acc-panel');
      const reset = byId('lior-acc-reset');

      if (!button || !panel) {
        // Retry if elements are not yet created
        setTimeout(setupWidget, 50);
        return;
      }

      detectLanguage();
      updateLabels();

      doc.querySelectorAll('.lior-acc-toggle').forEach((btn) => {
        const name = btn.dataset.toggle || btn.dataset.action;
        if (!name) return;
        if (TOGGLES.includes(name)) {
          toggleButtons.set(name, btn);
        }
        if (btn.dataset.action && !btn.dataset.toggle) {
          return;
        }
        // Make entire row clickable on mobile
        if (window.innerWidth <= 768) {
          btn.addEventListener('click', (e) => {
            // If clicked directly on switch, don't double-trigger
            if (e.target.closest('.lior-acc-toggle-switch')) {
              return;
            }
            handleToggle(name);
          });
        } else {
          btn.addEventListener('click', () => handleToggle(name));
        }
        btn.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle(name);
          }
        });
      });

      doc.querySelectorAll('[data-action]').forEach((btn) => {
        const action = btn.dataset.action;
        btn.addEventListener('click', () => {
          if (action === 'text-to-speech') {
            speechButton = btn;
            readSelection();
          }
        });
      });

      doc.querySelectorAll('[data-profile]').forEach((btn) => {
        const profile = btn.dataset.profile;
        btn.addEventListener('click', () => enableProfile(profile));
      });

      doc.querySelectorAll('.lior-acc-category-header').forEach((header) => {
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          const isExpanded = header.getAttribute('aria-expanded') === 'true';
          header.setAttribute('aria-expanded', !isExpanded);
          if (isExpanded) {
            content.hidden = true;
          } else {
            content.hidden = false;
            // Add opening animation
            content.classList.add('lior-acc-category-content--opening');
            setTimeout(() => {
              content.classList.remove('lior-acc-category-content--opening');
            }, 180);
          }
        });
      });

      // Initialize state - load from unified storage
      loadStateFromStorage();
      
      // If no state was loaded, initialize with current settings
      if (!accessibilityState.currentSettings || Object.keys(accessibilityState.currentSettings).length === 0) {
        accessibilityState.currentSettings = getCurrentSettingsSnapshot();
        // Try to restore from legacy storage
        restoreToggles();
      }
      
      updateProfileStates();
      renderCustomProfiles();
      updateActiveProfileIndicator();
      
      // Initialize save button state
      updateSaveButtonState();

      const saveProfileBtn = byId('lior-acc-save-profile');
      if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', handleSaveProfile);
      }

      button.addEventListener('click', () => (state.open ? closePanel() : openPanel()));
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          state.open ? closePanel() : openPanel();
        }
      });

      if (overlay) {
        overlay.addEventListener('click', closePanel);
      }
      if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
      }
      if (reset) {
        reset.addEventListener('click', resetAll);
      }

      // Theme toggle
      const themeToggle = byId('lior-acc-theme-toggle');
      if (themeToggle) {
        // Restore theme
        try {
          const savedTheme = localStorage.getItem('lior-acc-theme');
          if (savedTheme === 'dark') {
            const rootEl = byId('lior-acc-root');
            if (rootEl) rootEl.classList.add('dark-mode');
            const icon = themeToggle.querySelector('.lior-acc-theme-icon');
            if (icon) icon.innerHTML = icons.sun;
          }
        } catch (err) {
          // Ignore
        }
        
        themeToggle.addEventListener('click', () => {
          const rootEl = byId('lior-acc-root');
          if (!rootEl) return;
          
          const isDark = rootEl.classList.contains('dark-mode');
          if (isDark) {
            rootEl.classList.remove('dark-mode');
            const icon = themeToggle.querySelector('.lior-acc-theme-icon');
            if (icon) icon.innerHTML = icons.moon;
            try {
              localStorage.setItem('lior-acc-theme', 'light');
            } catch (err) {
              // Ignore
            }
            showToast('מצב בהיר');
          } else {
            rootEl.classList.add('dark-mode');
            const icon = themeToggle.querySelector('.lior-acc-theme-icon');
            if (icon) icon.innerHTML = icons.sun;
            try {
              localStorage.setItem('lior-acc-theme', 'dark');
            } catch (err) {
              // Ignore
            }
            showToast('מצב כהה');
          }
        });
      }

      const accDeclaration = byId('lior-acc-declaration');
      if (accDeclaration) {
        accDeclaration.addEventListener('click', (e) => {
          e.preventDefault();
          openAccessibilityDeclaration();
        });
      }

      const accModalClose = byId('lior-acc-declaration-close');
      const accModal = byId('lior-acc-declaration-modal');
      if (accModalClose) {
        accModalClose.addEventListener('click', closeAccessibilityDeclaration);
      }
      if (accModal) {
        const modalOverlay = accModal.querySelector('.lior-acc-modal-overlay');
        if (modalOverlay) {
          modalOverlay.addEventListener('click', closeAccessibilityDeclaration);
        }
        accModal.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            closeAccessibilityDeclaration();
          }
        });
      }

      doc.addEventListener('keydown', handleDocumentKeydown, true);
      initAPI();
      console.log('Lior Accessibility Widget v0.6.0 loaded');
    };
    
    // Start setup - will retry if elements are not ready
    setupWidget();
  }

  // Initialize when DOM is ready
  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

