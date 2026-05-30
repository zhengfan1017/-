# English Typing Game - Product Specification

## 1. Project Overview

**Project Name:** Rainbow Type - Kids English Typing Adventure
**Project Type:** Interactive Web Game
**Core Functionality:** A fun, educational typing game where words fall from the sky and children type them to learn English vocabulary, with pronunciation feedback and progressive difficulty.
**Target Users:** Children (ages 5-12) learning English

## 2. Visual & Rendering Specification

### Scene Setup
- **Canvas:** Full-screen responsive game area
- **Background:** Animated rainbow gradient with floating clouds and stars
- **Style:** Colorful cartoon aesthetic with playful animations

### Color Palette
- Primary: Rainbow gradient (red, orange, yellow, green, blue, purple)
- Accent: Gold (#FFD700) for rewards, Coral (#FF6B6B) for errors
- UI: Soft pastels with white cards and rounded corners
- Text: Dark charcoal (#333) for readability

### Typography
- Display Font: "Fredoka One" - playful, rounded, child-friendly
- Body Font: "Nunito" - clean, readable

### Visual Effects
- Falling word animations with slight horizontal wobble
- Correct letter: Green glow highlight
- Wrong letter: Red shake animation + error sound
- Word completion: Sparkle burst effect
- Red flowers: Bounce animation on reward
- Fireworks: Particle explosion on level completion
- Confetti: Rain effect on final graduation

## 3. Game Mechanics Specification

### Level System
- **6 Levels Total**
- **Level 1:** 50 correct words to advance, speed: 2px/frame, 3-letter words
- **Level 2:** 50 correct words, speed: 2.5px/frame, 3-4 letter words
- **Level 3:** 50 correct words, speed: 3px/frame, 4-letter words
- **Level 4:** 50 correct words, speed: 3.5px/frame, 4-5 letter words
- **Level 5:** 50 correct words, speed: 4px/frame, 5-letter words
- **Level 6:** 50 correct words, speed: 4.5px/frame, 5-6 letter words

### Word Dictionary
- Level 1: cat, dog, sun, pen, cup, hat, bed, car, bus, red, blue, etc.
- Level 2: book, tree, fish, bird, frog, duck, ball, star, moon, etc.
- Level 3: game, play, jump, swim, happy, music, color, shape, etc.
- Level 4: apple, banana, orange, school, family, friend, animal, etc.
- Level 5: rainbow, purple, yellow, orange, teacher, student, etc.
- Level 6: computer, keyboard, rainbow, butterfly, adventure, celebrate, etc.

### Scoring System
- 1 red flower per level completed
- Total: 6 red flowers for graduation
- Timer shows elapsed game time

## 4. Interaction Specification

### Controls
- **Keyboard:** Type letters to match falling words
- **Start Button:** Begin the game
- **Pause Button:** Pause/resume game
- **Stop Button:** End game and return to menu

### Audio Feedback (Web Speech API)
- Word pronunciation on correct completion
- Error sound on wrong letter
- Victory sound on level complete
- Graduation music on game completion

### UI Elements
- **Header:** Level indicator, Timer, Progress bar
- **Game Area:** Falling words zone (80% height)
- **Input Area:** Current typing display at bottom
- **Rewards Panel:** Red flower collection display

## 5. Acceptance Criteria

### Functional Requirements
- [ ] Words fall smoothly from top to bottom
- [ ] Letters highlight green when typed correctly
- [ ] Error sound plays on wrong key press
- [ ] Word pronunciation plays on completion
- [ ] Level advances after 50 correct words
- [ ] Red flower rewards display for each level
- [ ] Game speed increases with each level
- [ ] Fireworks display on level 6 completion
- [ ] Graduation certificate shows on win
- [ ] Start/Pause/Stop buttons work correctly

### Visual Requirements
- [ ] Rainbow gradient background
- [ ] Floating clouds animation
- [ ] Playful, child-friendly typography
- [ ] Smooth word falling animation
- [ ] Letter highlight animations
- [ ] Red flower bounce animation
- [ ] Particle fireworks effect

### Performance
- [ ] 60 FPS animation
- [ ] Responsive to window resize
- [ ] Works in modern browsers
