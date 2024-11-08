package com.app.back.enums;

public enum AdminPostType {
    VOLUNTEER("봉사활동 모집글"),
    DONATION("기부 게시글"),
    SUPPORT("후원 게시글"),
    REVIEW("이용 후기");

    private final String displayPostName;

    // 생성자에서 한글 이름을 매핑
    AdminPostType(String displayName) {
        this.displayPostName = displayName;
    }

    // 한글 이름을 반환하는 메서드
    public String getDisplayName() {
        return displayPostName;
    }

    //  displayName을 PostType으로 변환하는 메서드
    public static PostType fromDisplayName(String displayName) {
        for (PostType type : PostType.values()) {
            if (type.getDisplayName().equals(displayName)) {
                return type;
            }
        }
        return null; // No match found
    }

    }
