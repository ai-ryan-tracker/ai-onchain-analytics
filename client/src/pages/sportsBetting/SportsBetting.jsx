import "./SportsBetting.css";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { MdSportsSoccer, MdSportsBasketball, MdSportsMma, MdSportsTennis, MdVideogameAsset } from "react-icons/md";
import { GiTennisRacket } from "react-icons/gi";
import { HiOutlineTrendingUp, HiOutlineTrendingDown } from "react-icons/hi";

const events = [
  {
    id: 1,
    sport: "football",
    league: "UEFA Champions",
    match: "Real Orbit vs Lunar FC",
    time: "Today • 21:00",
    date: "2026-07-18",
    odds: { home: 1.84, draw: 3.4, away: 4.2 },
    prevOdds: { home: 1.88, draw: 3.35, away: 4.15 },
    trend: "Hot",
    bets: 2450,
    volume: "$185,400",
    homeForm: "WWLWW",
    awayForm: "WLWLW",
    status: "upcoming",
  },
  {
    id: 2,
    sport: "basketball",
    league: "NBA Galaxy",
    match: "Nebula Nets vs Solar Bulls",
    time: "Today • 23:30",
    date: "2026-07-18",
    odds: { home: 2.1, draw: 0, away: 1.76 },
    prevOdds: { home: 2.05, draw: 0, away: 1.81 },
    trend: "Rising",
    bets: 1840,
    volume: "$142,300",
    homeForm: "WLWWL",
    awayForm: "WWWLL",
    status: "upcoming",
  },
  {
    id: 3,
    sport: "esports",
    league: "E-Sports Arena",
    match: "Crypto Titans vs ZeroPing",
    time: "Tomorrow • 18:00",
    date: "2026-07-19",
    odds: { home: 1.65, draw: 0, away: 2.3 },
    prevOdds: { home: 1.62, draw: 0, away: 2.35 },
    trend: "Stable",
    bets: 1205,
    volume: "$89,600",
    homeForm: "WLWWW",
    awayForm: "LLWLW",
    status: "upcoming",
  },
  {
    id: 4,
    sport: "mma",
    league: "UFC Main Card",
    match: "Drax Fury vs Kairo Stone",
    time: "Tomorrow • 02:00",
    date: "2026-07-19",
    odds: { home: 1.92, draw: 0, away: 1.92 },
    prevOdds: { home: 1.95, draw: 0, away: 1.89 },
    trend: "Live",
    bets: 3120,
    volume: "$256,800",
    homeForm: "WWWWL",
    awayForm: "WLWLW",
    status: "live",
    liveScore: "R1 - 2:35",
  },
  {
    id: 5,
    sport: "football",
    league: "Premier League",
    match: "Blue Meteors vs Red Comets",
    time: "Sun • 19:45",
    date: "2026-07-20",
    odds: { home: 2.24, draw: 3.05, away: 2.75 },
    prevOdds: { home: 2.20, draw: 3.10, away: 2.80 },
    trend: "Hot",
    bets: 4560,
    volume: "$342,100",
    homeForm: "WLWWW",
    awayForm: "WWLWW",
    status: "upcoming",
  },
  {
    id: 6,
    sport: "tennis",
    league: "Tennis Masters",
    match: "N. Blade vs T. Pulse",
    time: "Sun • 15:00",
    date: "2026-07-20",
    odds: { home: 1.73, draw: 0, away: 2.12 },
    prevOdds: { home: 1.75, draw: 0, away: 2.10 },
    trend: "Live",
    bets: 892,
    volume: "$65,200",
    homeForm: "WWWLW",
    awayForm: "WLWLL",
    status: "live",
    liveScore: "S1 - 4:2",
  },
];

const sportIcons = {
  football: MdSportsSoccer,
  basketball: MdSportsBasketball,
  mma: MdSportsMma,
  tennis: MdSportsTennis,
  esports: MdVideogameAsset,
};

const coinMeta = {
  BTC: { icon: FaBitcoin, color: "#f7931a", fee: "0.00014 BTC" },
  ETH: { icon: FaEthereum, color: "#6f7cff", fee: "0.0021 ETH" },
  SOL: { icon: TbCurrencySolana, color: "#14f195", fee: "0.008 SOL" },
  USDT: { icon: PiCurrencyCircleDollarLight, color: "#26a17b", fee: "1.0 USDT" },
};

const recentBets = [
  { id: 1, user: "0x7c2...4e9", pick: "Home", amount: "0.125 BTC", payout: "0.23 BTC", result: "won", time: "5m ago" },
  { id: 2, user: "0x9a1...3f2", pick: "Away", amount: "500 USDT", payout: "0", result: "lost", time: "12m ago" },
  { id: 3, user: "0x4b5...8k3", pick: "Draw", amount: "2.5 ETH", payout: "7.1 ETH", result: "won", time: "28m ago" },
  { id: 4, user: "0x6d9...7p1", pick: "Home", amount: "0.08 SOL", payout: "0", result: "lost", time: "34m ago" },
  { id: 5, user: "0x2e8...1m6", pick: "Away", amount: "1000 USDT", payout: "2100 USDT", result: "won", time: "41m ago" },
];

