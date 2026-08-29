import "./Trading.css";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { FiArrowUpRight, FiArrowDownRight, FiTrendingUp, FiBarChart } from "react-icons/fi";

const PERIOD_DATA = {
  "7D": {
    label: "Weekly Volume",
    subtitle: "Volume is shown in ETH across the last 7 days.",
    totalVolume: "12,070 ETH",
    average: "1,724 ETH",
    bars: [
      { label: "Mon", value: 40, volume: 1240, change: "+8.2%" },
      { label: "Tue", value: 60, volume: 1680, change: "+12.5%" },
      { label: "Wed", value: 75, volume: 1980, change: "+6.8%" },
      { label: "Thu", value: 55, volume: 1520, change: "-4.2%" },
      { label: "Fri", value: 90, volume: 2320, change: "+9.9%" },
      { label: "Sat", value: 70, volume: 1890, change: "+2.3%" },
      { label: "Sun", value: 50, volume: 1420, change: "-1.8%" },
    ],
    metrics: [
      { label: "Floor Price", value: "0.83 ETH", change: "+4.7%", positive: true, icon: <FiTrendingUp /> },
      { label: "Active Listings", value: "1,240", change: "+12.0%", positive: true, icon: <FiBarChart /> },
      { label: "Top Bid", value: "5.4 ETH", change: "+9.2%", positive: true, icon: <FiArrowUpRight /> },
      { label: "Market Volatility", value: "18.4%", change: "-2.6%", positive: false, icon: <FiArrowDownRight /> },
    ],
    snapshot: "Trading activity is strong across collectible and space asset categories. The last 7 days show growing purchase momentum and a rise in high-value bids.",
  },
  "30D": {
    label: "Monthly Volume",
    subtitle: "Volume is shown in ETH across the last 30 days.",
    totalVolume: "58,340 ETH",
    average: "1,944 ETH",
    bars: [
      { label: "W1", value: 55, volume: 13200, change: "+5.1%" },
      { label: "W2", value: 80, volume: 18400, change: "+15.2%" },
      { label: "W3", value: 65, volume: 14900, change: "-8.6%" },
      { label: "W4", value: 72, volume: 11840, change: "+3.4%" },
    ],
    metrics: [
      { label: "Floor Price", value: "1.02 ETH", change: "+11.3%", positive: true, icon: <FiTrendingUp /> },
      { label: "Active Listings", value: "3,870", change: "+22.5%", positive: true, icon: <FiBarChart /> },
      { label: "Top Bid", value: "9.8 ETH", change: "+18.1%", positive: true, icon: <FiArrowUpRight /> },
      { label: "Market Volatility", value: "22.1%", change: "+3.7%", positive: false, icon: <FiArrowDownRight /> },
    ],
    snapshot: "Monthly data reveals strong accumulation phases in weeks 2 and 4, with top-tier bids climbing steadily. Space collectibles drove the bulk of volume.",
  },
  "90D": {
    label: "Quarterly Volume",
    subtitle: "Volume is shown in ETH across the last 90 days.",
    totalVolume: "201,850 ETH",
    average: "2,243 ETH",
    bars: [
      { label: "M1", value: 60, volume: 62400, change: "+7.8%" },
      { label: "M2", value: 85, volume: 88200, change: "+20.4%" },
      { label: "M3", value: 72, volume: 51250, change: "-9.1%" },
    ],
    metrics: [
      { label: "Floor Price", value: "1.44 ETH", change: "+28.6%", positive: true, icon: <FiTrendingUp /> },
      { label: "Active Listings", value: "9,120", change: "+44.0%", positive: true, icon: <FiBarChart /> },
      { label: "Top Bid", value: "24.5 ETH", change: "+62.3%", positive: true, icon: <FiArrowUpRight /> },
      { label: "Market Volatility", value: "31.7%", change: "+13.3%", positive: false, icon: <FiArrowDownRight /> },
    ],
    snapshot: "The quarter saw a major bull run in month 2 fueled by new collection launches. Month 3 corrected slightly but floor prices held strong across all categories.",
  },
};

