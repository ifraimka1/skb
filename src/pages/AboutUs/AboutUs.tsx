import { CategoryPage } from "@/widgets/CategoryPage/CategoryPage";
import Team from "@/widgets/Team";
import PhotoGallery from "@/widgets/PhotoGallery";

export default function AboutUs() {
  return <>
    <CategoryPage category="aboutus" />
    <Team />
    <PhotoGallery />
  </>
}
