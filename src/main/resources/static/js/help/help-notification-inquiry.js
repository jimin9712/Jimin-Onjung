const lisdiv = document.querySelector(".sidebar-wrap");
const keyword = document.querySelector("input[name='keyword']");
const notificationWrap = document.getElementById("notification-wrap");
const pageWrap = document.getElementById("page-wrap");

let content = ``;

// 게시글 목록을 표시하는 함수
const showList = () => {
    let text = ``; // HTML 내용을 저장할 변수 초기화
    console.log(posts);
    posts.forEach((notice) => {
        text += `<li class="sidebar-item-container">
            <a href="/help/help-notification-inquiry?id=${notice.id}"
               class="sidebar-item">${notice.postTitle}
               (${notice.createdDate})</a>
        </li>`;
    });
    text += `<li>
                <a href="/help/help-notification-list" class="more-button">더보기</a>
             </li>`;

    // 게시글 목록을 HTML 요소에 삽입
    lisdiv.innerHTML = text;
};

showList();

// 키워드 검색 입력 처리
if (search.keyword === null) {
    search.keyword = '';
}
keyword.value = search.keyword;

posts.forEach((notice) => {
    content += `<li class="notification-container">
        <a href="/help/help-notification-inquiry?id=${notice.id}" class="notification"
            ><p class="notification-num">${notice.id}</p>
            <h4 class="notification-title">${notice.postTitle}</h4>
            <p class="notification-date">${notice.createdDate}</p></a>
        </li>`;
});
notificationWrap.innerHTML = content;

// 페이지 네비게이션 링크 생성 및 삽입
content = ``;
for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    content += `<a href="/help/help-notification-list?keyword=${search.keyword}&page=${i}">${i}</a>`;
}
pageWrap.innerHTML = content;