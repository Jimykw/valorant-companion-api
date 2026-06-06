package com.valorantcompanion.controller;

import com.valorantcompanion.dto.response.AgentResponse;
import com.valorantcompanion.dto.response.GamemodeResponse;
import com.valorantcompanion.dto.response.MapResponse;
import com.valorantcompanion.dto.response.WeaponResponse;
import com.valorantcompanion.service.ValorantGameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/valorant")
@RequiredArgsConstructor
@Tag(name = "Valorant", description = "Dados do jogo via Valorant-API pública")
public class ValorantController {

    private final ValorantGameService valorantGameService;

    @GetMapping("/agents")
    @Operation(summary = "Listar agentes jogáveis")
    public ResponseEntity<List<AgentResponse>> listAgents() {
        return ResponseEntity.ok(valorantGameService.listAgents());
    }

    @GetMapping("/agents/{uuid}")
    @Operation(summary = "Buscar agente por UUID")
    public ResponseEntity<AgentResponse> getAgent(@PathVariable String uuid) {
        return ResponseEntity.ok(valorantGameService.getAgent(uuid));
    }

    @GetMapping("/maps")
    @Operation(summary = "Listar mapas")
    public ResponseEntity<List<MapResponse>> listMaps() {
        return ResponseEntity.ok(valorantGameService.listMaps());
    }

    @GetMapping("/maps/{uuid}")
    @Operation(summary = "Buscar mapa por UUID")
    public ResponseEntity<MapResponse> getMap(@PathVariable String uuid) {
        return ResponseEntity.ok(valorantGameService.getMap(uuid));
    }

    @GetMapping("/weapons")
    @Operation(summary = "Listar armas")
    public ResponseEntity<List<WeaponResponse>> listWeapons() {
        return ResponseEntity.ok(valorantGameService.listWeapons());
    }

    @GetMapping("/weapons/{uuid}")
    @Operation(summary = "Buscar arma por UUID")
    public ResponseEntity<WeaponResponse> getWeapon(@PathVariable String uuid) {
        return ResponseEntity.ok(valorantGameService.getWeapon(uuid));
    }

    @GetMapping("/gamemodes")
    @Operation(summary = "Listar modos de jogo")
    public ResponseEntity<List<GamemodeResponse>> listGamemodes() {
        return ResponseEntity.ok(valorantGameService.listGamemodes());
    }

    @GetMapping("/gamemodes/{uuid}")
    @Operation(summary = "Buscar modo de jogo por UUID")
    public ResponseEntity<GamemodeResponse> getGamemode(@PathVariable String uuid) {
        return ResponseEntity.ok(valorantGameService.getGamemode(uuid));
    }
}
