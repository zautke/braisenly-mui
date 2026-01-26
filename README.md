# Recipe Lab

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.17.0-brightgreen)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/MUI-v6-0081CB)](https://mui.com/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9-F69220)](https://pnpm.io/)

A recipe management platform built with Next.js, Material-UI, and PostgreSQL. Features AI-powered recipe parsing, nutrition analysis, and meal planning through MCP (Model Context Protocol) servers that integrate directly with Claude Desktop.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Docker Deployment](#docker-deployment)
- [MCP Server Integration](#mcp-server-integration)
- [Scripts Reference](#scripts-reference)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Recipe Management
- Full CRUD operations for recipe creation, editing, and deletion
- Recipe parsing from web URLs with structured data extraction
- PostgreSQL-backed storage with full-text search
- Material-UI recipe card components with responsive layout

### AI Integration via MCP
- **Recipe Lab MCP Server** -- Exposes recipe database, search, and parsing to AI applications
- **Nutrition Analysis MCP Server** -- Nutrition lookups, health scoring, and dietary optimization
- Dual transport support (stdio for Claude Desktop, HTTP for web clients)
- USDA Food Data Central integration with 300,000+ food items

### UI / UX
- Material-UI v6 with custom branded theme
- Dark and light mode with automatic switching
- Mobile-first responsive design
- Storybook component library

---

## Quick Start

### Prerequisites

- Node.js >= 20.17.0
- PostgreSQL
- pnpm

### Installation

```bash
git clone https://github.com/zautke/braisenly-mui.git
cd braisenly-mui
pnpm install
```

### Environment Setup

Create a `.env.local` file:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/recipebox
NEXT_PUBLIC_GRAPHQL_ENDPOINT=localhost:5001/graphql
NODE_ENV=development
PORT=4000
```

### Start Development

```bash
# Start PostGraphile (GraphQL API from PostgreSQL)
pnpm run start-postgraphile

# In another terminal, start the Next.js dev server
pnpm dev
```

Open [http://localhost:4000](http://localhost:4000).

---

## Docker Deployment

### Development

```bash
docker compose -f compose.dev.yaml up
```

### Production

```bash
docker compose -f compose.production.yaml up -d
```

Services included:

| Service      | Port |
|-------------|------|
| Next.js App | 4000 |
| PostgreSQL  | 5432 |
| PostGraphile| 5001 |
| pgAdmin     | 5050 |

---

## MCP Server Integration

Recipe Lab includes two MCP servers that allow AI applications like Claude Desktop to interact with recipe data and perform nutrition analysis.

### Recipe Lab MCP Server

Provides recipe database access, search, web parsing, and meal planning tools.

```bash
pnpm run mcp:dev          # Development
pnpm run mcp:stdio        # Production (stdio)
pnpm run mcp:http         # Production (HTTP)
```

### Nutrition Analysis MCP Server

Provides nutrition lookups, health score calculation (0--100), and dietary optimization.

```bash
pnpm run mcp:nutrition:dev       # Development
pnpm run mcp:nutrition:stdio     # Production (stdio)
pnpm run mcp:nutrition:http      # Production (HTTP)
```

### Claude Desktop Configuration

Add to your Claude Desktop MCP config:

```json
{
  "mcpServers": {
    "recipelab": {
      "command": "tsx",
      "args": ["/path/to/braisenly-mui/mcp-nutrition-server/mcp-stdio.ts"],
      "env": {
        "POSTGRES_URL": "postgres://postgres:postgres@localhost:5432/recipebox",
        "NODE_ENV": "production"
      }
    },
    "recipelab-nutrition": {
      "command": "tsx",
      "args": ["/path/to/braisenly-mui/mcp-nutrition-server/mcp-nutrition-stdio.ts"],
      "env": {
        "POSTGRES_URL": "postgres://postgres:postgres@localhost:5432/recipebox",
        "NODE_ENV": "production",
        "USDA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

## Scripts Reference

### Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (port 4000) |
| `pnpm build` | Production build (standalone) |
| `pnpm start` | Start production server |
| `pnpm storybook` | Component library (port 6006) |

### Testing

| Command | Description |
|---------|-------------|
| `pnpm test` | Run unit tests with coverage |
| `pnpm test:watch` | Watch mode |
| `pnpm test:ui` | Interactive test UI |
| `pnpm e2e` | Playwright E2E tests |
| `pnpm e2e:ui` | Playwright UI mode |
| `pnpm e2e:headed` | E2E with visible browser |

### Code Quality

| Command | Description |
|---------|-------------|
| `pnpm lint` | ESLint |
| `pnpm biome` | Biome formatter/linter |

### GraphQL

| Command | Description |
|---------|-------------|
| `pnpm run start-postgraphile` | Start PostGraphile (port 5001) |
| `pnpm run codegen` | GraphQL codegen (watch) |
| `pnpm run codegen:generate` | One-time codegen |

### Release

| Command | Description |
|---------|-------------|
| `pnpm release` | Interactive release |
| `pnpm release:patch` | Patch release |
| `pnpm release:minor` | Minor release |
| `pnpm release:major` | Major release |

---

## Architecture

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2.5 (App Router) |
| Language | TypeScript 5.6 |
| UI | Material-UI v6, Emotion |
| State | Zustand |
| Data | Apollo Client, GraphQL |
| Database | PostgreSQL, PostGraphile |
| AI | MCP SDK, USDA Food Data Central |
| Testing | Vitest, React Testing Library, Playwright |
| Build | pnpm, Docker (multi-arch) |

### Project Structure

```
braisenly-mui/
├── app/                       # Next.js App Router
│   ├── (routes)/              # Application routes
│   ├── actions/               # Server actions
│   ├── api/                   # API routes (GraphQL proxy, MCP)
│   └── theme/                 # Theme configuration
├── components/                # React components
├── customTheme/               # MUI theme system
├── mcp-nutrition-server/      # MCP servers (recipe + nutrition)
├── server/                    # Server entrypoints (MCP, WebSocket)
├── generated/                 # GraphQL codegen output
├── packages/                  # Internal packages (mui-theme)
├── __tests__/                 # Unit tests
├── e2e/                       # Playwright E2E tests
├── stories/                   # Storybook stories
├── docker/                    # Docker configurations
├── kube/                      # Kubernetes manifests
└── util/                      # Shared utilities
```

### Key Patterns

- **Server Components by default** -- `'use client'` only where necessary
- **Server Actions** for all data mutations (`app/actions/`)
- **PostGraphile** auto-generates a GraphQL API from the `kitchen` and `schema_recipe` PostgreSQL schemas
- **Apollo Client** with `@graphql-codegen` for type-safe queries and mutations
- **Path aliases**: `@/` (root), `@typings/`, `@helpers/`, `@theme/`, `@/mcp`

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_URL` | -- | PostgreSQL connection string |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | `localhost:5001/graphql` | GraphQL endpoint |
| `PORT` | `4000` | Application port |
| `NODE_ENV` | `development` | Environment |
| `USDA_API_KEY` | -- | USDA Food Data Central API key (optional) |
| `MCP_HTTP_PORT` | `3001` | Recipe MCP HTTP port |
| `MCP_NUTRITION_HTTP_PORT` | `3002` | Nutrition MCP HTTP port |

### Database

PostgreSQL with two schemas:

- **`kitchen`** -- Recipe data and metadata
- **`schema_recipe`** -- Schema.org Recipe format definitions

PostGraphile introspects these schemas to generate the GraphQL API.

---

## Testing

### Unit Tests (Vitest)

```bash
pnpm test              # Run with coverage
pnpm test:watch        # Watch mode
pnpm test:ui           # Interactive UI
```

Coverage thresholds: 90% across branches, functions, lines, and statements.

### E2E Tests (Playwright)

E2E tests validate the full recipe CRUD lifecycle. They run against an existing dev server on port 4050.

```bash
# Start the dev server first
pnpm dev:prod-db

# Then run E2E tests
pnpm e2e
```

---

## Documentation

- [MCP Servers Documentation](./MCP_SERVERS_DOCUMENTATION.md) -- Comprehensive MCP server guide
- [Recipe Lab MCP](./MCP_README.md) -- Main MCP server reference
- [Nutrition MCP](./NUTRITION_MCP_README.md) -- Nutrition analysis server guide

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

---

## License

[MIT](LICENSE)

---

Built by [zautke](https://github.com/zautke)
