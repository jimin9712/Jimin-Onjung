const notificationWriteButton = document.querySelector("button#notification-write-button");
notificationWriteButton.addEventListener("click", (e) => {
    const sections = document.querySelectorAll("section.admin-page");
    sections.forEach((section) => section.classList.remove("selected"));
    const notificationWriteSection = Array.from(sections).find(
        (section) => section.dataset.value === "공지사항 작성"
    );
    notificationWriteSection.classList.add("selected");
});