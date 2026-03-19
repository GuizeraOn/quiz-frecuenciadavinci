/**
 * NeuroSilencio Funnel Tracker
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  /* ── CONFIG — EDIT THESE ─────────────────────────────────── */
  var SUPABASE_URL      = 'https://vocfzmpmomqmrkynfyah.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvY2Z6bXBtb21xbXJreW5meWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjA4ODgsImV4cCI6MjA4OTQ5Njg4OH0.z8hctEWjep-gu1hCXqbE3NzJLSzo66RQag-SUB62Ppg';

  /**
   * PAGE_ID — change this constant to match the page you are pasting into.
   * Accepted values: 'quiz' | 'vsl' | 'upsell1' | 'upsell2' | 'downsell1' | 'downsell2'
   * Note: This is now driven by window.PAGE_ID if set before this script.
   */
  var PAGE_ID = window.PAGE_ID || 'quiz';
  /* ─────────────────────────────────────────────────────────── */

  // ── Session ID (persisted across pages in the same browser tab/session) ──
  var SESSION_KEY = 'nst_session_id';
  var sessionId   = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'nst-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  // ── Core send function ────────────────────────────────────────────────────
  function sendEvent(event, step, value) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_PROJECT')) return;

    var payload = {
      session_id : sessionId,
      page       : PAGE_ID,
      event      : event,
      step       : typeof step === 'number' ? step : null,
      value      : typeof value === 'number' ? value : null
    };

    // Use fetch with keepalive so events fire even when navigating away
    try {
      fetch(SUPABASE_URL + '/rest/v1/funnel_events', {
        method   : 'POST',
        keepalive: true,
        headers  : {
          'Content-Type' : 'application/json',
          'apikey'       : SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Prefer'       : 'return=minimal'
        },
        body: JSON.stringify(payload)
      }).catch(function () { /* silent — never break the funnel */ });
    } catch (e) { /* silent */ }
  }

  // ── 1. Pageview (fires immediately on load) ───────────────────────────────
  sendEvent('pageview');

  // ── 2. Page exit (beforeunload — best effort) ─────────────────────────────
  window.addEventListener('beforeunload', function () {
    sendEvent('exit');
  });

  // ── 3. CTA click tracker (auto-attaches to links pointing to pay.hotmart / checkout.hotmart) ──
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a[href], button');
    if (!el) return;

    var href = el.href || '';
    var isCheckout = href.indexOf('hotmart.com') !== -1 ||
                     el.classList.contains('btn-orderpulse') ||
                     el.classList.contains('yellow-btn');

    if (isCheckout) {
      sendEvent('cta_click');
    }
  });

  // ── Public API ────────────────────────────────────────────────────────────
  window.NSTTracker = {
    /**
     * Call this every time the quiz advances to a new step.
     * @param {number} stepNumber  — the step the user just ENTERED (1-based)
     */
    trackQuizStep: function (stepNumber) {
      sendEvent('quiz_step', stepNumber);
    },

    /** Manual event dispatch if needed */
    track: function (eventName, step, value) {
      sendEvent(eventName, step, value);
    }
  };

})();
