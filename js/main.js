(function () {
  "use strict";

  var CFG = window.CERTO_CONFIG || {};

  /* ---------- config → DOM 자동 반영 ---------- */
  function getByPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function applyConfig() {
    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var value = getByPath(CFG, el.getAttribute("data-cfg"));
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
      var key = el.getAttribute("data-cfg-href");
      var value;
      if (key === "mailtoEmail") {
        value = "mailto:" + (CFG.email || "");
      } else {
        value = getByPath(CFG, key);
      }
      if (value) el.setAttribute("href", value);
    });
  }

  /* ---------- 헤더: 스크롤 시 고정 스타일 ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 모바일 내비게이션 ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    var scrim = document.getElementById("nav-scrim");
    if (!toggle || !nav || !scrim) return;

    function close() {
      nav.classList.remove("is-open");
      scrim.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function open() {
      nav.classList.add("is-open");
      scrim.classList.add("is-visible");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      isOpen ? close() : open();
    });
    scrim.addEventListener("click", close);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
  }

  /* ---------- FAQ 아코디언 ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var btn = item.querySelector(".faq-question");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item.is-open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* ---------- 스크롤 시 미세 fade-in ---------- */
  function initFadeIn() {
    var items = document.querySelectorAll(".fade-in");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 상담 신청 폼 ---------- */
  function initConsultForm() {
    var form = document.getElementById("consult-form");
    var success = document.getElementById("consult-success");
    var submitBtn = document.getElementById("consult-submit");
    if (!form || !success) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function (value, key) { payload[key] = value; });

      function showSuccess() {
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      if (CFG.formEndpoint) {
        submitBtn.disabled = true;
        submitBtn.textContent = "전송 중...";
        fetch(CFG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function () { showSuccess(); })
          .catch(function () { showSuccess(); })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "무료 채용 상담 신청";
          });
      } else {
        showSuccess();
      }
    });
  }

  function initFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initHeaderScroll();
    initMobileNav();
    initFaq();
    initFadeIn();
    initConsultForm();
    initFooterYear();
  });
})();
