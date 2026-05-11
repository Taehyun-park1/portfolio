// UI 전용 스크립트입니다. 내비게이션, 모바일 메뉴, 스크롤 애니메이션을 담당합니다.
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const animatedElements = document.querySelectorAll("[data-animate]");

  // 모바일 햄버거 메뉴를 열고 닫습니다.
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");

      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    });
  }

  // 메뉴 링크를 누르면 모바일 메뉴를 닫아 화면을 넓게 사용할 수 있게 합니다.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList?.classList.remove("is-open");
      navToggle?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "메뉴 열기");
    });
  });

  // 현재 화면에 보이는 섹션에 맞춰 내비게이션 링크를 활성화합니다.
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);

        navLinks.forEach((link) => link.classList.remove("is-active"));
        activeLink?.classList.add("is-active");
      });
    },
    {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // data-animate 속성이 있는 요소가 화면에 들어오면 fade-in 애니메이션을 실행합니다.
  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.15,
    },
  );

  animatedElements.forEach((element) => fadeObserver.observe(element));
});
