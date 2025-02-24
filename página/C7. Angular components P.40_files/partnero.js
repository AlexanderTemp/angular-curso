(function (p, t, n, e, r, o) {
  p['__partnerObject'] = r;

  function f() {
    var c = {a: arguments, q: []};
    var r = this.push(c);
    return "number" != typeof r ? r : f.bind(c.q);
  }

  f.q = f.q || [];
  p[r] = p[r] || f.bind(f.q);
  p[r].q = p[r].q || f.q;
  o = t.createElement(n);
  var _ = t.getElementsByTagName(n)[0];
  o.async = 1;
  o.src = e + '?v' + (~~(new Date().getTime() / 1e6));
  _.parentNode.insertBefore(o, _);
})(window, document, 'script', 'https://app.partnero.com/js/universal.js', 'po');

po('settings', 'assets_host', 'https://assets.partnero.com');
po('program', window.serviceKeys.PARTNERO_PROGRAM, 'load');
