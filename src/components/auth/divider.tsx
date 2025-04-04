
export function AuthDivider({ text }: { text: string }) {
  return (
    <div className="relative mt-6 w-full">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2 bg-background text-muted-foreground">
          {text}
        </span>
      </div>
    </div>
  );
}
