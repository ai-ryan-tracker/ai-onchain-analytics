import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const VolumeSection = ({ data }) => {
  const volume = data?.volume || {
    cycle: "Cycle — 360 days",
    cycleProgress: 62,
    left: "$ 133.65k",
    right: "$ 1.2M",
  };

  return (
    <section className="soft-section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="soft-section-title mb-0">Volume Indicators</h2>
          <span className="soft-section-sub mb-0">{volume.cycle}</span>
        </div>
        <div className="sg-cycle-bar">
          <div className="sg-cycle-fill" style={{ width: `${volume.cycleProgress}%` }} />
        </div>
        <div className="sg-volume-grid">
          <div className="sg-volume-card">
            <div className="sg-volume-icon"><FaArrowLeft /></div>
            <div>
              <h4>Unmatched Left volume</h4>
              <strong>{volume.left}</strong>
            </div>
          </div>
          <div className="sg-volume-card">
            <div className="sg-volume-icon"><FaArrowRight /></div>
            <div>
              <h4>Unmatched Right volume</h4>
              <strong>{volume.right}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolumeSection;
