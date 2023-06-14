export const defaultFilters = ['N/A'];

export function toObject(pairs) {
  return Array.from(pairs).reduce(
    (acc, [key]) => Object.assign(acc, { [key]: key }),
    {}
  );
}
