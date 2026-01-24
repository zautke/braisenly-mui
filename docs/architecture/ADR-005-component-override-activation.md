# ADR-005: Component Override Activation Strategy

## Status
Accepted

## Context
The `componentOverrides/index.ts` file aggregates 30+ individual component override files. Not all overrides are active—some are commented out:

```typescript
// componentOverrides/index.ts
import button from "./button";
// import form from './form';  // ← Commented out
import input from './input';

const allOverrides = {
  ...button,
  // ...form,  // ← Not spread into overrides
  ...input,
};
```

This raises questions:
1. Why are some overrides disabled?
2. What criteria determine activation?
3. How should new overrides be added?

## Decision
Implement a **progressive activation strategy** where component overrides are:
1. **Developed** in individual files under `componentOverrides/`
2. **Tested** in the demo app (`demo/src/`)
3. **Activated** by uncommenting the import and spread when stable
4. **Deactivated** (but preserved) if causing issues or incomplete

### Activation Criteria
A component override should be activated when:
- ✅ Uses the callback pattern `({ theme }) => ({...})` (not legacy static pattern)
- ✅ Works across light and dark theme modes
- ✅ Has been visually verified in the demo app
- ✅ Does not break existing component behavior
- ✅ Follows theme-agnostic principles (uses `theme.palette.*`, not hardcoded colors)

### Deactivation Reasons
An override may be commented out because:
- 🔴 Uses legacy `themeStub` pattern (circular dependency risk)
- 🔴 Contains hardcoded color values
- 🔴 Incomplete implementation
- 🔴 Causes visual regressions in consuming apps
- 🔴 Conflicts with MUI version updates

## Consequences

### Benefits

#### 1. Safe Iteration
Developers can work on new overrides without affecting the published package. The override exists in source but isn't included in the build.

#### 2. Rollback Mechanism
If an override causes production issues, commenting it out provides immediate rollback without deleting code or reverting commits.

#### 3. Documentation via Code
Commented imports serve as documentation of available-but-inactive overrides. Future developers can see what's possible and why it might be disabled.

#### 4. Incremental Migration
Legacy overrides (like `form.js` using `themeStub`) can remain disabled while modern replacements are developed.

### Drawbacks

#### 1. Unclear Status
Without explicit documentation, it's not obvious why a specific override is disabled. Is it broken? Experimental? Deprecated?

#### 2. Dead Code Accumulation
Disabled overrides may become permanently stale if never revisited.

#### 3. Build Includes Unused Files
The `form.js` file is still in the source tree even though it's not used. Better would be to move truly deprecated overrides to an `_archive/` folder.

## Current Override Status

| Component | Status | Reason |
|-----------|--------|--------|
| `form.js` | ❌ Disabled | Uses legacy `themeStub` pattern; see ADR-003 |
| All others | ✅ Active | Migrated to callback pattern or theme-agnostic |

## Alternatives Considered

### 1. Feature Flags
```typescript
const ENABLE_FORM_OVERRIDE = process.env.ENABLE_FORM ?? false;
```
Rejected: Adds runtime complexity. Theme should be deterministic at build time.

### 2. Conditional Exports
```typescript
export default {
  ...button,
  ...(process.env.INCLUDE_FORM ? form : {}),
};
```
Rejected: Environment-dependent builds are harder to debug and cache.

### 3. Separate Experimental Package
Publish incomplete overrides as `@braisenly/mui-experimental`.
Considered for future. Current package scope doesn't warrant split.

### 4. Git Branches for WIP
Keep incomplete overrides in feature branches.
Rejected: Harder to see what's in progress. Comments provide visibility.

## Recommended Practices

1. **Add a Comment When Disabling**
   ```typescript
   // import form from './form';  // Disabled: uses themeStub (ADR-003)
   ```

2. **Create an Issue for Each Disabled Override**
   Track re-activation work in the issue tracker.

3. **Review Disabled Overrides Quarterly**
   Either migrate to modern pattern or remove from source.

4. **Test Before Activation**
   Run full demo app visual regression before uncommenting.

