package com.app.back.controller.donation_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.service.donation_record.DonationRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/donation-records")
@RequiredArgsConstructor
@Slf4j
public class DonationRecordController {

    private final DonationRecordService donationRecordService;

    // 기부 기록 생성
    @PostMapping("/create")
    public void createDonationRecord(@RequestBody DonationRecordDTO donationRecordDTO) {
        donationRecordService.save(donationRecordDTO);
    }

    // ID로 특정 기부 기록 조회
    @GetMapping("/{id}")
    public Optional<DonationRecordDTO> getDonationRecordById(@PathVariable Long id) {
        return donationRecordService.findById(id);
    }

    // 모든 기부 기록 조회
    @GetMapping("/all")
    public List<DonationRecordDTO> getAllDonationRecords() {
        return donationRecordService.findAll();
    }

    // 기부 기록 수정
    @PutMapping("/update")
    public void updateDonationRecord(@RequestBody DonationRecordDTO dto) {
        donationRecordService.update(dto);
    }

    // ID로 기부 기록 삭제
    @DeleteMapping("/{id}")
    public void deleteDonationRecord(@PathVariable Long id) {
        donationRecordService.deleteById(id);
    }
    //   기부한 내역 합산
    @GetMapping("/total/{memberId}")
    public int getTotalDonationByMemberId(@PathVariable Long memberId) {
        log.info("받은 회원 ID: {}", memberId);
        int total = donationRecordService.getTotalDonationByMemberId(memberId);
        log.info("Total Donation for memberId {}: {}", memberId, total); // 결과 로그
        return total;
    }
    @GetMapping("/my-donation/{memberId}")
    public List<DonationRecordDTO> getMyDonationRecords(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        log.info("받은 회원 ID: {}, 시작 날짜: {}, 끝 날짜: {}",
                memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return donationRecordService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return donationRecordService.findByMemberId(memberId);
        }
    }
}
