export default function Slide({ src }) {
  return (
    <div className="slide">
      <img src={src} className="slide-image" />
    </div>
  );
}