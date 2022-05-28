export const unparseIgn = (string) => {
  // starts with "_" and ends with "_[Number]""
  // capture everything in between which is the godname or ign
  const regexp = /^_(.*)_[0-9]$/;
  const match = string.match(regexp);

  return {
    isProfileHidden: !!match,
    ign: match ? match[1].replaceAll('_', ' ') : string,
  };
};
