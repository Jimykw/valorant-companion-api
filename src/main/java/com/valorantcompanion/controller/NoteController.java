package com.valorantcompanion.controller;

import com.valorantcompanion.dto.request.StrategicNoteRequest;
import com.valorantcompanion.dto.response.StrategicNoteResponse;
import com.valorantcompanion.service.NoteService;
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
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
@Tag(name = "Notas", description = "Notas estratégicas do usuário")
@SecurityRequirement(name = "Bearer Authentication")
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    @Operation(summary = "Listar notas paginadas")
    public ResponseEntity<Page<StrategicNoteResponse>> list(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(noteService.list(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar nota por ID")
    public ResponseEntity<StrategicNoteResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(noteService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Criar nota estratégica")
    public ResponseEntity<StrategicNoteResponse> create(@Valid @RequestBody StrategicNoteRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar nota estratégica")
    public ResponseEntity<StrategicNoteResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody StrategicNoteRequest request) {
        return ResponseEntity.ok(noteService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir nota estratégica")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
