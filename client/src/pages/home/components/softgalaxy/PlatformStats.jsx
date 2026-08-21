import { FaUsers, FaChartLine, FaCoins, FaNetworkWired } from "react-icons/fa6";

const iconMap = {
  users: FaUsers,
  chart: FaChartLine,
  coins: FaCoins,
  network: FaNetworkWired,
};

const colorMap = ["gold", "purple", "green", "pink"];

const PlatformStats = ({ data }) => {
  const stats = data?.stats || [
    { icon: "users", value: "606", label: "Total Users" },
    { icon: "chart", value: "10M BET", label: "Betting Volume" },
    { icon: "coins", value: "100k BET", label: "Staking Volume" },
    { icon: "network", value: "5M / 15M", label: "L/R Volume Ratio" },
  ];

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">Platform Overview</h2>
        <p className="soft-section-sub mb-4">
          Real-time statistics across staking, betting, and your affiliate network.
        </p>
        <div className="sg-stats-grid">
          {stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || FaChartLine;
            return (
              <div key={stat.label} className="sg-stat-card">
                <div className={`sg-stat-icon ${colorMap[i % colorMap.length]}`}>
                  <Icon />
                </div>
                <div className="sg-stat-value">{stat.value}</div>
                <div className="sg-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
