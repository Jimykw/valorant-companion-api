package com.valorantcompanion.service;

import com.valorantcompanion.dto.response.AgentResponse;
import com.valorantcompanion.dto.response.GamemodeResponse;
import com.valorantcompanion.dto.response.MapResponse;
import com.valorantcompanion.dto.response.WeaponResponse;
import com.valorantcompanion.mapper.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ValorantGameService {

    private final ValorantApiClient valorantApiClient;

    public List<AgentResponse> listAgents() {
        return valorantApiClient.getAgents().stream()
                .map(EntityMapper::toAgentResponse)
                .toList();
    }

    public AgentResponse getAgent(String uuid) {
        return EntityMapper.toAgentResponse(valorantApiClient.getAgentByUuid(uuid));
    }

    public List<MapResponse> listMaps() {
        return valorantApiClient.getMaps().stream()
                .map(EntityMapper::toMapResponse)
                .toList();
    }

    public MapResponse getMap(String uuid) {
        return EntityMapper.toMapResponse(valorantApiClient.getMapByUuid(uuid));
    }

    public List<WeaponResponse> listWeapons() {
        return valorantApiClient.getWeapons().stream()
                .map(EntityMapper::toWeaponResponse)
                .toList();
    }

    public WeaponResponse getWeapon(String uuid) {
        return EntityMapper.toWeaponResponse(valorantApiClient.getWeaponByUuid(uuid));
    }

    public List<GamemodeResponse> listGamemodes() {
        return valorantApiClient.getGamemodes().stream()
                .map(EntityMapper::toGamemodeResponse)
                .toList();
    }

    public GamemodeResponse getGamemode(String uuid) {
        return EntityMapper.toGamemodeResponse(valorantApiClient.getGamemodeByUuid(uuid));
    }
}
