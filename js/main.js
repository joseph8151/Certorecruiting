(function () {
  "use strict";

  var CFG = window.CERTO_CONFIG || {};

  /* ---------- config → DOM 자동 반영 ---------- */
  function applyConfig() {
    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var value = CFG[el.getAttribute("data-cfg")];
      if (value !== undefined) el.textContent = value;
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
      nav.classList.contains("is-open") ? close() : open();
    });
    scrim.addEventListener("click", close);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
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

  /* ---------- 긴급 채용 CTA: 채용형태를 "긴급 대체"로 미리 선택 ---------- */
  function initUrgentCta() {
    var cta = document.getElementById("urgent-cta");
    var employmentType = document.getElementById("employmentType");
    var urgency = document.getElementById("urgency");
    if (!cta || !employmentType) return;
    cta.addEventListener("click", function () {
      employmentType.value = "긴급 대체";
      if (urgency) urgency.value = "즉시";
    });
  }

  /* ---------- Formspree 폼 제출 공통 처리 ---------- */
  function setupForm(formId, successId, endpoint, extraValidate) {
    var form = document.getElementById(formId);
    var success = document.getElementById(successId);
    if (!form || !success) return;
    var submitBtn = form.querySelector(".btn-submit");
    var defaultLabel = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (extraValidate && !extraValidate()) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      function showSuccess() {
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      var isPlaceholder = !endpoint || /YOUR_FORM_ID/.test(endpoint);
      if (isPlaceholder) {
        // Formspree 주소가 아직 설정되지 않음 — 데모 모드로 완료 화면만 표시
        showSuccess();
        return;
      }

      var formData = new FormData(form);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "전송 중...";
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
      })
        .then(function (res) {
          if (res.ok) {
            showSuccess();
          } else {
            alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
          }
        })
        .catch(function () {
          alert("접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = defaultLabel;
          }
        });
    });
  }

  function initEmployerForm() {
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var hint = document.getElementById("contact-hint");

    function validateContact() {
      var hasContact = (email && email.value.trim()) || (phone && phone.value.trim());
      if (!hasContact) {
        if (hint) {
          hint.classList.add("form-hint-error");
          hint.textContent = "이메일 또는 전화번호(카카오톡) 중 하나는 꼭 입력해 주세요.";
        }
        if (phone) phone.focus();
        return false;
      }
      if (hint) {
        hint.classList.remove("form-hint-error");
        hint.textContent = "이메일 또는 전화번호(카카오톡) 중 한 가지는 꼭 남겨주세요.";
      }
      return true;
    }

    setupForm("employer-form", "employer-success", CFG.employerFormEndpoint, validateContact);
  }

  function initCandidateForm() {
    setupForm("candidate-form-el", "candidate-success", CFG.candidateFormEndpoint);
  }

  function initFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initHeaderScroll();
    initMobileNav();
    initFadeIn();
    initUrgentCta();
    initEmployerForm();
    initCandidateForm();
    initFooterYear();
  });
})();
