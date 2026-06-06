package com.valorantcompanion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Schema(description = "Nota estratégica")
public record StrategicNoteRequest(
        @NotBlank @Size(max = 150)
        @Schema(example = "Execução B site Bind")
        String title,

        @Size(max = 64)
        @Schema(example = "2c9d57b4-4431-b6c3-7eaecc1b4337")
        String mapUuid,

        @NotBlank
        @Schema(example = "Smoke A main, flash para cubby, entry com duelist...")
        String content,

        @Size(max = 10)
        List<@NotBlank @Size(max = 64) String> relatedAgentUuids
) {
}
