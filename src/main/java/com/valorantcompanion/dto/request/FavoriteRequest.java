package com.valorantcompanion.dto.request;

import com.valorantcompanion.domain.enums.FavoriteItemType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Novo favorito")
public record FavoriteRequest(
        @NotBlank @Size(max = 64)
        @Schema(example = "e370fa57-4757-3604-3648-499e1f642d3c")
        String externalId,

        @NotNull
        @Schema(example = "AGENT")
        FavoriteItemType itemType,

        @Size(max = 120)
        @Schema(example = "Jett")
        String displayName
) {
}
