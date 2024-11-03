package com.app.back.repository.volunteer;


import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class VolunteerDAO {
    private final VolunteerMapper volunteerMapper;

//    봉사활동모집 작성
    public void save(VolunteerVO volunteerVO) {volunteerMapper.insert(volunteerVO);}


//    게시글 전체 개수 조회(목록 가져오기<최신순, 조회수 순, 마감 임박 순>)
    public List<VolunteerDTO> findAll(Pagination pagination) {
    return volunteerMapper.selectAll(pagination);
}

//    게시글 전체 개수 조회
    public int getTotal(){
        return volunteerMapper.selectTotal();
}

    //    게시글 조회
    public Optional<VolunteerDTO> findById(Long id){
        return volunteerMapper.selectById(id);
    }

    //    게시글 조회수 증가
    public void updatePostReadCount(Long id){
        volunteerMapper.updatePostReadCount(id);
    }


//  게시글 수정





}
