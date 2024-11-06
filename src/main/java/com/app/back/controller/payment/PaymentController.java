package com.app.back.controller.payment;

import com.app.back.domain.payment.PaymentDTO;
import com.app.back.service.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/write")
    public void createPayment(@RequestBody PaymentDTO paymentDTO) {
        paymentService.save(paymentDTO);
    }

    @GetMapping("/{id}")
    public Optional<PaymentDTO> getPaymentById(@PathVariable Long id) {
        return paymentService.findById(id);
    }

    @GetMapping("/all")
    public List<PaymentDTO> getAllPayments() {
        return paymentService.findAll();
    }

    @PutMapping("/update")
    public void updatePayment(@RequestBody PaymentDTO paymentDTO) {
        paymentService.update(paymentDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deleteById(id);
    }

    @GetMapping("/my-payments/{memberId}")
    public List<PaymentDTO> getMyPayments(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        log.info("Received member ID: {}, start date: {}, end date: {}",
                memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return paymentService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return paymentService.findByMemberId(memberId);
        }
    }

//    @PostMapping("/order")
//    public ResponseEntity<String> completePayment(@RequestBody Map<String, Object> paymentData) {
//        try {
//            Long workId = Long.parseLong(paymentData.get("workId").toString());
//            Long memberProfileId = Long.parseLong(paymentData.get("memberProfileId").toString());
//
//            MemberProfileVO memberProfile = (MemberProfileVO) session.getAttribute("memberProfile");
//            if (memberProfile == null) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("세션에 멤버 프로필 정보가 없습니다.");
//            }
//
//            BuyWorkDTO buyWorkDTO = new BuyWorkDTO();
//            buyWorkDTO.setWorkId(workId);
//            buyWorkDTO.setMemberProfileId(memberProfileId);
//            buyWorkDTO.setProfileName(memberProfile.getProfileName());
//            buyWorkDTO.setProfilePhone(memberProfile.getProfilePhone());
//            buyWorkDTO.setProfileEmail(memberProfile.getProfileEmail());
//            buyWorkDTO.setWorkSendStatus("0");
//
//            buyWorkService.savePurchase(buyWorkDTO.toVO());
//
//            return ResponseEntity.ok("결제 정보가 성공적으로 저장되었습니다.");
//        } catch (Exception e) {
//            log.error("결제 저장 중 오류 발생: ", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("저장 중 오류가 발생했습니다.");
//        }
//    }
}
