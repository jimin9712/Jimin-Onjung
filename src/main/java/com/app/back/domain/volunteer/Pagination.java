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
        // 현재 페이지 설정 (null인 경우 1로 초기화)
        this.page = (page == null || page < 1) ? 1 : page;

        // 한 페이지에 보여줄 게시물 개수
        this.rowCount = 10;

        // 한 블록에 보여줄 페이지 수 (예: 1, 2, 3, ..., 10)
        this.pageCount = 10;

        // 조회 끝 행 번호 계산
        this.endRow = page * rowCount;
        // 조회 시작 행 번호 계산
        this.startRow = (page - 1) * rowCount + 1;

        // 전체 게시물 수에 따른 실제 마지막 페이지 번호 계산
        this.realEnd = (int) Math.ceil((double) total / rowCount);

        // 현재 블록의 끝 페이지 번호 계산 (예: 10, 20, 30...)
        this.endPage = (int) (Math.ceil((double) page / pageCount) * pageCount);
        // 현재 블록의 시작 페이지 번호 계산
        this.startPage = endPage - pageCount + 1;

        // 실제 마지막 페이지 번호가 현재 블록의 끝 페이지 번호보다 작으면 설정
        if (realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }

        // 이전, 다음 페이지 블록 존재 여부 설정
        this.prev = startPage > 1;
        this.next = endPage < realEnd;

        // SQL LIMIT 문법 사용 시, 0부터 시작하므로 startRow 값을 조정
        this.startRow -= 1;
    }

}