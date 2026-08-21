const EarningsOverview = ({ data }) => {
  const defaultEarnings = {
    rows: [
      { label: "Total Interest", value: "$ 1,250.00" },
      { label: "Direct Reward", value: "$ 890.00" },
      { label: "Total Bonus", value: "$ 2,295.00" },
    ],
    claimable: "$ 5,435.00",
    monthlyGrowth: "+12.8%",
    nextPayoutIn: "08h 43m",
    activeStreak: "16 days",
    estimatedMonthly: "$ 6,980.00",
    payoutLegend: [
      { color: "var(--sg-green)", label: "Active" },
      { color: "var(--sg-gold)", label: "Payout" },
      { color: "var(--sg-purple-soft)", label: "Mining" },
      { color: "var(--sg-pink)", label: "New" },
    ],
    payoutPipeline: [
      { stage: "Validation", amount: "$ 820.00", eta: "Today" },
      { stage: "Queued", amount: "$ 1,640.00", eta: "6h" },
      { stage: "Ready", amount: "$ 2,975.00", eta: "Instant" },
    ],
    projection: [
      { label: "This Week", value: "$ 1,920", delta: "+6.1%" },
      { label: "This Month", value: "$ 6,980", delta: "+12.8%" },
      { label: "This Quarter", value: "$ 21,450", delta: "+18.3%" },
    ],
  };

  const incoming = data?.earnings || {};
  const earnings = {
    rows: Array.isArray(incoming.rows) && incoming.rows.length ? incoming.rows : defaultEarnings.rows,
    claimable: incoming.claimable || defaultEarnings.claimable,
    monthlyGrowth: incoming.monthlyGrowth || defaultEarnings.monthlyGrowth,
    nextPayoutIn: incoming.nextPayoutIn || defaultEarnings.nextPayoutIn,
    activeStreak: incoming.activeStreak || defaultEarnings.activeStreak,
    estimatedMonthly: incoming.estimatedMonthly || defaultEarnings.estimatedMonthly,
    payoutLegend:
      Array.isArray(incoming.payoutLegend) && incoming.payoutLegend.length
        ? incoming.payoutLegend
        : defaultEarnings.payoutLegend,
    payoutPipeline:
      Array.isArray(incoming.payoutPipeline) && incoming.payoutPipeline.length
        ? incoming.payoutPipeline
        : defaultEarnings.payoutPipeline,
    projection:
      Array.isArray(incoming.projection) && incoming.projection.length
        ? incoming.projection
        : defaultEarnings.projection,
  };

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">Total Earnings Overview</h2>
        <p className="soft-section-sub mb-4">
          Track your rewards, claim payouts, and monitor distribution status.
        </p>
        <div className="sg-earnings-grid">
          <div className="sg-earnings-card">
            <div className="sg-earnings-head">
              <h3>Performance Snapshot</h3>
              <span className="sg-earnings-badge">{earnings.monthlyGrowth} MoM</span>
            </div>
            {earnings.rows.map((row) => (
              <div key={row.label} className="sg-earnings-row">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
            <div className="sg-mini-kpis">
              <div>
                <span>Next payout in</span>
                <strong>{earnings.nextPayoutIn}</strong>
              </div>
              <div>
                <span>Reward streak</span>
                <strong>{earnings.activeStreak}</strong>
              </div>
              <div>
                <span>Est. monthly</span>
                <strong>{earnings.estimatedMonthly}</strong>
              </div>
            </div>
          </div>

          <div className="sg-claim-box">
            <p className="soft-section-sub mb-0">Available to Claim</p>
            <div className="sg-claim-amount">{earnings.claimable}</div>
            <div className="sg-claim-meta">
              <span className="sg-claim-chip">Fast route: Wallet A</span>
              <span className="sg-claim-chip">Fees: 0.8%</span>
            </div>
            <button type="button" className="sg-btn-claim">Claim</button>
          </div>

          <div className="sg-earnings-card sg-donut-wrap">
            <div>
              <div className="sg-donut" />
              <p className="sg-donut-caption">Distribution Mix</p>
            </div>
            <div>
              <ul className="sg-donut-legend">
                {earnings.payoutLegend.map((item) => (
                  <li key={item.label}>
                    <span style={{ background: item.color }} />
                    {item.label}
                  </li>
                ))}
              </ul>
              <p className="sg-donut-note mb-0">
                Active and payout channels currently account for most inflow. Mining rewards accelerated this cycle.
              </p>
            </div>
          </div>

          <div className="sg-earnings-card">
            <h3 className="sg-card-title">Send reward to wallet</h3>
            <p className="soft-section-sub mb-3">
              Convert your internal balance to an external wallet address.
            </p>
            <input
              type="text"
              placeholder="0x02...331"
              className="form-control mb-3 sg-wallet-input"
            />
            <div className="sg-wallet-aux mb-3">
              <span>Network: ERC-20</span>
              <span>ETA: 2-5 min</span>
              <span>Status: Verified</span>
            </div>
            <button type="button" className="btnTemp px-4 py-2">Update</button>
          </div>

          <div className="sg-earnings-card sg-earnings-wide">
            <h3 className="sg-card-title">Payout Pipeline</h3>
            <p className="soft-section-sub mb-3">
              Live queue status for your reward streams moving through the settlement cycle.
            </p>
            <div className="sg-pipeline-grid">
              {earnings.payoutPipeline.map((item) => (
                <div key={item.stage} className="sg-pipeline-card">
                  <span>{item.stage}</span>
                  <strong>{item.amount}</strong>
                  <small>ETA: {item.eta}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="sg-earnings-card sg-earnings-wide">
            <h3 className="sg-card-title">Forward Projection</h3>
            <p className="soft-section-sub mb-3">
              Estimated earnings trajectory based on your staking activity and trade yield conversion.
            </p>
            <div className="sg-projection-grid">
              {earnings.projection.map((item) => (
                <div key={item.label} className="sg-projection-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <b>{item.delta}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningsOverview;
