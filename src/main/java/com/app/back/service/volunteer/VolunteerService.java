package com.app.back.service.volunteer;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface VolunteerService {
    //    봉사모집 작성
    void write(VolunteerDTO volunteerDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files) throws IOException;;
    //    봉사모집 목록
    public List<VolunteerDTO> getList(Pagination pagination);
    //    게시글 전체 개수 조회
    public int getTotal();
    //    개시글 조회
    public Optional<VolunteerDTO> getById(Long id);
    //    개시글 수정
    public void update(VolunteerDTO volunteerDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files, List<Long> ids) throws IOException;
    //    개시글 삭제
    public void delete(Long id);

    public List<VolunteerDTO> findByMemberId(Long memberId); // 반환 타입 수정
    public List<VolunteerDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);
}


