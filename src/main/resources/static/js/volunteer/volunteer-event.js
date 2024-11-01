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

const pageBtns = document.querySelectorAll("nav .page-btn");

pageBtns.forEach((pageBtn) => {
});
pageBtn.addEventListener("click", (e) => {
    // 클릭된 버튼에만 active 클래스 추가

    pageBtn.classList.add("active");
});
// 모든 버튼에서 active 클래스 제거
pageBtns.forEach(pageBtn => pageBtn.classList.remove("active"));

/**********************************페이지네이션****************************************/

document.addEventListener("click", (e) => {
    // #paging 영역 내에서의 클릭인지 확인
    if (e.target.closest("#paging")) {
        e.preventDefault();
        const target = e.target.closest("a"); // 클릭한 요소가 <a>인지 확인
        if (target) {
            const page = target.getAttribute("href").split("=")[1];
            vtListService.getList(page, "someId", (data) => {
                showList({ lists: data.lists, pagination: data.pagination });
            });
        }
    }
});


