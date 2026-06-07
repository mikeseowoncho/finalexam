window.onload = function () {
  // --- [1. Canvas 초기 설정] ---
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const scoreDisplay = document.getElementById("score");
  const livesDisplay = document.getElementById("lives");

  // --- [2. 새로운 게임 상태 (레벨 및 난이도 조절)] ---
  let level = 1;
  let baseSpeed = 2.5; // ⭐️ 초기 난이도 하향 (기존 3 -> 2.5)
  let brokenBricks = 0; // 현재 레벨에서 깬 벽돌 수

  const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: baseSpeed,
    dy: -baseSpeed,
    radius: 6,
    color: "#00ff00",
  };

  const paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
    color: "#ffea00",
    speed: 7, // 패들 이동 속도 (공은 느려졌지만 패들은 약간 빠르게 하여 난이도 완화)
  };

  let rightPressed = false;
  let leftPressed = false;
  let score = 0;
  let lives = 3;
  let isGameOver = false;

  // --- [3. 벽돌 배열 설정 및 초기화 함수] ---
  const brickInfo = {
    rowCount: 4,
    columnCount: 6,
    width: 65,
    height: 20,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 20,
  };

  let bricks = [];

  // ⭐️ 레벨이 오를 때마다 벽돌을 다시 세팅하기 위해 함수로 묶음
  function initBricks() {
    bricks = [];
    for (let c = 0; c < brickInfo.columnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickInfo.rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  // 최초 실행 시 벽돌 세팅
  initBricks();

  // --- [4. 이벤트 리스너] ---
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
  }

  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
  }

  // --- [5. 충돌 감지 및 레벨 업 로직] ---
  function collisionDetection() {
    for (let c = 0; c < brickInfo.columnCount; c++) {
      for (let r = 0; r < brickInfo.rowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 1) {
          if (
            ball.x > b.x &&
            ball.x < b.x + brickInfo.width &&
            ball.y > b.y &&
            ball.y < b.y + brickInfo.height
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
            score += 10;
            brokenBricks++; // 깬 벽돌 1개 추가
            scoreDisplay.innerText = score;

            // ⭐️ 레벨 클리어 조건 (모든 벽돌 파괴)
            if (brokenBricks === brickInfo.rowCount * brickInfo.columnCount) {
              level++; // 레벨 업
              baseSpeed += 0.8; // 다음 판부터 적용될 공 속도 증가
              brokenBricks = 0; // 깬 벽돌 수 초기화

              // 공과 패들 중앙으로 리셋 (빨라진 속도 적용)
              ball.x = canvas.width / 2;
              ball.y = canvas.height - 30;
              ball.dx = baseSpeed;
              ball.dy = -baseSpeed;
              paddle.x = (canvas.width - paddle.width) / 2;

              // 벽돌 다시 깔기
              initBricks();

              // 알럿 창으로 게임 잠시 멈춤 및 안내
              alert(
                `🎉 레벨 ${level - 1} 클리어!\n속도가 증가합니다. (현재 레벨: ${level})`,
              );
            }
          }
        }
      }
    }
  }

  // --- [6. 그리기 함수들] ---
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(
      paddle.x,
      canvas.height - paddle.height,
      paddle.width,
      paddle.height,
    );
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < brickInfo.columnCount; c++) {
      for (let r = 0; r < brickInfo.rowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX =
            c * (brickInfo.width + brickInfo.padding) + brickInfo.offsetLeft;
          let brickY =
            r * (brickInfo.height + brickInfo.padding) + brickInfo.offsetTop;

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          ctx.beginPath();
          ctx.rect(brickX, brickY, brickInfo.width, brickInfo.height);
          ctx.fillStyle = r % 2 === 0 ? "#ff0055" : "#00aaff";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  // --- [7. 메인 게임 루프] ---
  function draw() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (
      ball.x + ball.dx > canvas.width - ball.radius ||
      ball.x + ball.dx < ball.radius
    ) {
      ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
      // 패들에 맞았을 때
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        // ★ [방어적 코딩 추가] 공이 패들 내부로 파고드는 경계값 오류 방지
        ball.y = canvas.height - ball.radius;

        ball.dy = -ball.dy;
        if (rightPressed) ball.dx += 0.5;
        else if (leftPressed) ball.dx -= 0.5;
      }
      // 바닥에 떨어졌을 때
      else {
        lives--;
        livesDisplay.innerText = lives;
        if (!lives) {
          isGameOver = true;
          setTimeout(() => {
            alert(`⏰ GAME OVER \n최종 점수: ${score} (도달 레벨: ${level})`);
            document.location.reload();
          }, 50);
        } else {
          // ⭐️ 목숨이 깎여서 다시 시작할 때도 현재 레벨의 baseSpeed를 유지하도록 수정
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 30;
          ball.dx = baseSpeed;
          ball.dy = -baseSpeed;
          paddle.x = (canvas.width - paddle.width) / 2;
        }
      }
    }

    // 패들 이동 (paddle.speed 적용)
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    } else if (leftPressed && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(draw);
  }

  draw();
};
