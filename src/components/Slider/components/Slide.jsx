export default function Slide({ slide }) {
  return (
    <div className="slide">
      <img src={slide} className="slide-image" />
    </div>
  );
}