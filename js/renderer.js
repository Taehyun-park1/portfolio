// HTML 문자열로 데이터를 삽입할 때 특수 문자를 안전하게 바꿔 줍니다.
function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Hero 섹션을 렌더링합니다. 전달받은 데이터로 첫 화면의 핵심 메시지와 CTA를 구성합니다.
function renderHero(hero) {
  const heroSection = document.querySelector("#hero");

  if (!heroSection || !hero) {
    return;
  }

  const primaryCta = hero.ctaPrimary;
  const secondaryCta = hero.ctaSecondary;
  const shouldShowScrollIndicator = Boolean(hero.scrollIndicator);

  const primaryButton = primaryCta
    ? `
      <a class="hero__button hero__button--primary" href="${escapeHTML(primaryCta.href)}">
        ${escapeHTML(primaryCta.label)}
      </a>
    `
    : "";

  const secondaryButton = secondaryCta
    ? `
      <a
        class="hero__button hero__button--secondary"
        href="${escapeHTML(secondaryCta.href)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${escapeHTML(secondaryCta.label)}
      </a>
    `
    : "";

  const scrollIndicator = shouldShowScrollIndicator
    ? `
      <a class="hero__scroll" href="#about" aria-label="About 섹션으로 이동">
        <span class="hero__scroll-text">Scroll</span>
        <span class="hero__scroll-arrow" aria-hidden="true"></span>
      </a>
    `
    : "";

  heroSection.innerHTML = `
    <div class="hero__background" aria-hidden="true"></div>
    <div class="hero__content">
      <p class="hero__name-en">${escapeHTML(hero.nameEn)}</p>
      <h1 class="hero__name">${escapeHTML(hero.name)}</h1>
      <p class="hero__tagline">${escapeHTML(hero.tagline)}</p>
      <p class="hero__sub-tagline">${escapeHTML(hero.subTagline)}</p>
      <div class="hero__actions" aria-label="주요 링크">
        ${primaryButton}
        ${secondaryButton}
      </div>
    </div>
    ${scrollIndicator}
  `;
}

// About 섹션을 렌더링합니다. 이미지, 소개 문장, 상태 뱃지, 키워드 태그를 구성합니다.
function renderAbout(about) {
  const aboutSection = document.querySelector("#about");

  if (!aboutSection || !about) {
    return;
  }

  const keywords = Array.isArray(about.keywords) ? about.keywords : [];
  const keywordTags = keywords
    .map((keyword) => `<li class="about__keyword">${escapeHTML(keyword)}</li>`)
    .join("");

  const availabilityBadge = about.availableForWork
    ? `
      <div class="about__availability" aria-label="${escapeHTML(about.availableLabel)}">
        <span class="about__availability-dot" aria-hidden="true"></span>
        <span>${escapeHTML(about.availableLabel)}</span>
      </div>
    `
    : "";

  aboutSection.innerHTML = `
    <div class="about__inner">
      <div class="about__media">
        <div class="about__profile" aria-label="김준혁 프로필 이미지">
          <img
            class="about__profile-image"
            src="${escapeHTML(about.profileImage)}"
            alt="김준혁 프로필 사진"
          />
          <span class="about__profile-fallback" aria-hidden="true">KJ</span>
        </div>
      </div>

      <div class="about__content">
        <p class="about__eyebrow">About Me</p>
        <h2 class="about__title">운영까지 생각하는 백엔드 개발자</h2>
        ${availabilityBadge}
        <p class="about__summary">${escapeHTML(about.summary)}</p>
        <ul class="about__keywords" aria-label="핵심 역량 키워드">
          ${keywordTags}
        </ul>
      </div>
    </div>
  `;

  const profileImage = aboutSection.querySelector(".about__profile-image");
  const profile = aboutSection.querySelector(".about__profile");

  // 이미지 파일이 없거나 불러오지 못하면 KJ 이니셜 fallback을 표시합니다.
  profileImage?.addEventListener("error", () => {
    profile?.classList.add("is-fallback");
  });
}

// 탭 버튼에 사용할 안전한 ID를 만듭니다.
function createSafeId(value = "") {
  return String(value)
    .toLowerCase()
    .replaceAll("/", "-")
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9가-힣-]/g, "");
}

// 숫자 레벨을 1~5 범위로 제한합니다.
function normalizeLevel(level) {
  const parsedLevel = Number(level);

  if (Number.isNaN(parsedLevel)) {
    return 0;
  }

  return Math.min(Math.max(parsedLevel, 0), 5);
}

