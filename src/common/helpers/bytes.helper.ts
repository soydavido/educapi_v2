export function parseByteSize(
  input: string | number | undefined,
  fallback = 25 * 1024 * 1024,
): number {
  if (input == null) return fallback;
  if (typeof input === 'number') return input;
  const s = input.trim().toUpperCase();
  const m = s.match(/^(\d+(?:\.\d+)?)(B|KB|K|MB|M|GB|G)?$/);
  if (!m) return fallback;
  const value = parseFloat(m[1]);
  const unit = m[2] ?? 'B';
  const mul =
    unit === 'B'
      ? 1
      : unit === 'KB' || unit === 'K'
        ? 1024
        : unit === 'MB' || unit === 'M'
          ? 1024 ** 2
          : unit === 'GB' || unit === 'G'
            ? 1024 ** 3
            : 1;
  return Math.floor(value * mul);
}
