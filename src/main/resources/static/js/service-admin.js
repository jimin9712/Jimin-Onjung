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
            document.getElementById("memberJung").textContent = data.memberJung.toLocaleString();
            document.getElementById("profileName").textContent = displayName;
            document.getElementById("profileIntroduction").textContent =
                data.memberIntroduction || "한 줄 소개가 없습니다.";

            // memberId를 data.id로 명확하게 설정
            const memberId = data.id;
            console.log("사용되는 memberId:", memberId);

            if (!memberId) {
                console.error("memberId가 존재하지 않습니다. 응답 데이터 구조를 확인하세요:", data);
                alert("회원 ID를 가져오지 못했습니다.");
                return; // 더 이상 진행하지 않음
            }

            // 총 기부 포인트 조회
            fetch(`/donation-records/total/${memberId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
                    }
                    return response.json();
                })
                .then((responseData) => {
                    console.log("총 기부 포인트 응답 데이터:", responseData);

                    let totalDonation;

                    // 서버 응답이 숫자인지 객체인지를 확인
                    if (typeof responseData === 'number') {
                        totalDonation = responseData;
                    } else if (responseData.totalDonation) {
                        totalDonation = responseData.totalDonation;
                    } else {
                        // 예상치 못한 응답 구조
                        console.warn("예상치 못한 응답 구조:", responseData);
                        totalDonation = 0;
                    }

                    document.getElementById("memberPoint").textContent =
                        totalDonation.toLocaleString() + " 포인트";
                })
                .catch((error) => {
                    console.error("총 기부 포인트 조회 실패:", error);
                    document.getElementById("memberPoint").textContent = "포인트 정보를 불러올 수 없습니다.";
                });
        } else {
            alert("회원 정보를 가져오지 못했습니다.");
        }
    })
    .catch((error) => {
        console.error("회원 정보 조회 실패:", error);
        alert("회원 정보를 불러오는 중 오류가 발생했습니다.");
    });