package com.valorantcompanion.service;

import com.valorantcompanion.domain.entity.StrategicNote;
import com.valorantcompanion.domain.entity.User;
import com.valorantcompanion.dto.request.StrategicNoteRequest;
import com.valorantcompanion.dto.response.StrategicNoteResponse;
import com.valorantcompanion.exception.ResourceNotFoundException;
import com.valorantcompanion.mapper.EntityMapper;
import com.valorantcompanion.repository.StrategicNoteRepository;
import com.valorantcompanion.repository.UserRepository;
import com.valorantcompanion.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final StrategicNoteRepository noteRepository;
    private final UserRepository userRepository;

    public Page<StrategicNoteResponse> list(Pageable pageable) {
        return noteRepository.findByUserId(SecurityUtils.getCurrentUserId(), pageable)
                .map(EntityMapper::toNoteResponse);
    }

    public StrategicNoteResponse getById(UUID id) {
        return EntityMapper.toNoteResponse(findOwned(id));
    }

    @Transactional
    public StrategicNoteResponse create(StrategicNoteRequest request) {
        User user = userRepository.findById(SecurityUtils.getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        StrategicNote note = EntityMapper.toNote(request, user);
        return EntityMapper.toNoteResponse(noteRepository.save(note));
    }

    @Transactional
    public StrategicNoteResponse update(UUID id, StrategicNoteRequest request) {
        StrategicNote note = findOwned(id);
        EntityMapper.updateNote(note, request);
        return EntityMapper.toNoteResponse(noteRepository.save(note));
    }

    @Transactional
    public void delete(UUID id) {
        StrategicNote note = findOwned(id);
        noteRepository.delete(note);
    }

    private StrategicNote findOwned(UUID id) {
        return noteRepository.findByIdAndUserId(id, SecurityUtils.getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Nota não encontrada"));
    }
}
