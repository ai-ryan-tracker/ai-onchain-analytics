import { Link } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import { IoRocketOutline } from "react-icons/io5";
import { GiSoccerBall, GiCherry } from "react-icons/gi";
import { TbCoins } from "react-icons/tb";

const innerOrbitLinks = [
  { title: "Staking", icon: TbCoins, to: "/staking", className: "sg-hero-node--top" },
  { title: "Sports", icon: GiSoccerBall, to: "/sports-betting", className: "sg-hero-node--left" },
  { title: "Slots", icon: GiCherry, to: "/slots", className: "sg-hero-node--right" },
];

const SoftHero = ({ data }) => {
  const hero = data?.Hero || {};

  return (
    <section className="sg-hero">
      <div className="container">
        <div className="sg-hero-grid">
          <div>
            <div className="sg-hero-badge">
              <HiSparkles />
              {hero.badge || "Next-gen crypto gaming platform"}
            </div>
            <h1 className="sg-hero-title">
              Welcome to <span>SoftGalaxy</span>
            </h1>
            <p className="sg-hero-desc">
              {hero.description ||
                "Stake, play, and grow your network across roulette, slots, sports, and affiliate rewards — all in one unified galaxy ecosystem."}
            </p>
            <div className="sg-hero-actions">
              <Link to="/signup" className="btnTemp px-4 py-3">
                <IoRocketOutline className="me-2" />
                Get Started
              </Link>
              <Link to="/rankings" className="btnTemp-outLine px-4 py-3">
                View Rankings
              </Link>
            </div>
            <div className="sg-stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {(hero.quickStats || [
                { value: "606", label: "Total Users" },
                { value: "10M", label: "Betting Volume" },
                { value: "100k", label: "Staking Volume" },
              ]).map((stat) => (
                <div key={stat.label} className="sg-stat-card" style={{ padding: "1rem" }}>
                  <div className="sg-stat-value" style={{ fontSize: "1.2rem" }}>{stat.value}</div>
                  <div className="sg-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sg-hero-visual">
            <div className="sg-hero-orbit">
              <div className="sg-hero-ring" />
              <div className="sg-hero-ring sg-hero-ring-2" />
              <Link to="/home" className="sg-hero-core" aria-label="Home">
                <img src="/images/softgalaxy.svg" alt="SoftGalaxy" />
              </Link>
              {innerOrbitLinks.map(({ title, icon: Icon, to, className }) => (
                <Link key={title} to={to} className={`sg-hero-node ${className}`} title={title} aria-label={title}>
                  <Icon color="#ffd95a" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftHero;
