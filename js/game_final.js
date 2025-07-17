// 完全版のゲーム
let answer, tries;

// ユーティリティ関数
function hide(...els) {
  els.forEach(el => { if(el) el.classList.add('hide'); });
}

function show(...els) {
  els.forEach(el => { if(el) el.classList.remove('hide'); });
}

function restartJumpAnimation(area) {
  if(area) {
    area.classList.remove('jump');
    void area.offsetWidth;
    area.classList.add('jump');
  }
}

function showChar(dir, msg) {
  const setsunaArea = document.getElementById('setsuna-area');
  const towaArea = document.getElementById('towa-area');
  const setsunaBalloon = document.getElementById('setsuna-balloon');
  const towaBalloon = document.getElementById('towa-balloon');
  
  if(dir === 'up') {
    if(setsunaBalloon) setsunaBalloon.textContent = msg;
    if(setsunaArea) {
      setsunaArea.classList.remove('hide');
      setsunaArea.style.display = 'block';
    }
    if(towaArea) {
      towaArea.classList.add('hide');
      towaArea.style.display = 'none';
    }
    restartJumpAnimation(setsunaArea);
  }
  if(dir === 'down') {
    if(towaBalloon) towaBalloon.textContent = msg;
    if(towaArea) {
      towaArea.classList.remove('hide');
      towaArea.style.display = 'block';
    }
    if(setsunaArea) {
      setsunaArea.classList.add('hide');
      setsunaArea.style.display = 'none';
    }
    restartJumpAnimation(towaArea);
  }
}

function hideChar() {
  const setsunaArea = document.getElementById('setsuna-area');
  const towaArea = document.getElementById('towa-area');
  const setsunaBalloon = document.getElementById('setsuna-balloon');
  const towaBalloon = document.getElementById('towa-balloon');
  
  if(setsunaArea) {
    setsunaArea.classList.add('hide');
    setsunaArea.style.display = 'none';
  }
  if(towaArea) {
    towaArea.classList.add('hide');
    towaArea.style.display = 'none';
  }
  if(setsunaBalloon) setsunaBalloon.textContent = '';
  if(towaBalloon) towaBalloon.textContent = '';
}

function initGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  tries = 0;
  console.log('新しいゲーム開始、正解:', answer);
  
  document.getElementById('log').textContent = '1〜100 の整数を当てて！';
  document.getElementById('guess').value = '';
  document.getElementById('again').style.display = 'none';
  
  // キャラクターを確実に非表示
  const setsunaArea = document.getElementById('setsuna-area');
  const towaArea = document.getElementById('towa-area');
  const setsunaBalloon = document.getElementById('setsuna-balloon');
  const towaBalloon = document.getElementById('towa-balloon');
  
  if(setsunaArea) {
    setsunaArea.classList.add('hide');
    setsunaArea.style.display = 'none';
  }
  if(towaArea) {
    towaArea.classList.add('hide');
    towaArea.style.display = 'none';
  }
  if(setsunaBalloon) setsunaBalloon.textContent = '';
  if(towaBalloon) towaBalloon.textContent = '';
  
  console.log('キャラクターを非表示にしました');
}

function onGuess() {
  const input = document.getElementById('guess');
  const logDom = document.getElementById('log');
  const n = parseInt(input.value, 10);
  
  console.log('入力値:', n, '正解:', answer);
  
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
    
    // 両方のキャラクターを表示して「おめでとう！」
    const setsunaArea = document.getElementById('setsuna-area');
    const towaArea = document.getElementById('towa-area');
    const setsunaBalloon = document.getElementById('setsuna-balloon');
    const towaBalloon = document.getElementById('towa-balloon');
    
    if(setsunaBalloon) setsunaBalloon.textContent = 'おめでとう！';
    if(towaBalloon) towaBalloon.textContent = 'おめでとう！';
    
    if(setsunaArea) {
      setsunaArea.classList.remove('hide');
      setsunaArea.style.display = 'block';
    }
    if(towaArea) {
      towaArea.classList.remove('hide');
      towaArea.style.display = 'block';
    }
    
    restartJumpAnimation(setsunaArea);
    restartJumpAnimation(towaArea);
    
    document.getElementById('again').style.display = 'block';
  }
  
  input.value = '';
  input.focus();
}

// 魔導書オープニング演出
function openBookAnimation() {
  const scene = document.querySelector('.scene');
  const book = document.getElementById('book');
  const gameUI = document.getElementById('game-ui');
  
  // 自動で本を開く
  setTimeout(() => {
    if(book) book.classList.add('open');
    
    // 最後のページアニメーション終了後にゲームUI表示
    setTimeout(() => {
      if(scene) scene.style.display = 'none';
      show(gameUI);
      
      // ゲームUI表示後にキャラクターを再度非表示
      setTimeout(() => {
        initGame();
      }, 100);
    }, 1200);
  }, 1000);
}

// ページ読み込み後に実行
window.addEventListener('load', () => {
  console.log('ページ読み込み完了');
  
  // 初期状態ではキャラクターを非表示
  hideChar();
  
  // イベントリスナーを設定
  const btnGuess = document.getElementById('btn-guess');
  const input = document.getElementById('guess');
  const btnAgain = document.getElementById('again');
  
  if(btnGuess) {
    btnGuess.addEventListener('click', onGuess);
  }
  if(input) {
    input.addEventListener('keydown', e => {
      if(e.key === 'Enter') onGuess();
    });
  }
  if(btnAgain) {
    btnAgain.addEventListener('click', initGame);
  }
  
  // オープニング演出開始
  openBookAnimation();
  
  console.log('ゲーム初期化完了');
});
