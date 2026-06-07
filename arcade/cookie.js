// --- [게임 데이터 상태 관리] ---
let cookies = 0;
let cps = 0; // Cookies Per Second
let clickPower = 1; // 1번 클릭 시 오르는 쿠키 수

// 업그레이드 아이템 데이터 객체
const shopData = {
  cursor: { cost: 15, cpsBonus: 1, count: 0, costMultiplier: 1.1 },
  grandma: { cost: 100, cpsBonus: 5, count: 0, costMultiplier: 1.1 },
};

// --- [DOM 엘리먼트 가져오기] ---
const scoreDisplay = document.getElementById("score-display");
const cpsDisplay = document.getElementById("cps-display");
const cookieElement = document.getElementById("cookie");

// --- [UI 업데이트 함수] ---
function updateUI() {
  // 소수점 버림 처리하여 깔끔하게 표시
  scoreDisplay.innerText = Math.floor(cookies);
  cpsDisplay.innerText = cps;

  // 상점 아이템 구매 가능 여부에 따라 시각적 비활성화(disabled) 처리
  for (const key in shopData) {
    const item = shopData[key];
    const btn = document.getElementById(`btn-${key}`);

    document.getElementById(`cost-${key}`).innerText = Math.floor(item.cost);
    document.getElementById(`count-${key}`).innerText = item.count;

    if (cookies >= item.cost) {
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
    }
  }
}

// --- [쿠키 클릭 이벤트 (핵심 타격감)] ---
cookieElement.addEventListener("mousedown", (e) => {
  cookies += clickPower;
  updateUI();
  createFloatingText(e.clientX, e.clientY);
});

// 클릭한 위치(x, y)에 둥둥 뜨는 텍스트 생성 함수
function createFloatingText(x, y) {
  const floatingText = document.createElement("div");
  floatingText.classList.add("floating-text");
  floatingText.innerText = `+${clickPower}`;

  // 마우스 포인터 위치에 요소 배치
  floatingText.style.left = `${x}px`;
  floatingText.style.top = `${y}px`;

  document.body.appendChild(floatingText);

  // 애니메이션(0.8초)이 끝나면 DOM에서 삭제하여 메모리 누수 방지
  setTimeout(() => {
    floatingText.remove();
  }, 800);
}

// --- [상점 아이템 구매 로직] ---
function buyItem(itemKey) {
  const item = shopData[itemKey];

  // 돈이 충분한지 확인
  if (cookies >= item.cost) {
    cookies -= item.cost; // 비용 차감
    item.count += 1; // 보유량 증가
    cps += item.cpsBonus; // 초당 생산량 증가

    // 가격 인상 (복리 계산)
    item.cost = item.cost * item.costMultiplier;

    updateUI();
  }
}

// --- [게임 메인 루프 (자동 생산)] ---
// 1초(1000ms)마다 CPS만큼 쿠키 자동 추가
setInterval(() => {
  cookies += cps;
  updateUI();
}, 1000);

// 초기 렌더링
updateUI();