const SportsBetting = () => {
  const [activeCoin, setActiveCoin] = useState("USDT");
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [selectedPick, setSelectedPick] = useState("home");
  const [stake, setStake] = useState("50");
  const [activeSport, setActiveSport] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents = useMemo(() => {
    if (activeSport === "all") return events;
    return events.filter(e => e.sport === activeSport);
  }, [activeSport]);

  const selectedEvent = useMemo(
    () => filteredEvents.find((e) => e.id === selectedEventId) || filteredEvents[0],
    [selectedEventId, filteredEvents]
  );

  const odd = selectedEvent.odds[selectedPick] || 1;
  const payout = (Number(stake || 0) * odd).toFixed(2);

  const getOddChange = (pick) => {
    const current = selectedEvent.odds[pick];
    const prev = selectedEvent.prevOdds[pick];
    if (!current || !prev) return 0;
    return ((current - prev) / prev * 100).toFixed(2);
  };

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Sports Betting</title>
        <meta
          name="description"
          content="Bet on top sports events with BTC, ETH, SOL, and USDT on SoftGalaxy"
        />
      </Helmet>

      <section id="sportsBetting" className="mt-4 pt-lg-3 pb-5">
        <div className="container">
          <div className="row mx-2 mb-4">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">Sports</span> Betting With Crypto
              </span>
              <span className="d-block F3 textS2">
                Live odds, real-time stats, and instant payouts. Bet on your favorite teams with confidence.
              </span>
            </div>
          </div>

          {/* Sport Filters */}
          <div className="row mx-2 mb-4">
            <div className="col-12">
              <div className="sbSportFilter">
                <button 
                  className={`sportFilterBtn ${activeSport === "all" ? "active" : ""}`}
                  onClick={() => {
                    setActiveSport("all");
                    if (selectedEventId && !filteredEvents.find(e => e.id === selectedEventId)) {
                      setSelectedEventId(filteredEvents[0]?.id);
                    }
                  }}
                >
                  All Sports
                </button>
                {Object.entries(sportIcons).map(([sport, Icon]) => (
                  <button 
                    key={sport}
                    className={`sportFilterBtn ${activeSport === sport ? "active" : ""}`}
                    onClick={() => {
                      setActiveSport(sport);
                      const sportEvents = events.filter(e => e.sport === sport);
                      if (sportEvents.length > 0) {
                        setSelectedEventId(sportEvents[0].id);
                      }
                    }}
                  >
                    <Icon />
                    <span className="sportName">{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row gx-4 gy-4 mx-2">
            {/* Featured Markets & Details */}
            <div className="col-12 col-lg-8">
              <div className="sbCard p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h5 className="m-0 sbTitle">Featured Markets</h5>
                  <span className="sbBadge">Updated 20s ago</span>
                </div>

                <div className="eventList">
                  {filteredEvents.map((event) => (
                    <button
                      key={event.id}
                      className={`eventItem ${selectedEventId === event.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setSelectedPick("home");
                      }}
                    >
                      <div className="eventTop">
                        <div className="eventLeft">
                          <span className="eventLeague">{event.league}</span>
                          {event.status === "live" && <span className="eventLiveTag">LIVE</span>}
                        </div>
                        <span className={`eventTrend ${event.trend.toLowerCase()}`}>{event.trend}</span>
                      </div>
                      <span className="eventMatch">{event.match}</span>
                      <div className="eventFooter">
                        <span className="eventTime">{event.time}</span>
                        <span className="eventVolume">${event.volume}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Details Panel */}
              {selectedEvent && (
                <div className="sbCard p-3 p-md-4 mt-4 eventDetailsPanel">
                  <h5 className="m-0 sbTitle mb-3">Match Details</h5>
                  
                  <div className="detailsGrid">
                    <div className="detailBox">
                      <span className="detailLabel">Form</span>
                      <div className="formDisplay">
                        <span className="formTeam">Home: <span className="formText">{selectedEvent.homeForm}</span></span>
                        <span className="formTeam">Away: <span className="formText">{selectedEvent.awayForm}</span></span>
                      </div>
                    </div>
                    
                    <div className="detailBox">
                      <span className="detailLabel">Market Volume</span>
                      <span className="detailValue">{selectedEvent.volume}</span>
                    </div>
                    
                    <div className="detailBox">
                      <span className="detailLabel">Total Bets</span>
                      <span className="detailValue">{selectedEvent.bets.toLocaleString()}</span>
                    </div>
                    
                    <div className="detailBox">
                      <span className="detailLabel">Status</span>
                      <span className={`statusTag ${selectedEvent.status}`}>{selectedEvent.status === "live" ? `🔴 LIVE - ${selectedEvent.liveScore}` : "Upcoming"}</span>
                    </div>
                  </div>

                  <div className="oddsComparisonBox mt-4">
                    <span className="detailLabel">Odds Comparison</span>
                    <div className="oddsGrid mt-2">
                      {Object.entries(selectedEvent.odds).map(([pick, odd]) => {
                        if (odd === 0) return null;
                        const change = getOddChange(pick);
                        const isUp = parseFloat(change) > 0;
                        return (
                          <div key={pick} className="oddCard">
                            <span className="oddLabel">{pick.toUpperCase()}</span>
                            <div className="oddValue">{odd}</div>
                            <div className={`oddChange ${isUp ? "up" : "down"}`}>
                              {isUp ? <HiOutlineTrendingUp /> : <HiOutlineTrendingDown />}
                              <span>{Math.abs(change)}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bet Slip */}
            <div className="col-12 col-lg-4">
              <div className="sbCard p-3 p-md-4 betSlip">
                <h5 className="m-0 sbTitle mb-3">Bet Slip</h5>

                <div className="slipSection">
                  <span className="slipLabel">Match</span>
                  <span className="slipValue">{selectedEvent.match}</span>
                  <span className="slipSubtext">{selectedEvent.league}</span>
                </div>

                <div className="slipSection">
                  <span className="slipLabel">Pick</span>
                  <div className="pickButtons">
                    <button
                      className={selectedPick === "home" ? "active" : ""}
                      onClick={() => setSelectedPick("home")}
                    >
                      <span>Home</span>
                      <span className="oddValue">{selectedEvent.odds.home}</span>
                    </button>
                    {selectedEvent.odds.draw > 0 && (
                      <button
                        className={selectedPick === "draw" ? "active" : ""}
                        onClick={() => setSelectedPick("draw")}
                      >
                        <span>Draw</span>
                        <span className="oddValue">{selectedEvent.odds.draw}</span>
                      </button>
                    )}
                    <button
                      className={selectedPick === "away" ? "active" : ""}
                      onClick={() => setSelectedPick("away")}
                    >
                      <span>Away</span>
                      <span className="oddValue">{selectedEvent.odds.away}</span>
                    </button>
                  </div>
                </div>

                <div className="slipSection">
                  <span className="slipLabel">Pay With</span>
                  <div className="coinRow">
                    {Object.keys(coinMeta).map((coin) => {
                      const CoinIcon = coinMeta[coin].icon;
                      return (
                        <button
                          key={coin}
                          className={`coinBtn ${activeCoin === coin ? "active" : ""}`}
                          onClick={() => setActiveCoin(coin)}
                        >
                          <CoinIcon style={{ color: coinMeta[coin].color }} />
                          <span>{coin}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="slipSection">
                  <span className="slipLabel">Stake ({activeCoin})</span>
                  <input
                    type="number"
                    min="1"
                    className="stakeInput"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="payoutBox mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Odds</span>
                    <strong>{odd}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Network Fee</span>
                    <span>{coinMeta[activeCoin].fee}</span>
                  </div>
                  <div className="payoutDivider"></div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Potential Payout</span>
                    <strong className="payoutHighlight">{payout} {activeCoin}</strong>
                  </div>
                </div>

                <button className="placeBetBtn mt-3">Place Bet</button>
                <small className="d-block mt-2 slipHint">By placing this bet, you accept event settlement and wallet signature terms.</small>
              </div>

              {/* Quick Stats */}
              <div className="sbCard p-3 p-md-4 mt-4 quickStats">
                <h5 className="m-0 sbTitle mb-3">Your Stats</h5>
                <div className="statsGrid">
                  <div className="statItem">
                    <span className="statLabel">Win Rate</span>
                    <span className="statValue">62.5%</span>
                  </div>
                  <div className="statItem">
                    <span className="statLabel">Avg Odds</span>
                    <span className="statValue">1.95</span>
                  </div>
                  <div className="statItem">
                    <span className="statLabel">ROI</span>
                    <span className="statValue positive">+18.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bets Section */}
          <div className="row mx-2 mt-5">
            <div className="col-12">
              <div className="sbCard p-3 p-md-4">
                <div className="betTabs mb-4">
                  <button 
                    className={`betTab ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                  >
                    All Bets
                  </button>
                  <button 
                    className={`betTab ${activeTab === "recent" ? "active" : ""}`}
                    onClick={() => setActiveTab("recent")}
                  >
                    Recent Activity
                  </button>
                  <button 
                    className={`betTab ${activeTab === "winners" ? "active" : ""}`}
                    onClick={() => setActiveTab("winners")}
                  >
                    Big Wins
                  </button>
                </div>

                <div className="recentBetsTable">
                  <div className="betTableHeader">
                    <div>User</div>
                    <div>Pick</div>
                    <div>Bet Amount</div>
                    <div>Payout</div>
                    <div>Result</div>
                    <div>Time</div>
                  </div>
                  
                  {recentBets.map((bet) => (
                    <div key={bet.id} className={`betTableRow result-${bet.result}`}>
                      <div className="betUser">{bet.user}</div>
                      <div className="betPick">{bet.pick}</div>
                      <div className="betAmount">{bet.amount}</div>
                      <div className="betPayout">{bet.payout}</div>
                      <div className={`betResult ${bet.result}`}>
                        {bet.result === "won" ? "✓ Won" : "✗ Lost"}
                      </div>
                      <div className="betTime">{bet.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SportsBetting;
