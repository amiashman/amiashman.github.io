import { useEffect, useMemo, useState } from "react";

export interface DailyLearningItem {
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

function generateLink(item: HebcalItem): string {
  const { category, link } = item;
  if (category !== "parashat") {
    return link;
  }

  const { leyning } = item;
  if (!leyning) {
    return link;
  }

  const dayNum = new Date().getDay();
  const portion = leyning[dayNum + 1];
  const baseUrl = "https://www.sefaria.org/";
  const portionUrl = portion.split(" ").join("_").replaceAll(":", ".");

  return `${baseUrl}${portionUrl}`;
}

export default function useCurrentLearning(dailyLearnings: string[]) {
  const [data, setData] = useState<DailyLearningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { today, nextSaturday, fetchUrl, day } = useMemo(() => {
    const date = new Date();
    const todayStr = date.toLocaleDateString("en-CA");
    const dayNum = date.getDay();
    const daysUntilSaturday = (6 - dayNum) % 7 || 7;

    const nextSaturdayDate = new Date(date);
    nextSaturdayDate.setDate(date.getDate() + daysUntilSaturday);
    const nextSaturdayStr = nextSaturdayDate.toLocaleDateString("en-CA");

    let url = `https://www.hebcal.com/hebcal?v=1&cfg=json&start=${todayStr}&end=${nextSaturdayStr}`;
    dailyLearnings.forEach((learning) => {
      url += `&${learning}=on`;
    });

    return {
      today: todayStr,
      nextSaturday: nextSaturdayStr,
      fetchUrl: url,
      day: dayNum
    };
  }, [dailyLearnings]);

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
            link: generateLink(item)
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

  return { data, loading, error };
}