// Tech Stack 섹션의 탭 전환과 progress bar 진입 애니메이션을 초기화합니다.
function initTechStackInteractions(techStackSection) {
  const tabButtons = techStackSection.querySelectorAll(".tech-stack__tab");
  const panels = techStackSection.querySelectorAll(".tech-stack__panel");
  let hasEnteredViewport = false;

  const fillBars = (scope = techStackSection) => {
    scope.querySelectorAll(".tech-stack__progress-fill").forEach((bar) => {
      bar.style.width = `${bar.dataset.progress || 0}%`;
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetPanelId = button.getAttribute("aria-controls");

      tabButtons.forEach((tab) => {
        const isSelected = tab === button;

        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
      });

      panels.forEach((panel) => {
        const isTargetPanel = panel.id === targetPanelId;

        panel.classList.toggle("is-active", isTargetPanel);
        panel.hidden = !isTargetPanel;
      });

      if (hasEnteredViewport) {
        const activePanel = techStackSection.querySelector(".tech-stack__panel.is-active");
        fillBars(activePanel || techStackSection);
      }
    });
  });

  const progressObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        hasEnteredViewport = true;
        fillBars(techStackSection);
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -18% 0px",
      threshold: 0.24,
    },
  );

  progressObserver.observe(techStackSection);
}

// Tech Stack 섹션을 렌더링합니다. 카테고리 탭, 기술 목록, 레벨 범례를 구성합니다.
function renderTechStack(techStack) {
  const techStackSection = document.querySelector("#tech-stack");
  const categories = Array.isArray(techStack?.categories) ? techStack.categories : [];
  const levelGuide = techStack?.levelGuide || {};

  if (!techStackSection || categories.length === 0) {
    return;
  }

  const tabButtons = categories
    .map((category, index) => {
      const categoryId = createSafeId(category.name);
      const tabLabel = category.name === "Infra / DevOps" ? "Infra" : category.name;

      return `
        <button
          class="tech-stack__tab${index === 0 ? " is-active" : ""}"
          id="tech-tab-${categoryId}"
          type="button"
          role="tab"
          aria-selected="${index === 0}"
          aria-controls="tech-panel-${categoryId}"
        >
          ${escapeHTML(tabLabel)}
        </button>
      `;
    })
    .join("");

  const panels = categories
    .map((category, index) => {
      const categoryId = createSafeId(category.name);
      const items = Array.isArray(category.items) ? category.items : [];
      const itemCards = items
        .map((item) => {
          const level = normalizeLevel(item.level);
          const progress = (level / 5) * 100;
          const hasNote = typeof item.note === "string" && item.note.trim() !== "";
          const tooltip = hasNote
            ? `
              <span class="tech-stack__tooltip" role="tooltip">
                ${escapeHTML(item.note)}
              </span>
            `
            : "";

          return `
            <li class="tech-stack__item">
              <div class="tech-stack__item-header">
                <span class="tech-stack__name">${escapeHTML(item.name)}</span>
                <span class="tech-stack__level" aria-label="숙련도 ${level} / 5">Lv.${level}</span>
              </div>
              <div
                class="tech-stack__progress"
                role="progressbar"
                aria-label="${escapeHTML(item.name)} 숙련도"
                aria-valuemin="0"
                aria-valuemax="5"
                aria-valuenow="${level}"
              >
                <span class="tech-stack__progress-fill" data-progress="${progress}"></span>
              </div>
              ${
                hasNote
                  ? `
                    <div class="tech-stack__note">
                      <button class="tech-stack__note-button" type="button" aria-label="${escapeHTML(item.name)} 설명 보기">
                        i
                      </button>
                      ${tooltip}
                    </div>
                  `
                  : ""
              }
            </li>
          `;
        })
        .join("");

      return `
        <div
          class="tech-stack__panel${index === 0 ? " is-active" : ""}"
          id="tech-panel-${categoryId}"
          role="tabpanel"
          aria-labelledby="tech-tab-${categoryId}"
          ${index === 0 ? "" : "hidden"}
        >
          <h3 class="tech-stack__category-title">${escapeHTML(category.name)}</h3>
          <ul class="tech-stack__list">
            ${itemCards}
          </ul>
        </div>
      `;
    })
    .join("");

  const guideItems = Object.entries(levelGuide)
    .map(
      ([level, label]) => `
        <li class="tech-stack__guide-item">
          <span class="tech-stack__guide-level">Lv.${escapeHTML(level)}</span>
          <span>${escapeHTML(label)}</span>
        </li>
      `,
    )
    .join("");

  techStackSection.innerHTML = `
    <div class="tech-stack__inner">
      <div class="tech-stack__header">
        <p class="tech-stack__eyebrow">Tech Stack</p>
        <h2 class="tech-stack__title">서비스 구현과 배포에 필요한 기술을 다룹니다</h2>
      </div>

      <div class="tech-stack__tabs" role="tablist" aria-label="기술 스택 카테고리">
        ${tabButtons}
      </div>

      <div class="tech-stack__panels">
        ${panels}
      </div>

      <div class="tech-stack__guide" aria-label="숙련도 범례">
        <h3 class="tech-stack__guide-title">Level Guide</h3>
        <ul class="tech-stack__guide-list">
          ${guideItems}
        </ul>
      </div>
    </div>
  `;

  initTechStackInteractions(techStackSection);
}

