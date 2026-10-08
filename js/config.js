/**
 * Certo Recruiting (체르토 리크루팅) — 사이트 공통 설정
 * -----------------------------------------------------------
 * 연락처, Formspree 폼 주소 등 자주 바뀌는 값은 모두 이 파일에서만 관리합니다.
 * 담당자는 이 파일의 값만 수정하면 사이트 전체에 자동 반영됩니다.
 * (HTML은 data-cfg="키이름" 속성으로 이 값을 자동으로 채웁니다)
 */
window.CERTO_CONFIG = {
  // 브랜드
  brandNameKo: "체르토 리크루팅",
  brandNameEn: "Certo Recruiting",

  // 연락처 (실제 운영 정보로 교체하세요)
  phoneDisplay: "010-7748-4644",
  phoneHref: "tel:010-7748-4644",
  kakaoUrl: "https://pf.kakao.com/_xxxxxxx",
  email: "info@certorecruiting.co.kr",

  // 사업자 정보 (footer 표기용)
  companyLegalName: "체르토 리크루팅",
  ceoName: "홍길동",
  businessRegNo: "000-00-00000",
  address: "서울특별시 강남구 테헤란로 000, 0층",

  // 상담 폼 전송 설정 (Formspree)
  // ------------------------------------------------------------------
  // 기업 채용 문의 폼과 구직자 등록 폼은 서로 다른 Formspree 주소를 사용합니다.
  // https://formspree.io 에서 각각 폼을 만든 뒤 발급받는 Form ID로 아래 두 값만
  // 교체하면 됩니다. (예: Form ID가 "mzbqwxyz" 라면 "https://formspree.io/f/mzbqwxyz")
  // YOUR_FORM_ID 상태로 비워두면 데모 모드로 동작하며 완료 메시지만 표시되고
  // 실제 전송은 되지 않습니다.
  employerFormEndpoint: "https://formspree.io/f/xnpqgyoz",
  candidateFormEndpoint: "https://formspree.io/f/xnpqgyoz",
};
