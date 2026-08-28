import "./Roulette.css";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";

const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const redSet = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

const coinMeta = {
  BTC: { icon: FaBitcoin, color: "#f7931a" },
  ETH: { icon: FaEthereum, color: "#6f7cff" },
  SOL: { icon: TbCurrencySolana, color: "#14f195" },
  USDT: { icon: PiCurrencyCircleDollarLight, color: "#26a17b" },
};

const picks = [
  { key: "red", label: "Red", multi: 2 },
  { key: "black", label: "Black", multi: 2 },
  { key: "odd", label: "Odd", multi: 2 },
  { key: "even", label: "Even", multi: 2 },
  { key: "low", label: "1 - 18", multi: 2 },
  { key: "high", label: "19 - 36", multi: 2 },
  { key: "green", label: "0", multi: 36 },
];

const Roulette = () => {
  const [activeCoin, setActiveCoin] = useState("USDT");
  const [stake, setStake] = useState("25");
  const [activePick, setActivePick] = useState("red");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState({ number: 0, color: "green" });

  const selectedPick = useMemo(
    () => picks.find((p) => p.key === activePick) || picks[0],
    [activePick]
  );

  const potentialPayout = (Number(stake || 0) * selectedPick.multi).toFixed(2);

  const getColor = (n) => {
    if (n === 0) return "green";
    return redSet.has(n) ? "red" : "black";
  };

  const isWin = (n, pick) => {
    if (pick === "red") return redSet.has(n);
    if (pick === "black") return n !== 0 && !redSet.has(n);
    if (pick === "odd") return n !== 0 && n % 2 === 1;
    if (pick === "even") return n !== 0 && n % 2 === 0;
    if (pick === "low") return n >= 1 && n <= 18;
    if (pick === "high") return n >= 19 && n <= 36;
    if (pick === "green") return n === 0;
    return false;
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * wheelNumbers.length);
    const number = wheelNumbers[randomIndex];
    const segmentDeg = 360 / wheelNumbers.length;
    const targetDeg = randomIndex * segmentDeg;
    const extraTurns = 360 * 6;
    const nextRotation = rotation + extraTurns - targetDeg;

    setRotation(nextRotation);

    setTimeout(() => {
      setResult({ number, color: getColor(number) });
      setSpinning(false);
    }, 4200);
  };

  const won = isWin(result.number, activePick);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Roulette</title>
        <meta
          name="description"
          content="Play crypto roulette on SoftGalaxy with BTC, ETH, SOL and USDT"
        />
      </Helmet>

      <section id="roulette" className="mt-4 pt-lg-3 pb-5">
        <div className="container">
          <div className="row mx-2 mb-4">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">Roulette</span> Crypto Table
              </span>
              <span className="d-block F3 textS2">
                Spin the wheel, pick your side, and settle instantly with your crypto wallet.
              </span>
            </div>
          </div>

          <div className="row gx-4 gy-4 mx-2">
            <div className="col-12 col-lg-7">
              <div className="rouletteCard p-3 p-md-4">
                <div className="wheelArea">
                  <div className="wheelPointer" />
                  <div
                    className={`wheel ${spinning ? "spinning" : ""}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div className="wheelSlotsLayer">
                      {wheelNumbers.map((n, idx) => {
                        const angle = idx * (360 / wheelNumbers.length);
                        const colorClass = getColor(n);
                        return (
                          <span
                            key={`${n}-${idx}`}
                            className={`wheelSlot ${colorClass}`}
                            style={{
                              transform: `rotate(${angle}deg) translateY(calc(-1 * var(--slot-radius)))`,
                            }}
                          >
                            {n}
                          </span>
                        );
                      })}
                    </div>
                    <div className="wheelCenter" />
                  </div>
                </div>

                <div className="resultRow mt-4">
                  <span className="resultLabel">Last Result</span>
                  <span className={`resultBadge ${result.color}`}>{result.number}</span>
                  <span className={`resultStatus ${won ? "win" : "lose"}`}>
                    {won ? "Winning pick" : "Try again"}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="rouletteCard p-3 p-md-4">
                <h5 className="m-0 mb-3 tableTitle">Place Bet</h5>

                <div className="betSection">
                  <span className="betLabel">Pick</span>
                  <div className="pickGrid">
                    {picks.map((pick) => (
                      <button
                        key={pick.key}
                        className={activePick === pick.key ? "active" : ""}
                        onClick={() => setActivePick(pick.key)}
                      >
                        {pick.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="betSection">
                  <span className="betLabel">Pay With</span>
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

                <div className="betSection">
                  <span className="betLabel">Stake ({activeCoin})</span>
                  <input
                    className="stakeInput"
                    type="number"
                    min="1"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                  />
                </div>

                <div className="summaryBox">
                  <div className="d-flex justify-content-between">
                    <span>Multiplier</span>
                    <span>x{selectedPick.multi}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span>Potential Payout</span>
                    <strong>{potentialPayout} {activeCoin}</strong>
                  </div>
                </div>

                <button className="spinBtn mt-3" onClick={spinWheel} disabled={spinning}>
                  {spinning ? "Spinning..." : "Spin Roulette"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Roulette;
