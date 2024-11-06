
// 게시글 목록의 전체 선택 및 개별 선택 체크박스 관리
const selectAllPosts = () => {
    const selectAllCheckbox = document.getElementById("selectAllPosts");
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", function () {
            const checkboxes = document.querySelectorAll(".postCheckbox");
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    // 개별 체크박스 클릭 시 전체 선택 체크박스 상태 업데이트
    document.querySelectorAll(".postCheckbox").forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const allChecked = document.querySelectorAll(".postCheckbox:checked").length === document.querySelectorAll(".postCheckbox").length;
            selectAllCheckbox.checked = allChecked;
        });
    });
};

function resetSelectAllPostsCheckbox() {
    const selectAllCheckbox = document.getElementById("selectAllPosts");
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
        console.log("게시글 목록 전체 선택 체크박스 해제 성공");
    } else {
        console.error("selectAllPosts 체크박스를 찾을 수 없습니다.");
    }
}



// 각 목록 초기화 시 호출
selectAllPosts();