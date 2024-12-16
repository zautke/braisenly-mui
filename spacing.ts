const spacing = (factor: number | string) => {
  if (typeof factor === 'string') return factor;
  return factor * 4;
}

// @ts-ignore - mimic MUI spacing function property
spacing.unit = 4;

export default spacing;