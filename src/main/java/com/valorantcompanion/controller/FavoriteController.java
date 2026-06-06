package com.valorantcompanion.controller;

import com.valorantcompanion.dto.request.FavoriteRequest;
import com.valorantcompanion.dto.response.FavoriteResponse;
import com.valorantcompanion.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/favorites")
@RequiredArgsConstructor
@Tag(name = "Favoritos", description = "Favoritos do usuário")
@SecurityRequirement(name = "Bearer Authentication")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    @Operation(summary = "Listar favoritos paginados")
    public ResponseEntity<Page<FavoriteResponse>> list(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(favoriteService.list(pageable));
    }

    @PostMapping
    @Operation(summary = "Adicionar favorito")
    public ResponseEntity<FavoriteResponse> create(@Valid @RequestBody FavoriteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteService.create(request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover favorito")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        favoriteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
