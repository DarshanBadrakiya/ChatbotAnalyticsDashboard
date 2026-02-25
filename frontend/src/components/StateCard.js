export default function StateCard({ title, value }) {
  return (
    <div className="card stat-card border-0 h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <span className="stat-title">{title}</span>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}
