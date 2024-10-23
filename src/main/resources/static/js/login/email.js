document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector("#chk-agree");
    const completeButton = document.querySelector(".register-btn-complete");

    // 이메일
    const emailInput = document.getElementById("email");
    const sendAuthButton = document.querySelector(".button-btn-send");
    const emailCodeInput = document.getElementById("email-code");
    const emailCodeBox = document.querySelector(".register-email-code-box");
    const countdownTimer = document.getElementById("countdown-timer");
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net)$/;

    // 전화번호
    const phoneInput = document.getElementById("phone-number");
    const sendPhoneAuthButton = document.querySelector(
        ".button-btn-send-phone"
    );
    const phoneCodeInput = document.getElementById("phone-code");
    const phoneCodeBox = document.querySelector(".register-phone-code-box");
    const phoneCountdownTimer = document.getElementById(
        "countdown-timer-phone"
    );
    const phoneRegex = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;

    // 비밀번호
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("password-confirm");

    const passwordWarningMessage = document.querySelector(
        ".password-warning-msg"
    );
    const passwordWarningMessage2 = document.querySelector(
        ".password-warning-msg2"
    );
    const passwordShowBtns = document.querySelectorAll(".password-show-btn");
    const checkboxWarningMessage = document.querySelector(".warning-msg2");

    let emailTimerInterval;
    let phoneTimerInterval;
    let isEmailCodeSent = false;
    let isPhoneCodeSent = false;

    // 인증번호 입력란을 초기에는 숨김
    emailCodeBox.style.display = "none";
    phoneCodeBox.style.display = "none";

    // ================================================================================================
    // 이메일 입력 필드에서 입력이 변경될 때 호출되는 함수
    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value.trim();
        const successMessage = document.querySelector(".desc-span.success-msg");
        const warningMessage = document.querySelector(".desc-span.warning-msg");

        // 이메일 값이 변경될 때 인증번호 입력란을 숨기고 초기화
        emailCodeBox.style.display = "none"; // 인증번호 입력란 숨기기
        emailCodeInput.value = ""; // 인증번호 입력란 초기화
        countdownTimer.style.display = "none"; // 타이머 숨기기
        clearInterval(emailTimerInterval); // 타이머 초기화
        // 이메일 값이 없을 경우
        if (emailValue === "") {
            emailInput.classList.remove("success-sign", "warning");
            emailInput.style.border = "1px solid #ccc"; // 기본 테두리 색상
            emailInput.style.outline = ""; // 기본 아웃라인
            sendAuthButton.classList.remove("button-send-active");

            // 성공 및 경고 메시지 숨기기
            if (successMessage) successMessage.style.display = "none";
            if (warningMessage) warningMessage.style.display = "none";
        } else {
            sendAuthButton.classList.add("button-send-active"); // 인증 버튼 활성화
            emailInput.classList.remove("warning");
            emailInput.style.borderColor = "blue"; // 포커스 색상

            if (successMessage) successMessage.style.display = "none";
        }
    });
    // 인증 번호 입력 시 인증 완료 버튼 활성화 로직 추가 (이메일 인증번호)
    emailCodeInput.addEventListener("input", function () {
        const emailCodeValue = emailCodeInput.value.trim();

        if (emailCodeValue.length > 0) {
            confirmButton.classList.add("button-send-active"); // 인증 완료 버튼 활성화
            confirmButton.style.cursor = "pointer"; // 커서 스타일 변경
        } else {
            confirmButton.classList.remove("button-send-active"); // 입력값이 없으면 비활성화
            confirmButton.style.cursor = "default";
        }
    });
    // 인증 버튼 클릭 시 이메일 유효성 검사 및 인증번호 발송
    sendAuthButton.addEventListener("click", function () {
        const emailValue = emailInput.value.trim();

        // 이메일 유효성 검사
        if (emailRegex.test(emailValue)) {
            emailInput.classList.remove("warning");
            emailInput.classList.add("success-sign"); // 성공 스타일 추가
            emailInput.style.border = "1px solid #189f14"; // 성공 색상 적용

            // 인증번호 발송 성공 메시지 표시
            showSuccessMessage("인증 번호가 발송되었습니다.", emailInput);

            // 인증번호 입력란 초기화
            emailCodeInput.value = ""; // 인증번호 입력란 값 초기화
            emailCodeInput.classList.remove("success-sign", "warning");
            emailCodeInput.style.borderColor = "#ccc"; // 기본 테두리 색상 복원
            emailCodeInput.style.outline = ""; // 기본 아웃라인 복원
            warningMessage.style.display = "none";

            // 기존 성공 및 경고 메시지 삭제
            const existingSuccessMessage = emailCodeBox.querySelector(
                ".desc-span.success-msg"
            );
            const existingWarningMessage = emailCodeBox.querySelector(
                ".desc-span.warning-msg"
            );

            if (existingSuccessMessage) {
                existingSuccessMessage.remove();
            }

            if (existingWarningMessage) {
                existingWarningMessage.remove();
            }

            emailCodeBox.style.display = "block"; // 인증번호 입력란 표시
            isEmailCodeSent = true; // 인증번호 발송 상태로 설정

            // 10분 카운트다운 시작
            let timeLeft = 10 * 60; // 10분
            clearInterval(emailTimerInterval);
            countdownTimer.style.display = "block"; // 타이머 표시
            emailTimerInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                countdownTimer.textContent = `${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(2, "0")}`;

                // 시간이 다 되면
                if (timeLeft <= 0) {
                    clearInterval(emailTimerInterval);
                    countdownTimer.textContent = ""; // 타이머 초기화
                    showWarningMessage(
                        "입력 시간을 초과하였습니다.",
                        emailCodeInput
                    ); // 경고 메시지 표시
                    emailCodeBox.style.display = "none"; // 인증번호 입력란 숨기기
                    isEmailCodeSent = false; // 인증번호 발송 상태 초기화
                }
                timeLeft--;
            }, 1000);

            sendAuthButton.textContent = "재전송"; // 버튼 텍스트 변경
        } else {
            // 이메일 유효성 검사 실패 시 경고 메시지 표시
            emailInput.classList.add("warning");
            emailInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
            showWarningMessage("이메일 형식이 올바르지 않습니다.", emailInput);
        }
    });
    // ===============================================================================================

    // 전화번호 입력 필드에서 입력이 변경될 때 호출되는 함수
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

    // 인증 버튼 클릭 시 전화번호 유효성 검사 및 인증번호 발송
    sendPhoneAuthButton.addEventListener("click", function () {
        const phoneValue = phoneInput.value.trim();

        // 전화번호 유효성 검사
        if (phoneRegex.test(phoneValue)) {
            phoneInput.classList.remove("warning");
            phoneInput.classList.add("success-sign"); // 성공 스타일 추가
            phoneInput.style.border = "1px solid #189f14"; // 성공 색상 적용

            // 인증번호 발송 성공 메시지 표시
            showSuccessMessage("인증 번호가 발송되었습니다.", phoneInput);

            // 인증번호 입력란 초기화
            phoneCodeInput.value = ""; // 인증번호 입력란 값 초기화
            phoneCodeInput.classList.remove("success-sign", "warning");
            phoneCodeInput.style.borderColor = "#ccc"; // 기본 테두리 색상 복원
            phoneCodeInput.style.outline = ""; // 기본 아웃라인 복원

            // 기존 성공 및 경고 메시지 삭제
            const existingSuccessMessage = phoneCodeBox.querySelector(
                ".desc-span.success-msg"
            );
            const existingWarningMessage = phoneCodeBox.querySelector(
                ".desc-span.warning-msg"
            );

            if (existingSuccessMessage) {
                existingSuccessMessage.remove();
            }

            if (existingWarningMessage) {
                existingWarningMessage.remove();
            }

            phoneCodeBox.style.display = "block"; // 인증번호 입력란 표시
            isPhoneCodeSent = true; // 인증번호 발송 상태로 설정

            // 10분 카운트다운 시작
            let timeLeft = 10 * 60; // 10분
            clearInterval(phoneTimerInterval);
            phoneCountdownTimer.style.display = "block"; // 타이머 표시
            phoneTimerInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                phoneCountdownTimer.textContent = `${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(2, "0")}`;

                // 시간이 다 되면
                if (timeLeft <= 0) {
                    clearInterval(phoneTimerInterval);
                    phoneCountdownTimer.textContent = ""; // 타이머 초기화
                    showWarningMessage(
                        "입력 시간을 초과하였습니다.",
                        phoneCodeInput
                    ); // 경고 메시지 표시
                    phoneCodeBox.style.display = "none"; // 인증번호 입력란 숨기기
                    isPhoneCodeSent = false; // 인증번호 발송 상태 초기화
                }
                timeLeft--;
            }, 1000);

            sendPhoneAuthButton.textContent = "재전송"; // 버튼 텍스트 변경
        } else {
            // 전화번호 유효성 검사 실패 시 경고 메시지 표시
            phoneInput.classList.add("warning");
            phoneInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
            showWarningMessage(
                "전화번호 형식이 올바르지 않습니다.",
                phoneInput
            );
        }
    });
    // 인증 번호 입력 시 인증 완료 버튼 활성화 로직 추가 (전화번호 인증번호)
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
    // 인증 번호 입력 시 인증 완료 버튼 활성화 및 기본 포커스 스타일 적용 (이메일 인증번호)
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

    // 인증 완료 버튼 클릭 시 유효성 검사 (이메일 인증번호)
    const confirmButton = document.querySelector(
        ".register-email-code-box .button-btn-send"
    );
    confirmButton.addEventListener("click", function () {
        if (isEmailCodeSent) {
            const inputCode = emailCodeInput.value.trim();
            const correctCode = "123456"; // 예시: 올바른 인증번호

            const warningMessage = emailCodeInput
                .closest(".register-with-btn-box")
                .querySelector(".desc-span.warning-msg");

            // 입력값이 없을 때 경고 메시지 표시
            if (inputCode === "") {
                showWarningMessage("인증번호를 입력해 주세요.", emailCodeInput);
                emailCodeInput.classList.add("warning");
                emailCodeInput.style.borderColor = "#f05050";
            } else if (inputCode !== correctCode) {
                // 인증번호가 틀렸을 때 경고 메시지 표시
                showWarningMessage(
                    "인증번호가 일치하지 않습니다.",
                    emailCodeInput
                );
                emailCodeInput.classList.add("warning");
                emailCodeInput.style.borderColor = "#f05050";
            } else {
                // 인증 성공 시 성공 메시지 표시 및 스타일 적용
                clearInterval(emailTimerInterval);
                countdownTimer.textContent = ""; // 타이머 초기화
                emailCodeInput.classList.remove("warning");
                emailCodeInput.classList.add("success-sign");
                emailCodeInput.style.borderColor = "#189f14"; // 성공 시 색상 적용

                if (warningMessage) {
                    warningMessage.style.display = "none";
                }

                showSuccessMessage("인증 되었습니다.", emailCodeInput);
            }
        }
    });
    // 인증 번호 입력 시 인증 완료 버튼 활성화 및 기본 포커스 스타일 적용 (전화번호 인증번호)
    phoneCodeInput.addEventListener("input", function () {
        const phoneCodeValue = phoneCodeInput.value.trim();

        if (phoneCodeValue.length > 0) {
            confirmPhoneButton.classList.add("button-send-phone-active"); // 인증 완료 버튼 활성화
            confirmPhoneButton.style.cursor = "pointer"; // 커서 스타일 변경
            phoneCodeInput.style.borderColor = "blue"; // 기본 포커스 스타일 적용
        } else {
            confirmPhoneButton.classList.remove("button-send-phone-active"); // 입력값이 없으면 비활성화
            confirmPhoneButton.style.cursor = "default";
            phoneCodeInput.style.borderColor = "#ccc"; // 기본 테두리 색상으로 복원
        }
    });

    // 인증 완료 버튼 클릭 시 유효성 검사 (전화번호 인증번호)
    const confirmPhoneButton = document.querySelector(
        ".register-phone-code-box .button-btn-send-phone"
    );
    confirmPhoneButton.addEventListener("click", function () {
        if (isPhoneCodeSent) {
            const inputCode = phoneCodeInput.value.trim();
            const correctCode = "123456"; // 예시: 올바른 인증번호

            const warningMessage = phoneCodeInput
                .closest(".register-with-btn-box")
                .querySelector(".desc-span.warning-msg");

            // 입력값이 없을 때 경고 메시지 표시
            if (inputCode === "") {
                showWarningMessage("인증번호를 입력해 주세요.", phoneCodeInput);
                phoneCodeInput.classList.add("warning");
                phoneCodeInput.style.borderColor = "#f05050";
            } else if (inputCode !== correctCode) {
                // 인증번호가 틀렸을 때 경고 메시지 표시
                showWarningMessage(
                    "인증번호가 일치하지 않습니다.",
                    phoneCodeInput
                );
                phoneCodeInput.classList.add("warning");
                phoneCodeInput.style.borderColor = "#f05050";
            } else {
                // 인증 성공 시 성공 메시지 표시 및 스타일 적용
                clearInterval(phoneTimerInterval);
                phoneCountdownTimer.textContent = ""; // 타이머 초기화
                phoneCodeInput.classList.remove("warning");
                phoneCodeInput.classList.add("success-sign");
                phoneCodeInput.style.borderColor = "#189f14"; // 성공 시 색상 적용

                if (warningMessage) {
                    warningMessage.style.display = "none";
                }

                showSuccessMessage("인증 되었습니다.", phoneCodeInput);
            }
        }
    });

    completeButton.addEventListener("click", function () {
        const emailValue = emailInput.value.trim();
        const emailCodeValue = emailCodeInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const phoneCodeValue = phoneCodeInput.value.trim();

        // 이메일 입력 필드가 비어 있을 때 경고 메시지 표시
        if (emailValue.length === 0) {
            showWarningMessage("이메일 주소를 입력해 주세요.", emailInput);
            emailInput.classList.add("warning");
            emailInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
        }

        // 인증번호 입력 필드가 비어 있을 때 경고 메시지 표시
        if (emailCodeValue.length === 0) {
            showWarningMessage("인증번호를 입력해 주세요.", emailCodeInput);
            emailCodeInput.classList.add("warning");
            emailCodeInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
        }

        // 전화번호 입력 필드가 비어 있을 때 경고 메시지 표시
        if (phoneValue.length === 0) {
            showWarningMessage("전화번호를 입력해 주세요.", phoneInput);
            phoneInput.classList.add("warning");
            phoneInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
        }

        // 전화번호 인증번호 입력 필드가 비어 있을 때 경고 메시지 표시
        if (phoneCodeValue.length === 0) {
            showWarningMessage("인증번호를 입력해 주세요.", phoneCodeInput);
            phoneCodeInput.classList.add("warning");
            phoneCodeInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
        }

        if (!checkbox.checked) {
            checkboxWarningMessage.style.display = "block"; // 경고 메시지 표시
        } else {
            checkboxWarningMessage.style.display = "none"; // 체크박스가 체크되면 경고 메시지 숨기기
        }
        validatePasswords();
    });
    // ===================================================================================================

    // 체크박스 상태가 변경될 때 경고 메시지 표시/숨기기
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            checkboxWarningMessage.style.display = "none"; // 체크박스가 체크되면 경고 메시지 숨기기
        }
    });
    // ===================================================================================================

    // 비밀번호 입력 필드에서 포커스 스타일 적용
    passwordInput.addEventListener("focus", function () {
        if (
            !passwordInput.classList.contains("warning") &&
            !passwordInput.classList.contains("success-sign")
        ) {
            passwordInput.style.borderColor = "blue"; // 기본 포커스 스타일
        }
    });

    passwordInput.addEventListener("blur", function () {
        if (
            !passwordInput.classList.contains("warning") &&
            !passwordInput.classList.contains("success-sign")
        ) {
            passwordInput.style.borderColor = "#ccc"; // 포커스 해제 시 기본 테두리 색상
        }
    });

    // 비밀번호 확인 필드에서 포커스 스타일 적용
    passwordConfirmInput.addEventListener("focus", function () {
        if (
            !passwordConfirmInput.classList.contains("warning") &&
            !passwordConfirmInput.classList.contains("success-sign")
        ) {
            passwordConfirmInput.style.borderColor = "blue"; // 기본 포커스 스타일
        }
    });

    passwordConfirmInput.addEventListener("blur", function () {
        if (
            !passwordConfirmInput.classList.contains("warning") &&
            !passwordConfirmInput.classList.contains("success-sign")
        ) {
            passwordConfirmInput.style.borderColor = "#ccc"; // 포커스 해제 시 기본 테두리 색상
        }
    });

    // 비밀번호 입력 필드에서 입력 값이 변경될 때 호출되는 함수
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length > 0) {
            passwordInput.style.borderColor = "blue"; // 입력 중 기본 포커스 스타일
        } else {
            passwordInput.style.borderColor = "#ccc"; // 입력이 없을 경우 기본 테두리 색상
        }

        // 경고나 성공 상태 해제
        passwordInput.classList.remove("warning", "success-sign");
        const warningMessage = document.querySelector(".password-warning-msg");
        if (warningMessage) warningMessage.style.display = "none";
    });

    // 비밀번호 확인 필드에서 입력 값이 변경될 때 호출되는 함수
    passwordConfirmInput.addEventListener("input", function () {
        if (passwordConfirmInput.value.length > 0) {
            passwordConfirmInput.style.borderColor = "blue"; // 입력 중 기본 포커스 스타일
        } else {
            passwordConfirmInput.style.borderColor = "#ccc"; // 입력이 없을 경우 기본 테두리 색상
        }

        // 경고나 성공 상태 해제
        passwordConfirmInput.classList.remove("warning", "success-sign");
        const warningMessage = document.querySelector(".password-warning-msg");
        if (warningMessage) warningMessage.style.display = "none";
    });

    // 비밀번호 유효성 검사 함수
    function validatePasswords() {
        const passwordValue = passwordInput.value.trim(); // 비밀번호 입력값
        const passwordConfirmValue = passwordConfirmInput.value.trim(); // 비밀번호 확인 입력값

        // 초기화: 경고 메시지와 테두리 색상 리셋
        passwordWarningMessage.style.display = "none";
        passwordWarningMessage2.style.display = "none";
        passwordInput.classList.remove("warning");
        passwordConfirmInput.classList.remove("warning");
        passwordInput.style.borderColor = "#ccc"; // 기본 테두리 색상
        passwordConfirmInput.style.borderColor = "#ccc"; // 기본 테두리 색상

        // 비밀번호가 입력되지 않았을 때 경고 메시지 표시
        if (passwordValue.length === 0 && passwordConfirmValue.length === 0) {
            passwordWarningMessage.textContent = "비밀번호를 입력하세요";
            passwordWarningMessage.style.display = "block";
            passwordWarningMessage.classList.add("warning-msg"); // 경고 스타일 추가
            passwordInput.classList.add("warning");
            passwordConfirmInput.classList.add("warning");
            passwordInput.style.borderColor = "#f05050"; // 경고 색상
            passwordConfirmInput.style.borderColor = "#f05050"; // 경고 색상
            return; // 함수 종료
        }

        // 비밀번호가 6자 미만일 때 경고 메시지 표시
        if (passwordValue.length < 6 || passwordConfirmValue.length < 6) {
            passwordWarningMessage.textContent = "6자 이상 입력하세요";
            passwordWarningMessage.style.display = "block";
            passwordWarningMessage.classList.add("warning-msg"); // 경고 스타일 추가
            passwordInput.classList.add("warning");
            passwordConfirmInput.classList.add("warning");
            passwordInput.style.borderColor = "#f05050"; // 경고 색상
            passwordConfirmInput.style.borderColor = "#f05050"; // 경고 색상
            return; // 함수 종료
        }

        // 비밀번호와 확인 비밀번호가 일치하지 않을 때 경고 메시지 표시
        if (passwordValue !== passwordConfirmValue) {
            passwordWarningMessage2.textContent =
                "비밀번호가 일치하지 않습니다.";
            passwordWarningMessage2.style.display = "block";
            passwordWarningMessage2.classList.add("warning-msg"); // 경고 스타일 추가
            passwordInput.classList.add("warning");
            passwordConfirmInput.classList.add("warning");
            passwordInput.style.borderColor = "#f05050"; // 경고 색상
            passwordConfirmInput.style.borderColor = "#f05050"; // 경고 색상
            return; // 함수 종료
        }

        // 비밀번호가 일치하고 6자 이상이면 성공 메시지 표시 및 스타일 적용
        passwordWarningMessage.style.display = "block"; // 성공 메시지 표시
        passwordWarningMessage.textContent = "비밀번호가 일치합니다."; // 성공 메시지
        passwordWarningMessage.classList.remove("warning-msg"); // 경고 스타일 제거
        passwordWarningMessage.classList.add("success-msg"); // 성공 스타일 추가
        passwordInput.style.border = "1px solid #189f14"; // 성공 색상
        passwordConfirmInput.style.border = "1px solid #189f14"; // 성공 색상
    }

    // 경고 메시지를 출력하는 함수
    function showWarningMessage(message, element) {
        const parentElement = element.closest(".register-with-btn-box");

        let existingMessage = parentElement.querySelector(
            ".desc-span.warning-msg"
        );

        // 경고 메시지가 없으면 새로 생성
        if (!existingMessage) {
            const warningMessage = document.createElement("span");
            warningMessage.className = "desc-span warning-msg";
            warningMessage.textContent = message;
            warningMessage.style.display = "block";
            parentElement.appendChild(warningMessage);
        } else {
            // 기존 경고 메시지 업데이트
            existingMessage.textContent = message;
            existingMessage.style.display = "block";
        }
    }

    // 성공 메시지를 출력하는 함수
    function showSuccessMessage(message, element) {
        const parentElement = element.closest(".register-with-btn-box");

        // 기존 성공 메시지 제거
        const existingMessage = parentElement.querySelector(
            ".desc-span.success-msg"
        );
        if (existingMessage) {
            existingMessage.remove();
        }

        // 새 성공 메시지 생성
        const successMessage = document.createElement("span");
        successMessage.className = "desc-span success-msg";
        successMessage.textContent = message;
        successMessage.style.display = "block";

        parentElement.appendChild(successMessage);
    }

    // 비밀번호 보이기 버튼에 클릭 이벤트 리스너 추가
    passwordShowBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const inputElement = btn.parentElement.querySelector("input"); // 부모 요소에서 input 찾기
            togglePasswordVisibility(inputElement, btn);
        });
    });

    // 비밀번호 보이기/숨기기 토글 함수
    function togglePasswordVisibility(passwordInput, btn) {
        if (passwordInput && passwordInput.type === "password") {
            passwordInput.type = "text"; // 비밀번호 표시
            btn.src =
                "https://accounts-front.stunning.kr/assets/img/login/ico-visible.png"; // 아이콘 변경
        } else if (passwordInput) {
            passwordInput.type = "password"; // 비밀번호 숨기기
            btn.src =
                "https://accounts-front.stunning.kr/assets/img/login/ico-hidden.png"; // 아이콘 변경
        }
    }
});
