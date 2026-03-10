type MetricItemProps = {
  label: string;
  value: string;
  accentColor: string;
};

export default function YieldMetricItem({
  label,
  value,
  accentColor
}: MetricItemProps) {
  return (
    <div className="metric-item" style={{ borderLeftColor: accentColor }}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value}
      </div>
    </div>
  );
}
