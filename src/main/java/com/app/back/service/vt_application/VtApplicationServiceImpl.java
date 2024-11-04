package com.app.back.service.vt_application;

import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.repository.vt_application.VtApplicationDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class VtApplicationServiceImpl implements VtApplicationService {
    private final VtApplicationDAO vtApplicationDAO;

    @Override
    public void save(VtApplicationDTO vtApplicationDTO) {
        vtApplicationDAO.save(vtApplicationDTO);
    }

    @Override
    public VtApplicationDTO findById(Long id) {
        return vtApplicationDAO.findById(id);
    }


    @Override
    public List<VtApplicationDTO> findAll() {
        return vtApplicationDAO.findAll();
    }

    @Override
    public void update(VtApplicationDTO vtApplicationDTO) {
        vtApplicationDAO.update(vtApplicationDTO);
    }

    @Override
    public void deleteById(Long id) {
        vtApplicationDAO.deleteById(id);
    }

    @Override
    public List<VtApplicationDTO> getApplicationsByVtId(Long vtId) {
        return vtApplicationDAO.findByVtId(vtId);
    }

    @Override
    public int getApplicationCountByVtId(Long vtId) {
        return vtApplicationDAO.countByVtId(vtId);
    }

    @Override
    public void approveApplication(Long applicationId) {
        log.info("Approving application with ID: {}", applicationId);
        vtApplicationDAO.updateApplicationStatus(applicationId, "APPROVED");
        log.info("Application with ID: {} approved successfully.", applicationId);
    }

    @Override
    public void refuseApplication(Long applicationId) {
        log.info("Refusing application with ID: {}", applicationId);
        vtApplicationDAO.updateApplicationStatus(applicationId, "REJECTED");
        log.info("Application with ID: {} refused successfully.", applicationId);
    }

    @Override
    public List<VtApplicationDTO> getApplicationsByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return vtApplicationDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }


    @Override
    public List<VtApplicationDTO> getApplicationsByMemberId(Long memberId) {
        return vtApplicationDAO.findByMemberId(memberId);
    }

}
