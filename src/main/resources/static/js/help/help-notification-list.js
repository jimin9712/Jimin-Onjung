const lisdiv = document.querySelector(".notification-wrap");
const pagingdiv = document.querySelector(".pagination-container");
const keyword = document.querySelector("input[name='keyword']");
const notificationWrap = document.getElementById("notification-wrap");




let content = ``;

// 게시글 목록을 표시하는 함수
const showList = () => {
    let text = ``; // HTML 내용을 저장할 변수 초기화
    notices.forEach((notice) => {
        text += `<li class="notification-container">
        <a href="/help/help-notification-inquiry?id=${notice.id}" class="notification"
            ><p class="notification-num">${notice.id}</p>
            <h4 class="notification-title">${notice.postTitle}</h4>
            <p class="notification-date">${notice.createdDate}</p></a>
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
            <a href="/help/help-notification-list?page=${pagination.startPage - 1}" class="pagination-num" style="padding: 12px;"><svg type="arrow12" viewBox="0 0 12 12" class="iFpvod" style="transform: rotate(-180deg);"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"></path><defs></defs></svg></a>
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
                    <a href="/help/help-notification-list?page=${i}&query=${pagination.keyword || ''}" class="pagination-num">${i}</a>
                </div>
            `;
        }
    }

    // 다음 페이지 버튼 추가: endPage가 realEnd보다 작거나, 더 로드할 데이터가 있을 경우
    const shouldShowNext = pagination.endPage < pagination.realEnd || (pagination.endRow < pagination.total);

    if (shouldShowNext) {
        text += `
        <div class="pagination-num-container" id="page-next-button">
            <a href="/help/help-notification-list?page=${pagination.endPage + 1}&query=${pagination.keyword || ''}" class="pagination-num" id="next" style="padding: 12px"><svg
            viewBox="0 0 12 12"
            class="iFpvod"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
            ></path>
            <defs></defs></svg
          ></a>
        </div>
        `;
    }

    // 페이지 네비게이션을 HTML 요소에 삽입
    pagingdiv.innerHTML = text;
}

// 게시글 목록과 페이지 네비게이션 표시 함수 호출
showList();
showPaging();

// 키워드 검색 입력 처리
if (search.keyword === null) {
    search.keyword = '';
}
keyword.value = search.keyword;

notices.forEach((notice) => {
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

