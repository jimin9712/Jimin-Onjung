// ========================== 문의 내역 렌더링 함수 ==========================
const inquiryContainer = document.querySelector(".inquiryTable_container");

// 문의 내역 렌더링
const renderInquiries = (inquiries) => {
    let content = '';
    content+=` <div
                    class="inquiryTable_row inquiryTable_header"
            >
                <div
                        class="inquiryTable_cell inquiry-headerCell selectAllCell"
                >
                    <input
                            type="checkbox"
                            id="selectAllInquiries"
                    />
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    문의 분류
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    작성일
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    문의 제목
                </div>
    
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    문의 내용
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    작성자
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    이메일
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    상태
                </div>
                <div
                        class="inquiryTable_cell inquiry-headerCell"
                >
                    Action
                </div>
            </div>`
    inquiries.forEach((inquiry) => {
        content +=
            `<div class="inquiryTable_row data_row" data-id="${inquiry.id}">
                <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox"/></div>
                <div class="inquiryTable_cell inquiry_type">${inquiry.inquiryType}</div>
                <div class="inquiryTable_cell inquiry_date">${inquiry.createdDate}</div>
                <div class="inquiryTable_cell">${inquiry.postTitle}</div>
                <div class="inquiryTable_cell">${inquiry.postContent}</div>
                <div class="inquiryTable_cell">${inquiry.memberNickName}</div>
                <div class="inquiryTable_cell">${inquiry.inquiryEmail}</div>
                <div class="inquiryTable_cell">${inquiry.inquiryStatus}</div>
                <div class="inquiryTable_cell"><button class="editBtn">답변하기</button></div>
            </div>`;
    });

    if (inquiryContainer) {
        inquiryContainer.innerHTML = content;
        selectAllInquiries();
    } else {
        console.error("inquiryContainer 요소를 찾을 수 없습니다.");
    }
};