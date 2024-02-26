function Slide({ slide, width }) {
  return (
    <div className="slide"
      style={{
        height: "100%",
        width: `${width}px`,
      }}
    >
      <img src={slide} className="slide-image" />
    </div>
  );
}

export default Slide;