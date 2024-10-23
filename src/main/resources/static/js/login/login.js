document.getElementById("login-btn").addEventListener("click", function () {
    // 이메일 및 비밀번호 입력 필드와 경고 메시지 요소 가져오기
    const emailInput = document.getElementById("id-info");
    const passwordInput = document.getElementById("pass-info");
    const warningMsg = document.querySelector(".warning-msg");

    // 입력된 이메일 및 비밀번호 값 가져오기
    const email = emailInput.value;
    const password = passwordInput.value;

    // 이메일 또는 비밀번호가 입력되지 않았거나 잘못된 경우 경고 메시지 표시
    if (!email || !password || email !== "123" || password !== "123123") {
        // 경고 메시지를 보여줌
        warningMsg.style.display = "block";
        warningMsg.innerText =
            "가입되어 있지 않은 계정이거나, 이메일 또는 비밀번호가 일치하지 않습니다.";

        // 이메일 및 비밀번호 입력 필드에 경고 스타일 추가
        emailInput.classList.add("warning");
        passwordInput.classList.add("warning");
    } else {
        // 로그인 성공 시 경고 메시지를 숨기고 경고 스타일 제거
        warningMsg.style.display = "none";
        emailInput.classList.remove("warning");
        passwordInput.classList.remove("warning");

        // 성공 메시지 출력
        alert("로그인 성공!");
    }
});

// 이메일 입력란에 변화가 있을 때 경고 메시지 및 스타일을 숨김
document.getElementById("id-info").addEventListener("input", function () {
    hideWarning();
});

// 비밀번호 입력란에 변화가 있을 때 경고 메시지 및 스타일을 숨김
document.getElementById("pass-info").addEventListener("input", function () {
    hideWarning();
});

// 경고 메시지와 스타일을 숨기는 함수
function hideWarning() {
    // 이메일 및 비밀번호 입력 필드와 경고 메시지 요소 가져오기
    const emailInput = document.getElementById("id-info");
    const passwordInput = document.getElementById("pass-info");
    const warningMsg = document.querySelector(".warning-msg");

    // 경고 메시지 숨기기
    warningMsg.style.display = "none";

    // 입력 필드에서 경고 스타일 제거
    emailInput.classList.remove("warning");
    passwordInput.classList.remove("warning");
}

// 비밀번호 보이기/숨기기 기능을 처리하는 함수
function togglePasswordVisibility() {
    // 비밀번호 입력 필드와 토글 버튼 가져오기
    const passwordInput = document.getElementById("pass-info");
    const passwordShowBtn = document.querySelector(".password-show-btn");

    // 현재 비밀번호가 숨겨져 있으면 보이게 하고, 보이는 상태면 숨김
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordShowBtn.src =
            "https://accounts-front.stunning.kr/assets/img/login/ico-visible.png";
    } else {
        passwordInput.type = "password";
        passwordShowBtn.src =
            "https://accounts-front.stunning.kr/assets/img/login/ico-hidden.png";
    }
}
