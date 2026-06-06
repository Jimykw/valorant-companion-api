package com.valorantcompanion.service;

import com.valorantcompanion.domain.entity.TeamComposition;
import com.valorantcompanion.domain.entity.User;
import com.valorantcompanion.dto.request.CompositionAgentRequest;
import com.valorantcompanion.dto.request.CompositionRequest;
import com.valorantcompanion.dto.response.CompositionResponse;
import com.valorantcompanion.exception.BusinessException;
import com.valorantcompanion.exception.ResourceNotFoundException;
import com.valorantcompanion.mapper.EntityMapper;
import com.valorantcompanion.repository.TeamCompositionRepository;
import com.valorantcompanion.repository.UserRepository;
import com.valorantcompanion.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompositionService {

    private final TeamCompositionRepository compositionRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<CompositionResponse> list(Pageable pageable) {
        return compositionRepository.findByUserId(SecurityUtils.getCurrentUserId(), pageable)
                .map(EntityMapper::toCompositionResponse);
    }

    @Transactional(readOnly = true)
    public CompositionResponse getById(UUID id) {
        return EntityMapper.toCompositionResponse(findOwned(id));
    }

    @Transactional
    public CompositionResponse create(CompositionRequest request) {
        validateAgents(request);
        User user = userRepository.findById(SecurityUtils.getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        TeamComposition composition = EntityMapper.toComposition(request, user);
        return EntityMapper.toCompositionResponse(compositionRepository.save(composition));
    }

    @Transactional
    public CompositionResponse update(UUID id, CompositionRequest request) {
        validateAgents(request);
        TeamComposition composition = findOwned(id);
        EntityMapper.updateComposition(composition, request);
        return EntityMapper.toCompositionResponse(compositionRepository.save(composition));
    }

    @Transactional
    public void delete(UUID id) {
        TeamComposition composition = findOwned(id);
        compositionRepository.delete(composition);
    }

    private TeamComposition findOwned(UUID id) {
        return compositionRepository.findByIdAndUserId(id, SecurityUtils.getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Composição não encontrada"));
    }

    private void validateAgents(CompositionRequest request) {
        if (request.agents() == null || request.agents().size() != 5) {
            throw new BusinessException("A composição deve ter exatamente 5 agentes");
        }

        Set<Integer> slots = new HashSet<>();
        Set<String> agentUuids = new HashSet<>();

        for (CompositionAgentRequest agent : request.agents()) {
            if (!slots.add(agent.slotOrder())) {
                throw new BusinessException("slotOrder duplicado: " + agent.slotOrder());
            }
            if (agent.slotOrder() < 1 || agent.slotOrder() > 5) {
                throw new BusinessException("slotOrder deve estar entre 1 e 5");
            }
            if (!agentUuids.add(agent.agentUuid())) {
                throw new BusinessException("Agente duplicado na composição");
            }
        }
    }
}
