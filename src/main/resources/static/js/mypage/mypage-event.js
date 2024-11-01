// 회원 정보 가져오기
const getMemberInfo = async () => {
    try {
        const response = await fetch("/member/info");
        if (!response.ok) throw new Error("로그인 상태를 확인할 수 없습니다.");

        const data = await response.json();
        console.log("받은 회원 데이터:", data);

        // memberId 반환
        return data.id;
    } catch (error) {
        console.error("회원 정보 조회 실패:", error);
        return null;
    }
};

/*********************후기 섹션**********************/
// 후기 내역 렌더링
const renderReviews = (reviews) => {
    const reviewList = document.querySelector(".postscript-list");
    const emptyComponent = document.querySelector("#postscript .empty-component");

    if (reviews.length === 0) {
        reviewList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        reviewList.style.display = "block";
        emptyComponent.style.display = "none";
        reviewList.innerHTML = `
    <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
        <colgroup>
            <col style="width: 57px;">
            <col style="width: 132px;">
            <col style="width: 150px;">
            <col style="width: 104px;">
            <col style="width: 80px;">
            <col style="width: 80px;">
        </colgroup>
        <thead class="news-center-table-head">
            <tr>
                <th>후기 번호</th>
                <th>단체명</th>
                <th>내 별점</th>
                <th>작성일</th>
                <th>수정</th>
                <th>삭제</th>
            </tr>
        </thead>
        <tbody class="news-center-table-body">
            ${reviews
            .map(
                (review) => `
                    <tr class="news-data-rows" data-forloop="${review.id}">
                        <td class="news-center-table-body-number">${review.id}</td>
                        <td class="news-center-table-body-category">${review.vtGroupName}</td>
                        <td class="news-center-table-body-title">
                            <span>${review.reviewStarRate}</span>
                        </td>
                        <td class="news-center-table-body-date">
                            ${new Date(review.createdDate).toLocaleDateString('ko-KR')}
                        </td>
                        <td>
                            <button class="edit-button" data-id="${review.id}">수정</button>
                        </td>
                        <td>
                            <button class="delete-button" data-id="${review.id}">삭제</button>
                        </td>
                    </tr>
                `
            )
            .join("")}
        </tbody>
    </table>
`;

// 수정 및 삭제 버튼에 이벤트 리스너 추가
        document.querySelectorAll(".edit-button").forEach((button) =>
            button.addEventListener("click", (event) => {
                const reviewId = event.target.dataset.id;
                console.log(`후기 수정 버튼 클릭됨: ${reviewId}`);
                window.location.href = `/review/review-update/${reviewId}`;
            })
        );

        document.querySelectorAll(".delete-button").forEach((button) =>
            button.addEventListener("click", async (event) => {
                const reviewId = event.target.dataset.id;
                if (confirm("정말 이 후기를 삭제하시겠습니까?")) {
                    try {
                        const response = await fetch(`/review/review-delete/${reviewId}`, {
                            method: "DELETE",
                        });

                        if (response.ok) {
                            alert("후기가 성공적으로 삭제되었습니다.");
                            location.reload(); // 페이지 새로고침
                        } else {
                            throw new Error("후기 삭제에 실패했습니다.");
                        }
                    } catch (error) {
                        console.error("후기 삭제 중 오류 발생:", error);
                        alert("후기 삭제에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
                    }
                }
            })
        );

    }

    document.getElementById("postscript-totalCount").textContent = reviews.length;
};

// 후기 섹션 초기화 및 이벤트 리스너 설정
const initializeReviewsSection = (memberId) => {
    fetchReviews(memberId);

    // 후기 섹션의 toggle 요소 선택
    const reviewToggleElements = document.querySelectorAll("#postscript .fItXBi.toggle");

    // 각 toggle 요소에 이벤트 리스너 추가
    reviewToggleElements.forEach(function (element) {
        element.addEventListener("click", function () {
            // 모든 요소에서 active 클래스 제거
            reviewToggleElements.forEach(function (el) {
                el.classList.remove("active");
            });

            // 클릭된 요소에만 active 클래스 추가
            this.classList.add("active");
        });
    });

    // 필터 이벤트 설정
    document.getElementById("filter-1year-review").addEventListener("change", () => applyFilterReviews(memberId, 12));
    document.getElementById("filter-1month-review").addEventListener("change", () => applyFilterReviews(memberId, 1));
    document.getElementById("filter-3months-review").addEventListener("change", () => applyFilterReviews(memberId, 3));
    document.getElementById("filter-6months-review").addEventListener("change", () => applyFilterReviews(memberId, 6));

    // 초기화 버튼 이벤트 설정
    document.getElementById("Initialization-review").addEventListener("click", () => {
        // 모든 필터 체크박스 해제
        document.querySelectorAll("#postscript .fItXBi.toggle input[type='checkbox']").forEach((checkbox) => {
            checkbox.checked = false;
        });

        // active 클래스 제거
        reviewToggleElements.forEach((el) => el.classList.remove("active"));

        // 초기 상태로 후기 내역 다시 가져오기
        fetchReviews(memberId);
    });
};

// 특정 기간의 후기 내역 가져오기
const applyFilterReviews = async (memberId, months) => {
    const today = new Date();
    const startDate = new Date(today.setMonth(today.getMonth() - months)).toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    console.log(`applyFilterReviews 호출됨. memberId: ${memberId}, startDate: ${startDate}, endDate: ${endDate}`);
    await fetchFilteredReviews(memberId, startDate, endDate);
};

// 날짜 지정 시 후기 내역 조회
const updateDateRangeReviews = async () => {
    const startDate = document.getElementById("start-date-review").value;
    const endDate = document.getElementById("end-date-review").value;
    const memberId = await getMemberInfo();

    console.log(`updateDateRangeReviews 호출됨. startDate: ${startDate}, endDate: ${endDate}, memberId: ${memberId}`);

    if (startDate && endDate) {
        await fetchFilteredReviews(memberId, startDate, endDate);
    }
};

// 필터된 후기 내역 가져오기
const fetchFilteredReviews = async (memberId, startDate, endDate) => {
    try {
        const response = await fetch(
            `/review/my-reviews/${memberId}?startDate=${startDate}&endDate=${endDate}`
        );
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("필터된 후기 데이터:", data);
        renderReviews(data);
    } catch (error) {
        console.error("Error fetching filtered review records:", error);
        alert("후기 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 후기 내역 가져오기
const fetchReviews = async (memberId) => {
    try {
        const response = await fetch(`/review/my-review/${memberId}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("후기 데이터:", data);
        renderReviews(data);
    } catch (error) {
        console.error("Error fetching review records:", error);
        alert("후기 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};
/*********************기부 섹션**********************/
// 기부 내역 렌더링
const renderDonations = (donations) => {
    const donationList = document.querySelector(".donation-list");
    const emptyComponent = document.querySelector("#donation .empty-component");

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
                        <th>기부일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                    ${donations
            .map(
                (donation) => `
                        <tr class="news-data-rows" data-forloop="${donation.id}">
                            <td class="news-center-table-body-number">${donation.id}</td>
                            <td class="news-center-table-body-category">기부 완료</td>
                            <td class="news-center-table-body-title">
                                <span>${parseInt(donation.donationAmount).toLocaleString()} 원</span>
                            </td>
                            <td class="news-center-table-body-date">
                                ${new Date(donation.createdDate).toLocaleDateString('ko-KR')}
                            </td>
                        </tr>
                    `
            )
            .join("")}
                </tbody>
            </table>
        `;
    }

    document.getElementById("donation-totalCount").textContent = donations.length;
};

// 기부 섹션 초기화 및 이벤트 리스너 설정
const initializeDonationSection = (memberId) => {
    fetchDonations(memberId);

    // 기부 섹션의 toggle 요소 선택
    const donationToggleElements = document.querySelectorAll("#donation .fItXBi.toggle");

    // 각 toggle 요소에 이벤트 리스너 추가
    donationToggleElements.forEach(function (element) {
        element.addEventListener("click", function () {
            // 모든 요소에서 active 클래스 제거
            donationToggleElements.forEach(function (el) {
                el.classList.remove("active");
            });

            // 클릭된 요소에만 active 클래스 추가
            this.classList.add("active");
        });
    });

    // 필터 이벤트 설정
    document.getElementById("filter-1year-donation").addEventListener("change", () => applyFilterDonations(memberId, 12));
    document.getElementById("filter-1months-donation").addEventListener("change", () => applyFilterDonations(memberId, 1));
    document.getElementById("filter-3months-donation").addEventListener("change", () => applyFilterDonations(memberId, 3));
    document.getElementById("filter-6months-donation").addEventListener("change", () => applyFilterDonations(memberId, 6));

    // 초기화 버튼 이벤트 설정
    document.getElementById("Initialization-donation").addEventListener("click", () => {
        // 모든 필터 체크박스 해제
        document.querySelectorAll("#donation .fItXBi.toggle input[type='checkbox']").forEach((checkbox) => {
            checkbox.checked = false;
        });

        // active 클래스 제거
        donationToggleElements.forEach((el) => el.classList.remove("active"));

        // 초기 상태로 기부 내역 다시 가져오기
        fetchDonations(memberId);
    });
};

// 특정 기간의 기부 내역 가져오기
const applyFilterDonations = async (memberId, months) => {
    const today = new Date();
    const startDate = new Date(today.setMonth(today.getMonth() - months)).toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    console.log(`applyFilterDonations 호출됨. memberId: ${memberId}, startDate: ${startDate}, endDate: ${endDate}`);
    await fetchFilteredDonations(memberId, startDate, endDate);
};

// 날짜 지정 시 기부 내역 조회
const updateDateRangeDonations = async () => {
    const startDate = document.getElementById("start-date-donation").value;
    const endDate = document.getElementById("end-date-donation").value;
    const memberId = await getMemberInfo();

    console.log(`updateDateRangeDonations 호출됨. startDate: ${startDate}, endDate: ${endDate}, memberId: ${memberId}`);

    if (startDate && endDate) {
        await fetchFilteredDonations(memberId, startDate, endDate);
    }
};

// 필터된 기부 내역 가져오기
const fetchFilteredDonations = async (memberId, startDate, endDate) => {
    try {
        const response = await fetch(
            `/donation-records/my-donation/${memberId}?startDate=${startDate}&endDate=${endDate}`
        );
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("필터된 기부 데이터:", data);
        renderDonations(data);
    } catch (error) {
        console.error("Error fetching filtered donation records:", error);
        alert("기부 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 기부 내역 가져오기
const fetchDonations = async (memberId) => {
    try {
        const response = await fetch(`/donation-records/my-donation/${memberId}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("기부 데이터:", data);
        renderDonations(data);
    } catch (error) {
        console.error("Error fetching donation records:", error);
        alert("기부 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

/********************* 기부 감사 인사 *********************/

// 기부 감사 인사 내역 렌더링
const renderDonationPosts = (posts) => {
    const gratitudeList = document.querySelector(".gratitude-list");
    const emptyComponent = document.querySelector("#gratitude .empty-component");

    if (posts.length === 0) {
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
                        <th>게시글 번호</th>
                        <th>제목</th>
                        <th>기부내용</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                    ${posts
            .map(
                (post) => `
                            <tr class="news-data-rows" data-forloop="${post.id}">
                                <td class="news-center-table-body-number">${post.id}</td>
                                <td class="news-center-table-body-category">${post.postTitle}</td>
                                <td class="news-center-table-body-title">${post.postContent}</td>
                                <td class="news-center-table-body-date">${new Date(post.createdDate).toLocaleDateString('ko-KR')}</td>
                            </tr>
                        `
            )
            .join("")}
                </tbody>
            </table>
        `;
    }

    document.getElementById("gratitude-totalCount").textContent = posts.length;
};

// 특정 기간의 기부 감사 인사 내역 가져오기
const applyFilterDonationPosts = async (memberId, months) => {
    const today = new Date();
    const startDate = new Date(today.setMonth(today.getMonth() - months)).toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    console.log(`applyFilterDonationPosts 호출됨. memberId: ${memberId}, startDate: ${startDate}, endDate: ${endDate}`);
    await fetchFilteredDonationPosts(memberId, startDate, endDate);
};

// 날짜 지정 시 기부 감사 인사 내역 조회
const updateDateRangeDonationPosts = async () => {
    const startDate = document.getElementById("start-date-gratitude").value;
    const endDate = document.getElementById("end-date-gratitude").value;
    const memberId = await getMemberInfo();

    console.log(`updateDateRangeDonationPosts 호출됨. startDate: ${startDate}, endDate: ${endDate}, memberId: ${memberId}`);

    if (startDate && endDate) {
        await fetchFilteredDonationPosts(memberId, startDate, endDate);
    }
};

// 필터된 기부 감사 인사 내역 가져오기
const fetchFilteredDonationPosts = async (memberId, startDate, endDate) => {
    try {
        const response = await fetch(
            `/donation/my-posts/${memberId}?startDate=${startDate}&endDate=${endDate}`
        );
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("필터된 기부 감사 인사 데이터:", data);
        renderDonationPosts(data);
    } catch (error) {
        console.error("Error fetching filtered donation posts:", error);
        alert("기부 감사 인사 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 기부 감사 인사 내역 가져오기
const fetchDonationPosts = async (memberId) => {
    try {
        const response = await fetch(`/donation/my-posts/${memberId}`);
        console.log("응답 상태:", response.status);
        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("기부 감사 인사 데이터:", data);
        renderDonationPosts(data);
    } catch (error) {
        console.error("Error fetching donation posts:", error);
        alert("기부 감사 인사 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};

// 기부 감사 인사 섹션 초기화 및 이벤트 리스너 설정
const initializeDonationPostSection = (memberId) => {
    fetchDonationPosts(memberId);

    const gratitudeToggleElements = document.querySelectorAll("#gratitude .fItXBi.toggle");

    gratitudeToggleElements.forEach((element) => {
        element.addEventListener("click", function () {
            gratitudeToggleElements.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");
        });
    });

    document.getElementById("filter-1year-gratitude").addEventListener("change", () => applyFilterDonationPosts(memberId, 12));
    document.getElementById("filter-1month-gratitude").addEventListener("change", () => applyFilterDonationPosts(memberId, 1));
    document.getElementById("filter-3months-gratitude").addEventListener("change", () => applyFilterDonationPosts(memberId, 3));
    document.getElementById("filter-6months-gratitude").addEventListener("change", () => applyFilterDonationPosts(memberId, 6));

    document.getElementById("Initialization-gratitude").addEventListener("click", () => {
        document.querySelectorAll("#gratitude .fItXBi.toggle input[type='checkbox']").forEach((checkbox) => {
            checkbox.checked = false;
        });

        gratitudeToggleElements.forEach((el) => el.classList.remove("active"));
        fetchDonationPosts(memberId);
    });
};
/********************* 내 문의 *********************/
// 문의 내역 렌더링
// const renderInquiries = (inquiries) => {
//     const inquiryList = document.querySelector(".inquiry-list");
//     const emptyComponent = document.querySelector("#inquiry .empty-component");
//
//     if (inquiries.length === 0) {
//         inquiryList.style.display = "none";
//         emptyComponent.style.display = "block";
//     } else {
//         inquiryList.style.display = "block";
//         emptyComponent.style.display = "none";
//         inquiryList.innerHTML = `
//             <table class="news-center-table" style="margin-top: 0; margin-bottom: 20px;">
//                 <colgroup>
//                     <col style="width: 57px;">
//                     <col style="width: 150px;">
//                     <col style="width: 104px;">
//                     <col style="width: 80px;">
//                 </colgroup>
//                 <thead class="news-center-table-head">
//                     <tr>
//                         <th>문의 번호</th>
//                         <th>제목</th>
//                         <th>작성일</th>
//                         <th>상태</th>
//                     </tr>
//                 </thead>
//                 <tbody class="news-center-table-body">
//                     ${inquiries
//             .map(
//                 (inquiry) => `
//                                 <tr class="news-data-rows" data-forloop="${inquiry.id}">
//                                     <td class="news-center-table-body-number">${inquiry.id}</td>
//                                     <td class="news-center-table-body-title">${inquiry.postTitle}</td>
//                                     <td class="news-center-table-body-date">
//                                         ${new Date(inquiry.createdDate).toLocaleDateString('ko-KR')}
//                                     </td>
//                                     <td class="news-center-table-body-status">${inquiry.inquiryStatus}</td>
//                                 </tr>
//                             `
//             )
//             .join("")}
//                 </tbody>
//             </table>
//         `;
//     }
//
//     document.getElementById("inquiry-totalCount").textContent = inquiries.length;
// };
//
// // 문의 섹션 초기화 및 이벤트 리스너 설정
// const initializeInquirySection = (memberId) => {
//     fetchInquiries(memberId);
//
//     // 문의 섹션의 toggle 요소 선택
//     const inquiryToggleElements = document.querySelectorAll("#inquiry .fItXBi.toggle");
//
//     // 각 toggle 요소에 이벤트 리스너 추가
//     inquiryToggleElements.forEach(function (element) {
//         element.addEventListener("click", function () {
//             // 모든 요소에서 active 클래스 제거
//             inquiryToggleElements.forEach(function (el) {
//                 el.classList.remove("active");
//             });
//
//             // 클릭된 요소에만 active 클래스 추가
//             this.classList.add("active");
//         });
//     });
//
//     // 필터 이벤트 설정
//     document.getElementById("filter-1year-inquiry").addEventListener("change", () => applyFilterInquiries(memberId, 12));
//     document.getElementById("filter-1month-inquiry").addEventListener("change", () => applyFilterInquiries(memberId, 1));
//     document.getElementById("filter-3months-inquiry").addEventListener("change", () => applyFilterInquiries(memberId, 3));
//     document.getElementById("filter-6months-inquiry").addEventListener("change", () => applyFilterInquiries(memberId, 6));
//
//     // 초기화 버튼 이벤트 설정
//     document.getElementById("Initialization-inquiry").addEventListener("click", () => {
//         // 모든 필터 체크박스 해제
//         document.querySelectorAll("#inquiry .fItXBi.toggle input[type='checkbox']").forEach((checkbox) => {
//             checkbox.checked = false;
//         });
//
//         // active 클래스 제거
//         inquiryToggleElements.forEach((el) => el.classList.remove("active"));
//
//         // 초기 상태로 문의 내역 다시 가져오기
//         fetchInquiries(memberId);
//     });
// };
// // 문의 내역 가져오기
// const fetchInquiries = async (memberId) => {
//     try {
//         const response = await fetch(`/my-inquirys/${memberId}`);
//         console.log("응답 상태:", response.status);
//         if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");
//
//         const data = await response.json();
//         console.log("문의 데이터:", data);
//         renderInquiries(data);
//     } catch (error) {
//         console.error("Error fetching inquiries:", error);
//         alert("문의 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
//     }
// };
//
// // 필터된 문의 내역 가져오기
// const fetchFilteredInquiries = async (memberId, startDate, endDate) => {
//     try {
//         const response = await fetch(
//             `/inquiry/my-inquirys/${memberId}?startDate=${startDate}&endDate=${endDate}`
//         );
//         console.log("응답 상태:", response.status);
//         if (!response.ok) throw new Error("서버로부터 데이터를 가져오는 데 실패했습니다.");
//
//         const data = await response.json();
//         console.log("필터된 문의 데이터:", data);
//         renderInquiries(data);
//     } catch (error) {
//         console.error("Error fetching filtered inquiries:", error);
//         alert("문의 내역을 불러오는 데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
//     }
// };
// // 특정 기간의 문의 내역 가져오기
// const applyFilterInquiries = async (memberId, months) => {
//     const today = new Date();
//     const startDate = new Date(today.setMonth(today.getMonth() - months)).toISOString().split("T")[0];
//     const endDate = new Date().toISOString().split("T")[0];
//
//     console.log(`applyFilterInquiries 호출됨. memberId: ${memberId}, startDate: ${startDate}, endDate: ${endDate}`);
//     await fetchFilteredInquiries(memberId, startDate, endDate);
// };
// // 날짜 지정 시 문의 내역 조회
// const updateDateRangeInquiries = async () => {
//     const startDate = document.getElementById("start-date-inquiry").value;
//     const endDate = document.getElementById("end-date-inquiry").value;
//     const memberId = await getMemberInfo();
//
//     console.log(`updateDateRangeInquiries 호출됨. startDate: ${startDate}, endDate: ${endDate}, memberId: ${memberId}`);
//
//     if (startDate && endDate) {
//         await fetchFilteredInquiries(memberId, startDate, endDate);
//     }
// };

/*********************후원 내역*********************/
const renderBoostRecords = (boostRecords) => {
    const boostRecordList = document.querySelector(".boost-list");
    const emptyComponent = document.querySelector("#boost .empty-component");

    if (boostRecords.length === 0) {
        boostRecordList.style.display = "none";
        emptyComponent.style.display = "block";
    } else {
        boostRecordList.style.display = "block";
        emptyComponent.style.display = "none";
        boostRecordList.innerHTML = `
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
                        <th>기부일</th>
                    </tr>
                </thead>
                <tbody class="news-center-table-body">
                    ${boostRecords.map(record => `
                        <tr class="news-data-rows" data-forloop="${record.id}">
                            <td class="news-center-table-body-number">${record.id}</td>
                            <td class="news-center-table-body-title">후원 완료</td>
                            <td class="news-center-table-body-status">${record.supportAmount.toLocaleString()} 정</td>
                            <td class="news-center-table-body-date">${new Date(record.createdDate).toLocaleDateString('ko-KR')}</td>
                        </tr>`).join('')}
                </tbody>
            </table>
        `;
    }

    document.getElementById("boost-totalCount").textContent = boostRecords.length;
};

/********************* 후원 내역 초기화 및 이벤트 리스너 설정 *********************/
const initializeBoostRecordSection = (memberId) => {
    fetchBoostRecords(memberId);

    const boostToggleElements = document.querySelectorAll("#boost .fItXBi.toggle");

    boostToggleElements.forEach(element => {
        element.addEventListener("click", () => {
            boostToggleElements.forEach(el => el.classList.remove("active"));
            element.classList.add("active");
        });
    });

    document.getElementById("filter-1year-boost").addEventListener("change", () => applyFilterBoostRecords(memberId, 12));
    document.getElementById("filter-1month-boost").addEventListener("change", () => applyFilterBoostRecords(memberId, 1));
    document.getElementById("filter-3months-boost").addEventListener("change", () => applyFilterBoostRecords(memberId, 3));
    document.getElementById("filter-6months-boost").addEventListener("change", () => applyFilterBoostRecords(memberId, 6));

    document.getElementById("Initialization-boost").addEventListener("click", () => {
        boostToggleElements.forEach(el => el.classList.remove("active"));
        fetchBoostRecords(memberId);
    });
};

/********************* 필터된 후원 내역 가져오기 *********************/
const applyFilterBoostRecords = async (memberId, months) => {
    const today = new Date();
    const startDate = new Date(today.setMonth(today.getMonth() - months)).toISOString().split("T")[0];
    const endDate = new Date().toISOString().split("T")[0];

    console.log(`applyFilterBoostRecords 호출됨. memberId: ${memberId}, startDate: ${startDate}, endDate: ${endDate}`);
    await fetchFilteredBoostRecords(memberId, startDate, endDate);
};

/********************* 날짜 지정 후 후원 내역 조회 *********************/
const updateDateRangeBoostRecords = async () => {
    const startDate = document.getElementById("start-date-boost").value;
    const endDate = document.getElementById("end-date-boost").value;
    const memberId = await getMemberInfo();

    console.log(`updateDateRangeBoostRecords 호출됨. startDate: ${startDate}, endDate: ${endDate}, memberId: ${memberId}`);

    if (startDate && endDate) {
        await fetchFilteredBoostRecords(memberId, startDate, endDate);
    }
};

/********************* 후원 내역 데이터 가져오기 함수들 *********************/
// 전체 후원 내역 가져오기
const fetchBoostRecords = async (memberId) => {
    try {
        const response = await fetch(`/support-records/my-support/${memberId}`);
        if (!response.ok) throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("후원 내역 데이터:", data);
        renderBoostRecords(data);
    } catch (error) {
        console.error("후원 내역 불러오기 오류:", error);
        alert("후원 내역을 불러오는 중 문제가 발생했습니다.");
    }
};

// 필터된 후원 내역 가져오기
const fetchFilteredBoostRecords = async (memberId, startDate, endDate) => {
    try {
        const response = await fetch(`/support-records/my-support/${memberId}?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");

        const data = await response.json();
        console.log("필터된 후원 내역 데이터:", data);
        renderBoostRecords(data);
    } catch (error) {
        console.error("후원 내역 필터 조회 오류:", error);
        alert("후원 내역을 불러오는 중 문제가 발생했습니다.");
    }
};

/*********************공통*********************/

// 모든 .fItXBi.toggle 요소를 선택
const toggleElements = document.querySelectorAll(".fItXBi.toggle");

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

// 모든 탭 요소를 선택합니다.
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

// 사이드 배너 랩 요소 및 lnb-items 선택
const sideBanerWrapElement = document.querySelector(".side-baner-wrap");
const dateButtons = document.querySelectorAll(".date-button .fItXBi.toggle");
const lnbItems = sideBanerWrapElement
    ? sideBanerWrapElement.querySelectorAll(".lnb-item")
    : [];
const tabsContainers = document.querySelectorAll(".bqkLME.tabs");

// 초기화 버튼에 이벤트 리스너 등록
document.body.addEventListener("click", function (event) {
    if (event.target && event.target.id === "Initialization-review") {
        // 후기 섹션 초기화 버튼 클릭 시
        const reviewToggleElements = document.querySelectorAll("#postscript .fItXBi.toggle");
        reviewToggleElements.forEach((el) => el.classList.remove("active"));
    }

    if (event.target && event.target.id === "Initialization-donation") {
        // 기부 섹션 초기화 버튼 클릭 시
        const donationToggleElements = document.querySelectorAll("#donation .fItXBi.toggle");
        donationToggleElements.forEach((el) => el.classList.remove("active"));
    }
    if (event.target && event.target.id === "Initialization-gratitude") {
        // 기부 섹션 초기화 버튼 클릭 시
        const donationToggleElements = document.querySelectorAll("#gratitude .fItXBi.toggle");
        donationToggleElements.forEach((el) => el.classList.remove("active"));
    }
});

// 초기화 버튼 클릭 시 모든 .toggle의 active 클래스만 제거 (lnb-item의 active와 탭의 active는 유지)
dateButtons.forEach((toggleElement) => {
    toggleElement.classList.remove("active");
});

// lnb-item과 관련된 tabsContainer의 첫 번째 탭에 active 추가
if (tabsContainers.length > 0) {
    tabsContainers.forEach((tabsContainer) => {
        const activeLnbItem = Array.from(lnbItems).find((lnbItem) =>
            lnbItem.classList.contains("active")
        );
        if (activeLnbItem) {
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

// 활성화된 lnbItem에 대해 첫 번째 탭을 활성화하는 함수
const activateFirstTab = (lnbItem) => {
    const tabsContainer = lnbItem.closest(".side-baner-wrap").querySelector(".bqkLME.tabs");
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll(".tab");
        tabs.forEach((tab) => tab.classList.remove("active"));
        const firstTab = tabs[0];
        if (firstTab) {
            firstTab.classList.add("active");
        }
    }
};

/*********************모달 관련 로직*********************/

// 승인버튼 및 모달 요소 확인
const approve = document.getElementById("approve");
const approveCloseModal = document.getElementById("approvecloseModal");

if (approve && approveCloseModal) {
    // 승인 버튼 클릭 시 모달 열기
    approve.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".approvemodal").style.display = "flex";
    });

    // 모달 닫기 버튼 클릭 시 모달 닫기
    approveCloseModal.addEventListener("click", (e) => {
        if (e.target.id === "approvecloseModal") {
            document.querySelector(".approvemodal").style.display = "none";
        }
    });
}

// 거절버튼 및 모달 요소 확인
const refuse = document.getElementById("refuse");
const refuseCloseModal = document.getElementById("refusecloseModal");

if (refuse && refuseCloseModal) {
    // 거절 버튼 클릭 시 모달 열기
    refuse.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".refusemodal").style.display = "flex";
    });

    // 모달 닫기 버튼 클릭 시 모달 닫기
    refuseCloseModal.addEventListener("click", (e) => {
        if (e.target.id === "refusecloseModal") {
            document.querySelector(".refusemodal").style.display = "none";
        }
    });
}

/*********************후기 작성 버튼 이벤트*********************/

// 후기 작성하기 버튼 클릭 시 후기 작성 페이지로 이동
document.addEventListener("click", function (event) {
    if (event.target.closest(".btn-request")) {
        event.preventDefault();
        // 후기 작성 페이지로 이동
        window.location.href = "/donation/donation-write";
    }
});

/*********************페이지 초기화*********************/

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const memberId = await getMemberInfo();

        if (!memberId) {
            alert("로그인이 필요합니다.");
            window.location.href = "/member/login";
            return;
        }

        console.log("사용되는 memberId:", memberId);

        // 후기 섹션 초기화
        initializeReviewsSection(memberId);
        // 기부 섹션 초기화
        initializeDonationSection(memberId);
        //기부 감사 인사 섹션 초기화
        initializeDonationPostSection(memberId);
        //내 문의 섹션 초기화
        // initializeInquirySection(memberId);
        //후원 내역 섹션 초기화
        initializeBoostRecordSection(memberId);


    } catch (error) {
        console.error("초기화 중 오류:", error);
        alert("페이지를 불러오는 중 오류가 발생했습니다.");
    }
});
