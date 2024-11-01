package com.app.back.domain.volunteer;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Pagination {
    private Integer page;
    private int startRow;
    private int endRow;
    private int rowCount;
    private int pageCount;
    private int startPage;
    private int endPage;
    private int realEnd;
    private boolean prev, next;
    private int total;
    private String order;
//        더보기 구현 시, 1개 더 가져오는 변수이다.
    private int moreRowcount;

    public void progress() {
        this.page = page == null ? 1 : page;
        this.rowCount = 10;
        this.moreRowcount = rowCount + 1;
        this.pageCount = 10;

        // 페이지 관련 계산
        this.endRow = page * rowCount;
        this.startRow = endRow - rowCount + 1;
        this.endPage = (int)(Math.ceil(page / (double)pageCount) * pageCount);
        this.startPage = endPage - pageCount + 1;

        // 실제 페이지의 끝 (실제 총 페이지 수)
        this.realEnd = (int) Math.ceil((double) total / rowCount);

        // realEnd가 endPage보다 작으면 endPage를 realEnd로 설정
        if (realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }

        // prev, next 설정
        this.prev = startPage > 1;
        this.next = endPage < realEnd;

        // SQL 쿼리에서 사용할 startRow 조정 (0부터 시작하도록)
        this.startRow--;
    }

    public void vtProgress() {
        // 현재 페이지가 null이거나 1 미만일 경우 1로 설정
        this.page = (this.page == null || this.page < 1) ? 1 : this.page;
        this.rowCount = 10; // 페이지 당 항목 수
        this.pageCount = 10; // 보여줄 페이지 버튼 개수

        // 페이지 번호에 따른 시작/끝 행 계산
        this.endRow = page * rowCount;
        this.startRow = endRow - rowCount + 1;

        // 실제 마지막 페이지 번호 계산
        if (total > 0) {
            this.realEnd = (int) Math.ceil((double) total / rowCount);
        } else {
            this.realEnd = 1; // total이 0인 경우 최소 1 페이지를 설정
        }

        // 현재 페이지에 따른 끝 페이지 설정
        this.endPage = (int) (Math.ceil((double) page / pageCount) * pageCount);
        this.startPage = endPage - pageCount + 1;

        // 만약 realEnd가 endPage보다 작다면, endPage를 realEnd로 설정
        if (realEnd < endPage) {
            endPage = realEnd;
        }

        // 시작 페이지가 1보다 작으면 1로 고정
        if (startPage < 1) {
            startPage = 1;
        }

        // 이전, 다음 버튼 활성화 여부 설정
        this.prev = startPage > 1;
        this.next = endPage < realEnd;
    }

}