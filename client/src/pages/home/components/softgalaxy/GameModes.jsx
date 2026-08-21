import { Link } from "react-router-dom";
import { GiPokerHand, GiSoccerBall, GiCherry } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";

const defaultGames = [
  {
    name: "Staking",
    desc: "Earn passive rewards on your BET tokens",
    icon: TbCoins,
    color: "rgba(124, 58, 237, 0.2)",
    link: "/staking",
  },
  {
    name: "Roulette",
    desc: "Classic wheel action with live odds",
    icon: GiPokerHand,
    color: "rgba(244, 196, 48, 0.15)",
    link: "/roulette",
  },
  {
    name: "Sport",
    desc: "Bet on matches across major leagues",
    icon: GiSoccerBall,
    color: "rgba(34, 197, 94, 0.15)",
    link: "/sports-betting",
  },
  {
    name: "Slots",
    desc: "Spin the reels for instant wins",
    icon: GiCherry,
    color: "rgba(236, 72, 153, 0.15)",
    link: "/slots",
  },
];

const GameModes = ({ data }) => {
  const games = data?.games || defaultGames;

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">Explore Games</h2>
        <p className="soft-section-sub mb-4">
          Choose your path — stake, spin, bet, or build your affiliate tree.
        </p>
        <div className="sg-games-grid">
          {games.map((game) => {
            const Icon = game.icon || TbCoins;
            return (
              <Link key={game.name} to={game.link || "/home"} className="sg-game-card">
                <div className="sg-game-icon" style={{ background: game.color }}>
                  <Icon />
                </div>
                <h3>{game.name}</h3>
                <p>{game.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameModes;
