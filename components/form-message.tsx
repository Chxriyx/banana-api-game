export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full text-sm">
      {"success" in message && (
        <div className="border-l-2 border-success-foreground bg-green-300 px-4 py-2 text-success-foreground rounded-md border-box">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="border-l-2 border-destructive-foreground bg-destructive/100 px-4 py-2 text-destructive-foreground rounded-md border-box">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="border-l-2 border-success bg-green-300 px-4 py-2 text-foreground">
          {message.message}
        </div>
      )}
    </div>
  );
}

