// const notificationWrap = document.querySelector(".notification-wrap");
//
// let notificationContainer = `<li class="notification-container">
//                                 <a href="" class="notification"
//                                     ><p class="notification-num">${post.postId}</p>
//                                     <h4 class="notification-title">${post.postTitle}</h4>
//                                     <p class="notification-date">${post.createdDate}</p></a>
//                             </li>`;
// let text = ``;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
// text += notificationContainer;
//
// notificationWrap.innerHTML = text;

const lisdiv = document.querySelector(".notification-wrap");
const pagingdiv = document.querySelector(".pagination-container");
// 게시글 목록을 표시하는 함수
const showList = () => {
    let text = ``; // HTML 내용을 저장할 변수 초기화
    posts.forEach((post) => {
        text += `<li class="notification-container">
        <a href="" class="notification"
            ><p class="notification-num">${post.postId}</p>
            <h4 class="notification-title">${post.postTitle}</h4>
            <p class="notification-date">${post.createdDate}</p></a>
        </li>`;
    });

    // 게시글 목록을 HTML 요소에 삽입
    lisdiv.innerHTML = text;
}

// 페이지 네비게이션을 표시하는 함수
const showPaging = () => {
    let text = ``; // HTML 내용을 저장할 변수 초기화

    // 이전 페이지 버튼 추가
    if (pagination.prev) {
        text += `
        <div class="pagination-num-container" id="page-prev-button">
            <a href="/help/help-notification-list?page=${pagination.startPage - 1}" class="pagination-num">이전</a>
        </div>
        `;
    }

    // 페이지 번호 생성
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        if (pagination.page === i) {
            // 현재 페이지인 경우
            text += `
                <div class="pagination-num-container">
                    <a class="pagination-num active">${i}</a>
                </div>
            `;
        } else {
            // 다른 페이지인 경우
            text += `
                <div class="pagination-num-container">
                    <a href="/help/help-notification-list?page=${i}" class="pagination-num">${i}</a>
                </div>
            `;
        }
    }

    // 다음 페이지 버튼 추가
    if (pagination.next) {
        text += `
        <div class="pagination-num-container" id="page-next-button">
            <a href="/help/help-notification-list?page=${pagination.endPage + 1}" class="pagination-num">다음</a>
        </div>
        `;
    }

    // 페이지 네비게이션을 HTML 요소에 삽입
    pagingdiv.innerHTML = text;
}


// 게시글 목록과 페이지 네비게이션 표시 함수 호출
showList();
showPaging();
