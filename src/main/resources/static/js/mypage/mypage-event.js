// date-input 클래스를 가진 div 요소 가져오기
const dateInput = document.querySelector(".date-input");

// active 클래스를 추가할 fIGvfF.date-range 요소 가져오기
const dateRange = document.querySelector(".fIGvfF.date-range");

// date-input 및 date-range-icon 클릭 시 동작 정의
function handleDateInputClick(event) {
    event.stopPropagation(); // 클릭 이벤트 전파 막기

    // fIGvfF.date-range에 active 클래스 추가
    dateRange.classList.add("active");
}

dateInput.addEventListener("click", handleDateInputClick);

// 문서 전체 클릭 시 동작 정의
// date-input 내부의 요소를 제외하고 클릭하면 active 클래스 제거
// document.addEventListener("click", function (event) {
//     if (!event.target.closest(".date-input")) {
//         dateRange.classList.remove("active");
//     }
// });
// 사이드배너 전환▲

// 목록
const payments = [
    {
        id: 1,
        status: "완료",
        price: "1000",
        date: "2024.03.01",
    },
    {
        id: 2,
        status: "완료",
        price: "30000",
        date: "2024.03.02",
    },
    {
        id: 3,
        status: "완료",
        price: "10000",
        date: "2024.03.03",
    },
    {
        id: 4,
        status: "완료",
        price: "7000",
        date: "2024.03.04",
    },
    {
        id: 5,
        status: "완료",
        price: "100",
        date: "2024.03.05",
    },
    {
        id: 6,
        status: "취소",
        price: "1000",
        date: "2024.03.01",
    },
    {
        id: 7,
        status: "취소",
        price: "30000",
        date: "2024.03.02",
    },
    {
        id: 8,
        status: "취소",
        price: "10000",
        date: "2024.03.03",
    },
    {
        id: 9,
        status: "취소",
        price: "7000",
        date: "2024.03.04",
    },
    {
        id: 10,
        status: "취소",
        price: "100",
        date: "2024.03.05",
    },
    {
        id: 11,
        status: "완료",
        price: "10000",
        date: "2024.03.11",
    },
];

