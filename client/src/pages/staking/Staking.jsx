import "./Staking.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FiBarChart2, FiFlag, FiLock } from "react-icons/fi";
import { GiPokerHand, GiTwoCoins } from "react-icons/gi";
import { IoFootballOutline } from "react-icons/io5";

const yearlyStats = [
  {
    icon: <FiBarChart2 />,
    title: "Crypto Predict",
    value: "0.346543",
    apr: "142.40%",
    volume: "18.4M BET",
    users: "12,540",
    winRate: "58.2%",
    desc: "Prediction pools with dynamic APR balancing based on liquidity and accuracy.",
  },
  {
    icon: <GiPokerHand />,
    title: "Poker",
    value: "0.346543",
    apr: "126.10%",
    volume: "14.7M BET",
    users: "9,870",
    winRate: "54.8%",
    desc: "Competitive tables with smooth reward distribution and peak evening activity.",
  },
  {
    icon: <IoFootballOutline />,
    title: "Sport Betting",
    value: "0.346543",
    apr: "151.90%",
    volume: "22.2M BET",
    users: "17,205",
    winRate: "61.5%",
    desc: "High-volume sports markets with stronger staking yield during live events.",
  },
];

const chatItems = [
  {
    name: "Niiga_777",
    time: "21:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  { name: "Boo", time: "21:30", text: "Aenean commodo ligula eget dolor." },
  { name: "Niiga_777", time: "21:30", text: "Aenean commodo ligula eget dolor." },
  { name: "Boo", time: "21:30", text: "Aenean commodo ligula eget dolor." },
  { name: "Niiga_777", time: "21:30", text: "Lorem ipsum dolor sit amet." },
];

const stakingRows = [
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Conservative",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+100000 BET",
  },
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Dynamic",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+90000 BET",
  },
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Conservative",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+80000 BET",
  },
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Dynamic",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+70000 BET",
  },
];

const liveActivities = [
  { user: "MetaWolf", action: "staked", amount: "12,400 BET", ago: "8s ago" },
  { user: "NovaX", action: "claimed", amount: "1,240 BET", ago: "21s ago" },
  { user: "OrbitQueen", action: "staked", amount: "32,000 BET", ago: "46s ago" },
  { user: "ChainBoo", action: "claimed", amount: "785 BET", ago: "1m ago" },
];

