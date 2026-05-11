// 애플리케이션의 시작점입니다. 데이터를 불러온 뒤 각 섹션 렌더 함수를 순서대로 호출합니다.
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("./data/portfolio.json");

    if (!response.ok) {
      throw new Error(`포트폴리오 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);
    }

    const portfolio = await response.json();

    // renderer.js에 선언된 함수들을 데이터 구조에 맞춰 순서대로 실행합니다.
    renderHero(portfolio.hero);
    renderAbout(portfolio.about);
    renderTechStack(portfolio.techStack);
    renderProjects(portfolio.projects);
    renderExperience(portfolio.experience);
    renderContact(portfolio.contact);
  } catch (error) {
    console.error(error);

    // 사용자에게 최소한의 오류 상태를 보여 주어 빈 화면만 남지 않도록 합니다.
    const heroSection = document.querySelector("#hero");

    if (heroSection) {
      heroSection.innerHTML = `
        <div>
          <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
          <p>잠시 후 다시 시도해 주세요.</p>
        </div>
      `;
    }
  }
});
