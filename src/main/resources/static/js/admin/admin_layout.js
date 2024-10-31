const inquiryContainer = document.querySelector(".inquiryTable_container");
// 문의 내역 렌더링
const renderInquiries = (inquiries) => {
    let content = '';
    inquiries.forEach((inquiry) => {
        content += `
        <div class="inquiryTable_row data_row">
            <div class="inquiryTable_cell"><input type="checkbox" class="inquiryCheckbox" /></div>
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
    console.log("렌더링할 데이터:", inquiries);

    if (inquiryContainer) {
        inquiryContainer.innerHTML = content;
    } else {
        console.error("inquiryContainer 요소를 찾을 수 없습니다.");
    }
};