package com.valorantcompanion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

@Schema(description = "Atualização parcial do perfil")
public record UpdateProfileRequest(
        @Size(min = 3, max = 50)
        @Schema(example = "jett_main_br")
        String username
) {
}
