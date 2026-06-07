// --- [1. 게임 설정 및 데이터] ---
const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const flipCountDisplay = document.getElementById("flip-count");

const symbols = ["🍎", "🍌", "🍓", "🍇", "🍉", "🍒", "🥑", "🍍"];
let cardDeck = [...symbols, ...symbols];

let flippedCards = [];
let matchedPairs = 0;
let flips = 0;
let lockBoard = true; // ⭐️ 시작할 때 true로 설정하여 클릭 방지!

let timeRemaining = 60;
let timerInterval;
const MEMORY_TIME = 3; // 처음에 카드를 보여줄 시간 (3초)

// --- [2. 피셔-예이츠 셔플] ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --- [3. 게임 초기화 및 3, 2, 1 카운트다운 로직] ---
function initGame() {
  cardDeck = shuffle(cardDeck);
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  flips = 0;
  flippedCards = [];
  timeRemaining = 60;

  // 시작 상태: 보드를 잠그고 플립 횟수 초기화
  lockBoard = true;
  flipCountDisplay.innerText = flips;

  // ⭐️ 3, 2, 1 카운트다운 설정
  let memoryCount = 3;
  timerDisplay.innerText = memoryCount;
  timerDisplay.style.color = "#ffea00"; // 노란색 글씨

  // 카드 생성 (앞면이 보이게)
  cardDeck.forEach((symbol) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "flipped");
    cardElement.dataset.symbol = symbol;

    cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-back">?</div>
                <div class="card-front">${symbol}</div>
            </div>
        `;

    cardElement.addEventListener("click", onCardClick);
    gameBoard.appendChild(cardElement);
  });

  // 기존 타이머들 초기화
  clearInterval(timerInterval);

  // ⭐️ 1초마다 숫자를 줄여나가는 인터벌 실행
  let countdownInterval = setInterval(() => {
    memoryCount--;

    if (memoryCount > 0) {
      // 2, 1 표시
      timerDisplay.innerText = memoryCount;
    } else {
      // 카운트가 0이 되면 준비 단계 종료
      clearInterval(countdownInterval);

      // 모든 카드 덮기
      const allCards = document.querySelectorAll(".card");
      allCards.forEach((card) => card.classList.remove("flipped"));

      // 게임 시작 상태로 전환
      lockBoard = false;
      timerDisplay.style.color = "#fff";
      timerDisplay.innerText = timeRemaining;

      // 본 타이머 작동 시작
      timerInterval = setInterval(updateTimer, 1000);
    }
  }, 1000); // 1000ms(1초)마다 실행
}

// --- [4. 카드 클릭 이벤트 핸들러] ---
function onCardClick() {
  if (lockBoard) return; // 보드가 잠겨있으면 클릭 무시
  if (this.classList.contains("flipped") || this.classList.contains("matched"))
    return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    flips++;
    flipCountDisplay.innerText = flips;
    checkForMatch();
  }
}

// --- [5. 카드 매칭 로직] ---
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const isMatch = card1.dataset.symbol === card2.dataset.symbol;

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === 8) {
      clearInterval(timerInterval);
      setTimeout(
        () => alert(`🎉 클리어! 총 ${flips}번 만에 성공했습니다!`),
        500,
      );
    }
  } else {
    lockBoard = true; // 1. ★ [강조] 카드가 안 맞으면 즉시 보드를 잠가서 추가 클릭 차단!
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false; // 2. ★ [강조] 0.8초 뒤에 카드가 원상복구되면 잠금 해제!
    }, 800);
  }
}

// --- [6. 타이머 로직] ---
function updateTimer() {
  timeRemaining--;
  timerDisplay.innerText = timeRemaining;

  // 시간이 10초 이하일 때 텍스트를 붉은색으로 깜빡이게 하면 좋음
  if (timeRemaining <= 10) {
    timerDisplay.style.color = "#ff0000";
  }

  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    lockBoard = true;
    setTimeout(() => {
      alert("⏰ 시간 초과! 게임 오버입니다.");
      initGame(); // 자동 재시작
    }, 100);
  }
}

// 스크립트 실행 시 즉시 게임 시작
initGame();
