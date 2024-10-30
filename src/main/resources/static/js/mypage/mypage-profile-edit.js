// 클래스명이 추가될 label 모음집
const inputLabel = [".nickName", ".oneLine", ".name", ".phoneNumber"];

// 이벤트가 발생할 input 모음집
const allInputs = document.querySelectorAll("input.nickName, input.oneLine");

allInputs.forEach((input) => {
    input.addEventListener("focus", (e) => toggleLabelClass(e.target, "add"));
    input.addEventListener("blur", (e) => toggleLabelClass(e.target, "remove"));
});

// 라벨에 포커스/블러 클래스 추가/제거 함수
const toggleLabelClass = (target, action) => {
    inputLabel.forEach((label) => {
        if (target.matches(label)) {
            const labelElement = document.querySelector(label);
            if (labelElement) labelElement.classList[action]("focus");
        }
    });
};

// 유효성 검사 관련 요소
const nickNameLabel = document.querySelector("label.nickName");
const nickNameInput = document.querySelector("input.nickName");
const nickNameCheckDiv1 = document.querySelector("#nickNameCheck1");
const nickNameCheckDiv2 = document.querySelector("#nickNameCheck2");
const disableButton = document.getElementById("disableButton");

// 닉네임 유효성 검사 이벤트
nickNameInput.addEventListener("input", () => {
    const specialCharRegex = /[!@#$%^&*()\-+={}\[\]:;"'<>,.?/\\|`~]/;
    const isEmpty = !nickNameInput.value;
    const hasSpecialChar = specialCharRegex.test(nickNameInput.value);

    if (isEmpty || hasSpecialChar) {
        toggleErrorState(true, hasSpecialChar);
    } else {
        toggleErrorState(false);
    }
});

const toggleErrorState = (isError, isSpecialChar = false) => {
    nickNameLabel.classList.toggle("error", isError);
    nickNameInput.classList.toggle("error", isError);
    nickNameCheckDiv1.style.display = isSpecialChar ? "none" : isError ? "block" : "none";
    nickNameCheckDiv2.style.display = isSpecialChar ? "block" : "none";
    disableButton.classList.toggle("disable", isError);
};

// 글자 수 반영 함수
const updateWordCount = (textarea, counter, maxLength) => {
    counter.innerText = `${textarea.value.length}/${maxLength}`;
};

const postContent1 = document.querySelector(".content-textarea1");
const wordLength1 = document.querySelector("#word-length1");
const postContent2 = document.querySelector(".content-textarea2");
const wordLength2 = document.querySelector("#word-length2");

postContent1.addEventListener("input", () => updateWordCount(postContent1, wordLength1, 10));
postContent2.addEventListener("input", () => updateWordCount(postContent2, wordLength2, 20));

// 이미지 미리보기 기능
const profileImageInput = document.getElementById("profileImageInput");
const profileImagePreview = document.getElementById("profileImagePreview");

profileImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => (profileImagePreview.src = e.target.result);
        reader.readAsDataURL(file);
    }
});

// 회원 정보 로드 및 필드 채우기
let memberId; // 전역 변수로 선언하여 저장

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/member/info");
        if (!response.ok) throw new Error("회원 정보 로드 실패");

        const data = await response.json();
        fillMemberFields(data);
        memberId = data.id; // memberId 저장
    } catch (error) {
        console.error(error);
    }
});

const fillMemberFields = (data) => {
    document.querySelector(".nickName input").value = data.memberNickName || "";
    document.querySelector(".oneLine input").value = data.memberIntroduction || "";
    document.querySelector(".name input").value = data.memberName || "";
    document.querySelector(".phoneNumber input").value = data.memberPhone || "";
};

disableButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!memberId) {
        alert("회원 정보가 로드되지 않았습니다.");
        return;
    }

    await uploadProfileImage();
    await updateMemberInfo();
});

const uploadProfileImage = async () => {
    const file = profileImageInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("memberId", memberId);

        try {
            const response = await fetch("/profile/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.text();
            if (!response.ok) throw new Error(result);

            console.log("파일 업로드 성공:", result);
        } catch (error) {
            console.error("파일 업로드 실패:", error);
            alert(`파일 업로드 실패: ${error.message}`);
            throw error;
        }
    }
};

const updateMemberInfo = async () => {
    const memberData = {
        memberNickName: document.querySelector(".nickName input").value,
        memberIntroduction: document.querySelector(".oneLine input").value,
    };

    try {
        const response = await fetch("/member/update-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memberData),
        });

        if (response.ok) {
            document.querySelector(".modal").style.display = "flex";
        } else {
            throw new Error("회원 정보 업데이트에 실패했습니다.");
        }
    } catch (error) {
        console.error("회원 정보 업데이트 요청 실패:", error);
    }
};

// 모달 닫기 및 페이지 이동
document.getElementById("closeModal").addEventListener("click", (e) => {
    if (e.target.id === "closeModal") {
        document.querySelector(".modal").style.display = "none";
        window.location.href = "/mypage/mypage";
    }
});
