import "./Slots.css";
import { Helmet } from "react-helmet-async";

const Slots = () => {
  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Slots</title>
        <meta name="description" content="Play slots on SoftGalaxy" />
      </Helmet>

      <section id="slotsPage" className="mt-3 mb-5">
        <div className="container-fluid slotsShell">
          <div className="cardShell">
            <h2 className="sg-game-title">Slots</h2>
            <p className="sg-game-subtitle">Slots page restored.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slots;