// 결제 내역 렌더링▼
const renderPayments = () => {
    // 1. payment 배열 확인
    console.log(payments); // payment 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const paymentList = document.querySelector(".payment-list");
    const emptyComponent = document.querySelector("#payment .empty-component");
    console.log(paymentList); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (payments.length === 0) {
        paymentList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        paymentList.style.display = "block";
        emptyComponent.style.display = "none";
        paymentList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                <col style="width: 57px;">
                <col style="width: 132px;">
                <col style="width: 150px;">
                <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                <tr>
                <th>결제 번호</th>
                <th>구분</th>
                <th>금액</th>
                <th>결제 일</th>
                    </tr>
                    </thead>
                    <tbody class="news-center-table-body">
                ${payments
                    .map(
                        (payment) => `
                    <tr class="news-data-rows" data-forloop="${payment.id}">
                        <td class="news-center-table-body-number">${
                            payment.id
                        }</td>
                        <td class="news-center-table-body-category">${
                            "결제 " + payment.status
                        }</td>
                        <td class="news-center-table-body-title"><span>${
                            payment.price + "원"
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            payment.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderPayments(payments);

// // 전체 항목 숫자 증가
const paymentTotalCount = payments.filter(
    (payment) => payment.status === "완료" || payment.status === "취소"
).length;
document.getElementById("payment-totalCount").textContent = paymentTotalCount;

// // 결제 완료 숫자 증가
const paymentCompletedCount = payments.filter(
    (payment) => payment.status === "완료"
).length;
document.getElementById("payment-completedCount").textContent =
    paymentCompletedCount;

// // 결제 취소 숫자 감소
const paymentCancelCount = payments.filter(
    (payment) => payment.status === "취소"
).length;
document.getElementById("payment-cancelCount").textContent = paymentCancelCount;

// // 초기 상태에서 전체 결제 항목을 표시

// 결제 완료, 결제 취소 항목 수를 업데이트하는 함수
function updateCounts() {
    const paymentTotalCount = payments.length;
    const paymentCompletedCount = payments.filter(
        (payment) => payment.status === "완료"
    ).length;
    const paymentCancelCount = payments.filter(
        (payment) => payment.status === "취소"
    ).length;

    document.getElementById("payment-totalCount").textContent =
        paymentTotalCount;
    document.getElementById("payment-completedCount").textContent =
        paymentCompletedCount;
    document.getElementById("payment-cancelCount").textContent =
        paymentCancelCount;
}

// 페이지 로드 시 전체 개수 업데이트
// updateCounts();

// /**************************후원**************************/
const boosts = [
    {
        id: 1,
        status: "완료",
        price: "100",
        date: "2024.03.01",
    },
    {
        id: 2,
        status: "완료",
        price: "3000",
        date: "2024.03.02",
    },
    {
        id: 3,
        status: "완료",
        price: "1000",
        date: "2024.03.03",
    },
    {
        id: 4,
        status: "완료",
        price: "700",
        date: "2024.03.04",
    },
    {
        id: 5,
        status: "완료",
        price: "1500",
        date: "2024.03.05",
    },
    {
        id: 6,
        status: "취소",
        price: "100",
        date: "2024.03.01",
    },
    {
        id: 7,
        status: "취소",
        price: "3000",
        date: "2024.03.02",
    },
    {
        id: 8,
        status: "취소",
        price: "1000",
        date: "2024.03.03",
    },
    {
        id: 9,
        status: "취소",
        price: "700",
        date: "2024.03.04",
    },
    {
        id: 10,
        status: "취소",
        price: "1500",
        date: "2024.03.05",
    },
    {
        id: 11,
        status: "취소",
        price: "1000",
        date: "2024.03.11",
    },
];

// 후원 내역 렌더링▼
const renderBoosts = () => {
    // 1. boost 배열 확인
    console.log(boosts); // boost 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const boostList = document.querySelector(".boost-list");
    const emptyComponent = document.querySelector("#boost .empty-component");

    console.log(boostList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (boosts.length === 0) {
        boostList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        boostList.style.display = "block";
        emptyComponent.style.display = "none";
        boostList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>후원 번호</th>
                        <th>구분</th>
                        <th>금액</th>
                        <th>결제 일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${boosts
                    .map(
                        (boost) => `
                    <tr class="news-data-rows" data-forloop="${boost.id}">
                        <td class="news-center-table-body-number">${
                            boost.id
                        }</td>
                        <td class="news-center-table-body-category">${
                            "후원 " + boost.status
                        }</td>
                        <td class="news-center-table-body-title"><span>${
                            boost.price + "포인트"
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            boost.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderBoosts(boosts);

// 전체 항목 숫자 증가
const boostTotalCount = boosts.filter(
    (boost) => boost.status === "완료" || boost.status === "취소"
).length;
document.getElementById("boost-totalCount").textContent = boostTotalCount;

/*********************기부**********************/

// 기부 내역 렌더링▼
// 서버에서 기부 데이터를 가져오기 ▼
const fetchDonations = async () => {
    try {
        const response = await fetch('/donation-records/all'); // API 호출
        if (!response.ok) {
            throw new Error('서버로부터 데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json(); // JSON 형식으로 응답 처리
        renderDonations(data); // 가져온 데이터 렌더링
    } catch (error) {
        console.error('Error fetching donation records:', error);
    }
};

// 기부 내역 렌더링 ▼
const renderDonations = (donations) => {
    const donationList = document.querySelector(".donaition-list");
    const emptyComponent = document.querySelector("#donaition .empty-component");

    if (donations.length === 0) {
        donationList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        donationList.style.display = "block";
        emptyComponent.style.display = "none";
        donationList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>기부 번호</th>
                        <th>구분</th>
                        <th>금액</th>
                        <th>결제 일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${donations
            .map(
                (donation) => `
                    <tr class="news-data-rows" data-forloop="${donation.id}">
                        <td class="news-center-table-body-number">${donation.id}</td>
                        <td class="news-center-table-body-category">기부</td>
                        <td class="news-center-table-body-title"><span>${donation.donationAmount}원</span></td>
                        <td class="news-center-table-body-date">${new Date(donation.createdDate).toLocaleDateString()}</td>
                    </tr>
                `
            )
            .join("")}
                </tbody>
            </table>
        `;
    }

    // 총 기부 건수 업데이트
    document.getElementById("donaition-totalCount").textContent = donations.length;
};

// 페이지 로드 시 기부 데이터를 가져오기 ▼
document.addEventListener('DOMContentLoaded', fetchDonations);

/*******************충전 하기********************/
const charges = [
    {
        id: 1,
        status: "충전 완료",
        chargeprice: "1000",
        myprice: "1000",
        date: "2024.03.01",
    },
    {
        id: 2,
        status: "잔액 부족",
        chargeprice: "10000",
        myprice: "1000",
        date: "2024.03.02",
    },
    {
        id: 3,
        status: "충전 완료",
        chargeprice: "5000",
        myprice: "6000",
        date: "2024.03.03",
    },
    {
        id: 4,
        status: "충전 완료",
        chargeprice: "1000",
        myprice: "7000",
        date: "2024.03.04",
    },
    {
        id: 5,
        status: "잔액 부족",
        chargeprice: "1000",
        myprice: "7000",
        date: "2024.03.05",
    },
];

// 충전 내역 렌더링▼
const renderCharges = () => {
    // 1. charge 배열 확인
    console.log(charges); // boost 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const chargeList = document.querySelector(".charge-list");
    const emptyComponent = document.querySelector("#charge .empty-component");

    console.log(chargeList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (charges.length === 0) {
        chargeList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        chargeList.style.display = "block";
        emptyComponent.style.display = "none";
        chargeList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>기부 번호</th>
                        <th>구분</th>
                        <th>신청 금액</th>
                        <th>보유 금액</th>
                        <th>결제 일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${charges
                    .map(
                        (charge) => `
                    <tr class="news-data-rows" data-forloop="${charge.id}">
                        <td class="news-center-table-body-number">${
                            charge.id
                        }</td>
                        <td class="news-center-table-body-category">${
                            charge.status
                        }</td>
                        <td class="news-center-table-body-title">${
                            charge.chargeprice + "원"
                        }</td>
                        <td class="news-center-table-body-title">${
                            charge.myprice + "원"
                        }<td class="news-center-table-body-date">${
                            charge.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderCharges(charges);

/*********************내 알림**********************/
const notices = [
    {
        id: 1,
        title: "최신 알림입니다!1",
        content: "알림 내용 요약1",
        date: "2024.03.01 | 10:24:31",
    },
    {
        id: 2,
        title: "최신 알림입니다!2",
        content: "알림 내용 요약2",
        date: "2024.03.02 | 12:01:05",
    },
    {
        id: 3,
        title: "알림 제목3",
        content: "알림 내용 요약3",
        date: "2024.03.03 | 14:55:11",
    },
    {
        id: 4,
        title: "알림 제목4",
        content: "알림 내용 요약4",
        date: "2024.03.04 | 18:14:09",
    },
    {
        id: 5,
        title: "알림 제목5",
        content: "알림 내용 요약5",
        date: "2024.03.05 | 21:01:55",
    },
];

// 알림 렌더링▼
const renderNotices = () => {
    // 1. notices 배열 확인
    console.log(notices); // notices 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const noticeList = document.querySelector(".notice-list");
    const emptyComponent = document.querySelector("#notice .empty-component");

    console.log(noticeList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (!noticeList || !emptyComponent) {
        console.error("HTML 요소가 선택되지 않았습니다.");
        return;
    }

    if (notices.length === 0) {
        noticeList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        noticeList.style.display = "block";
        emptyComponent.style.display = "none";
        noticeList.innerHTML = `
                ${notices
                    .map(
                        (notice) => `
                    <div class="noti-content">
                        <div class="kzXcJa">
                                <svg color="#101C33" viewBox="0 0 24 24" class="profile-page-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.0389 18.359H17.3334L18.8572 18.359C19.4884 18.359 20 17.8793 20 17.2876C20 16.6958 19.4884 16.2157 18.8572 16.2157H18.4762V9.42955C18.4762 6.00442 15.4496 3 11.9999 3C8.5502 3 5.52366 6.00442 5.52366 9.42955V16.2157H5.14276C4.51119 16.2157 4 16.6958 4 17.2876C4 17.8793 4.51119 18.359 5.14276 18.359L6.66642 18.359H8.96114C9.07945 19.8339 10.3972 21 12 21C13.6028 21 14.9205 19.8339 15.0389 18.359ZM12.7263 18.359H11.2737C11.3718 18.6474 11.6604 18.8571 12 18.8571C12.3396 18.8571 12.6282 18.6474 12.7263 18.359ZM16.1906 16.2157H7.80964V9.42955C7.80964 7.14599 9.76774 5.1429 11.9999 5.1429C14.2321 5.1429 16.1906 7.14599 16.1906 9.42955V16.2157Z"></path><path d="M17.3334 18.359V17.759V18.359ZM15.0389 18.359V17.759H14.4851L14.4408 18.311L15.0389 18.359ZM18.8572 18.359V18.959V18.359ZM18.4762 16.2157H17.8762V16.8157H18.4762V16.2157ZM5.52366 16.2157V16.8157H6.12366V16.2157H5.52366ZM5.14276 18.359V18.959H5.14276L5.14276 18.359ZM6.66642 18.359V17.759H6.66642L6.66642 18.359ZM8.96114 18.359L9.55921 18.311L9.51493 17.759H8.96114V18.359ZM12.7263 18.359L13.2943 18.5521L13.5639 17.759H12.7263V18.359ZM11.2737 18.359V17.759H10.4361L10.7057 18.5521L11.2737 18.359ZM7.80964 16.2157H7.20964V16.8157H7.80964V16.2157ZM16.1906 16.2157V16.8157H16.7906V16.2157H16.1906ZM17.3334 17.759H15.0389V18.959H17.3334V17.759ZM18.8572 17.759L17.3334 17.759V18.959L18.8572 18.959V17.759ZM19.4 17.2876C19.4 17.5121 19.194 17.759 18.8572 17.759V18.959C19.7827 18.959 20.6 18.2465 20.6 17.2876H19.4ZM18.8572 16.8157C19.1937 16.8157 19.4 17.0627 19.4 17.2876H20.6C20.6 16.3289 19.783 15.6157 18.8572 15.6157V16.8157ZM18.4762 16.8157H18.8572V15.6157H18.4762V16.8157ZM17.8762 9.42955V16.2157H19.0762V9.42955H17.8762ZM11.9999 3.6C15.1224 3.6 17.8762 6.33989 17.8762 9.42955H19.0762C19.0762 5.66894 15.7769 2.4 11.9999 2.4V3.6ZM6.12366 9.42955C6.12366 6.33989 8.87745 3.6 11.9999 3.6V2.4C8.22295 2.4 4.92366 5.66894 4.92366 9.42955H6.12366ZM6.12366 16.2157V9.42955H4.92366V16.2157H6.12366ZM5.14276 16.8157H5.52366V15.6157H5.14276V16.8157ZM4.6 17.2876C4.6 17.0626 4.80603 16.8157 5.14276 16.8157V15.6157C4.21634 15.6157 3.4 16.3291 3.4 17.2876H4.6ZM5.14276 17.759C4.80571 17.759 4.6 17.5122 4.6 17.2876H3.4C3.4 18.2463 4.21666 18.959 5.14276 18.959V17.759ZM6.66642 17.759L5.14276 17.759L5.14276 18.959L6.66642 18.959L6.66642 17.759ZM8.96114 17.759H6.66642V18.959H8.96114V17.759ZM12 20.4C10.68 20.4 9.65019 19.4451 9.55921 18.311L8.36306 18.407C8.50871 20.2227 10.1145 21.6 12 21.6V20.4ZM14.4408 18.311C14.3498 19.4451 13.32 20.4 12 20.4V21.6C13.8855 21.6 15.4913 20.2227 15.6369 18.407L14.4408 18.311ZM12.7263 17.759H11.2737V18.959H12.7263V17.759ZM10.7057 18.5521C10.8904 19.0955 11.416 19.4571 12 19.4571V18.2571C11.9049 18.2571 11.8532 18.1994 11.8418 18.1659L10.7057 18.5521ZM12 19.4571C12.584 19.4571 13.1096 19.0955 13.2943 18.5521L12.1582 18.1659C12.1468 18.1994 12.0951 18.2571 12 18.2571V19.4571ZM7.80964 16.8157H16.1906V15.6157H7.80964V16.8157ZM7.20964 9.42955V16.2157H8.40964V9.42955H7.20964ZM11.9999 4.5429C9.42359 4.5429 7.20964 6.82755 7.20964 9.42955H8.40964C8.40964 7.46443 10.1119 5.7429 11.9999 5.7429V4.5429ZM16.7906 9.42955C16.7906 6.82746 14.5761 4.5429 11.9999 4.5429V5.7429C13.888 5.7429 15.5906 7.46451 15.5906 9.42955H16.7906ZM16.7906 16.2157V9.42955H15.5906V16.2157H16.7906Z" fill="white"></path><defs></defs></svg>
                                
                                
                             <div class="" data-forloop="${notice.id}>   
                                <div>
                                    <div class="noti-card-desc">${notice.content}</div>
                                    <div class="noti-card-desc">${notice.date}</div>
                                </div>
                                
                                
                            </div>
                        </div>    
                    </div> 
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderNotices(notices);

// // 전체 항목 숫자 증가
const noticeTotalCount = notices.length;
document.getElementById("notice-totalCount").textContent = noticeTotalCount;

/*********************봉사 활동**********************/
const volunteers = [
    {
        id: 1,
        title: "연탄 나르기 봉사",
        time: "4",
        date: "2024.03.01",
    },
    {
        id: 2,
        title: "장애인 복지관 돕기",
        time: "3",
        date: "2024.03.02",
    },
    {
        id: 3,
        title: "예슬이 짐 옮기기 도와주기",
        time: "2",
        date: "2024.03.03",
    },
    {
        id: 4,
        title: "저소득층 급식 봉사",
        time: "1",
        date: "2024.03.04",
    },
];

// 봉사 내역 렌더링▼
const renderVolunteers = () => {
    // 1. boost 배열 확인
    console.log(volunteers); // boost 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const volunteerList = document.querySelector(".volunteer-list");
    const emptyComponent = document.querySelector(
        "#volunteer .empty-component"
    );

    console.log(volunteerList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (volunteers.length === 0) {
        volunteerList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        volunteerList.style.display = "block";
        emptyComponent.style.display = "none";
        volunteerList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 60px;">
                    <col style="width: 60px;">
                    <col style="width: 110px;">
                    <col style="width: 104px;">
                    <col style="width: 80px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>봉사 활동 번호</th>
                        <th>봉사 시간</th>
                        <th>봉사 게시글 제목</th>
                        <th>날짜</th>
                        <th>작성/수정</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${volunteers
                    .map(
                        (volunteer) => `
                    <tr class="news-data-rows" data-forloop="${volunteer.id}">
                        <td class="news-center-table-body-number">${
                            volunteer.id
                        }</td>
                        <td class="news-center-table-body-category">${
                            volunteer.time + "시간"
                        }</td>
                        <td class="news-center-table-body-title"><span>${
                            volunteer.title
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            volunteer.date
                        }</td>
                        <td class="padding5">
                            <a
                                class="jBsNEF btn-request btn-request-case-2"
                                href="#"
                                style="
                                    margin:0px;
                                "
                                ><span
                                    class="visual-correction"
                                    >후기&nbsp;
                                    작성하기
                                    <div
                                        class="request-description-tooltip"
                                    ></div>
                                </span>
                            </a>
                        </td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderVolunteers(volunteers);

// 전체 항목 숫자 증가
const volunteerTotalCount = volunteers.filter(
    (volunteer) => volunteer.id
).length;
document.getElementById("volunteer-totalCount").textContent =
    volunteerTotalCount;

/*********************내 문의**********************/
const inquirys = [
    {
        id: 1,
        status: "대기중",
        inquiries: "문의 내용 요약1",
        date: "2024.03.01",
    },
    {
        id: 2,
        status: "완료",
        inquiries: "문의 내용 요약2",
        date: "2024.03.02",
    },
    {
        id: 3,
        status: "완료",
        inquiries: "문의 내용 요약3",
        date: "2024.03.03",
    },
    {
        id: 4,
        status: "대기중",
        inquiries: "문의 내용 요약4",
        date: "2024.03.04",
    },
    {
        id: 5,
        status: "대기중",
        inquiries: "문의 내용 요약5",
        date: "2024.03.05",
    },
];

// 문의 내역 렌더링▼
const renderInquirys = () => {
    // 1. boost 배열 확인
    console.log(inquirys); // boost 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const inquiryList = document.querySelector(".inquiry-list");
    const emptyComponent = document.querySelector("#inquiry .empty-component");

    console.log(inquiryList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (inquirys.length === 0) {
        inquiryList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        inquiryList.style.display = "block";
        emptyComponent.style.display = "none";
        inquiryList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>문의 번호</th>
                        <th>상태</th>
                        <th>문의 내용</th>
                        <th>작성 날짜</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${inquirys
                    .map(
                        (inquiry) => `
                    <tr class="news-data-rows" data-forloop="${inquiry.id}">
                        <td class="news-center-table-body-number">${inquiry.id}</td>
                        <td class="news-center-table-body-category">${inquiry.status}</td>
                        <td class="news-center-table-body-title"><span>${inquiry.inquiries}</span></td>
                        <td class="news-center-table-body-date">${inquiry.date}</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderInquirys(inquirys);

// 전체 항목 숫자 증가
const inquiryTotalCount = inquirys.filter(
    (inquiry) => inquiry.status === "완료" || inquiry.status === "대기중"
).length;
document.getElementById("inquiry-totalCount").textContent = inquiryTotalCount;

// 답변 완료 숫자 증가
const inquiryCompletedCount = inquirys.filter(
    (inquiry) => inquiry.status === "완료"
).length;
document.getElementById("inquiry-completedCount").textContent =
    inquiryCompletedCount;

// 답변 대기중 숫자 감소
const inquiryStandbyCount = inquirys.filter(
    (inquiry) => inquiry.status === "대기중"
).length;
document.getElementById("inquiry-standbyCount").textContent =
    inquiryStandbyCount;

/*********************봉사 활동 후기**********************/
const postscripts = [
    {
        id: 1,
        title: "후기 제목1",
        content: "후기 내용 요약1",
        date: "2024.03.01",
    },
    {
        id: 2,
        title: "후기 제목2",
        content: "후기 내용 요약2",
        date: "2024.03.02",
    },
    {
        id: 3,
        title: "후기 제목3",
        content: "후기 내용 요약3",
        date: "2024.03.03",
    },
    {
        id: 4,
        title: "후기 제목4",
        content: "후기 내용 요약4",
        date: "2024.03.04",
    },
    {
        id: 5,
        title: "후기 제목5",
        content: "후기 내용 요약5",
        date: "2024.03.05",
    },
];

// 후기 내역 렌더링▼
const renderPostscripts = () => {
    // 1. postscripts 배열 확인
    console.log(postscripts); // postscripts 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const postscriptList = document.querySelector(".postscript-list");
    const emptyComponent = document.querySelector(
        "#postscript .empty-component"
    );

    console.log(postscriptList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (!postscriptList || !emptyComponent) {
        console.error("HTML 요소가 선택되지 않았습니다.");
        return;
    }

    if (postscripts.length === 0) {
        postscriptList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        postscriptList.style.display = "block";
        emptyComponent.style.display = "none";
        postscriptList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>문의 번호</th>
                        <th>상태</th>
                        <th>문의 내용</th>
                        <th>작성 날짜</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${postscripts
                    .map(
                        (postscript) => `
                    <tr class="news-data-rows" data-forloop="${postscript.id}">
                        <td class="news-center-table-body-number">${postscript.id}</td>
                        <td class="news-center-table-body-category">${postscript.title}</td>
                        <td class="news-center-table-body-title"><span>${postscript.content}</span></td>
                        <td class="news-center-table-body-date">${postscript.date}</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderPostscripts(postscripts);

// 전체 항목 숫자 증가
const postscriptTotalCount = postscripts.length;
document.getElementById("postscript-totalCount").textContent =
    postscriptTotalCount;

/*********************기부 감사 인사**********************/
const gratitudes = [
    {
        id: 1,
        title: "감사 인사 제목1",
        content: "감사 인사 제목 내용 요약1",
        date: "2024.03.01",
    },
    {
        id: 2,
        title: "감사 인사 제목2",
        content: "감사 인사 제목 내용 요약2",
        date: "2024.03.02",
    },
    {
        id: 3,
        title: "감사 인사 제목3",
        content: "감사 인사 제목 내용 요약3",
        date: "2024.03.03",
    },
    {
        id: 4,
        title: "감사 인사 제목4",
        content: "감사 인사 제목 내용 요약4",
        date: "2024.03.04",
    },
    {
        id: 5,
        title: "감사 인사 제목5",
        content: "감사 인사 제목 내용 요약5",
        date: "2024.03.05",
    },
];

// 후기 내역 렌더링▼
const renderGratitudes = () => {
    // 1. gratitudes 배열 확인
    console.log(gratitudes); // gratitudes 배열이 제대로 정의되고, 데이터가 있는지 확인

    // 2. HTML 요소 선택 확인
    const gratitudeList = document.querySelector(".gratitude-list");
    const emptyComponent = document.querySelector(
        "#gratitude .empty-component"
    );

    console.log(gratitudeList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // 이후 기존의 코드
    if (!gratitudeList || !emptyComponent) {
        console.error("HTML 요소가 선택되지 않았습니다.");
        return;
    }

    if (gratitudes.length === 0) {
        gratitudeList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        gratitudeList.style.display = "block";
        emptyComponent.style.display = "none";
        gratitudeList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>문의 번호</th>
                        <th>상태</th>
                        <th>문의 내용</th>
                        <th>작성 날짜</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${gratitudes
                    .map(
                        (gratitude) => `
                    <tr class="news-data-rows" data-forloop="${gratitude.id}">
                        <td class="news-center-table-body-number">${gratitude.id}</td>
                        <td class="news-center-table-body-category">${gratitude.title}</td>
                        <td class="news-center-table-body-title"><span>${gratitude.content}</span></td>
                        <td class="news-center-table-body-date">${gratitude.date}</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;
    }
};
renderGratitudes(gratitudes);

// // 전체 항목 숫자 증가
const gratitudeTotalCount = gratitudes.length;
document.getElementById("gratitude-totalCount").textContent =
    gratitudeTotalCount;

/*********************봉사 활동 신청 현황**********************/
const applications = [
    {
        id: 1,
        status: "대기",
        nickName: "축구제왕손흥민",
        name: "손흥민",
        phonNumber: "010-0909-1313",
        date: "2024.03.01",
    },
    {
        id: 2,
        status: "대기",
        nickName: "나는야한국메시",
        name: "메시",
        phonNumber: "010-8787-4949",
        date: "2024.03.02",
    },
    {
        id: 3,
        status: "승인",
        nickName: "별그대도민준",
        name: "도민준",
        phonNumber: "010-3434-6868",
        date: "2024.03.03",
    },
    {
        id: 4,
        status: "대기",
        nickName: "도깨비김신",
        name: "김신",
        phonNumber: "010-8282-2424",
        date: "2024.03.04",
    },
    {
        id: 5,
        status: "승인",
        nickName: "또당신입니까호날두",
        name: "호날두",
        phonNumber: "010-1717-3939",
        date: "2024.03.05",
    },
];

// 봉사 활동 신청 현황 렌더링▼
const renderApplications = () => {
    // boost 배열 확인
    console.log(applications); // boost 배열이 제대로 정의되고, 데이터가 있는지 확인

    // HTML 요소 선택 확인
    const applicationList = document.querySelector(".application-list");
    const emptyComponent = document.querySelector(
        "#application .empty-component"
    );

    console.log(applicationList, emptyComponent); // 요소들이 정상적으로 선택되고 있는지 확인

    // applicationList가 올바르게 선택되었는지 확인합니다.
    if (!applicationList) {
        console.error("applicationList 요소가 존재하지 않습니다.");
        return;
    }

    if (applications.length === 0) {
        applicationList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        applicationList.style.display = "block";
        emptyComponent.style.display = "none";
        applicationList.innerHTML = `
            <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
                <colgroup>
                    <col style="width: 40px;">     
                    <col style="width: 57px;">
                    <col style="width: 132px;">
                    <col style="width: 150px;">
                    <col style="width: 104px;">
                </colgroup>
                <thead class="news-center-table-head">
                    <tr>
                        <th>
                            <input type="checkbox" id="selectAll" />
                        </th>
                        <th>승인 여부</th>
                        <th>닉네임 / 이름</th>
                        <th>핸드폰 번호</th>
                        <th>신청 일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                ${applications
                    .map(
                        (application) => `
                    <tr class="news-data-rows" data-forloop="${application.id}">
                        <td>
                            <input type="checkbox" class="checkbox_idx" />
                        </td>
                        <td class="news-center-table-body-number">${
                            application.status
                        }</td>
                        <td class="news-center-table-body-category">${
                            application.nickName + "/" + application.name
                        }</td>
                        <td class="news-center-table-body-title"><span>${
                            application.phonNumber
                        }</span></td>
                        <td class="news-center-table-body-date">${
                            application.date
                        }</td>
                    </tr>
                `
                    )
                    .join("")}
                </tbody>
            </table>
        `;

        // 이벤트 리스너를 재설정합니다.
        const selectAll = document.getElementById("selectAll");
        if (selectAll) {
            selectAll.addEventListener("change", () => {
                const isChecked = selectAll.checked;
                const individualCheckboxes =
                    document.querySelectorAll(".checkbox_idx");
                individualCheckboxes.forEach((checkbox) => {
                    checkbox.checked = isChecked;
                });
            });
        }
    }
};

// // 전체 항목 숫자 증가
const applicationTotalCount = applications.filter(
    (application) =>
        application.status === "대기" || application.status === "승인"
).length;
document.getElementById("application-totalCount").textContent =
    applicationTotalCount;

// 봉사 신청 대기 증가
const applicationStanby = applications.filter(
    (application) => application.status === "대기"
).length;
document.getElementById("application-stanby").textContent = applicationStanby;

// 봉사 승인 숫자 증가
const donaitionApproval = applications.filter(
    (application) => application.status === "승인"
).length;
document.getElementById("application-approval").textContent = donaitionApproval;

// // 전체 선택 체크박스 로직

document.addEventListener("DOMContentLoaded", () => {
    renderApplications(); // 먼저 HTML을 렌더링합니다.

    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
        selectAll.addEventListener("change", () => {
            const isChecked = selectAll.checked;
            const individualCheckboxes =
                document.querySelectorAll(".checkbox_idx");
            individualCheckboxes.forEach((checkbox) => {
                checkbox.checked = isChecked;
            });
        });
    }
});

/*********************공통*********************/

// 모든 .fItXBi.toggle 요소를 선택
var toggleElements = document.querySelectorAll(".fItXBi.toggle");

// 각 요소에 대해 클릭 이벤트 추가
toggleElements.forEach(function (element) {
    element.addEventListener("click", function () {
        // 모든 요소에서 active 클래스 제거
        toggleElements.forEach(function (el) {
            el.classList.remove("active");
        });

        // 클릭된 요소에만 active 클래스 추가
        this.classList.add("active");
    });
});

// // 모든 탭 요소를 선택합니다.
const tabs = document.querySelectorAll(".tab");

// 각 탭에 클릭 이벤트를 추가합니다.
tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // 모든 탭에서 active 클래스를 제거합니다.
        tabs.forEach((t) => t.classList.remove("active"));

        // 클릭된 탭에 active 클래스를 추가합니다.
        tab.classList.add("active");
    });
});

const sideBanerWrapElement = document.querySelector(".side-baner-wrap");
const dateButtons = document.querySelectorAll(".date-button .fItXBi.toggle");
const lnbItems = sideBanerWrapElement
    ? sideBanerWrapElement.querySelectorAll(".lnb-item")
    : [];
const tabsContainers = document.querySelectorAll(".bqkLME.tabs");

// 초기화 버튼에 이벤트 리스너 등록
document.body.addEventListener("click", function (event) {
    if (event.target && event.target.id === "Initialization") {
        resetToggleActiveClasses();
    }
});

// 초기화 버튼 클릭 시 모든 .toggle의 active 클래스만 제거 (lnb-item의 active와 탭의 active는 유지)
dateButtons.forEach((toggleElement) =>
    toggleElement.classList.remove("active")
);

// 모든 lnb-item이 active 상태로 변경될 때 해당 탭 컨테이너의 첫 번째 탭에 active 추가

// 모든 date-button의 active 상태 제거
dateButtons.forEach((toggleElement) => {
    toggleElement.classList.remove("active");
});

// lnb-item과 관련된 tabsContainer의 첫 번째 탭에 active 추가
if (tabsContainers.length > 0) {
    tabsContainers.forEach((tabsContainer) => {
        if (lnbItem.classList.contains("active")) {
            const tabs = tabsContainer.querySelectorAll(".tab");
            tabs.forEach((tab) => tab.classList.remove("active"));
            const firstTab = tabs[0];
            if (firstTab) {
                firstTab.classList.add("active");
            }
        }
    });
}

lnbItems.forEach((lnbItem) => {
    lnbItem.addEventListener("click", () => {
        activateFirstTab(lnbItem);
    });

    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            if (
                mutation.type === "attributes" &&
                mutation.attributeName === "class"
            ) {
                // lnb-item이 active 상태로 변경되었을 때 실행
                if (lnbItem.classList.contains("active")) {
                    activateFirstTab(lnbItem);
                }
            }
        });
    });

    // 모든 lnb-item의 class 속성을 감시하도록 설정합니다.
    observer.observe(lnbItem, {
        attributes: true,
        attributeFilter: ["class"],
    });
});

/*************************************************************/

// 승인버튼
const approve = document.getElementById("approve");

// 승인하기 버튼 누를시 나올 모달 이벤트
approve.addEventListener("click", (e) => {
    e.target.id === "approve";
    document.querySelector(".approvemodal").style.display = "flex";
});

// 모달 닫는 버튼으로 display none으로 만드는 이벤트(승인)
document.getElementById("approvecloseModal").addEventListener("click", (e) => {
    if (e.target.id === "approvecloseModal") {
        document.querySelector(".approvemodal").style.display = "none";
    }
});
/****************************************************************/

// 거절버튼
const refuse = document.getElementById("refuse");

// 거절하기 버튼 누를시 나올 모달 이벤트
refuse.addEventListener("click", (e) => {
    e.target.id === "refuse";
    document.querySelector(".refusemodal").style.display = "flex";
});

// 모달 닫는 버튼으로 display none으로 만드는 이벤트(거절)
document.getElementById("refusecloseModal").addEventListener("click", (e) => {
    if (e.target.id === "refusecloseModal") {
        document.querySelector(".refusemodal").style.display = "none";
    }
});
