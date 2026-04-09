interface StatusViewProps {
  message: string;
}

export function StatusView({ message }: StatusViewProps) {
  return (
    <section className="status-view">
      <p>{message}</p>
    </section>
  );
}
