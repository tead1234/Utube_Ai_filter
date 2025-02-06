// popup.js
document.getElementById('addKeyword').addEventListener('click', () => {
    const input = document.getElementById('keywordInput');
    chrome.storage.sync.get('keywords', (data) => {
      const updated = [...(data.keywords || []), input.value];
      chrome.storage.sync.set({ keywords: updated }, updateList);
    });
  });
  
  function updateList() {
    chrome.storage.sync.get('keywords', (data) => {
      const list = document.getElementById('keywordList');
      list.innerHTML = data.keywords.map(word => `
        <li>${word} <button data-word="${word}">×</button></li>
      `).join('');
    });
  }
  
  
  // 초기 목록 로드
  updateList();