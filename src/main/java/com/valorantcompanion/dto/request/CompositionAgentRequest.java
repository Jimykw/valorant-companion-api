package com.valorantcompanion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Agente em uma composição")
public record CompositionAgentRequest(
        @NotBlank @Size(max = 64)
        @Schema(example = "e370fa57-4757-3604-3648-499e1f642d3c")
        String agentUuid,

        @NotNull @Min(1) @Max(5)
        @Schema(example = "1")
        Integer slotOrder,

        @Size(max = 50)
        @Schema(example = "Duelist")
        String suggestedRole
) {
}