// 프로젝트 인원수에 따라 개인/팀 프로젝트 뱃지 문구를 만듭니다.
function createTeamBadgeLabel(teamSize) {
  const normalizedTeamSize = Number(teamSize);

  if (!Number.isFinite(normalizedTeamSize) || normalizedTeamSize <= 1) {
    return "개인 프로젝트";
  }

  return `팀 프로젝트 (${normalizedTeamSize}인)`;
}

// 프로젝트 상세 모달에서 사용할 링크 버튼을 우선순위대로 만듭니다.
function createProjectLinks(project) {
  const links = [
    { key: "liveUrl", label: "Live 보기", href: project.liveUrl },
    { key: "demoVideo", label: "Demo 보기", href: project.demoVideo },
    { key: "github", label: "GitHub 보기", href: project.github },
  ];

  return links
    .filter((link) => typeof link.href === "string" && link.href.trim() !== "")
    .map(
      (link) => `
        <a
          class="projects__modal-link projects__modal-link--${escapeHTML(link.key)}"
          href="${escapeHTML(link.href)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${escapeHTML(link.label)}
        </a>
      `,
    )
    .join("");
}

// 프로젝트 모달 열기/닫기 이벤트를 초기화합니다.
function initProjectModal(projectsSection) {
  const modal = projectsSection.querySelector(".projects__modal");
  const modalBody = projectsSection.querySelector(".projects__modal-body");
  const closeButton = projectsSection.querySelector(".projects__modal-close");
  const backdrop = projectsSection.querySelector(".projects__modal-backdrop");
  const cards = projectsSection.querySelectorAll(".projects__card");
  const projectsData = Array.from(cards).map((card) => JSON.parse(card.dataset.project || "{}"));
  let lastFocusedElement = null;

  if (!modal || !modalBody || !closeButton || !backdrop) {
    return;
  }

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
    modalBody.innerHTML = "";
    lastFocusedElement?.focus();
  };

  const openModal = (project) => {
    lastFocusedElement = document.activeElement;
    modalBody.innerHTML = createProjectModalContent(project);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");
    closeButton.focus();

    modalBody.querySelectorAll("[data-hide-on-error]").forEach((image) => {
      image.addEventListener("error", () => {
        image.closest("[data-image-wrapper]")?.classList.add("is-hidden");
      });
    });

    modalBody.querySelectorAll("[data-fallback-on-error]").forEach((image) => {
      image.addEventListener("error", () => {
        image.closest("[data-image-wrapper]")?.classList.add("is-fallback");
      });
    });
  };

  cards.forEach((card, index) => {
    card.addEventListener("click", () => openModal(projectsData[index]));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(projectsData[index]);
      }
    });
  });

  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

// 프로젝트 상세 모달 내부 HTML을 만듭니다.
function createProjectModalContent(project) {
  const features = Array.isArray(project.features) ? project.features : [];
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const modalLinks = createProjectLinks(project);
  const hasArchitectureDiagram =
    typeof project.architectureDiagram === "string" && project.architectureDiagram.trim() !== "";
  const hasThumbnail = typeof project.thumbnail === "string" && project.thumbnail.trim() !== "";
  const thumbnailFallback = techStack[0] || "Project";

  return `
    <div class="projects__modal-thumbnail" data-image-wrapper>
      ${
        hasThumbnail
          ? `
            <img
              src="${escapeHTML(project.thumbnail)}"
              alt="${escapeHTML(project.title)} 썸네일"
              data-fallback-on-error
            />
          `
          : ""
      }
      <span>${escapeHTML(thumbnailFallback)}</span>
    </div>

    <div class="projects__modal-heading">
      <p class="projects__modal-subtitle">${escapeHTML(project.subtitle)}</p>
      <h3 class="projects__modal-title">${escapeHTML(project.title)}</h3>
      <dl class="projects__modal-meta">
        <div>
          <dt>기간</dt>
          <dd>${escapeHTML(project.period)}</dd>
        </div>
        <div>
          <dt>역할</dt>
          <dd>${escapeHTML(project.role)}</dd>
        </div>
      </dl>
    </div>

    <p class="projects__modal-description">${escapeHTML(project.description)}</p>

    <div class="projects__modal-section">
      <h4>주요 기능</h4>
      <ul class="projects__feature-list">
        ${features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}
      </ul>
    </div>

    ${
      hasArchitectureDiagram
        ? `
          <div class="projects__modal-section projects__architecture" data-image-wrapper>
            <h4>Architecture</h4>
            <img
              src="${escapeHTML(project.architectureDiagram)}"
              alt="${escapeHTML(project.title)} 아키텍처 다이어그램"
              data-hide-on-error
            />
          </div>
        `
        : ""
    }

    <div class="projects__modal-section">
      <h4>Tech Stack</h4>
      <ul class="projects__modal-tags">
        ${techStack.map((tech) => `<li>${escapeHTML(tech)}</li>`).join("")}
      </ul>
    </div>

    <div class="projects__modal-links">
      ${modalLinks}
    </div>
  `;
}

