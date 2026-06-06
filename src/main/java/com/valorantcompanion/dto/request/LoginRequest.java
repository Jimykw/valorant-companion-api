package com.valorantcompanion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Credenciais de login")
public record LoginRequest(
        @NotBlank @Email
        @Schema(example = "jett@example.com")
        String email,

        @NotBlank
        @Schema(example = "senha123")
        String password
) {
}
