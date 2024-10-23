const notificationWrap = document.querySelector(".notification-wrap");

let notificationContainer = `<li class="notification-container">
                                <a href="" class="notification"
                                    ><p class="notification-num">8</p>
                                    <h4 class="notification-title">10.22 업데이트 내용 및 바뀐 회원정보 관리 방식 안내</h4>
                                    <p class="notification-date">2024.10.21</p></a>
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
