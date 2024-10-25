const notificationWrap = document.querySelector(".notification-wrap");

let notificationContainer = `<li class="notification-container">
                                <a href="" class="notification"
                                    ><p class="notification-num">${post.postId}</p>
                                    <h4 class="notification-title">${post.postTitle}</h4>
                                    <p class="notification-date">${post.createdDate}</p></a>
                            </li>`;
let text = ``;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;
text += notificationContainer;

notificationWrap.innerHTML = text;

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
    notificationWrap.innerHTML = text;
}
