"use client";
import Header from "./Components/Header";
import BannerSlider from "./Components/BannerSlider";
import Line from "./Components/Line";
import Cards from "./Components/Cards";
import Footer from "./Components/Footer";
import useFetch from "../../lib/useFetch";
import LoadingOrError from "./Components/LoadingOrError";

export default function Home() {
  const { data, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homeContent`
  );

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  const { banners, cards } = data;

  if (!banners || !cards) {
    return <p>Data format invalid, please try again later.</p>;
  }

  return (
    <div className="w-full max-w-full">
      <Header />
      <BannerSlider slides={banners} />
      <Line />
      <Cards data={cards} />
      <Footer />
    </div>
  );
}
