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
    private String postType;  // postType 필드 추가
    private int moreRowcount;

    public void progress() {
        this.page = page == null ? 1 : page;
        this.rowCount = 5;
        this.moreRowcount = rowCount + 1;
        this.pageCount = 10;
        this.endRow = page * rowCount;
        this.startRow = endRow - rowCount + 1;
        this.endPage = (int)(Math.ceil(page / (double)pageCount) * pageCount);
        this.startPage = endPage - pageCount + 1;
        this.realEnd = (int)Math.ceil(total / (double)rowCount);
        if(realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }
        this.prev = startPage > 1;
        this.next = endPage < realEnd;
        this.startRow--;
    }

    public void vtProgress() {
        this.page = (page == null || page < 1) ? 1 : page;
        this.rowCount = 10;
        this.pageCount = 10;

        this.endRow = page * rowCount;
        this.startRow = (page - 1) * rowCount;

        this.realEnd = (int) Math.ceil((double) total / rowCount);

        this.endPage = (int) (Math.ceil((double) page / pageCount) * pageCount);
        this.startPage = endPage - pageCount + 1;

        if (realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }

        this.prev = startPage > 1;
        this.next = endPage < realEnd;

        // 페이지네이션 설정 완료 후 로그 출력
//        log.info("Pagination 설정 - page: {}, startRow: {}, endRow: {}, startPage: {}, endPage: {}, realEnd: {}",
//                page, startRow, endRow, startPage, endPage, realEnd);

        log.info("페이지네이션 설정 - page: {}, startRow: {}, endRow: {}", page, startRow, endRow);

    }


}