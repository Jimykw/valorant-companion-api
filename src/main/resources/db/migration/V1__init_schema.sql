CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username    VARCHAR(50)  NOT NULL UNIQUE,
    email       VARCHAR(120) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20)  NOT NULL DEFAULT 'USER',
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE favorites (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    external_id  VARCHAR(64)  NOT NULL,
    item_type    VARCHAR(20)  NOT NULL,
    display_name VARCHAR(120),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uk_favorite_user_item UNIQUE (user_id, external_id, item_type)
);

CREATE TABLE team_compositions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    map_uuid    VARCHAR(64),
    description VARCHAR(500),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE composition_agents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    composition_id  UUID        NOT NULL REFERENCES team_compositions(id) ON DELETE CASCADE,
    agent_uuid      VARCHAR(64) NOT NULL,
    slot_order      INT         NOT NULL,
    suggested_role  VARCHAR(50),
    CONSTRAINT uk_composition_slot UNIQUE (composition_id, slot_order),
    CONSTRAINT chk_slot_order CHECK (slot_order BETWEEN 1 AND 5)
);

CREATE TABLE strategic_notes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(150) NOT NULL,
    map_uuid    VARCHAR(64),
    content     TEXT         NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE note_agents (
    note_id     UUID        NOT NULL REFERENCES strategic_notes(id) ON DELETE CASCADE,
    agent_uuid  VARCHAR(64) NOT NULL,
    PRIMARY KEY (note_id, agent_uuid)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_compositions_user ON team_compositions(user_id);
CREATE INDEX idx_notes_user ON strategic_notes(user_id);
