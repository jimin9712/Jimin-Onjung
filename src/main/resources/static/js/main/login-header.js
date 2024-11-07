document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".hkjhsp").addEventListener("click", function () {
        const notiPopup = document.querySelector(".noti-popup");
        const profilePopup = document.querySelector(".profile-popup");

        // profile-popup이 열려 있으면 닫기
        if (profilePopup.style.display === "block") {
            profilePopup.style.display = "none";
        }

        // noti-popup 토글
        if (notiPopup.style.display === "none" || notiPopup.style.display === "") {
            notiPopup.style.display = "block"; // 표시
        } else {
            notiPopup.style.display = "none"; // 숨기기
        }
    });

    // 마우스가 헤더 밖으로 나가면 드롭다운 닫기
    document.querySelector("#gnb").addEventListener("mouseleave", function () {
        const notiPopup = document.querySelector(".noti-popup");
        const profilePopup = document.querySelector(".profile-popup");

        // 드롭다운 숨기기
        notiPopup.style.display = "none";
        profilePopup.style.display = "none";
    });

    document.querySelector(".opener").addEventListener("click", function () {
        const profilePopup = document.querySelector(".profile-popup");
        const notiPopup = document.querySelector(".noti-popup");

        // noti-popup이 열려 있으면 닫기
        if (notiPopup.style.display === "block") {
            notiPopup.style.display = "none";
        }

        // profile-popup 토글
        if (
            profilePopup.style.display === "none" ||
            profilePopup.style.display === ""
        ) {
            profilePopup.style.display = "block"; // 표시
        } else {
            profilePopup.style.display = "none"; // 숨기기
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const noticeElement = document.querySelector(".notice");
    const notiPopup = document.querySelector(".noti-popup");

    noticeElement.addEventListener("click", function (event) {
        event.stopPropagation(); // 이벤트 버블링 방지

        if (noticeElement.classList.contains("new-notification")) {
            noticeElement.classList.remove("new-notification");
        }

        if (notiPopup.style.display === "block") {
            notiPopup.style.display = "none";
        } else {
            notiPopup.style.display = "block";
        }
    });

    // 페이지의 다른 곳을 클릭하면 알림 팝업 닫기
    document.addEventListener("click", function (event) {
        if (!noticeElement.contains(event.target) && !notiPopup.contains(event.target)) {
            notiPopup.style.display = "none";
        }
    });
});