const formatCountdown = (seconds) => {
  const safe = Math.max(0, seconds);
  const h = Math.floor(safe / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((safe % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const Staking = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("my");
  const [liveIndex, setLiveIndex] = useState(0);
  const [claimCountdown, setClaimCountdown] = useState(14 * 3600 + 22 * 60);
  const [activeTile, setActiveTile] = useState(null);

  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setLiveIndex((prev) => (prev + 1) % liveActivities.length);
    }, 2800);

    return () => clearInterval(tickerTimer);
  }, []);

  useEffect(() => {
    const countTimer = setInterval(() => {
      setClaimCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countTimer);
  }, []);

  useEffect(() => {
    if (!activeTile) return undefined;

    const onEsc = (event) => {
      if (event.key === "Escape") setActiveTile(null);
    };

    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeTile]);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Staking</title>
        <meta name="description" content="Dashboard staking page for SoftGalaxy" />
      </Helmet>

      <section id="stakingDashboard" className="mt-3 mb-5">
        <div className="container-fluid stakingShell">
          <div className="row g-3">
            <div className="col-12 col-xl-9">
              <div className="centerPanel">
                <div className="overview panelCard">
                  <div className="overviewHead">
                    <div className="stakeType">
                      <GiTwoCoins />
                      <div>
                        <span>Conservative staking</span>
                        <small>Share betting</small>
                      </div>
                    </div>
                    <div className="overviewStats">
                      <div>
                        <span>APR</span>
                        <strong>135,89%</strong>
                      </div>
                      <div>
                        <span>TVL</span>
                        <strong>25,289,367 BET</strong>
                      </div>
                      <div>
                        <span>Your staking</span>
                        <strong>289,367 BET</strong>
                      </div>
                      <div>
                        <span>Earnings</span>
                        <strong>23,434 BET</strong>
                      </div>
                    </div>
                  </div>

                  <div className="liveStrip mt-3">
                    <span className="liveDot">LIVE</span>
                    <div className="liveItems">
                      {liveActivities.map((item, idx) => (
                        <div
                          key={`${item.user}-${idx}`}
                          className={`liveItem ${idx === liveIndex ? "active" : ""}`}
                        >
                          <strong>{item.user}</strong>
                          <span>{item.action}</span>
                          <b>{item.amount}</b>
                          <small>{item.ago}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overviewBody">
                    <div className="leftStats">
                      <span className="panelTitle">Sharebet games yearly stats</span>
                      <div className="statCards">
                        {yearlyStats.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            className="statCard"
                            onClick={() => setActiveTile(item)}
                          >
                            {item.icon}
                            <span>{item.title}</span>
                            <strong>{item.value}</strong>
                          </button>
                        ))}
                      </div>

                      <div className="summaryRow">
                        <div className="summaryList">
                          <span>34.2k users</span>
                          <span>504.4k bets</span>
                          <span>55.3M BET volume</span>
                        </div>
                        <div className="revenueCard">
                          <GiTwoCoins />
                          <strong>23,43M</strong>
                          <small>Staking revenues</small>
                        </div>
                      </div>
                    </div>

                    <div className="rightChart">
                      <span className="panelTitle">Staking types APR comparison</span>
                      <div className="chartFrame">
                        <div className="chartLabel">May 2022 APR: 9.24%</div>
                        <svg className="aprChart" viewBox="0 0 380 220" preserveAspectRatio="none">
                          <polyline
                            points="0,145 40,130 80,105 120,95 160,88 200,90 240,110 280,135 320,138 360,148"
                            className="lineConservative"
                          />
                          <polyline
                            points="0,165 40,150 80,115 120,108 160,114 200,128 240,145 280,152 320,154 360,166"
                            className="lineDynamic"
                          />
                        </svg>
                        <div className="chartMonths">
                          <span>Jan</span>
                          <span>March</span>
                          <span>May</span>
                          <span>July</span>
                          <span>Sept</span>
                          <span>Nov</span>
                        </div>
                        <div className="chartLegend">
                          <span><i className="dot con" /> Conservative</span>
                          <span><i className="dot dyn" /> Dynamic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stakeBox panelCard mt-3">
                  <div className="stakeInputWrap">
                    <span className="stakeLabel">Stake BET Tokens</span>
                    <small>Staking period is fixed for 1 year</small>
                    <div className="stakeInputRow mt-2">
                      <FiLock />
                      <input
                        type="number"
                        placeholder="Amount to Stake"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                      <button type="button" className="stakePrimary">
                        Stake
                      </button>
                    </div>
                    <div className="quickStake mt-2">
                      <button type="button" onClick={() => setStakeAmount("100")}>100</button>
                      <button type="button" onClick={() => setStakeAmount("500")}>500</button>
                      <button type="button" onClick={() => setStakeAmount("1000")}>1k</button>
                      <button type="button" onClick={() => setStakeAmount("5000")}>5k</button>
                      <button type="button" onClick={() => setStakeAmount("10000")}>10k</button>
                    </div>
                  </div>

                  <div className="claimBox">
                    <strong>Claim 24,000 BET</strong>
                    <small>12k BET to be credited in {formatCountdown(claimCountdown)}</small>
                    <button type="button">Claim</button>
                  </div>
                </div>

                <div className="historyBox panelCard mt-3">
                  <div className="historyTabs">
                    <button
                      className={activeTab === "my" ? "active" : ""}
                      type="button"
                      onClick={() => setActiveTab("my")}
                    >
                      My staking
                    </button>
                    <button
                      className={activeTab === "earn" ? "active" : ""}
                      type="button"
                      onClick={() => setActiveTab("earn")}
                    >
                      My earnings
                    </button>
                    <button
                      className={activeTab === "claims" ? "active" : ""}
                      type="button"
                      onClick={() => setActiveTab("claims")}
                    >
                      Unstakes & claims
                    </button>
                  </div>

                  <div className="historyTable">
                    <div className="historyHeader">
                      <span>Date from</span>
                      <span>Date to</span>
                      <span>Amount</span>
                      <span>Staking type</span>
                      <span>Blockchain Tx ID</span>
                      <span>Staking profit</span>
                    </div>
                    {stakingRows.map((row, idx) => (
                      <div className="historyRow" key={`${row.tx}-${idx}`}>
                        <span>{row.from}</span>
                        <span>{row.to}</span>
                        <span>{row.amount}</span>
                        <span>{row.type}</span>
                        <span>{row.tx}</span>
                        <span className="profit">{row.profit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <aside className="rightPanel panelCard h-100">
                <div className="chatHead">
                  <span>
                    CHAT <i className="chatLiveTag">Live</i>
                  </span>
                  <strong>31 235</strong>
                </div>

                <div className="chatList">
                  {chatItems.map((item, idx) => (
                    <div className="chatItem" key={`${item.name}-${idx}`}>
                      <div className="chatItemTop">
                        <span>{item.name}</span>
                        <small>{item.time}</small>
                      </div>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="chatInputWrap mt-2">
                  <input type="text" placeholder="Enter your message" />
                  <button type="button">
                    <FiFlag />
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {activeTile && (
        <div className="tileModalOverlay" onClick={() => setActiveTile(null)}>
          <div className="tileModal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="tileModalClose"
              onClick={() => setActiveTile(null)}
              aria-label="Close tile details"
            >
              ×
            </button>

            <div className="tileModalHead">
              <div className="tileModalIcon">{activeTile.icon}</div>
              <div>
                <h4>{activeTile.title}</h4>
                <p>{activeTile.desc}</p>
              </div>
            </div>

            <div className="tileModalGrid">
              <div>
                <span>APR</span>
                <strong>{activeTile.apr}</strong>
              </div>
              <div>
                <span>Total Volume</span>
                <strong>{activeTile.volume}</strong>
              </div>
              <div>
                <span>Active Users</span>
                <strong>{activeTile.users}</strong>
              </div>
              <div>
                <span>Win Rate</span>
                <strong>{activeTile.winRate}</strong>
              </div>
            </div>

            <div className="tileModalFoot">
              <span>Live factor</span>
              <b>{activeTile.value}</b>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Staking;
