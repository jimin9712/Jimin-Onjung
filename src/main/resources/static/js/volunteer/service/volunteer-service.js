//봉사 지원 모집 게시글 가져오기
const fetchVolunteers = async (order = "recent") => {
    try {
        const response = await fetch(`/volunteer/volunteer-info?order=${order}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        console.log("봉사 모집 데이터:", data);
        renderVounteers(data);
    } catch (error) {
        console.error("Error fetching filtered volunteer lists:", error);
        alert("봉사 모집 게시글을 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 초기 데이터 로드
document.addEventListener("DOMContentLoaded", () => {
    fetchVolunteers(); // 첫 페이지의 데이터를 로드합니다.
});
