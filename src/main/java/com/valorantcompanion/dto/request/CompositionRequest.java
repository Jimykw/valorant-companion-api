package com.valorantcompanion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Schema(description = "Composição de time com 5 agentes")
public record CompositionRequest(
        @NotBlank @Size(max = 100)
        @Schema(example = "Comp Ataque Ascent")
        String name,

        @Size(max = 64)
        @Schema(example = "7eaecc1b-4337-bbf6-6ae9-04b0f06dee4d")
        String mapUuid,

        @Size(max = 500)
        @Schema(example = "Rush A com smokes no meio")
        String description,

        @NotNull @Valid @Size(min = 5, max = 5)
        List<CompositionAgentRequest> agents
) {
}
