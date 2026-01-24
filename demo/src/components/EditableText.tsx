import React, { useState, useRef, useEffect, useCallback, ElementType } from 'react';
import { Box, styled } from '@mui/material';

/**
 * EditableText - Inline edit component with DOM position preservation
 * 
 * Key UX requirements:
 * - Text and input share EXACT same position (text doesn't move)
 * - Clicking text reveals input field *around* the text
 * - Only input background/outline fade (NOT the text itself)
 * - Non-linear easing on transitions
 * - Enter/blur confirms, Escape cancels
 */

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  as?: ElementType;
  inputType?: 'text' | 'color';
  sx?: object;
  inputSx?: object;
}

// Non-linear easing curve for smooth fade
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const TRANSITION_DURATION = '180ms';

const EditableContainer = styled(Box)({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'text',
});

// The input is absolutely positioned to overlay the text exactly
const HiddenInput = styled('input')<{ $isEditing: boolean }>(({ $isEditing }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  padding: '0 4px',
  margin: 0,
  border: '1px solid',
  borderRadius: 3,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  letterSpacing: 'inherit',
  textAlign: 'inherit',
  boxSizing: 'border-box',
  outline: 'none',
  // The text inside input is always visible
  // Only background and border fade
  backgroundColor: $isEditing ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
  borderColor: $isEditing ? 'rgba(0, 130, 200, 0.6)' : 'transparent',
  boxShadow: $isEditing ? '0 0 0 2px rgba(0, 130, 200, 0.15)' : 'none',
  transition: `background-color ${TRANSITION_DURATION} ${EASING}, 
               border-color ${TRANSITION_DURATION} ${EASING}, 
               box-shadow ${TRANSITION_DURATION} ${EASING}`,
  // When not editing, make input non-interactive but keep text visible
  pointerEvents: $isEditing ? 'auto' : 'none',
  zIndex: $isEditing ? 2 : 1,
}));

// The text element - visibility controlled, NOT opacity
const TextElement = styled(Box)<{ $isEditing: boolean }>(({ $isEditing }) => ({
  // Use visibility hidden (not display:none) to preserve layout
  visibility: $isEditing ? 'hidden' : 'visible',
  // NO transition on visibility - text should NOT fade
  whiteSpace: 'nowrap',
  minWidth: '2ch', // Ensure minimum width for empty values
}));

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as: TextComponent = 'span',
  inputType = 'text',
  sx = {},
  inputSx = {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const originalValue = useRef(value);

  // Sync when value prop changes
  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
      originalValue.current = value;
    }
  }, [value, isEditing]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEditing = useCallback(() => {
    originalValue.current = value;
    setEditValue(value);
    setIsEditing(true);
  }, [value]);

  const confirmEdit = useCallback(() => {
    setIsEditing(false);
    if (editValue !== originalValue.current) {
      onChange(editValue);
    }
  }, [editValue, onChange]);

  const cancelEdit = useCallback(() => {
    setEditValue(originalValue.current);
    setIsEditing(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }, [confirmEdit, cancelEdit]);

  return (
    <EditableContainer onClick={!isEditing ? startEditing : undefined} sx={sx}>
      {/* Text element - hidden when editing but keeps space */}
      <TextElement as={TextComponent} $isEditing={isEditing}>
        {value || '\u00A0'}
      </TextElement>
      
      {/* Input overlays text exactly - only bg/border fade */}
      <HiddenInput
        ref={inputRef}
        type={inputType}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={confirmEdit}
        onKeyDown={handleKeyDown}
        $isEditing={isEditing}
        style={inputSx as React.CSSProperties}
      />
    </EditableContainer>
  );
};

export default EditableText;

