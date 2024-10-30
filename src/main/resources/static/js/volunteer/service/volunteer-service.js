// 필터된 봉사모집 내역 가져오기
const fetchFilteredVolunteers = async (order = "recent") => {
    try {
        const response = await fetch(`/volunteer/volunteer-list?order=${order}`);
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다');
        }
        const data = await response.json();

        // 서버가 배열 형식의 데이터를 반환한다고 가정
        lists = data;  // 가져온 데이터를 lists에 할당
        showList();  // showList를 호출하여 데이터를 화면에 렌더링
    } catch (error) {
        console.error('데이터를 가져오는 중 문제가 발생했습니다:', error);
        listLayout.innerHTML = `<div class="error-message">데이터를 불러오는 중 문제가 발생했습니다.</div>`;
    }
};

// fetchData 호출하여 데이터 로드 및 표시
fetchData();

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


