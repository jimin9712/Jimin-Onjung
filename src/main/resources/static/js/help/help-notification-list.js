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
