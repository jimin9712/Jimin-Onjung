const notificationService = (() => {
    const getList = async (page, callback) => {
        const response = await fetch(`/help/notifications/${page}`); // 공지사항 목록을 가져오는 URL
        const notifications = await response.json();
        console.log("Fetched notifications:", notifications); // 데이터 확인용 로그

        if (callback) {
            callback(notifications);
        }
    };

    return { getList: getList };
})();

// 공지사항 목록을 동적으로 렌더링하는 함수
const renderNotifications = (notifications) => {
    const sidebarContainer = document.querySelector(".sidebar");
    console.log(sidebarContainer); // 선택된 요소를 로그로 확인
    let content = ``;

    notifications.forEach(notification => {
        content += `
            <li>
                <a href="/help/help-notification-inquiry?id=${notification.id}" class="sidebar-item">
                    ${notification.postTitle}
                </a>
            </li>
        `;
    });

    sidebarContainer.innerHTML += content;
};

// 더보기 버튼 이벤트 처리
const moreButton = document.querySelector(".more-button");
let currentPage = 1;
moreButton.addEventListener("click", () => {
    notificationService.getList(++currentPage, (notifications) => {
        renderNotifications(notifications);

        // 만약 가져온 데이터가 없거나 더 이상 로드할 페이지가 없으면 더보기 버튼 숨김 처리
        if (notifications.length === 0) {
            moreButton.style.display = "none";
        }
    });
});

// 초기 로드 시 첫 페이지 공지사항 목록 불러오기
notificationService.getList(currentPage, renderNotifications);
