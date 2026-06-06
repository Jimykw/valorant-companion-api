package com.valorantcompanion.service;

import com.valorantcompanion.domain.entity.Favorite;
import com.valorantcompanion.domain.entity.User;
import com.valorantcompanion.dto.request.FavoriteRequest;
import com.valorantcompanion.dto.response.FavoriteResponse;
import com.valorantcompanion.exception.BusinessException;
import com.valorantcompanion.exception.ResourceNotFoundException;
import com.valorantcompanion.mapper.EntityMapper;
import com.valorantcompanion.repository.FavoriteRepository;
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
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    public Page<FavoriteResponse> list(Pageable pageable) {
        return favoriteRepository.findByUserId(SecurityUtils.getCurrentUserId(), pageable)
                .map(EntityMapper::toFavoriteResponse);
    }

    @Transactional
    public FavoriteResponse create(FavoriteRequest request) {
        UUID userId = SecurityUtils.getCurrentUserId();

        if (favoriteRepository.existsByUserIdAndExternalIdAndItemType(
                userId, request.externalId(), request.itemType())) {
            throw new BusinessException("Favorito já cadastrado");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Favorite favorite = EntityMapper.toFavorite(request, user);
        return EntityMapper.toFavoriteResponse(favoriteRepository.save(favorite));
    }

    @Transactional
    public void delete(UUID id) {
        Favorite favorite = favoriteRepository.findByIdAndUserId(id, SecurityUtils.getCurrentUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Favorito não encontrado"));
        favoriteRepository.delete(favorite);
    }
}
