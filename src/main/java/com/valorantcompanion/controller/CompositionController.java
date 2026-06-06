package com.valorantcompanion.controller;

import com.valorantcompanion.dto.request.CompositionRequest;
import com.valorantcompanion.dto.response.CompositionResponse;
import com.valorantcompanion.service.CompositionService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/compositions")
@RequiredArgsConstructor
@Tag(name = "Composições", description = "Composições de time do usuário")
@SecurityRequirement(name = "Bearer Authentication")
public class CompositionController {

    private final CompositionService compositionService;

    @GetMapping
    @Operation(summary = "Listar composições paginadas")
    public ResponseEntity<Page<CompositionResponse>> list(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(compositionService.list(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar composição por ID")
    public ResponseEntity<CompositionResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(compositionService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Criar composição com 5 agentes")
    public ResponseEntity<CompositionResponse> create(@Valid @RequestBody CompositionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compositionService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar composição")
    public ResponseEntity<CompositionResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody CompositionRequest request) {
        return ResponseEntity.ok(compositionService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir composição")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        compositionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
