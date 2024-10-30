// 서버로 비동기 요청을 보내고 필터링된 데이터를 가져오는 함수
// 필터에 따라 서버에서 데이터 요청 및 목록 갱신
function setView(viewType) {
    const url = `/list?view=${viewType}`;

    fetch(url, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
        .then(response => response.json())
        .then(data => {
            lists = data.lists; // 받아온 데이터를 전역 lists 변수에 저장
            showList();         // 다른 파일에 정의된 showList 함수 호출
        })
        .catch(error => console.error("Error fetching data:", error));
}
