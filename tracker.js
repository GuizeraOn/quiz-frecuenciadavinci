/**
 * NeuroSilencio Funnel Tracker
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  /* ── 0. UTM REMAPPING (Fixes wrong ad links on the fly) ───── */
  (function() {
    var url = new URL(window.location.href);
    var p = url.searchParams;
    
    var oldSrc = p.get('utm_source');
    var oldMed = p.get('utm_medium');
    var oldCmp = p.get('utm_campaign');
    var oldCnt = p.get('utm_content');

    // Only remap if we see the old pattern (utm_source is likely a campaign name, not 'FB')
    if (oldSrc && oldSrc !== 'FB' && oldMed && oldCmp) {
      var cmpName = oldSrc;  // Was {{campaign.name}}
      var adsName = oldMed;  // Was {{adset.name}}
      var adName  = oldCmp;  // Was {{ad.name}}
      var placement = '';
      
      if (oldCnt && oldCnt.indexOf('/') !== -1) {
        placement = oldCnt.split('/')[1] || '';
      } else {
        placement = oldCnt || '';
      }

      // 1. Set standard UTMs
      p.set('utm_source', 'FB');
      p.set('utm_campaign', cmpName + '|'); 
      p.set('utm_medium', adsName + '|');
      p.set('utm_content', adName + '|');
      p.set('utm_term', placement);
      
      // 2. Generate xcod according to strict pattern:
      // FBhQwK21wXxR{{camp_name}}|{{camp_id}}hQwK21wXxR{{adset_name}}|{{adset_id}}hQwK21wXxR{{ad_name}}|{{ad_id}}hQwK21wXxR{{placement}}
      // Since we don't have IDs in the old URL, we leave them blank after the pipe.
      var xcod = 'FBhQwK21wXxR' + cmpName + '|' + 
                 'hQwK21wXxR' + adsName + '|' + 
                 'hQwK21wXxR' + adName + '|' + 
                 'hQwK21wXxR' + placement;
      
      p.set('xcod', xcod);

      // Apply changes to the URL without reloading
      window.history.replaceState({}, '', url.pathname + '?' + p.toString() + url.hash);
    }
  })();
  /* ────────────────────────────────────────────────────────── */
  /* ── CONFIG — EDIT THESE ─────────────────────────────────── */
  var SUPABASE_URL      = '';
  var SUPABASE_ANON_KEY = '';

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
    // Supabase integration disabled
    return;

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
