const inquiryContainer = document.querySelector(".inquiryTable_container");
// 문의 내역 렌더링
const renderInquiries = (inquiries) => {
    let content = '';
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
    console.log("렌더링할 데이터:", inquiries);

    if (inquiryContainer) {
        inquiryContainer.innerHTML = content;
    } else {
        console.error("inquiryContainer 요소를 찾을 수 없습니다.");
    }
};
//========================================================================================
// 답변 렌더링 함수
const answerContainer = document.getElementById("inquiry_answer");

const renderAnswer = (inquiryAnswer) => {
    console.log("폼을 렌더링합니다:", inquiryAnswer); // 데이터가 전달되는지 확인
    console.log("answerContainer :", answerContainer); // answerContainer 확인

    if (answerContainer) {
        answerContainer.innerHTML =
           ` <div style="max-width: 1080px; margin: 24px 16px 0;">
                    <h1>고객센터 문의 답변</h1>
                    <div class="form">
                        <form
                            id="new-request"
                            class="request-form"
                            data-form
                            data-form-type="request"
                            action="/help/write"
                            accept-charset="UTF-8"
                            method="post"
                        >
                            <div class="form-field required">
                                <label for="request-title">문의 제목</label>
                                <input
                                    type="text"
                                    name="request-title"
                                    id="request-title"
                                    maxlength="150"
                                    size="150"
                                    placeholder="간단한 제목을 입력해주세요."
                                    value="${inquiryAnswer.postTitle}"
                                />
                            </div>
                            <div class="form-field-gap"></div>
                            <div class="form-field required">
                                <label for="request-description">문의 내용</label>
                                <textarea
                                    name="request-description"
                                    id="request-description"
                                >${inquiryAnswer.postContent}</textarea>
                            </div>
                            <div class="form-field">
                                <label for="request-attachments">첨부파일</label>
                                <div id="upload-zone" class="upload-zone">
                                    <input
                                        type="file"
                                        multiple
                                        id="attach-input"
                                        data-fileupload="true"
                                        data-dropzone="upload-dropzone"
                                    />
                                    <span>
                                        <a>파일 추가</a>
                                        또는 파일을 여기로 드래그
                                    </span>
                                </div>
                                <ul
                                    id="attachments-upload-pool"
                                    class="attachments-upload-pool"
                                ></ul>
                            </div>
                            <div class="form-field-agreements" style="clear: both">
                                <p id="request-agreements">
                                    (주)온정은 정보통신망 이용촉진 및 정보보호
                                    등 관한 법률을 준수하며 고객님의 개인정보를
                                    수집하고 소중하게 다루고 있습니다. 1. 수집
                                    및 이용 항목 : 이메일, 이름, 연락처 2. 수집
                                    및 이용 목적 : 앱 이용 문의에 대한 답변 관련
                                    업무 3, 보유 및 이용 기간 : 수집 목적이
                                    달성되면 모든 개인정보를 파기합니다. 동의를
                                    하지 않을 경우 문의한 내용에 대한 답변에
                                    제한이 있을 수 있습니다.
                                </p>
                                <label for="request-agreements-check" class="checked">동의합니다.</label>
                                <input
                                    name="request-agreements-check"
                                    type="hidden"
                                    value="off"
                                    autocomplete="off"
                                />
                                <input
                                    type="checkbox"
                                    value="on"
                                    id="request-agreements-check"
                                    name="request-agreements-check"
                                />
                            </div>
                            <div class="form-field required">
                                <label for="answer-content">답변 작성</label>
                                <textarea
                                    name="answer-content"
                                    id="answer-content"
                                    placeholder="답변 내용을 입력해 주세요."
                                ></textarea>
                            </div>
                            <footer>
                                <input
                                    type="submit"
                                    name="submit"
                                    value="답변 제출"
                                    style="margin-bottom: 30px;"
                                />
                            </footer>
                        </form>
                    </div>
                </div>
       ` ;
        console.log("렌더링된 HTML:", answerContainer.innerHTML); // HTML 설정 후 확인
        answerContainer.style.display = "block"; // 화면에 보이도록 설정

    } else {
        console.error("answerContainer 요소를 찾을 수 없습니다.");
    }
};