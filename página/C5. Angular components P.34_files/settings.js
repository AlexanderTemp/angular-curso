(function() {
    const partnerObject = window.__partnerObject || "po";
    const po = window[partnerObject] || (() => po);
    po('settings', 'host', 'https://app.partnero.com/pub/v1');
    po('program', 'RW5B2TZ7', 'type', 'affiliate');
    po('program', 'RW5B2TZ7', 'settings', 'cookie_time', 30);
    po('program', 'RW5B2TZ7', 'settings', 'url_format', 'query');
    po('program', 'RW5B2TZ7', 'settings', 'link_param', 'aff');
    po('program', 'RW5B2TZ7', 'settings', 'query_param', 'friend');
    po('program', 'RW5B2TZ7', 'settings', 'simple_tracking_enabled', '');
})();
