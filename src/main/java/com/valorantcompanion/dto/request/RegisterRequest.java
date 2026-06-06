package com.valorantcompanion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados para cadastro de usuário")
public record RegisterRequest(
        @NotBlank @Size(min = 3, max = 50)
        @Schema(example = "jett_main")
        String username,

        @NotBlank @Email
        @Schema(example = "jett@example.com")
        String email,

        @NotBlank @Size(min = 6, max = 100)
        @Schema(example = "senha123")
        String password
) {
}
