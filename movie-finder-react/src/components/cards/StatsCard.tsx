import { useEffect, useState } from "react";
import "./_StatsCard.scss";
import { getStatsFromHistory } from "../../firebase/UserStats";
import { useAuth } from '../../context/AuthContext';

interface ReturnedStats {
  label: string;
  value: { genre: string; count: number }[] | number;
}


export default function StatsCard() {
  const { currentUser } = useAuth()!;
  const [stats, setStats] = useState<ReturnedStats[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      try {
        const fetchedStats = await getStatsFromHistory(currentUser.uid);
        console.log("Fetched stats:", fetchedStats);
        if (fetchedStats) {
          console.log("Fetched stats:", fetchedStats);
          const formattedStats: ReturnedStats[] = fetchedStats.map(stat => ({
            label: stat.label,
            value: Array.isArray(stat.value)
              ? stat.value.map(item => ({ genre: item.genre, count: item.count.count }))
              : stat.value
          }));
          setStats(formattedStats);
        }
      } catch (error) {
        console.error("Error fetching stats: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser.uid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="stats__section">
      <h2>See Your Current Stats</h2>
      <div className="stats__wrapper">
        {stats ? (
          stats.map((stat, index) => (
            <div className="stats__card" key={index}>
              <h3>{stat.label}</h3>
              {stat.label === "Most Watched Genres" && Array.isArray(stat.value) ? (
                stat.value.map((genreStat, genreIndex) => (
                  <div key={genreIndex}>
                    <p>{genreStat.genre}</p>
                  </div>
                ))
              ) : (
                <p>{typeof stat.value === 'object' ? JSON.stringify(stat.value) : String(stat.value)}</p>
              )}
            </div>
          ))
        ) : (
          <p>No stats available</p>
        )}
      </div>
    </div>
  );
  
}
