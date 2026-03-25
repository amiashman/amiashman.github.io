import useCurrentLearning from "./useCurrentLearning";

const DAILY_LEARNINGS = ["dksa", "s"];

export default function CurrentLearning() {
  const { data, loading, error } = useCurrentLearning(DAILY_LEARNINGS);

  if (loading) {
    return (
      <div>
        <h2>Current Learning</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Current Learning</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Current Learning</h2>
      <div className="current-learning-items">
        {data.map((item) => (
          <div key={item.id} className="current-learning-card">
            <h3>{item.category}</h3>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
