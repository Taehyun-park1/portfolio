const header = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const stackSection = document.getElementById("stack");
const stackFocusPanel = document.getElementById("stackFocusPanel");
const stackFocusTitle = document.getElementById("stackFocusTitle");
const stackFocusDescription = document.getElementById("stackFocusDescription");
const stackFocusSkills = document.getElementById("stackFocusSkills");
const stackTabs = document.querySelectorAll(".stack-tab");
const projectModal = document.getElementById("projectModal");
const projectModalBody = document.getElementById("projectModalBody");
const projectModalClose = document.querySelector(".project-modal-close");
const projectModalBackdrop = document.querySelector(".project-modal-backdrop");
const projectModalCards = document.querySelectorAll(".project-modal-card");
const projectLinks = document.querySelectorAll(".project-link");

const stackData = {
  backend: {
    title: "백엔드",
    description:
      "Java와 Spring Boot를 중심으로 REST API, 회원 인증 화면 연동, 알림, 채팅 흐름을 구현했습니다.",
    skills: [
      { name: "Java", level: 88 },
      { name: "Spring Boot", level: 86 },
      { name: "MyBatis", level: 80 },
      { name: "Express", level: 72 },
    ],
  },
  frontend: {
    title: "프론트엔드",
    description:
      "React 기반 프로젝트와 정적 포트폴리오를 구현하며 화면 구성, 상태 흐름, 반응형 UI를 다뤘습니다.",
    skills: [
      { name: "HTML / CSS", level: 88 },
      { name: "JavaScript", level: 82 },
      { name: "React", level: 80 },
      { name: "TypeScript", level: 74 },
    ],
  },
  database: {
    title: "데이터베이스",
    description:
      "게시판, 주문, 모임, 문의, 예약 데이터를 다루며 관계형 DB 조회와 프로젝트별 스키마 흐름을 경험했습니다.",
    skills: [
      { name: "Oracle", level: 86 },
      { name: "MySQL", level: 80 },
      { name: "Supabase", level: 74 },
    ],
  },
  infra: {
    title: "인프라 / 배포",
    description:
      "Docker, AWS, Vercel, Render를 사용해 로컬 개발 환경과 배포 흐름을 직접 구성했습니다.",
    skills: [
      { name: "Docker", level: 78 },
      { name: "AWS EC2 / S3 / RDS", level: 76 },
      { name: "Vercel / Render", level: 74 },
    ],
  },
  integration: {
    title: "연동",
    description:
      "프론트엔드와 백엔드 API 연동, 인증 흐름, 실시간 알림/채팅 흐름을 프로젝트 안에서 연결했습니다.",
    skills: [
      { name: "REST API / Axios", level: 82 },
      { name: "JWT / OAuth", level: 78 },
      { name: "WebSocket / SSE", level: 89 },
    ],
  },
};

