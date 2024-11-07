package com.app.back.service.volunteer;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;


import java.util.List;
import java.util.Optional;

public interface VolunteerService {

    //    봉사모집 작성
    void write(VolunteerDTO volunteerDTO);

    //    봉사모집 목록
    public List<VolunteerDTO> getList(Pagination pagination);

    //    게시글 전체 개수 조회
    public int getTotal();

    //    개시글 조회
    public Optional<VolunteerDTO> getById(Long id);

    //    개시글 수정
    public void update(ReviewDTO reviewDTO);

    //    개시글 삭제
    public void delete(Long id);
}


