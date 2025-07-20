-- Math Quiz Game Database Schema

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_played DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_games INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0
);

-- Game sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    level INTEGER NOT NULL,
    score INTEGER NOT NULL,
    questions_correct INTEGER NOT NULL,
    questions_total INTEGER DEFAULT 10,
    max_streak INTEGER DEFAULT 0,
    completion_time INTEGER, -- in seconds
    played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
);

-- Electronics collection table
CREATE TABLE IF NOT EXISTS player_electronics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    appliance_id TEXT NOT NULL, -- matches appliance key from data
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    unlock_reason TEXT, -- 'level_completion', 'perfect_score', 'streak_bonus', etc.
    UNIQUE(player_id, appliance_id),
    FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
);

-- Achievement tracking table
CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER NOT NULL,
    achievement_type TEXT NOT NULL, -- 'first_win', 'perfect_score', 'streak_master', etc.
    achievement_level INTEGER DEFAULT 1,
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(player_id, achievement_type, achievement_level),
    FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
);

-- Daily statistics table
CREATE TABLE IF NOT EXISTS daily_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL, -- YYYY-MM-DD format
    total_games INTEGER DEFAULT 0,
    total_players INTEGER DEFAULT 0,
    avg_score REAL DEFAULT 0,
    most_collected_appliance TEXT,
    UNIQUE(date)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_name ON players (name);
CREATE INDEX IF NOT EXISTS idx_game_sessions_player_level ON game_sessions (player_id, level);
CREATE INDEX IF NOT EXISTS idx_game_sessions_score ON game_sessions (score DESC);
CREATE INDEX IF NOT EXISTS idx_game_sessions_date ON game_sessions (played_at);
CREATE INDEX IF NOT EXISTS idx_player_electronics_player ON player_electronics (player_id);
CREATE INDEX IF NOT EXISTS idx_player_electronics_appliance ON player_electronics (appliance_id);
CREATE INDEX IF NOT EXISTS idx_achievements_player ON achievements (player_id);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats (date);