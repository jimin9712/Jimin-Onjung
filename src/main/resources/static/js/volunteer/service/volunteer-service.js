// 봉사 지원 모집 게시글 가져오기
const fetchVolunteers = async (order = "recent", page = 1) => {
    try {
        const response = await fetch(`/volunteer/volunteer-info?order=${order}&page=${page}`);
        console.log("서버 응답 상태 코드:", response.status);

        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        const lists = data.lists || data;
        const pagination = data.pagination || {};

        console.log("pagination 객체:", pagination);
        console.log("선택된 페이지:", pagination.page || "페이지 정보가 없습니다");

        showList({ lists, pagination });
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



// document.addEventListener("DOMContentLoaded", () => {
//     const vtPaging = document.querySelector("#paging");
//     console.log(vtPaging); // 여기서 null이 아닌지 확인
// });



