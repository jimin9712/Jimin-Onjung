// 클래스명이 추가되야 할 label모음집
const inputLabel = [".nickName", ".oneLine", ".name", ".phoneNumber"];

// 이벤트가 발생해야 될 input모음집
const allInputs = document.querySelectorAll("input.nickName, input.oneLine");

allInputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
        // input의 클래스 중 하나와 매칭되는 label 요소에 focus 클래스 추가
        inputLabel.forEach((label) => {
            if (e.target.matches(label)) {
                const labelElement = document.querySelector(label);
                if (labelElement) {
                    labelElement.classList.add("focus");
                }
            }
        });
    });

    input.addEventListener("blur", (e) => {
        // input의 클래스 중 하나와 매칭되는 label 요소에서 focus 클래스 제거
        inputLabel.forEach((label) => {
            if (e.target.matches(label)) {
                const labelElement = document.querySelector(label);
                if (labelElement) {
                    labelElement.classList.remove("focus");
                }
            }
        });
    });
});

// 유효성 검사로 error가 추가 될 label
const nickNameLabel = document.querySelector("label.nickName");

// 유효성 검사해야하는 input
const nickNameInput = document.querySelector("input.nickName");

// 유효성 검사에 따른 에러메시지1
const nickNameCheckDiv1 = document.querySelector("#nickNameCheck1");

// 유효성 검사에 따른 에러메시지2
const nickNameCheckDiv2 = document.querySelector("#nickNameCheck2");

// 유효성 검사 후 disable될 저장버튼
const disableButton = document.getElementById("disableButton");

// console.log("hi");
// 이벤트 리스너 추가
nickNameInput.addEventListener("input", () => {
    // 첫 번째 조건: 입력값이 비어 있는 경우
    // 두 번째 조건: 값이 있으면서 '_'를 제외한 모든 특수문자가 포함된 경우
    // 세 번째 조건: 값이 있는데 '_'를 제외한 특수문자가 포함되지않은 경우
    const specialCharRegex = /[!@#$%^&*()\-+={}\[\]:;"'<>,.?/\\|`~]/;
    if (!nickNameInput.value) {
        nickNameLabel.classList.add("error");
        nickNameInput.classList.add("error");
        nickNameCheckDiv1.style.display = "block";
        nickNameCheckDiv2.style.display = "none";
        disableButton.classList.add("disable"); // 버튼 비활성화
    } else if (
        nickNameInput.value &&
        specialCharRegex.test(nickNameInput.value)
    ) {
        nickNameLabel.classList.add("error");
        nickNameInput.classList.add("error");
        nickNameCheckDiv2.style.display = "block";
        nickNameCheckDiv1.style.display = "none";
        disableButton.classList.add("disable"); // 버튼 비활성화
    } else if (
        nickNameInput.value &&
        !specialCharRegex.test(nickNameInput.value)
    ) {
        nickNameLabel.classList.remove("error");
        nickNameInput.classList.remove("error");
        nickNameCheckDiv2.style.display = "none";
        nickNameCheckDiv1.style.display = "none";
        disableButton.classList.remove("disable"); // 버튼 활성화
    }
});

// 닉네임 요소
const postContent1 = document.querySelector(".content-textarea1");
const wordLength1 = document.querySelector("#word-length1");
const maxWordLength10 = 10;

// 게시글 우측 하단 - 현재 글자수 / 최대 글자수
wordLength1.innerText = `${postContent1.value.length}/${maxWordLength10}`;
// focus를 받자마자 0이 된 글자수 반영
postContent1.addEventListener("focus", (e) => {
    wordLength1.innerText = `${postContent1.value.length}/${maxWordLength10}`;
});
// 입력되는 글자수를 실시간으로 반영
postContent1.addEventListener("keyup", (e) => {
    wordLength1.innerText = `${postContent1.value.length}/${maxWordLength10}`;
});
// focus를 잃었을 때까지 입력된 글자수 반영
postContent1.addEventListener("blur", (e) => {
    wordLength1.innerText = `${postContent1.value.length}/${maxWordLength10}`;
});

// 한줄 프로필 요소
const postContent2 = document.querySelector(".content-textarea2");
const wordLength2 = document.querySelector("#word-length2");
const maxWordLength20 = 20;

// 게시글 우측 하단 - 현재 글자수 / 최대 글자수
wordLength2.innerText = `${postContent2.value.length}/${maxWordLength20}`;
// focus를 받자마자 0이 된 글자수 반영
postContent2.addEventListener("focus", (e) => {
    wordLength2.innerText = `${postContent2.value.length}/${maxWordLength20}`;
});
// 입력되는 글자수를 실시간으로 반영
postContent2.addEventListener("keyup", (e) => {
    wordLength2.innerText = `${postContent2.value.length}/${maxWordLength20}`;
});
// focus를 잃었을 때까지 입력된 글자수 반영
postContent2.addEventListener("blur", (e) => {
    wordLength2.innerText = `${postContent2.value.length}/${maxWordLength20}`;
});

// 이미지
document.getElementById("profile_image").addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const newImageSrc = e.target.result;
            document.querySelector(".hdWpKs").src = newImageSrc;
        };
        reader.readAsDataURL(file);
    }
});

// 저장하기 버튼 누를시 나올 모달 이벤트
disableButton.addEventListener("click", (e) => {
    if (e.target.id === "disableButton") {
        if (!disableButton.classList.contains("disable")) {
            document.querySelector(".modal").style.display = "flex";
        }
    }
});

document.getElementById("closeModal").addEventListener("click", (e) => {
    if (e.target.id === "closeModal") {
        document.querySelector(".modal").style.display = "none";
    }
});
