fetch(url, {
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
    .then(response => response.json()) // JSON 응답을 직접 파싱
    .then(data => {
        console.log("서버 응답:", data); // 데이터가 JSON 객체로 출력될 것임
        lists = data; // JSON 배열을 lists에 저장
        showList();   // 데이터를 업데이트 후 showList 호출
    })
    .catch(error => console.error("Error fetching data:", error));
