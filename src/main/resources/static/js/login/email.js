document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector("#chk-agree");
    const completeButton = document.querySelector(".register-btn-complete");

    // 이메일 관련 요소들
    const emailInput = document.getElementById("email");
    const sendAuthButton = document.querySelector(".button-btn-send");
    const emailCodeInput = document.getElementById("email-code");
    const emailCodeBox = document.querySelector(".register-email-code-box");
    const countdownTimer = document.getElementById("countdown-timer");
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net)$/;

    // 전화번호 관련 요소들
    const phoneInput = document.getElementById("phone-number");
    const sendPhoneAuthButton = document.querySelector(".button-btn-send-phone");
    const phoneCodeInput = document.getElementById("phone-code");
    const phoneCodeBox = document.querySelector(".register-phone-code-box");
    const phoneCountdownTimer = document.getElementById("countdown-timer-phone");
    const phoneRegex = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;

    // 비밀번호 관련 요소들
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("password-confirm");
    const passwordWarningMessage = document.querySelector(".password-warning-msg");
    const passwordWarningMessage2 = document.querySelector(".password-warning-msg2");
    const passwordShowBtns = document.querySelectorAll(".password-show-btn");
    const checkboxWarningMessage = document.querySelector(".warning-msg2");

    let emailTimerInterval;
    let phoneTimerInterval;
    let isEmailCodeSent = false;
    let isPhoneCodeSent = false;

    // 인증번호 입력란 초기 숨김
    emailCodeBox.style.display = "none";
    phoneCodeBox.style.display = "none";

    // 전화번호 인증번호 발송 로직
    sendPhoneAuthButton.addEventListener("click", async function () {
        const phoneValue = phoneInput.value.trim();

        if (!phoneRegex.test(phoneValue)) {
            showWarningMessage("전화번호 형식이 올바르지 않습니다.", phoneInput);
            phoneInput.classList.add("warning");
            return;
        }

        try {
            const response = await fetch("/send-auth-code", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ phoneNumber: phoneValue }),
            });

            if (response.ok) {
                showSuccessMessage("인증 번호가 발송되었습니다.", phoneInput);
                phoneCodeBox.style.display = "block";
                startCountdown(phoneCountdownTimer, 10 * 60);
                isPhoneCodeSent = true;
                sendPhoneAuthButton.textContent = "재전송";
            } else {
                throw new Error("인증번호 전송 실패");
            }
        } catch (error) {
            showWarningMessage("인증번호 전송에 실패했습니다.", phoneInput);
        }
    });
    phoneInput.addEventListener("input", function () {
        const phoneValue = phoneInput.value.trim();
        const successMessage = document.querySelector(".desc-span.success-msg");
        const warningMessage = document.querySelector(".desc-span.warning-msg");

        // 전화번호 값이 변경될 때 인증번호 입력란을 숨기고 초기화
        phoneCodeBox.style.display = "none"; // 인증번호 입력란 숨기기
        phoneCodeInput.value = ""; // 인증번호 입력란 초기화
        phoneCountdownTimer.style.display = "none"; // 타이머 숨기기
        clearInterval(phoneTimerInterval); // 타이머 초기화
        warningMessage.style.display = "none";

        // 전화번호 값이 없을 경우
        if (phoneValue === "") {
            phoneInput.classList.remove("success-sign", "warning");
            phoneInput.style.border = "1px solid #ccc"; // 기본 테두리 색상
            phoneInput.style.outline = ""; // 기본 아웃라인
            sendPhoneAuthButton.classList.remove("button-send-phone-active");

            // 성공 및 경고 메시지 숨기기
            if (successMessage) successMessage.style.display = "none";
            if (warningMessage) warningMessage.style.display = "none";
        } else {
            sendPhoneAuthButton.classList.add("button-send-phone-active"); // 인증 버튼 활성화
            phoneInput.classList.remove("warning");
            phoneInput.style.borderColor = "blue"; // 포커스 색상

            if (successMessage) successMessage.style.display = "none";
        }
    });

    // 전화번호 인증 완료 버튼 클릭 로직
    const confirmPhoneButton = document.querySelector(
        ".register-phone-code-box .button-btn-send-phone"
    );
    confirmPhoneButton.addEventListener("click", async function () {
        if (isPhoneCodeSent) {
            const inputCode = phoneCodeInput.value.trim();

            if (inputCode === "") {
                showWarningMessage("인증번호를 입력해 주세요.", phoneCodeInput);
                return;
            }

            try {
                const response = await fetch("/verify-auth-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        phoneNumber: phoneInput.value,
                        authCode: inputCode,
                    }),
                });

                const result = await response.text();
                if (result === "인증 성공") {
                    clearInterval(phoneTimerInterval);
                    showSuccessMessage("인증되었습니다.", phoneCodeInput);
                } else {
                    showWarningMessage("인증번호가 일치하지 않습니다.", phoneCodeInput);
                }
            } catch (error) {
                showWarningMessage("인증 실패. 다시 시도해 주세요.", phoneCodeInput);
            }
        }
    });

    // 타이머 시작 함수
    function startCountdown(timerElement, timeLeft) {
        clearInterval(phoneTimerInterval);
        timerElement.style.display = "block";

        phoneTimerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}`;

            if (timeLeft <= 0) {
                clearInterval(phoneTimerInterval);
                timerElement.textContent = "";
                showWarningMessage("입력 시간을 초과하였습니다.", phoneCodeInput);
                phoneCodeBox.style.display = "none";
                isPhoneCodeSent = false;
            }
            timeLeft--;
        }, 1000);
    }

    // 경고 메시지 출력 함수
    function showWarningMessage(message, element) {
        const parentElement = element.closest(".register-with-btn-box");
        let existingMessage = parentElement.querySelector(".desc-span.warning-msg");

        if (!existingMessage) {
            const warningMessage = document.createElement("span");
            warningMessage.className = "desc-span warning-msg";
            warningMessage.textContent = message;
            warningMessage.style.display = "block";
            parentElement.appendChild(warningMessage);
        } else {
            existingMessage.textContent = message;
            existingMessage.style.display = "block";
        }
    }

    // 성공 메시지 출력 함수
    function showSuccessMessage(message, element) {
        const parentElement = element.closest(".register-with-btn-box");
        const existingMessage = parentElement.querySelector(".desc-span.success-msg");

        if (existingMessage) existingMessage.remove();

        const successMessage = document.createElement("span");
        successMessage.className = "desc-span success-msg";
        successMessage.textContent = message;
        successMessage.style.display = "block";
        parentElement.appendChild(successMessage);
    }

    // 비밀번호 보이기/숨기기 기능
    passwordShowBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const inputElement = btn.parentElement.querySelector("input");
            togglePasswordVisibility(inputElement, btn);
        });
    });

    function togglePasswordVisibility(passwordInput, btn) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            btn.src = "https://accounts-front.stunning.kr/assets/img/login/ico-visible.png";
        } else {
            passwordInput.type = "password";
            btn.src = "https://accounts-front.stunning.kr/assets/img/login/ico-hidden.png";
        }
    }
});
phoneCodeInput.addEventListener("input", function () {
    const phoneCodeValue = phoneCodeInput.value.trim();

    if (phoneCodeValue.length > 0) {
        confirmPhoneButton.classList.add("button-send-phone-active"); // 인증 완료 버튼 활성화
        confirmPhoneButton.style.cursor = "pointer"; // 커서 스타일 변경
    } else {
        confirmPhoneButton.classList.remove("button-send-phone-active"); // 입력값이 없으면 비활성화
        confirmPhoneButton.style.cursor = "default";
    }
});
emailCodeInput.addEventListener("input", function () {
    const emailCodeValue = emailCodeInput.value.trim();

    if (emailCodeValue.length > 0) {
        confirmButton.classList.add("button-send-active"); // 인증 완료 버튼 활성화
        confirmButton.style.cursor = "pointer"; // 커서 스타일 변경
        emailCodeInput.style.borderColor = "blue"; // 기본 포커스 스타일 적용
    } else {
        confirmButton.classList.remove("button-send-active"); // 입력값이 없으면 비활성화
        confirmButton.style.cursor = "default";
        emailCodeInput.style.borderColor = "#ccc"; // 기본 테두리 색상으로 복원
    }
});