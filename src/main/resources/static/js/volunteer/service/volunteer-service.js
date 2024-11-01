// 봉사 지원 모집 게시글 가져오기
const fetchVolunteers = async (order = "recent") => {
    try {
        const response = await fetch(`/volunteer/volunteer-info?order=${order}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        console.log("봉사 모집 데이터:", data); // 데이터를 확인하여 daysLeft가 포함되어 있는지 확인
        renderVolunteers(data); // 데이터를 화면에 렌더링하는 함수 호출
    } catch (error) {
        console.error("Error fetching filtered volunteer lists:", error);
        alert("봉사 모집 게시글을 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 정렬 기준을 설정하고 fetchVolunteers를 호출하는 함수
function setOrder(order) {
    fetchVolunteers(order); // 정렬 기준에 따라 봉사 모집 데이터를 가져옵니다.
}

// 초기 데이터 로드
document.addEventListener("DOMContentLoaded", () => {
    fetchVolunteers(); // 첫 페이지의 데이터를 로드합니다.
});

