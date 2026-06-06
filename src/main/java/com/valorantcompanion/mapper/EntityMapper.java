package com.valorantcompanion.mapper;

import com.valorantcompanion.domain.entity.CompositionAgent;
import com.valorantcompanion.domain.entity.Favorite;
import com.valorantcompanion.domain.entity.StrategicNote;
import com.valorantcompanion.domain.entity.TeamComposition;
import com.valorantcompanion.domain.entity.User;
import com.valorantcompanion.dto.external.AgentExternalDto;
import com.valorantcompanion.dto.external.GamemodeExternalDto;
import com.valorantcompanion.dto.external.MapExternalDto;
import com.valorantcompanion.dto.external.WeaponExternalDto;
import com.valorantcompanion.dto.request.CompositionAgentRequest;
import com.valorantcompanion.dto.request.CompositionRequest;
import com.valorantcompanion.dto.request.FavoriteRequest;
import com.valorantcompanion.dto.request.StrategicNoteRequest;
import com.valorantcompanion.dto.response.AgentResponse;
import com.valorantcompanion.dto.response.CompositionAgentResponse;
import com.valorantcompanion.dto.response.CompositionResponse;
import com.valorantcompanion.dto.response.FavoriteResponse;
import com.valorantcompanion.dto.response.GamemodeResponse;
import com.valorantcompanion.dto.response.MapResponse;
import com.valorantcompanion.dto.response.StrategicNoteResponse;
import com.valorantcompanion.dto.response.UserResponse;
import com.valorantcompanion.dto.response.WeaponResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class EntityMapper {

    private EntityMapper() {
    }

    public static UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }

    public static Favorite toFavorite(FavoriteRequest request, User user) {
        return Favorite.builder()
                .user(user)
                .externalId(request.externalId())
                .itemType(request.itemType())
                .displayName(request.displayName())
                .build();
    }

    public static FavoriteResponse toFavoriteResponse(Favorite favorite) {
        return new FavoriteResponse(
                favorite.getId(),
                favorite.getExternalId(),
                favorite.getItemType(),
                favorite.getDisplayName(),
                favorite.getCreatedAt()
        );
    }

    public static TeamComposition toComposition(CompositionRequest request, User user) {
        TeamComposition composition = TeamComposition.builder()
                .user(user)
                .name(request.name())
                .mapUuid(request.mapUuid())
                .description(request.description())
                .build();
        composition.replaceAgents(toCompositionAgents(request.agents()));
        return composition;
    }

    public static void updateComposition(TeamComposition composition, CompositionRequest request) {
        composition.setName(request.name());
        composition.setMapUuid(request.mapUuid());
        composition.setDescription(request.description());
        composition.replaceAgents(toCompositionAgents(request.agents()));
    }

    private static List<CompositionAgent> toCompositionAgents(List<CompositionAgentRequest> agents) {
        return agents.stream()
                .map(agent -> CompositionAgent.builder()
                        .agentUuid(agent.agentUuid())
                        .slotOrder(agent.slotOrder())
                        .suggestedRole(agent.suggestedRole())
                        .build())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public static CompositionResponse toCompositionResponse(TeamComposition composition) {
        List<CompositionAgentResponse> agents = composition.getAgents().stream()
                .map(agent -> new CompositionAgentResponse(
                        agent.getAgentUuid(),
                        agent.getSlotOrder(),
                        agent.getSuggestedRole()))
                .toList();
        return new CompositionResponse(
                composition.getId(),
                composition.getName(),
                composition.getMapUuid(),
                composition.getDescription(),
                agents,
                composition.getCreatedAt(),
                composition.getUpdatedAt()
        );
    }

    public static StrategicNote toNote(StrategicNoteRequest request, User user) {
        return StrategicNote.builder()
                .user(user)
                .title(request.title())
                .mapUuid(request.mapUuid())
                .content(request.content())
                .relatedAgentUuids(request.relatedAgentUuids() != null
                        ? new ArrayList<>(request.relatedAgentUuids())
                        : new ArrayList<>())
                .build();
    }

    public static void updateNote(StrategicNote note, StrategicNoteRequest request) {
        note.setTitle(request.title());
        note.setMapUuid(request.mapUuid());
        note.setContent(request.content());
        note.setRelatedAgentUuids(request.relatedAgentUuids() != null
                ? new ArrayList<>(request.relatedAgentUuids())
                : new ArrayList<>());
    }

    public static StrategicNoteResponse toNoteResponse(StrategicNote note) {
        return new StrategicNoteResponse(
                note.getId(),
                note.getTitle(),
                note.getMapUuid(),
                note.getContent(),
                note.getRelatedAgentUuids(),
                note.getCreatedAt(),
                note.getUpdatedAt()
        );
    }

    public static AgentResponse toAgentResponse(AgentExternalDto dto) {
        String roleName = dto.role() != null ? dto.role().displayName() : null;
        return new AgentResponse(
                dto.uuid(),
                dto.displayName(),
                dto.description(),
                dto.displayIcon(),
                roleName
        );
    }

    public static MapResponse toMapResponse(MapExternalDto dto) {
        return new MapResponse(
                dto.uuid(),
                dto.displayName(),
                dto.narrativeDescription(),
                dto.splash(),
                dto.displayIcon()
        );
    }

    public static WeaponResponse toWeaponResponse(WeaponExternalDto dto) {
        Double fireRate = null;
        Integer magazineSize = null;
        if (dto.weaponStats() != null) {
            fireRate = dto.weaponStats().fireRate();
            magazineSize = dto.weaponStats().magazineSize();
        }
        return new WeaponResponse(
                dto.uuid(),
                dto.displayName(),
                dto.category(),
                dto.displayIcon(),
                dto.weaponType(),
                fireRate,
                magazineSize
        );
    }

    public static GamemodeResponse toGamemodeResponse(GamemodeExternalDto dto) {
        return new GamemodeResponse(
                dto.uuid(),
                dto.displayName(),
                dto.description(),
                dto.displayIcon(),
                dto.isQueue()
        );
    }
}
