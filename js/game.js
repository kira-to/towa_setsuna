// --- グローバル変数 ---
let answer, tries;
const input = document.getElementById('guess');
const logDom = document.getElementById('log');
const btnAgain = document.getElementById('again');
const setsunaArea = document.getElementById('setsuna-area');
const towaArea = document.getElementById('towa-area');
const setsunaBalloon = document.getElementById('setsuna-balloon');
const towaBalloon = document.getElementById('towa-balloon');
const btnGuess = document.getElementById('btn-guess');
const gameUI = document.getElementById('game-ui');
const scene = document.querySelector('.scene');
const book = document.getElementById('book');

// --- ユーティリティ関数 ---
function hide(...els) {
  els.forEach(el => { if(el) el.classList.add('hide'); });
}

function show(...els) {
  els.forEach(el => { if(el) el.classList.remove('hide'); });
}

function restartJumpAnimation(area) {
  area.classList.remove('jump');
  void area.offsetWidth;
  area.classList.add('jump');
}

function showChar(dir, msg) {
  if(dir === 'up') {
    setsunaBalloon.textContent = msg;
    show(setsunaArea); 
    hide(towaArea);
    restartJumpAnimation(setsunaArea);
  }
  if(dir === 'down') {
    towaBalloon.textContent = msg;
    show(towaArea); 
    hide(setsunaArea);
    restartJumpAnimation(towaArea);
  }
}

function hideChar() {
  hide(setsunaArea, towaArea);
  setsunaBalloon.textContent = '';
  towaBalloon.textContent = '';
}

// --- ゲーム機能 ---
function initGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  tries = 0;
  hide(setsunaArea, towaArea, btnAgain);
  setsunaBalloon.textContent = '';
  towaBalloon.textContent = '';
  logDom.textContent = '1〜100 の整数を当てて！';
  input.value = '';
  input.focus();
}

function onGuess() {
  const n = parseInt(input.value, 10);
  if(isNaN(n) || n < 1 || n > 100) {
    logDom.textContent = '1〜100 の整数を入力してね！';
    hideChar();
    return;
  }
  
  tries += 1;
  
  if(n < answer) {
    logDom.textContent = `${tries} 回目：`;
    showChar('up', 'もっと大きいよ！');
  } else if(n > answer) {
    logDom.textContent = `${tries} 回目：`;
    showChar('down', 'もっと小さいよ！');
  } else {
    logDom.textContent = `🎉 正解！ ${tries} 回で当たり`;
    // トワとセツナ両方表示して「おめでとう！」
    setsunaBalloon.textContent = 'おめでとう！';
    towaBalloon.textContent = 'おめでとう！';
    show(setsunaArea, towaArea);
    restartJumpAnimation(setsunaArea);
    restartJumpAnimation(towaArea);
    btnAgain.style.display = 'block';
  }
  
  input.value = '';
  input.focus();
}

// --- イベントリスナー ---
btnGuess.addEventListener('click', onGuess);
input.addEventListener('keydown', e => { 
  if(e.key === 'Enter') onGuess(); 
});
btnAgain.addEventListener('click', () => {
  btnAgain.style.display = 'none';
  initGame();
});

// --- 魔導書オープニング演出 ---
function openBookAnimation() {
  // 自動で本を開く
  setTimeout(() => {
    book.classList.add('open');
    
    // 最後のページアニメーション終了後にゲームUI表示
    setTimeout(() => {
      scene.style.display = 'none';
      show(gameUI);
      initGame();
    }, 1200);
  }, 1000);
}

// --- 初期化 ---
window.addEventListener('load', () => {
  // 初期状態ではキャラクターを非表示
  hideChar();
  
  // オープニング演出開始
  openBookAnimation();
});
