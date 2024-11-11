// AdminPostStatus.java
package com.app.back.enums;

public enum AdminPostStatus {
    VISIBLE("1"),   // 보이는 상태
    DELETED("0");   // 삭제된 상태

    private final String status;

    AdminPostStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public static AdminPostStatus fromString(String status) {
        for (AdminPostStatus s : AdminPostStatus.values()) {
            if (s.status.equals(status)) {
                return s;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + status);
    }
}
