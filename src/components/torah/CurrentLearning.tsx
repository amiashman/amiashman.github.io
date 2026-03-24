import { useEffect, useState, useMemo } from "react";

interface DailyLearningItem {
  id: number;
  title: string;
  category: string;
  link: string;
}

interface HebcalItem {
  date: string;
  category: string;
  title: string;
  link: string;
  leyning?: { [key: number]: string };
}

const categoriesMappings: { [key: string]: string } = {
  dafyomi: "Daf Yomi",
  kitzurShulchanAruch: "Kitzur Shulchan Aruch",
  parashat: "Shnayim Mikra"
};

const DAILY_LEARNINGS = ["dksa", "s"];

export default function CurrentLearning() {
  const [data, setData] = useState<DailyLearningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { today, nextSaturday, fetchUrl, day } = useMemo(() => {
    const date = new Date();
    const todayStr = date.toISOString().split("T")[0];
    const dayNum = date.getDay();
    const daysUntilSaturday = (6 - dayNum) % 7 || 7;
    date.setDate(date.getDate() + daysUntilSaturday);
    const nextSaturdayStr = date.toISOString().split("T")[0];

    let url = `https://www.hebcal.com/hebcal?v=1&cfg=json&start=${todayStr}&end=${nextSaturdayStr}`;
    DAILY_LEARNINGS.forEach((learning) => {
      url += `&${learning}=on`;
    });

    return {
      today: todayStr,
      nextSaturday: nextSaturdayStr,
      fetchUrl: url,
      day: dayNum
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const items: DailyLearningItem[] = json.items
          .filter(
            (item: HebcalItem) =>
              item.date === today ||
              (item.date === nextSaturday && item.category === "parashat")
          )
          .map((item: HebcalItem, index: number) => ({
            id: index,
            title: item.leyning ? item.leyning[day + 1] : item.title,
            category: categoriesMappings[item.category] || item.category,
            link: item.link
          }));
        setData(items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl, today, nextSaturday, day]);

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
