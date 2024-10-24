package com.app.back.mapper.notice;

import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.notice.NoticeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface NoticeMapper {
//    추가
    public void insert(NoticeVO noticeVO);
//    조회
    public NoticeDTO selectById(Long id);

}
