// content.js
let keywords = [];

// Chrome 저장소에서 키워드 불러오기
chrome.storage.sync.get('keywords', (data) => {
  keywords = data.keywords || [];
});

// AI 생성 이름 패턴
const AI_NAME_PATTERNS = [
  /AI_/i, /Bot\d+/i, /GPT_/i, /[A-Z]{6}_/  // AI 생성 이름 패턴
];

// DOM 변화 감지 (동적 댓글 로딩 대응)
const observer = new MutationObserver(() => {
  filterCommentsAndNames();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 댓글 내용 및 사용자 이름 필터링 함수
function filterCommentsAndNames() {
  document.querySelectorAll('ytd-comment-thread-renderer, ytd-comment-renderer').forEach(comment => {
    // 댓글 내용 필터링
    const text = comment.textContent.toLowerCase();
    const shouldHideByKeyword = keywords.some(keyword => 
      text.includes(keyword.toLowerCase())
    );

    // 사용자 이름 필터링
    const authorText = comment.querySelector('#author-text');
    const username = authorText ? authorText.textContent.trim() : '';
    const shouldHideByName = AI_NAME_PATTERNS.some(pattern => 
      pattern.test(username)
    );

    // 숨김 처리
    if (shouldHideByKeyword || shouldHideByName) {
      comment.style.display = 'none';
    } else {
      comment.style.display = '';
    }
  });
}

// 초기 로드시 필터링 실행
filterCommentsAndNames();