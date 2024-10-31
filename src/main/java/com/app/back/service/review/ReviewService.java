<<<<<<< HEAD
package com.app.back.service.review;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    @Async
    public void write(ReviewDTO reviewDTO, List<String> uuids, List<String> paths, List<MultipartFile> files) throws IOException;
    public Optional<ReviewDTO> getById(Long id);
    public List<ReviewDTO> getList(Pagination pagination);
    public int getTotal();
    public void update(ReviewDTO reviewDTO);
    public void delete(Long id);
}
=======
//package com.app.back.service.review;
//
//import com.app.back.domain.donation_record.DonationRecordDTO;
//import com.app.back.domain.post.Pagination;
//import com.app.back.domain.review.ReviewDTO;
//import com.app.back.domain.review.ReviewVO;
//import org.springframework.scheduling.annotation.Async;
//
//import java.util.List;
//import java.util.Optional;
//
//public interface ReviewService {
//    @Async
//    public void write(ReviewDTO reviewDTO);
//    public Optional<ReviewDTO> getById(Long id);
//    public List<ReviewDTO> getList(Pagination pagination);
//    public int getTotal();
//    public void update(ReviewDTO reviewDTO);
//    public void delete(Long id);
//
//    public List<ReviewDTO> findByMemberId(Long memberId); // 반환 타입 수정
//    public List<ReviewDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);
//}
>>>>>>> 2d6aacc74750ecea2fa4a97dce10f7f587c5046e
