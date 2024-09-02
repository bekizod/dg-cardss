import Carousel from "@/components/ui/Test";
import BannerCarousel from "@/components/ui/Test1";
import KitchenWare from "@/components/ui/Test2";
import Serveware from "@/components/ui/Test3";
import HomeAppliance from "@/components/ui/Test4";
import Image from "next/image";


export default function Home() {
  return (
    <main className=" mt-[124px]">
      <div>
        {/* <Carousel /> */}
        {/* <BannerCarousel /> */}
        {/* <Serveware /> */}
        {/* <HomeAppliance /> */}
        <KitchenWare />
      </div>
    </main>
  );
}
