document.addEventListener("DOMContentLoaded", () => {
    // 모든 lnb-item 요소를 선택
    const Items = document.querySelectorAll(".lnb-item");

    // 각 lnb-item 요소에 클릭 이벤트 리스너를 추가
    Items.forEach((item) => {
        item.addEventListener("click", (e) => {
            try {
                e.preventDefault();
                e.stopPropagation();

                // 모든 항목에서 active 클래스 제거
                Items.forEach((i) => i.classList.remove("active"));

                // 클릭된 항목에 active 클래스 추가
                item.classList.add("active");
            } catch (error) {
                console.error("클릭 이벤트 처리 중 오류 발생:", error);
            }
        });
    });

    // 최신 회원 정보 가져오기
    fetch("/member/info")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("받은 데이터:", data);

            if (data) {
                const displayName = data.memberNickName || data.memberName;
                document.getElementById("memberName").textContent = `${displayName}님`;
                document.getElementById("memberEmail").textContent = data.memberEmail;
                document.getElementById("memberType").textContent = data.memberType;
                document.getElementById("profileName").textContent = displayName;
                document.getElementById("profileIntroduction").textContent =
                    data.memberIntroduction || "한 줄 소개가 없습니다.";

                const memberId = data.id;
                if (!memberId) {
                    console.error("memberId가 존재하지 않습니다. 응답 데이터 구조를 확인하세요:", data);
                    alert("회원 ID를 가져오지 못했습니다.");
                    return;
                }

                // 지원 기록 및 기부 기록 조회 함수 정의
                const fetchTotalPoints = (url, elementId, label) => {
                    fetch(url)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((responseData) => {
                            console.log(`총 ${label} 응답 데이터:`, responseData);

                            let totalPoints;
                            if (typeof responseData === 'number') {
                                totalPoints = responseData;
                            } else if (responseData.totalDonation) {
                                totalPoints = responseData.totalDonation;
                            } else {
                                console.warn("예상치 못한 응답 구조:", responseData);
                                totalPoints = 0;
                            }

                            document.getElementById(elementId).textContent =
                                totalPoints.toLocaleString() + ` ${label}`;
                        })
                        .catch((error) => {
                            console.error(`총 ${label} 조회 실패:`, error);
                            document.getElementById(elementId).textContent = `정보를 불러올 수 없습니다.`;
                        });
                };

                // 총 지원 포인트 조회
                fetchTotalPoints(`/support-records/total/${memberId}`, "memberJung", "정");

                // 총 기부 포인트 조회
                fetchTotalPoints(`/donation-records/total/${memberId}`, "memberPoint", "포인트");
            } else {
                alert("회원 정보를 가져오지 못했습니다.");
            }
        })
        .catch((error) => {
            console.error("회원 정보 조회 실패:", error);
            alert("회원 정보를 불러오는 중 오류가 발생했습니다.");
        });

    // 총 봉사 시간 조회
    fetch("/mypage/total-time")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
            }
            return response.json();
        })
        .then((responseData) => {
            console.log("총 봉사 시간 응답 데이터:", responseData);

            // 응답 데이터에서 총 봉사 시간 추출
            const totalTime = responseData.totalTime || responseData.time || 0;
            document.getElementById("totalVtTime").textContent = `${totalTime} 시간`;
        })
        .catch((error) => {
            console.error("총 봉사 시간 조회 실패:", error);
            document.getElementById("totalVtTime").textContent = "0 시간";
        });

    // 봉사활동 횟수 조회
    fetch("/mypage/vt-count")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
            }
            return response.json();
        })
        .then((responseData) => {
            console.log("봉사활동 횟수 응답 데이터:", responseData);

            // 응답 데이터에서 봉사활동 횟수 추출
            const vtCount = responseData.vtCount || responseData.count || 0;
            document.getElementById("vtCount").textContent = `${vtCount} 회`;
        })
        .catch((error) => {
            console.error("봉사활동 횟수 조회 실패:", error);
            document.getElementById("vtCount").textContent = "0 회";
        });


});

// z-index로 화면 보이기 / 숨기기 - 클릭 이벤트 추가
const showTab = (tabId, element) => {
    const tabcontent = document.getElementsByClassName("tab-content");
    Array.from(tabcontent).forEach((content) => {
        content.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");

    const tablinks = document.querySelectorAll(".side-baner-wrap a");
    tablinks.forEach((link) => {
        link.classList.remove("active");
    });

    element.parentElement.classList.add("active");
};
