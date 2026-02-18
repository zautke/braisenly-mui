/**
 * ThemeJsonEditor — CodeMirror 6 JSON editor for live theme editing
 *
 * Provides:
 *   - Syntax-highlighted JSON editing with line numbers
 *   - Live schema validation (lint, hover, autocomplete) via codemirror-json-schema
 *   - Bidirectional sync with the ThemeEditorContext (control tabs ↔ JSON)
 *   - MUI-aware styling that adapts to the current theme
 *
 * All state is owned by ThemeEditorContext — this component is purely presentational
 * with a controlled CodeMirror instance.
 */
import React, { useMemo, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';

// CodeMirror core
import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { hoverTooltip } from '@codemirror/view';

// JSON language & linting
import { json, jsonParseLinter, jsonLanguage } from '@codemirror/lang-json';
import { linter, lintGutter } from '@codemirror/lint';

// JSON Schema integration
import {
  jsonSchemaLinter,
  jsonSchemaHover,
  jsonCompletion,
  handleRefresh,
  stateExtensions,
} from 'codemirror-json-schema';

// App context & schema
import { useThemeEditor } from '../ThemeEditorContext';
import { themeOverridesSchema } from '../themeSerializer';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Monospace font stack matching the theme's primary code font */
const CODE_FONT_FAMILY =
  '"Victor Mono NFM", "Victor Mono", "Fira Code", "JetBrains Mono", monospace';

const CODE_FONT_SIZE = '12px';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Full-featured CodeMirror 6 JSON editor wired to ThemeEditorContext.
 *
 * Renders a schema-validated JSON editor that:
 * - Displays `rawJson` from context
 * - Calls `updateFromJson` on user edits
 * - Accepts external updates (from controls/reset) without clobbering user input
 * - Shows a compact error summary bar below the editor
 */
export const ThemeJsonEditor: React.FC = () => {
  const muiTheme = useTheme();
  const {
    rawJson,
    validationStatus,
    validationErrors,
    lastSource,
    updateFromJson,
  } = useThemeEditor();

  const editorRef = useRef<ReactCodeMirrorRef>(null);

  // -------------------------------------------------------------------------
  // MUI-aware CodeMirror theme (EditorView.theme extension)
  // -------------------------------------------------------------------------
  const editorThemeExtension = useMemo(() => {
    const bg = muiTheme.palette.background.paper;
    const gutterBg = muiTheme.palette.mode === 'dark'
      ? alpha(muiTheme.palette.common.black, 0.2)
      : alpha(muiTheme.palette.common.black, 0.04);

    return EditorView.theme(
      {
        '&': {
          backgroundColor: bg,
          color: muiTheme.palette.text.primary,
          fontSize: CODE_FONT_SIZE,
          fontFamily: CODE_FONT_FAMILY,
          height: '100%',
        },
        '&.cm-focused': {
          outline: 'none',
        },
        '.cm-scroller': {
          fontFamily: CODE_FONT_FAMILY,
          fontSize: CODE_FONT_SIZE,
          overflow: 'auto',
        },
        '.cm-content': {
          caretColor: muiTheme.palette.text.primary,
          fontFamily: CODE_FONT_FAMILY,
        },
        '.cm-cursor, .cm-dropCursor': {
          borderLeftColor: muiTheme.palette.text.primary,
          borderLeftWidth: '2px',
        },
        '.cm-selectionBackground': {
          backgroundColor: `${alpha(muiTheme.palette.primary.main, 0.25)} !important`,
        },
        '&.cm-focused .cm-selectionBackground': {
          backgroundColor: `${alpha(muiTheme.palette.primary.main, 0.35)} !important`,
        },
        '.cm-activeLine': {
          backgroundColor: alpha(muiTheme.palette.primary.main, 0.06),
        },
        '.cm-gutters': {
          backgroundColor: gutterBg,
          color: muiTheme.palette.text.secondary,
          borderRight: `1px solid ${muiTheme.palette.divider}`,
          fontFamily: CODE_FONT_FAMILY,
          fontSize: CODE_FONT_SIZE,
        },
        '.cm-activeLineGutter': {
          backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
        },
        '.cm-lineNumbers .cm-gutterElement': {
          color: muiTheme.palette.text.secondary,
          padding: '0 8px 0 4px',
          minWidth: '32px',
        },
        '.cm-foldPlaceholder': {
          backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
          border: 'none',
          color: muiTheme.palette.primary.main,
        },
        // Lint gutter markers
        '.cm-lint-marker-error': {
          content: '"●"',
        },
        // Tooltip styling
        '.cm-tooltip': {
          backgroundColor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          border: `1px solid ${muiTheme.palette.divider}`,
          borderRadius: `${muiTheme.shape.borderRadius}px`,
          fontSize: '11px',
          fontFamily: CODE_FONT_FAMILY,
          boxShadow: muiTheme.shadows[4],
        },
        '.cm-tooltip-autocomplete': {
          '& > ul > li': {
            fontFamily: CODE_FONT_FAMILY,
            fontSize: '11px',
          },
          '& > ul > li[aria-selected]': {
            backgroundColor: alpha(muiTheme.palette.primary.main, 0.15),
            color: muiTheme.palette.text.primary,
          },
        },
        // Diagnostics panel
        '.cm-panel.cm-panel-lint': {
          backgroundColor: muiTheme.palette.background.default,
          borderTop: `1px solid ${muiTheme.palette.divider}`,
        },
        '.cm-panel.cm-panel-lint ul [aria-selected]': {
          backgroundColor: alpha(muiTheme.palette.primary.main, 0.1),
        },
      },
      { dark: muiTheme.palette.mode === 'dark' },
    );
  }, [muiTheme]);

  // -------------------------------------------------------------------------
  // Extensions array (memoized — only recreated when theme changes)
  // -------------------------------------------------------------------------
  const extensions = useMemo(
    () => [
      json(),
      linter(jsonParseLinter(), { delay: 300 }),
      linter(jsonSchemaLinter(), { needsRefresh: handleRefresh }),
      jsonLanguage.data.of({ autocomplete: jsonCompletion() }),
      hoverTooltip(jsonSchemaHover()),
      lintGutter(),
      stateExtensions(themeOverridesSchema),
      EditorView.lineWrapping,
      editorThemeExtension,
    ],
    [editorThemeExtension],
  );

  // -------------------------------------------------------------------------
  // Change handler — forwards user edits to context
  // -------------------------------------------------------------------------
  const handleChange = useCallback(
    (value: string) => {
      updateFromJson(value);
    },
    [updateFromJson],
  );

  // -------------------------------------------------------------------------
  // Determine the controlled `value` prop
  //
  // When lastSource is 'json', the user is actively typing — do NOT re-set
  // the value (this would reset cursor position and break undo history).
  // For any other source (control, reset, switch, persist), push the new
  // rawJson into the editor.
  // -------------------------------------------------------------------------
  // We track the last external value we pushed to detect genuine external changes.
  const lastExternalValueRef = useRef<string>(rawJson);

  // Only update the editor value when the change came from outside the JSON editor.
  const editorValue = lastSource !== 'json' ? rawJson : undefined;

  // Keep the ref in sync with what we push.
  if (lastSource !== 'json') {
    lastExternalValueRef.current = rawJson;
  }

  // -------------------------------------------------------------------------
  // Error summary bar
  // -------------------------------------------------------------------------
  const errorBar = useMemo(() => {
    if (validationStatus === 'valid') {
      return (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: (t) => alpha(t.palette.success.main, 0.08),
            display: 'flex',
            alignItems: 'center',
            minHeight: 28,
            flexShrink: 0,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'success.main',
              fontFamily: CODE_FONT_FAMILY,
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            Valid
          </Typography>
        </Box>
      );
    }

    if (validationStatus === 'validating') {
      return null;
    }

    // invalid_json or invalid_schema
    const isJsonError = validationStatus === 'invalid_json';
    const severity = isJsonError ? 'error' : 'warning';
    const bgColor = isJsonError ? 'error' : 'warning';
    const firstError = validationErrors[0];
    const remaining = validationErrors.length - 1;

    return (
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: (t) => alpha(t.palette[bgColor].main, 0.12),
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          minHeight: 28,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: `${severity}.main`,
            fontFamily: CODE_FONT_FAMILY,
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
        >
          {isJsonError ? 'JSON Error' : 'Schema'}
        </Typography>
        {firstError && (
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontFamily: CODE_FONT_FAMILY,
              fontSize: '11px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            {firstError.path ? `${firstError.path}: ` : ''}
            {firstError.message}
          </Typography>
        )}
        {remaining > 0 && (
          <Typography
            variant="caption"
            sx={{
              color: `${severity}.main`,
              fontFamily: CODE_FONT_FAMILY,
              fontSize: '11px',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            +{remaining} more
          </Typography>
        )}
      </Box>
    );
  }, [validationStatus, validationErrors]);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Editor — fills available space */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          '& .cm-editor': { height: '100%' },
          '& .cm-scroller': { overflow: 'auto !important' },
        }}
      >
        <CodeMirror
          ref={editorRef}
          value={editorValue}
          height="100%"
          extensions={extensions}
          onChange={handleChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            searchKeymap: true,
          }}
          theme="none"
        />
      </Box>

      {/* Error summary bar */}
      {errorBar}
    </Box>
  );
};

export default ThemeJsonEditor;
