# 🔢 Math Quiz Game - 가전제품 수집가

An educational math quiz game where players solve math problems to collect virtual appliances. Built with React, TypeScript, and modern tooling.

## ✨ Features

- **Multi-player Support**: Up to 4 players can compete
- **Progressive Difficulty**: 3 levels with different math operations
  - Level 1: Addition/Subtraction (1-10)
  - Level 2: Addition/Subtraction (5-20)  
  - Level 3: Multiplication (2-9)
- **Appliance Collection**: 50+ virtual appliances to collect
- **Celebration Effects**: Confetti, fireworks, and sound effects
- **Score Tracking**: Persistent player scores and collections
- **Audio Feedback**: Bird sounds for correct answers, buzz for wrong answers

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── PlayerSetup.tsx
│   ├── GameMenu.tsx
│   ├── GamePlay.tsx
│   └── GameResult.tsx
├── hooks/             # Custom React hooks
│   ├── useGameState.ts
│   └── useCelebration.ts
├── utils/             # Utility functions
│   ├── audio.ts
│   ├── gameLogic.ts
│   └── celebrations.ts
├── data/              # Static data
│   └── appliances.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── tests/             # Unit tests
    ├── components/
    ├── hooks/
    ├── utils/
    └── data/
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Scripts

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

## 🎮 How to Play

1. **Player Setup**: Add 1-4 players to start the game
2. **Level Selection**: Choose from 3 difficulty levels
3. **Answer Questions**: Solve 10 math problems per level
4. **Collect Appliances**: Earn virtual appliances based on performance
5. **View Progress**: Check scores and collections

## 🏆 Reward System

### Level Completion
- Score 80+ points: Unlock level-specific appliances
- Perfect score (100): Bonus rare appliances

### Streak Bonuses
- 5+ correct answers: Mini fan
- Higher streaks: More valuable appliances

### Category Mastery
- Collect 3+ items in a category: Unlock master appliances

### High Score Bonus
- 90+ points: 30% chance for random bonus appliance

## 🧪 Testing

The project includes comprehensive unit tests for:

- **Components**: UI component behavior and rendering
- **Hooks**: Custom hook logic and state management
- **Utils**: Game logic, audio functions, and celebrations
- **Data**: Appliance data validation

Run tests with:
```bash
npm test                # Run all tests
npm run test:ui         # Interactive test UI
npm run test:coverage   # Coverage report
```

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
- **Testing Library** - Component testing utilities
- **Web Audio API** - Sound effects

## 🎨 Styling

The game uses Tailwind CSS with custom animations and gradients:
- Responsive design for mobile and desktop
- Custom celebration animations
- Gradient backgrounds and hover effects
- Comic Sans and other fun fonts for UI elements

## 🔊 Audio Features

- **Correct Answer**: Bird chirping sounds (3 different tones)
- **Wrong Answer**: Buzz sound
- **Celebrations**: Fanfare and firework sounds
- **Cross-browser**: Falls back gracefully on unsupported browsers

## 🧩 Architecture

### State Management
- Custom hooks for game state and celebrations
- Centralized player data management
- Persistent collections and scores

### Component Design
- Modular, reusable components
- Props-based communication
- TypeScript interfaces for type safety

### Performance
- Optimized animation loops
- Efficient state updates
- Minimal re-renders

## 📱 Browser Support

- Modern browsers with ES2020+ support
- Web Audio API for sound effects
- Responsive design for mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- More appliance categories
- Multiplayer online mode
- Achievement system
- Custom difficulty settings
- Save/load game progress
- Leaderboards