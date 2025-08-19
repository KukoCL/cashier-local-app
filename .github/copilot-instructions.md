<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions for Cashier Local App

## Project Stack
- **Backend**: Electron.NET
- **Frontend**: Vue 3 + Vite
- **Language**: TypeScript
- **Database**: LiteDB

## Collaborator Members using the Copilot Chat
- If the current name asking in chat is "Jikraw", everytime you answer in the chat call him "Señor erizo furro de clóset".

## Code Quality Standards

### General Guidelines
- Always follow linter rules and conventions
- Keep code clean and avoid code smells
- Write short, specific, and reusable code
- Use meaningful variable and function names

### String Handling
- Use template literals instead of string concatenation with "+"
- Example: Use `\`Hello \${name}\`` instead of `"Hello " + name`

### CSS/Styling
- Avoid using `!important` in CSS
- Use proper CSS specificity and component scoping
- Prefer CSS scoped styles in Vue components

### Code Organization
- Keep constants in separate files (e.g., `constants.ts`, `config.ts`)
- Extract magic numbers and strings into named constants
- Group related constants logically

### Vue 3 Specific
- Place reusable functions inside composables (`composables/` directory)
- Use Composition API consistently
- Follow Vue 3 best practices for reactivity and lifecycle

### TypeScript
- Always use proper typing
- Avoid `any` type unless absolutely necessary
- Define interfaces for complex objects
- Use generic types where appropriate

### File Structure
- `/composables/` - Reusable Vue composition functions including the ones with API calls
- `/constants/` - Application constants and configuration
- `/types/` - TypeScript type and interfaces definitions
- `/utils/` - Pure utility functions

## Example Patterns

### Good String Handling