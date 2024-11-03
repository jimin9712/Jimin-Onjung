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
        this.page = (page == null || page < 1) ? 1 : page;
        this.rowCount = 10; // 페이지당 10개의 항목을 표시
        this.pageCount = 10;

        this.endRow = page * rowCount;
        this.startRow = (page - 1) * rowCount; // 0부터 시작하도록 조정

        this.realEnd = (int) Math.ceil((double) total / rowCount);

        this.endPage = (int) (Math.ceil((double) page / pageCount) * pageCount);
        this.startPage = endPage - pageCount + 1;

        if (realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }

        this.prev = startPage > 1;
        this.next = endPage < realEnd;
    }


}