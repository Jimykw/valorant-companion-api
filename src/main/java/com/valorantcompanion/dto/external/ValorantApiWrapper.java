package com.valorantcompanion.dto.external;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ValorantApiWrapper<T>(
        Integer status,
        List<T> data
) {
}