// Projects 섹션을 렌더링합니다. 프로젝트 카드는 클릭 시 상세 모달을 엽니다.
function renderProjects(projects) {
  const projectsSection = document.querySelector("#projects");
  const projectList = Array.isArray(projects) ? projects : [];

  if (!projectsSection || projectList.length === 0) {
    return;
  }

  const cards = projectList
    .map((project) => {
      const techStack = Array.isArray(project.techStack) ? project.techStack : [];
      const techPreview = techStack.slice(0, 5);
      const thumbnailFallback = techStack[0] || "Project";
      const hasThumbnail = typeof project.thumbnail === "string" && project.thumbnail.trim() !== "";
      const highlights = typeof project.highlights === "string" ? project.highlights.trim() : "";

      return `
        <article
          class="projects__card"
          tabindex="0"
          role="button"
          aria-label="${escapeHTML(project.title)} 상세 보기"
          data-project="${escapeHTML(JSON.stringify(project))}"
        >
          <div class="projects__thumbnail">
            ${
              hasThumbnail
                ? `
                  <img
                    class="projects__thumbnail-image"
                    src="${escapeHTML(project.thumbnail)}"
                    alt="${escapeHTML(project.title)} 썸네일"
                  />
                `
                : ""
            }
            <span class="projects__thumbnail-fallback">${escapeHTML(thumbnailFallback)}</span>
          </div>
          <div class="projects__card-body">
            <div class="projects__card-topline">
              <span class="projects__badge">${escapeHTML(createTeamBadgeLabel(project.teamSize))}</span>
              <span class="projects__period">${escapeHTML(project.period)}</span>
            </div>
            <h3 class="projects__card-title">${escapeHTML(project.title)}</h3>
            <p class="projects__card-subtitle">${escapeHTML(project.subtitle)}</p>
            <p class="projects__card-description">${escapeHTML(project.description)}</p>
            <ul class="projects__tags" aria-label="${escapeHTML(project.title)} 기술 스택">
              ${techPreview.map((tech) => `<li>${escapeHTML(tech)}</li>`).join("")}
            </ul>
            ${
              highlights
                ? `<blockquote class="projects__highlight">${escapeHTML(highlights)}</blockquote>`
                : ""
            }
          </div>
        </article>
      `;
    })
    .join("");

  projectsSection.innerHTML = `
    <div class="projects__inner">
      <div class="projects__header">
        <p class="projects__eyebrow">Projects</p>
        <h2 class="projects__title">설계부터 배포까지 직접 완성한 프로젝트</h2>
      </div>

      <div class="projects__grid">
        ${cards}
      </div>

      <div class="projects__modal" aria-hidden="true">
        <button
          class="projects__modal-backdrop"
          type="button"
          aria-label="프로젝트 상세 배경 닫기"
        ></button>
        <div
          class="projects__modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="프로젝트 상세 정보"
        >
          <button class="projects__modal-close" type="button" aria-label="프로젝트 상세 닫기">
            ×
          </button>
          <div class="projects__modal-body"></div>
        </div>
      </div>
    </div>
  `;

  projectsSection.querySelectorAll(".projects__thumbnail-image").forEach((image) => {
    image.addEventListener("error", () => {
      image.closest(".projects__thumbnail")?.classList.add("is-fallback");
    });
  });

  initProjectModal(projectsSection);
}

// Experience 섹션을 렌더링할 함수입니다.
function renderExperience(experience) {
  void experience;
}

// Contact 섹션을 렌더링할 함수입니다.
function renderContact(contact) {
  void contact;
}
