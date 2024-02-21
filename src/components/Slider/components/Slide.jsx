export default function Slide({ data: { url, title } }) {
  return (
    <div className="slide">
      <img src={url} alt={title} className="slide-image" />
    </div>
  );
}