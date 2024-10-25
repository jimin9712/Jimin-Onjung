package com.app.back.service.notice;

import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.notice.NoticeVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;

import java.util.List;
import java.util.Optional;

public interface NoticeService {
//    public void write(NoticeVO noticeVO, List<FileVO> files);
    public List<NoticeDTO> getList(Pagination pagination, Search search);
    public int getTotal();
    public int getTotalWithSearch(Search search);
    public Optional<NoticeDTO> getPost(Long id);
}
