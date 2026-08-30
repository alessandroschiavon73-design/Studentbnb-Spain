window.STUDENTBNB_CONFIG = Object.freeze({
  appName: "CasaStudent",
  brandLine: "Base & Belong",
  countryCode: "ES",
  countryName: "España",
  locale: "es-ES",
  currency: "EUR",
  domain: "casastudent.es",
  defaultCity: "madrid",
  cityPage: "ciudad.html",
  reportEmail: "reportes@casastudent.es",
  apiMode: "demo",
  apiBase: "/api/v1",
  unifiedDatabase: true,
  schemaVersion: "1.2"
});

(function () {
  const cfg = window.STUDENTBNB_CONFIG;
  const sites = [
    ["EU", "Europe", "assets/img/flag-eu.svg", "https://casastudent.eu/"],
    ["IT", "Italia", "assets/img/flag-it.svg", "https://casastudent.it/"],
    ["ES", "España", "assets/img/flag-es.svg", "https://casastudent.es/"],
    ["FR", "France", "assets/img/flag-fr.svg", "https://casastudent.fr/"],
    ["DE", "Deutschland", "assets/img/flag-de.svg", "https://casastudent.de/"],
    ["PL", "Polska", "assets/img/flag-pl.svg", "https://casastudent.pl/"]
  ];
  const ogImage = `https://${cfg.domain}/assets/img/spagna-proposta1.webp`;
  function meta(key, value, content) { let element = document.head.querySelector(`meta[${key}="${value}"]`); if (!element) { element = document.createElement("meta"); element.setAttribute(key, value); document.head.appendChild(element); } element.content = content; }
  function link(rel, href, hreflang) { const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ""}`; let element = document.head.querySelector(selector); if (!element) { element = document.createElement("link"); element.rel = rel; if (hreflang) element.hreflang = hreflang; document.head.appendChild(element); } element.href = href; }
  function canonicalUrl() { const page = location.pathname.endsWith("/") ? "" : location.pathname.split("/").pop(); const params = new URLSearchParams(location.search); const canonicalParams = new URLSearchParams(); if (page === cfg.cityPage && params.get("city")) canonicalParams.set("city", params.get("city")); if (page === "anuncio.html" && params.get("id")) canonicalParams.set("id", params.get("id")); const query = canonicalParams.toString(); return `https://${cfg.domain}/${page || ""}${query ? `?${query}` : ""}`; }
  function updateSeo({title = document.title, description} = {}) { const desc = description || document.head.querySelector('meta[name="description"]')?.content || "Alojamiento para estudiantes en España."; const canonical = canonicalUrl(); link("canonical", canonical); meta("property", "og:title", title); meta("property", "og:description", desc); meta("property", "og:url", canonical); meta("property", "og:image", ogImage); meta("name", "twitter:title", title); meta("name", "twitter:description", desc); meta("name", "twitter:image", ogImage); }
  function addStructuredData() { let script = document.head.querySelector("#studentbnb-website-schema"); if (!script) { script = document.createElement("script"); script.id = "studentbnb-website-schema"; script.type = "application/ld+json"; document.head.appendChild(script); } script.textContent = JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:"CasaStudent",url:`https://${cfg.domain}/`,inLanguage:cfg.locale}); }
  function applyBranding() { document.title = document.title.replaceAll("CasaStudent", "CasaStudent"); const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node; while ((node = walker.nextNode())) node.nodeValue = node.nodeValue.replaceAll("CasaStudent", "CasaStudent"); document.querySelectorAll("[aria-label]").forEach(element => element.setAttribute("aria-label", element.getAttribute("aria-label").replaceAll("CasaStudent", "CasaStudent"))); document.querySelectorAll(".brand").forEach(brand => { const labels = [...brand.children].filter(element => element.tagName === "SPAN" && !element.classList.contains("brand-icon")); const label = labels[labels.length - 1]; if (!label) return; const small = label.querySelector("small"); const smallHtml = small ? small.outerHTML : ""; label.innerHTML = `Casa<strong>Student</strong>${smallHtml}`; }); }
  function apply() {
    applyBranding();
    document.querySelectorAll(".brand small").forEach(element => { element.textContent = "Base & Belong"; element.style.fontStyle = "italic"; });
    const fp = document.querySelector(".site-footer .footer-grid>div:first-child p");
    if (fp) fp.textContent = "CasaStudent está dedicado al alojamiento estudiantil de media y larga estancia: meses, semestres o curso académico. No está pensado para estancias turísticas cortas.";
    meta("name", "robots", "index,follow,max-image-preview:large"); meta("property", "og:site_name", "CasaStudent — Base & Belong"); meta("property", "og:type", "website"); meta("name", "twitter:card", "summary_large_image"); updateSeo(); addStructuredData();
    const page = location.pathname.endsWith("/") ? "" : location.pathname.split("/").pop(); if (!page || page === "index.html") sites.forEach(([code, , , url]) => link("alternate", url, code.toLowerCase()));
    const box = document.querySelector(".footer-international .footer-country-links"); if (box) { box.innerHTML = sites.map(([code, label, flag, url]) => `<a href="${url}"${code === cfg.countryCode ? ' aria-current="page"' : ''}><img class="network-flag" src="${flag}" alt="" width="30" height="20"><span>${label}</span><span class="network-open" aria-hidden="true">↗</span></a>`).join(""); }
  }
  window.StudentBnBSEO = { update: updateSeo };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();
(function () { if (document.querySelector("script[data-studentbnb-analytics]")) return; const script = document.createElement("script"); script.src = "assets/js/analytics.js?v=20260824"; script.defer = true; script.dataset.studentbnbAnalytics = "1"; document.head.appendChild(script); })();
