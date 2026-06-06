package com.valorantcompanion.service;

import com.valorantcompanion.config.ValorantApiProperties;
import com.valorantcompanion.dto.external.AgentExternalDto;
import com.valorantcompanion.dto.external.GamemodeExternalDto;
import com.valorantcompanion.dto.external.MapExternalDto;
import com.valorantcompanion.dto.external.ValorantApiSingleWrapper;
import com.valorantcompanion.dto.external.ValorantApiWrapper;
import com.valorantcompanion.dto.external.WeaponExternalDto;
import com.valorantcompanion.exception.ExternalApiException;
import com.valorantcompanion.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ValorantApiClient {

    private final RestClient.Builder restClientBuilder;
    private final ValorantApiProperties properties;

    public List<AgentExternalDto> getAgents() {
        return fetchList("/agents?isPlayableCharacter=true",
                new ParameterizedTypeReference<ValorantApiWrapper<AgentExternalDto>>() {});
    }

    public AgentExternalDto getAgentByUuid(String uuid) {
        AgentExternalDto agent = fetchSingle("/agents/" + uuid,
                new ParameterizedTypeReference<ValorantApiSingleWrapper<AgentExternalDto>>() {});
        if (agent == null || agent.uuid() == null) {
            throw new ResourceNotFoundException("Agente não encontrado: " + uuid);
        }
        return agent;
    }

    public List<MapExternalDto> getMaps() {
        return fetchList("/maps", new ParameterizedTypeReference<ValorantApiWrapper<MapExternalDto>>() {});
    }

    public MapExternalDto getMapByUuid(String uuid) {
        MapExternalDto map = fetchSingle("/maps/" + uuid,
                new ParameterizedTypeReference<ValorantApiSingleWrapper<MapExternalDto>>() {});
        if (map == null || map.uuid() == null) {
            throw new ResourceNotFoundException("Mapa não encontrado: " + uuid);
        }
        return map;
    }

    public List<WeaponExternalDto> getWeapons() {
        return fetchList("/weapons", new ParameterizedTypeReference<ValorantApiWrapper<WeaponExternalDto>>() {});
    }

    public WeaponExternalDto getWeaponByUuid(String uuid) {
        WeaponExternalDto weapon = fetchSingle("/weapons/" + uuid,
                new ParameterizedTypeReference<ValorantApiSingleWrapper<WeaponExternalDto>>() {});
        if (weapon == null || weapon.uuid() == null) {
            throw new ResourceNotFoundException("Arma não encontrada: " + uuid);
        }
        return weapon;
    }

    public List<GamemodeExternalDto> getGamemodes() {
        return fetchList("/gamemodes", new ParameterizedTypeReference<ValorantApiWrapper<GamemodeExternalDto>>() {});
    }

    public GamemodeExternalDto getGamemodeByUuid(String uuid) {
        GamemodeExternalDto mode = fetchSingle("/gamemodes/" + uuid,
                new ParameterizedTypeReference<ValorantApiSingleWrapper<GamemodeExternalDto>>() {});
        if (mode == null || mode.uuid() == null) {
            throw new ResourceNotFoundException("Modo de jogo não encontrado: " + uuid);
        }
        return mode;
    }

    private <T> List<T> fetchList(String path, ParameterizedTypeReference<ValorantApiWrapper<T>> type) {
        try {
            ValorantApiWrapper<T> wrapper = restClient().get()
                    .uri(path)
                    .retrieve()
                    .body(type);
            if (wrapper == null || wrapper.data() == null) {
                return List.of();
            }
            return wrapper.data();
        } catch (RestClientException ex) {
            throw new ExternalApiException("Falha ao consultar Valorant-API", ex);
        }
    }

    private <T> T fetchSingle(String path, ParameterizedTypeReference<ValorantApiSingleWrapper<T>> type) {
        try {
            ValorantApiSingleWrapper<T> wrapper = restClient().get()
                    .uri(path)
                    .retrieve()
                    .body(type);
            if (wrapper == null) {
                return null;
            }
            return wrapper.data();
        } catch (RestClientException ex) {
            throw new ExternalApiException("Falha ao consultar Valorant-API", ex);
        }
    }

    private RestClient restClient() {
        return restClientBuilder
                .baseUrl(properties.getBaseUrl())
                .build();
    }
}
