// 봉사 지원 모집 게시글 가져오기
const fetchVolunteers = async (order = "recent") => {
    try {
        const response = await fetch(`/volunteer/volunteer-info?order=${order}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        const lists = data.lists || data;  // 데이터 안에 lists가 없으면 data를 사용
        const pagination = data.pagination || {};  // pagination 데이터가 없으면 빈 객체 사용

        console.log("봉사 모집 데이터:", lists);
        console.log("페이지네이션 데이터:", pagination);

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


/////////////////////////////////페이지네이션부분////////////////////////////////////
// const vtListService = (() => {
//     const getList = async (page, id, callback) => {
//         page = page || 1;
//         const response = await fetch(`/lists/${id}/${page}`); // 여기서 소문자 id 사용
//         const lists = await response.json();
//
//         if (callback) {
//             callback(lists);
//         }
//     };
//     return { getList }; // 객체 반환
// })();


document.addEventListener("DOMContentLoaded", () => {
    const vtPaging = document.querySelector("#paging");
    console.log(vtPaging); // 여기서 null이 아닌지 확인
});


// 페이지네이션 버튼 클릭 이벤트
// document.addEventListener("click", (e) => {
//     if (e.target.closest("#paging")) {
//         e.preventDefault();
//         const target = e.target.closest("a");
//         if (target) {
//             const page = target.getAttribute("href").split("=")[1];
//             vtListService.getList(page, "someId", (data) => {
//                 showList({ lists: data.lists, pagination: data.pagination });
//             });
//         }
//     }
// });