const projectDetails = {
  wemove: {
    title: "WeMove",
    subtitle: "지역 기반 운동 모임 매칭 플랫폼",
    period: "2026.05 - 2026.06",
    role: "회원 인증 화면 · 알림 · 채팅 기능 구현",
    thumbnail: "images/projects/wemove-thumb.png",
    architecture: "images/projects/wemove-architecture.svg",
    summary:
      "지역, 운동 종목, 날짜, 모집 상태를 기준으로 운동 모임을 탐색하고 생성·참여·관리할 수 있는 플랫폼입니다. 모임 신청 승인/거절, 내 활동 캘린더, 관리자 기능, 알림과 채팅 흐름까지 하나의 사용자 경험으로 구성했습니다.",
    myPart: [
      "로그인 화면과 로그인 요청 흐름 구현 (토큰 저장/갱신 관리는 제외)",
      "회원가입 화면, 입력 검증, 중복 확인 및 이메일 인증 흐름 구현",
      "아이디 찾기와 비밀번호 재설정 화면 및 API 연동",
      "notification 목록/읽음 처리/전역 알림 패널 UI 구현",
      "모임 채팅 및 1:1 채팅 화면, 메시지 이벤트 처리 흐름 구현",
    ],
    features: [
      "지역/종목/날짜/상태 기반 운동 모임 검색",
      "모임 생성, 수정, 삭제와 참가 신청 승인/거절",
      "내 활동 캘린더와 참여 예정/대기/완료 상태 관리",
      "관리자 회원/모임/신고/운동 종목 관리",
      "알림 패널과 모임 채팅 이벤트 처리",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "MyBatis",
      "React",
      "Vite",
      "MySQL",
      "Axios",
      "WebSocket",
      "JWT",
    ],
    links: [
      { label: "배포 보기", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  greencarry: {
    title: "GreenCarry",
    subtitle: "친환경 다회용기 음식 주문 플랫폼",
    period: "2026.06",
    role: "회원 인증 화면 · 알림 · 관리자 페이지 구현",
    thumbnail: "images/projects/greencarry-thumb.png",
    architecture: "images/projects/greencarry-architecture.svg",
    summary:
      "다회용기 사용과 친환경 배달 방식을 중심으로 설계한 음식 주문 플랫폼입니다. 사용자, 점주, 관리자 역할을 분리하고 주문, 결제, 포인트, 탄소 절감량, 리뷰, 고객센터, 실시간 알림이 이어지는 풀스택 서비스 흐름을 구현했습니다.",
    myPart: [
      "로그인 화면과 로그인 요청 흐름 구현 (토큰 저장/갱신 관리는 제외)",
      "개인 회원가입/점주 회원가입 화면과 입력 검증 흐름 구현",
      "비밀번호 찾기와 재설정 화면 및 이메일 인증 연동",
      "notification 수신 목록, 읽음 처리, 헤더 알림 UI 구현",
      "관리자 페이지의 회원/매장/리뷰/용기 관리 화면 구현",
    ],
    features: [
      "주변 매장 탐색, 카테고리 필터, 매장 상세 조회",
      "메뉴 옵션 선택, 다회용기 선택, 장바구니 유지",
      "포인트 사용과 Toss Payments 결제 흐름",
      "점주 주문 접수/조리/배달/완료 상태 관리",
      "관리자 통계, 회원/매장/리뷰/용기 관리",
      "SSE 기반 주문/리뷰/문의 알림",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Oracle",
      "MyBatis",
      "React",
      "Vite",
      "Zustand",
      "SSE",
      "Toss Payments",
    ],
    links: [
      { label: "배포 보기", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  board: {
    title: "게시판 프로젝트",
    subtitle: "Java/Spring 기반 게시판",
    period: "학습 프로젝트",
    role: "게시글 CRUD · 검색 · 페이징 구현",
    thumbnail: "",
    architecture: "",
    summary:
      "게시글 작성, 조회, 수정, 삭제와 검색, 페이징을 구현하며 Spring MVC와 SQL 기반 웹 애플리케이션 흐름을 학습한 프로젝트입니다.",
    myPart: [
      "게시글 CRUD 화면과 서버 요청 흐름 구현",
      "검색 조건과 페이지 번호를 유지하는 목록 조회 구현",
      "Oracle SQL 기반 데이터 조회와 기본 예외 흐름 정리",
    ],
    features: ["게시글 CRUD", "검색", "페이징", "Oracle 연동"],
    stack: ["Java", "Spring", "Oracle", "JSP"],
    links: [
      { label: "배포 보기", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  romantichamilton: {
    title: "Romantic Hamilton",
    subtitle: "수제 가죽공방 브랜드 웹 서비스",
    period: "2026.06",
    projectType: "개인 프로젝트",
    role: "기획 · 화면 구현 · 인증/문의/예약/관리자 흐름 구현",
    thumbnail: "images/projects/romantichamilton-thumb.png",
    architecture: "images/projects/romantichamilton-architecture.svg",
    summary:
      "수제 가죽공방 Romantic Hamilton의 브랜드 스토리, 제품 컬렉션, 맞춤 제작 문의, 클래스 예약, 마이페이지, 관리자 대시보드를 하나의 웹 서비스로 구성한 개인 프로젝트입니다. React/Vite 프론트엔드와 Supabase 인증·DB를 연결하고, Naver OAuth 콜백 처리를 위해 Express 백엔드를 함께 구성했습니다.",
    myPart: [
      "프로젝트 전체 기획, 화면 구성, 라우팅, 반응형 UI 구현",
      "제품 컬렉션, 브랜드 소개, 맞춤 제작 문의, 클래스 예약 화면 구현",
      "Supabase 기반 이메일 로그인/회원가입과 Kakao OAuth 연동 흐름 구현",
      "Naver OAuth 시작/콜백 처리를 위한 Express API 구성",
      "마이페이지에서 문의 내역과 클래스 예약 내역을 조회하는 흐름 구현",
      "관리자 권한 확인 후 문의/예약 통계를 확인하는 대시보드 구현",
    ],
    features: [
      "브랜드 랜딩 페이지와 제품 컬렉션 섹션",
      "맞춤 제작 문의 폼과 Supabase contact_messages 저장",
      "로그인 사용자 전용 클래스 예약 요청",
      "마이페이지 문의/예약 내역 조회",
      "관리자 전용 대시보드 접근 제어",
      "Kakao OAuth 및 Naver OAuth 연동 구조",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "Express",
      "Tailwind CSS",
      "Wouter",
      "Vercel",
      "Render",
    ],
    links: [
      { label: "배포 보기", href: "https://romantichamilton.store" },
      { label: "GitHub", href: "#" },
    ],
  },
  portfolio: {
    title: "포트폴리오 웹사이트",
    subtitle: "정적 포트폴리오 웹사이트",
    period: "2026.06",
    role: "기획 · 마크업 · 스타일링 · 인터랙션 구현",
    thumbnail: "",
    architecture: "",
    summary:
      "HTML, CSS, JavaScript만 사용해 기술 스택과 프로젝트 경험을 한 페이지에서 확인할 수 있도록 구성한 정적 포트폴리오입니다.",
    myPart: [
      "원페이지 레이아웃과 고정 내비게이션 구성",
      "프로젝트 카드와 상세 모달 인터랙션 구현",
      "모바일 반응형 레이아웃과 접근성 속성 정리",
    ],
    features: [
      "섹션 앵커 내비게이션",
      "프로젝트 상세 모달",
      "반응형 카드 레이아웃",
      "외부 링크 연결",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [
      { label: "배포 보기", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
};

function closeMobileMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function scrollToSection(targetId) {
  const target = document.querySelector(targetId);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    event.preventDefault();
    scrollToSection(targetId);
    closeMobileMenu();
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

if (stackSection) {
  const stackObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        stackSection.classList.add("stack-visible");
        observer.unobserve(stackSection);
      });
    },
    {
      root: null,
      threshold: 0.25,
    },
  );

  stackObserver.observe(stackSection);
}

function createSkillBars(skills) {
  return skills
    .map(
      (skill) => `
        <div class="skill-item" style="--skill-level: ${skill.level}%">
          <div class="skill-meta">
            <strong>${skill.name}</strong>
            <span>${skill.level}%</span>
          </div>
          <div
            class="skill-bar"
            role="progressbar"
            aria-label="${skill.name} 숙련도"
            aria-valuenow="${skill.level}"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span></span>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderStackPanel(stackKey) {
  const stack = stackData[stackKey];

  if (
    !stack ||
    !stackFocusPanel ||
    !stackFocusTitle ||
    !stackFocusDescription ||
    !stackFocusSkills
  ) {
    return;
  }

  stackFocusPanel.classList.remove("ready");
  stackFocusTitle.textContent = stack.title;
  stackFocusDescription.textContent = stack.description;
  stackFocusSkills.innerHTML = createSkillBars(stack.skills);

  window.requestAnimationFrame(() => {
    stackFocusPanel.classList.add("ready");
  });
}

stackTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    stackTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    renderStackPanel(tab.dataset.stack);
  });
});

renderStackPanel("backend");

function createList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function createTags(items) {
  return items.map((item) => `<span>${item}</span>`).join("");
}

function createModalLinks(links = []) {
  const validLinks = links.filter((link) => link.label && link.href);

  if (validLinks.length === 0) {
    return "";
  }

  return `
    <section class="modal-section modal-links-section">
      <h4>링크</h4>
      <div class="modal-actions">
        ${validLinks
          .map((link) => {
            const disabledClass = link.href === "#" ? " is-disabled" : "";
            const ariaDisabled =
              link.href === "#" ? ' aria-disabled="true"' : "";

            return `
              <a
                class="modal-link-button${disabledClass}"
                href="${link.href}"
                target="_blank"
                rel="noopener noreferrer"
                ${ariaDisabled}
              >
                ${link.label}
              </a>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function openProjectModal(projectKey) {
  const project = projectDetails[projectKey];

  if (!project || !projectModal || !projectModalBody) {
    return;
  }

  const visualMarkup = project.thumbnail
    ? `
      <div class="modal-visual">
        <img src="${project.thumbnail}" alt="${project.title} 화면" />
      </div>
    `
    : "";

  const architectureMarkup = project.architecture
    ? `
      <section class="modal-section modal-architecture">
        <h4>아키텍처</h4>
        <img src="${project.architecture}" alt="${project.title} 아키텍처 다이어그램" />
      </section>
    `
    : "";

  const projectTypeMarkup = project.projectType
    ? `
      <div>
        <dt>프로젝트 유형</dt>
        <dd>${project.projectType}</dd>
      </div>
    `
    : "";

  projectModalBody.innerHTML = `
    ${visualMarkup}
    <p class="modal-kicker">프로젝트 상세</p>
    <h3 class="modal-title" id="projectModalTitle">${project.title}</h3>
    <p class="modal-subtitle">${project.subtitle}</p>

    <dl class="modal-meta">
      <div>
        <dt>기간</dt>
        <dd>${project.period}</dd>
      </div>
      <div>
        <dt>역할</dt>
        <dd>${project.role}</dd>
      </div>
      ${projectTypeMarkup}
    </dl>

    <section class="modal-section">
      <h4>프로젝트 간단 설명</h4>
      <p>${project.summary}</p>
    </section>

    <section class="modal-section my-part">
      <h4>내 파트</h4>
      <ul>${createList(project.myPart)}</ul>
    </section>

    <section class="modal-section">
      <h4>주요 기능</h4>
      <ul>${createList(project.features)}</ul>
    </section>

    ${architectureMarkup}

    <section class="modal-section">
      <h4>기술 스택</h4>
      <div class="modal-tags">${createTags(project.stack)}</div>
    </section>

    ${createModalLinks(project.links)}
  `;

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  projectModalClose.focus();
}

function closeProjectModal() {
  if (!projectModal || !projectModalBody) {
    return;
  }

  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  projectModalBody.innerHTML = "";
}

projectModalCards.forEach((card) => {
  card.addEventListener("click", () => {
    openProjectModal(card.dataset.project);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card.dataset.project);
    }
  });
});

projectLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.stopPropagation();

    if (link.getAttribute("href") === "#") {
      event.preventDefault();
    }
  });
});

projectModalBody.addEventListener("click", (event) => {
  const link = event.target.closest(".modal-link-button");

  if (!link) {
    return;
  }

  if (link.getAttribute("href") === "#") {
    event.preventDefault();
  }
});

projectModalClose.addEventListener("click", closeProjectModal);
projectModalBackdrop.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});
