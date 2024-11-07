document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".header-wrap input");
    const headerWrap = document.querySelector(".header-wrap");
    const bottomWrap = document.querySelector(".bottom-wrap");
    const listItems = document.querySelectorAll(".list-wrap .item");
    const arrowIcon = document.querySelector(".header-wrap .arrow");

    // header-wrap 클릭 시 드롭다운 열기/닫기
    headerWrap.addEventListener("click", (event) => {
        event.stopPropagation();
        const isVisible = bottomWrap.style.visibility === "visible";

        if (isVisible) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // 각 정렬 옵션 클릭 시 이벤트 처리
    listItems.forEach((item) => {
        item.addEventListener("click", () => {
            listItems.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
            inputField.value = item.textContent.trim();
            closeDropdown();
        });
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", (event) => {
        if (
            !headerWrap.contains(event.target) &&
            !bottomWrap.contains(event.target)
        ) {
            closeDropdown();
        }
    });

    // 드롭다운 열기 함수
    function openDropdown() {
        bottomWrap.style.visibility = "visible";
        arrowIcon.style.transform = "rotate(270deg)"; // 아래쪽 보기
    }

    // 드롭다운 닫기 함수
    function closeDropdown() {
        bottomWrap.style.visibility = "hidden";
        arrowIcon.style.transform = "rotate(90deg)"; // 위쪽 보기
    }
});


// 페이지 버튼 가져오기
const pageBtns = document.querySelectorAll("nav .page-btn");

// 각 버튼에 이벤트 리스너 추가
pageBtns.forEach((pageBtn) => {
    pageBtn.addEventListener("click", (e) => {
        // 모든 버튼에서 active 클래스 제거
        pageBtns.forEach(btn => btn.classList.remove("active"));

        // 클릭된 버튼에만 active 클래스 추가
        pageBtn.classList.add("active");

    });
});

// 페이지네이션 버튼 클릭 이벤트

document.addEventListener("DOMContentLoaded", () => {
    const pageContainer = document.querySelector(".page-container");

    pageContainer.addEventListener("click", (e) => {
        // 클릭된 요소가 .page-btn 클래스인지 확인
        if (e.target.classList.contains("page-btn")) {
            e.preventDefault();

            // 모든 .page-btn 요소에서 active 클래스 제거
            document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));

            // 클릭된 버튼에 active 클래스 추가
            e.target.classList.add("active");

            // 추가적으로 페이지 번호에 맞는 데이터 불러오는 부분 추가 가능
            const selectedPage = parseInt(e.target.getAttribute("data-page"), 10);

            fetchVolunteers("recent", selectedPage);
            window.history.pushState(null, "", `/volunteer/volunteer-list?page=${selectedPage}`);
        }
    });
});

const addPageButtonEventListeners = () => {
    document.querySelectorAll(".page-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedPage = parseInt(button.getAttribute("data-page"), 10);
            console.log("선택된 페이지:", selectedPage);

            // URL 변경 없이 페이지 데이터 불러오기
            fetchVolunteers(order, selectedPage);

            // URL을 업데이트하여 브라우저 주소 표시줄에 현재 페이지 반영
            window.history.pushState(null, "", `/volunteer/volunteer-list?page=${selectedPage}`);
        });
    });
};
// 이벤트 리스너 추가
document.querySelectorAll('.page-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const page = parseInt(event.target.getAttribute('data-page')) || 1;  // 페이지 번호 가져오기
        fetchVolunteers("recent", page);
    });
});







