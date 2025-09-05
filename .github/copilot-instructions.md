<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions for Cashier Local App

## Project Stack
- **Backend**: Electron.NET
- **Frontend**: Vue 3 + Vite
- **Language**: TypeScript
- **Database**: LiteDB

## Code Quality Standards

### General Guidelines
- Always follow linter rules and conventions
- Keep code clean and avoid code smells
- Write short, specific, and reusable code
- Use meaningful variable and function names
- Don't create example files to show usage
- Unit tests should not check for form structure, only if it renders and its functionality
- Unit tests files should be as short as possible to cover lines, branches, statements and functions according to coverage report, not every case scenario

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
- Never use hardcoded text strings in components, views or logic
- Focus on keeping all designs modern, even when provided with pictures as reference it should be modernized
- Place reusable functions inside composables (`composables/` directory)
- Use Composition API consistently
- When creating components place them in the `src/components/` directory, and if they are for a specific feature, consider creating a subdirectory for that feature, for example "Products"
- `views/` - Only Vue views should be placed in this directory
- Don't use snapshots
- Use `storeToRefs` for accessing store state and getters
- All information displayed in components should come from the store, and when something needs to be updated, it should be done to the LiteDB database and then refresh the store
- Always use axios with proper TypeScript typing for API calls
- All axios calls should be in composables and setting the results into the store
- Use await/async for asynchronous operations
- Follow Vue 3 best practices for reactivity and lifecycle
- Don't allow parent components access child component internals
- Use global styles in `style.css` for common styles used across multiple components
- Use global classes for elements like buttons, inputs, etc., to maintain consistency across components.
- All global styles should be made in a way that can simplify applying a "skin" or theme to the application.
- When creating unit tests remember that `test-setup.ts` is a good place to set up global configurations and mocks, and use shallowMount when possible.

### Application Messages/Strings
- All user-facing text must be defined in `appMessages.ts`
- Use descriptive keys for message identification
- Group related messages logically within the messages object
- Example: Use `appMessages.product.addSuccess` instead of "Product added successfully"
- All text must always be in Spanish

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
- Use using statements for database connections when possible
- Implement proper CRUD operations in persistence layer
- Keep database operations in the Persistence project only
- Use models from Shared project for data transfer

### Vue File Structure
- `/composables/` - Reusable Vue composition functions including the ones with API calls
- `/components/` - Vue components. Context-specific components should be placed in their respective feature folders, for example `/components/Products/` for product-related components.
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