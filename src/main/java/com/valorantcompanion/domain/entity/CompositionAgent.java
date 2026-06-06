package com.valorantcompanion.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "composition_agents",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_composition_slot",
                columnNames = {"composition_id", "slot_order"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompositionAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "composition_id", nullable = false)
    private TeamComposition composition;

    @Column(name = "agent_uuid", nullable = false, length = 64)
    private String agentUuid;

    @Column(name = "slot_order", nullable = false)
    private Integer slotOrder;

    @Column(name = "suggested_role", length = 50)
    private String suggestedRole;
}
