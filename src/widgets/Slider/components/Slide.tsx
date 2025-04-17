interface SlideProps {
  slide: string;
}

export default function Slide({ slide }: SlideProps) {
  return (
    <div className="slide">
      <img src={slide} className="slide-image" alt="Slide" />
    </div>
  );
}
