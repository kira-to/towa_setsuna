// テスト用のシンプルなゲーム
let answer, tries;

function initGame() {
  answer = Math.floor(Math.random() * 100) + 1;
  tries = 0;
  console.log('新しいゲーム開始、正解:', answer);
  document.getElementById('log').textContent = '1〜100 の整数を当てて！';
  document.getElementById('guess').value = '';
  document.getElementById('again').style.display = 'none';
}

function onGuess() {
  const input = document.getElementById('guess');
  const logDom = document.getElementById('log');
  const n = parseInt(input.value, 10);
  
  console.log('入力値:', n, '正解:', answer);
  
  if(isNaN(n) || n < 1 || n > 100) {
    logDom.textContent = '1〜100 の整数を入力してね！';
    return;
  }
  
  tries += 1;
  
  if(n < answer) {
    logDom.textContent = `${tries} 回目：もっと大きいよ！`;
  } else if(n > answer) {
    logDom.textContent = `${tries} 回目：もっと小さいよ！`;
  } else {
    logDom.textContent = `🎉 正解！ ${tries} 回で当たり`;
    document.getElementById('again').style.display = 'block';
  }
  
  input.value = '';
  input.focus();
}

// ページ読み込み後に実行
window.addEventListener('load', () => {
  console.log('ページ読み込み完了');
  
  // 魔導書を非表示にしてゲームUIを表示
  setTimeout(() => {
    document.querySelector('.scene').style.display = 'none';
    document.getElementById('game-ui').classList.remove('hide');
    initGame();
    
    // イベントリスナーを設定
    document.getElementById('btn-guess').addEventListener('click', onGuess);
    document.getElementById('guess').addEventListener('keydown', e => {
      if(e.key === 'Enter') onGuess();
    });
    document.getElementById('again').addEventListener('click', initGame);
    
    console.log('ゲーム初期化完了');
  }, 2000);
});
