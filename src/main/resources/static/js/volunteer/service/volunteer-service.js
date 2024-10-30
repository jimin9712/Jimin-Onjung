// 필터된 봉사모집 내역 가져오기
const fetchFilteredVolunteers = async (order = "recent") => {
    try {
        const response = await fetch(`/volunteer/volunteer-list?order=${order}`);

        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

        const data = await response.json();
        console.log("받아온 데이터:", data); // 받은 데이터 디버깅 로그
        renderVolunteerList(data);
    } catch (error) {
        console.error("Error fetching volunteer list:", error);
    }
};

// // 봉사모집 내역 가져오기
// const fetchVolunteers = async (memberId) => {
//     try {
//         const response = await fetch(`/donation-records/my-donation/${memberId}`);
//         console.log("응답 상태:", response.status); // 디버깅 로그
//         if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");
//
//         const data = await response.json();
//         console.log("기부 데이터:", data); // 디버깅 로그
//         renderDonations(data);
//     } catch (error) {
//         console.error("Error fetching donation records:", error);
//         alert("기부 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
//     }
// };


