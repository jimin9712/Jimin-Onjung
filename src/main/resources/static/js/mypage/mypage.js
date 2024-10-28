// 사이드배너 해당 세션 클릭이벤트
document.addEventListener("DOMContentLoaded", () => {
    // 모든 lnb-item 요소를 선택
    const Items = document.querySelectorAll(".lnb-item");

    // if (Items.length === 0) { /**점검**/
    //     console.error("lnb-item 요소를 찾을 수 없습니다. HTML을 확인해주세요.");
    // } else {
    //     console.log(`총 ${Items.length}개의 lnb-item 요소를 찾았습니다.`);

    // 각 lnb-item 요소에 클릭 이벤트 리스너를 추가
    Items.forEach((item, index) => {
        // console.log(`이벤트 리스너를 추가 중인 요소 인덱스: ${index}`);
        item.addEventListener("click", (e) => {
            try {
                // 기본 동작 방지 및 이벤트 전파 차단
                e.preventDefault();
                e.stopPropagation();
                // console.log("클릭 이벤트 발생. 요소:", item);

                // 모든 항목에서 active 클래스 제거
                Items.forEach((i) => {
                    i.classList.remove("active");
                    // console.log("active 클래스 제거된 항목:", i);
                });

                // 클릭된 항목에 active 클래스 추가
                item.classList.add("active");
                // console.log("active 클래스 추가된 항목:", item);
            } catch (error) {
                // console.error("클릭 이벤트 처리 중 오류 발생:", error);
            }
        });
    });
});
// });

// z-index로 화면 보이기 / 숨기기
//  클릭 이벤트 추가 div 보여주기
const showTab = (tabId, element) => {
    // 일단 모든 tab-content를 숨김
    const tabcontent = document.getElementsByClassName("tab-content");
    Array.from(tabcontent).forEach((content) => {
        content.classList.remove("active");
    });

    // 클릭된 tab만 표시
    document.getElementById(tabId).classList.add("active");

    // 사이드바 메뉴의 활성화 상태 변경
    const tablinks = document.querySelectorAll(".side-baner-wrap a");
    tablinks.forEach((link) => {
        link.classList.remove("active");
    });

    // 현재 클릭된 요소의 부모 li에 active 클래스 추가
    element.parentElement.classList.add("active");
};
    fetch("/member/info")
        .then(response => response.json())
        .then(data => {
            console.log("받은 데이터:", data); // 디버그 용도

            if (data) {
                // 회원 정보에 따라 HTML 업데이트
                document.getElementById("memberName").textContent = data.memberName + "님";
                document.getElementById("memberEmail").textContent = data.memberEmail;
                document.getElementById("memberPoint").textContent = data.memberPoint.toLocaleString(); // 포인트 표시
                document.getElementById("memberJung").textContent = data.memberJung.toLocaleString(); // 정 표시
                document.getElementById("profileName").textContent = data.memberName;
            } else {
                alert("회원 정보를 가져오지 못했습니다.");
            }
        })
        .catch(error => console.error("Error fetching member info:", error));


    fetch("/member/info")
    .then(response => response.json())
    .then(data => {
        console.log("받은 데이터:", data); // 받은 데이터를 확인

        if (data && data.memberType) {
            console.log("회원 타입:", data.memberType); // 디버그: 정확한 값 출력

            // 회원 정보에 따라 HTML 업데이트
            document.getElementById("memberName").textContent = data.memberName + "님";
            document.getElementById("memberEmail").textContent = data.memberEmail;

            // memberType에 따라 역할 설정
            const memberTypeText =
                data.memberType === "NORMAL"
                    ? "일반 회원"
                    : data.memberType === "ORGANIZATION"
                        ? "단체 회원"
                        : "알 수 없는 회원";

            document.getElementById("memberType").textContent = memberTypeText;
        } else {
            alert("회원 정보를 가져오지 못했습니다.");
        }
    })
    .catch(error => console.error("Error fetching member info:", error));
