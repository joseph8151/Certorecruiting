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
  kakaoUrl: "[카카오톡 채널 URL]",
  email: "[이메일 주소]",
  blogUrl: "[네이버 블로그 URL]",
  // 폼 제출 후 안내할 예상 회신 기간 (영업일 기준)
  replyDays: "[N]",

  // 사업자 정보 (footer 표기용) — 사업자등록증 기준
  // 서비스 브랜드명(체르토 리크루팅)과 등록 상호(체르토 드라이브)가 달라
  // 전자상거래법 표시 의무에 맞춰 함께 표기합니다.
  companyLegalName: "체르토 드라이브",
  ceoName: "김형기",
  businessRegNo: "654-60-00645",
  address: "서울특별시 서초구 강남대로8길 39-26, 2층 A9호 (양재동)",
  // 유료직업소개사업 등록번호: 제출된 사업자등록증의 등록 종목에 직업소개업이
  // 없어 비워둡니다. 별도로 등록하신 번호가 있으면 알려주세요.
  jobPlacementRegNo: "[유료직업소개사업 등록번호]",

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
