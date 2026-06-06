package com.valorantcompanion.service;

import com.valorantcompanion.domain.entity.User;
import com.valorantcompanion.dto.request.UpdateProfileRequest;
import com.valorantcompanion.dto.response.UserResponse;
import com.valorantcompanion.exception.BusinessException;
import com.valorantcompanion.exception.ResourceNotFoundException;
import com.valorantcompanion.mapper.EntityMapper;
import com.valorantcompanion.repository.UserRepository;
import com.valorantcompanion.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getCurrentProfile() {
        return EntityMapper.toUserResponse(findUser(SecurityUtils.getCurrentUserId()));
    }

    @Transactional
    public UserResponse updateCurrentProfile(UpdateProfileRequest request) {
        UUID userId = SecurityUtils.getCurrentUserId();
        User user = findUser(userId);

        if (request.username() != null && !request.username().isBlank()) {
            if (!request.username().equals(user.getUsername())
                    && userRepository.existsByUsername(request.username())) {
                throw new BusinessException("Username já cadastrado");
            }
            user.setUsername(request.username());
        }

        return EntityMapper.toUserResponse(userRepository.save(user));
    }

    private User findUser(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    }
}
