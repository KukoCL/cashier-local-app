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
- When creating components place them in the `src/components/` directory, and if they are for a specific feature, consider creating a subdirectory for that feature, for example "Products"
- Use `storeToRefs` for accessing store state and getters
- All information displayed in components should come from the store, and when something needs to be updated, it should be done to the LiteDB database and then refresh the store
- Follow Vue 3 best practices for reactivity and lifecycle
- Use global styles in `style.css` for common styles used across multiple components
- Use global classes for elements like buttons, inputs, etc., to maintain consistency across components.
- All global styles should be made in a way that can simplify applying a "skin" or theme to the application.

### TypeScript
- Always use proper typing
- Avoid `any` type unless absolutely necessary
- Define interfaces for complex objects
- Use generic types where appropriate

### .NET/C# Specific
- Try to keep one Controller per Vue View, and one Logic per Controller
- Follow C# naming conventions (PascalCase for classes/methods, camelCase for fields)
- Use dependency injection for services and repositories
- Implement proper interface-based abstractions
- Follow Clean Architecture patterns (App → Logic → Persistence) → Shared
- Implement proper error handling with try-catch blocks
- Use meaningful exception types and messages

### Database/LiteDB
- Use using statements for database connections
- Implement proper CRUD operations in persistence layer
- Keep database operations in the Persistence project only
- Use models from Shared project for data transfer

### File Structure
- `/composables/` - Reusable Vue composition functions including the ones with API calls
- `/constants/` - Application constants and configuration
- `/types/` - TypeScript type and interfaces definitions
- `/utils/` - Pure utility functions

### .NET Project Structure
- `/Shared/` - Domain models and shared interfaces
- `/Persistence/` - Database access layer with interfaces
- `/Logic/` - Business logic layer with interfaces
- `/App/` (server) - Controllers and API endpoints
- Follow interface-based dependency injection patterns

## Example Patterns

### Good String Handling