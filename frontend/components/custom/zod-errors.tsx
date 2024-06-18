export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="text-primary text-xs font-semibold mt-1 py-1">
      {err}
    </div>
  ));
}
