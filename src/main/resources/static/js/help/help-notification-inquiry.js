const lisdiv = document.querySelector(".sidebar-wrap");

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

    // 게시글 목록을 HTML 요소에 삽입
    lisdiv.innerHTML = text;
};

showList();
