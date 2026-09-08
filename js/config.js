/**
 * Certo Native Recruiting — 사이트 공통 설정
 * -----------------------------------------------------------
 * 전화번호, 카카오톡 상담 링크, 이메일, 사업자 정보, 요금 문구 등
 * 자주 바뀌는 값은 모두 이 파일에서만 관리합니다.
 * 담당자는 이 파일의 값만 수정하면 사이트 전체에 자동 반영됩니다.
 * (HTML은 data-cfg="키이름" 속성으로 이 값을 자동으로 채웁니다)
 */
window.CERTO_CONFIG = {
  // 브랜드
  brandNameKo: "체르토 네이티브 리크루팅",
  brandNameEn: "Certo Native Recruiting",

  // 연락처 (실제 운영 정보로 교체하세요)
  phoneDisplay: "02-1234-5678",
  phoneHref: "tel:02-1234-5678",
  kakaoUrl: "https://pf.kakao.com/_xxxxxxx",
  email: "info@certorecruiting.co.kr",

  // 사업자 정보 (footer 표기용)
  companyLegalName: "체르토 네이티브 리크루팅",
  ceoName: "홍길동",
  businessRegNo: "000-00-00000",
  address: "서울특별시 강남구 테헤란로 000, 0층",

  // 상담 폼 전송 설정
  // formEndpoint 를 채우면 실제 폼 제출 시 해당 URL로 데이터가 전송됩니다.
  // (예: Formspree, Google Apps Script Web App, 자체 API 등)
  // 비워두면 데모 모드로 동작하며 완료 메시지만 표시됩니다.
  formEndpoint: "",

  // 서비스 비용 문구 — 정책이 바뀌면 이 값만 수정하면 됩니다.
  pricing: {
    fullTimeFeeRange: "1,500,000원 ~ 2,000,000원",
    fullTimeNote:
      "최종 금액은 직무, 근무지역, 근무조건, 채용 난이도에 따라 달라질 수 있으며 상담을 통해 정확히 안내해 드립니다.",
  },
};