const ALL_MOVERS = [
  { name: "Lunar Lotus", owner: "@celeste", price: "2.1 ETH", change: "+18.2%", positive: true },
  { name: "Galaxy Hive", owner: "@nova", price: "1.6 ETH", change: "+12.8%", positive: true },
  { name: "Pixel Phantom", owner: "@rix", price: "3.2 ETH", change: "-4.4%", positive: false },
  { name: "Orbit Orchid", owner: "@ariel", price: "0.9 ETH", change: "+7.1%", positive: true },
  { name: "Nebula Panda", owner: "@starkid", price: "4.8 ETH", change: "+31.0%", positive: true },
  { name: "Void Wraith", owner: "@oblix", price: "1.1 ETH", change: "-9.7%", positive: false },
];

const Trading = () => {
  const [activePeriod, setActivePeriod] = useState("7D");
  const [animating, setAnimating] = useState(false);
  const [visibleMovers, setVisibleMovers] = useState(ALL_MOVERS.slice(0, 4));
  const [activeModal, setActiveModal] = useState(null);
  const tickerRef = useRef(null);

  const data = PERIOD_DATA[activePeriod];
  const maxValue = Math.max(...data.bars.map((item) => item.value));

  const openMetricModal = (metric) => {
    setActiveModal({
      type: "metric",
      icon: metric.icon,
      title: `${metric.label} Insights`,
      value: metric.value,
      trend: metric.change,
      positive: metric.positive,
      description:
        metric.label === "Floor Price"
          ? "Floor price reflects the minimum buy-in for listed assets and often signals short-term sentiment shifts."
          : metric.label === "Active Listings"
            ? "Active listings track supply pressure and market depth across categories in the selected period."
            : metric.label === "Top Bid"
              ? "Top bid indicates peak buyer aggression and liquidity concentration in premium assets."
              : "Volatility tracks magnitude of price swings and helps gauge risk-adjusted entry timing.",
      details: [
        { label: "Selected Window", value: activePeriod },
        { label: "Period Benchmark", value: data.average },
        { label: "Confidence", value: metric.positive ? "Bullish Bias" : "Risk Alert" },
        { label: "Signal Grade", value: metric.positive ? "A-" : "B" },
      ],
    });
  };

  const openBarModal = (bar) => {
    const barShare = ((bar.value / maxValue) * 100).toFixed(1);
    setActiveModal({
      type: "bar",
      icon: <FiBarChart />,
      title: `${bar.label} Trading Breakdown`,
      value: `${bar.volume.toLocaleString()} ETH`,
      trend: bar.change,
      positive: bar.change.startsWith("+"),
      description: `Detailed view for ${bar.label} in ${activePeriod} mode, including comparative share and pace versus recent candles.`,
      details: [
        { label: "Relative Strength", value: `${barShare}%` },
        { label: "Volume Rank", value: `${data.bars.findIndex((b) => b.label === bar.label) + 1} / ${data.bars.length}` },
        { label: "Period Total", value: data.totalVolume },
        { label: "Market Mode", value: bar.change.startsWith("+") ? "Expansion" : "Cooldown" },
      ],
    });
  };

  const handlePeriodChange = (period) => {
    if (period === activePeriod) return;
    setAnimating(true);
    setTimeout(() => {
      setActivePeriod(period);
      setAnimating(false);
    }, 220);
  };

  // Rotate top movers every 3 seconds to simulate live feed
  useEffect(() => {
    tickerRef.current = setInterval(() => {
      setVisibleMovers((prev) => {
        const next = [...prev.slice(1), ALL_MOVERS[(ALL_MOVERS.indexOf(prev[prev.length - 1]) + 1) % ALL_MOVERS.length]];
        return next;
      });
    }, 3000);
    return () => clearInterval(tickerRef.current);
  }, []);

  useEffect(() => {
    if (!activeModal) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Trading Volume</title>
        <meta name="description" content="SoftGalaxy trading volume chart page" />
      </Helmet>
      <section id="trading">
        <div className="container mt-4 mb-5 mt-md-5 pt-lg-3">
          <div className="row mx-2 pageTitle mb-4">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">Trading</span> Volume
              </span>
              <span className="d-block F3 textS2">
                See daily NFT trading volume across the marketplace.
              </span>
            </div>
          </div>

          <div className="row mx-2">
            <div className="col-12 chartCard p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                <div>
                  <span className="F2 chartTitle">{data.label}</span>
                  <p className="F4 chartSubtitle mt-2">{data.subtitle}</p>
                </div>
                <div className="d-flex gap-3 statsRow">
                  <div className="statBox">
                    <span className="F5 statLabel">Total Volume</span>
                    <span className={`F1 statValue${animating ? " statFade" : ""}`}>{data.totalVolume}</span>
                  </div>
                  <div className="statBox">
                    <span className="F5 statLabel">Average</span>
                    <span className={`F1 statValue${animating ? " statFade" : ""}`}>{data.average}</span>
                  </div>
                </div>
              </div>

              <div className={`chartGrid chartGrid--${data.bars.length}${animating ? " chartFadeOut" : " chartFadeIn"}`}>
                {data.bars.map((item, index) => (
                  <div key={`${activePeriod}-${index}`} className="chartColumn">
                    <span className={`barRate ${item.change.startsWith("+") ? "positive" : "negative"}`}>
                      {item.change}
                    </span>
                    <div
                      className="chartBar"
                      role="button"
                      tabIndex={0}
                      onClick={() => openBarModal(item)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openBarModal(item);
                        }
                      }}
                      style={{
                        height: `${(item.value / maxValue) * 100}%`,
                        animationDelay: `${index * 60}ms`,
                      }}
                    >
                      <span className="barValue">{item.volume.toLocaleString()}</span>
                    </div>
                    <span className="barLabel F5">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 mt-5 overviewSection">
                <div className="marketOverview p-4">
                  <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                    <div>
                      <span className="F5 subtitle">Market Snapshot</span>
                      <p className={`F4 mt-2${animating ? " statFade" : ""}`}>{data.snapshot}</p>
                    </div>
                    <div className="chartControls">
                      {["7D", "30D", "90D"].map((period) => (
                        <button
                          key={period}
                          className={`periodButton ${period === activePeriod ? "active" : ""}`}
                          onClick={() => handlePeriodChange(period)}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="metricCards mt-4">
                    {data.metrics.map((metric, index) => (
                      <button
                        key={`${activePeriod}-metric-${index}`}
                        type="button"
                        className="metricCard p-3"
                        onClick={() => openMetricModal(metric)}
                      >
                        <div className="d-flex justify-content-between align-items-start gap-2">
                          <span className="metricIcon">{metric.icon}</span>
                          <span className={`metricTrend ${metric.positive ? "positive" : "negative"}`}>
                            {metric.change}
                          </span>
                        </div>
                        <span className="metricLabel F5 mt-3">{metric.label}</span>
                        <span className="metricValue F2">{metric.value}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="topMoversCard p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="F2 sectionTitle">Top Movers</span>
                    <span className="F6 badge liveBadge">
                      <span className="liveDot" />
                      Live
                    </span>
                  </div>
                  <div className="moversList">
                    {visibleMovers.map((item, index) => (
                      <div key={`${item.name}-${index}`} className="topMoverItem moverSlideIn">
                        <div>
                          <span className="F5 moverName">{item.name}</span>
                          <span className="F6 moverOwner">{item.owner}</span>
                        </div>
                        <div className="text-end">
                          <span className="F5 moverPrice">{item.price}</span>
                          <span className={`F6 moverChange ${item.positive ? "positive" : "negative"}`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeModal && (
        <div className="tradeModalOverlay" onClick={() => setActiveModal(null)}>
          <div className="tradeModal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="tradeModalClose"
              aria-label="Close details"
              onClick={() => setActiveModal(null)}
            >
              ×
            </button>

            <div className="tradeModalHead">
              <span className="tradeModalIcon">{activeModal.icon}</span>
              <div>
                <h4>{activeModal.title}</h4>
                <p>{activeModal.description}</p>
              </div>
            </div>

            <div className="tradeModalGrid">
              {activeModal.details.map((detail) => (
                <div key={detail.label}>
                  <span>{detail.label}</span>
                  <strong>{detail.value}</strong>
                </div>
              ))}
            </div>

            <div className="tradeModalFoot">
              <span>Current Signal</span>
              <b className={activeModal.positive ? "positive" : "negative"}>
                {activeModal.trend} · {activeModal.value}
              </b>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trading;
