
import Features from "./home/Features";
import Hero from "./home/hero";
import LocationCards from "./home/Offerprice";
import PopularCars from "./home/PopularCars";
import Steps from "./home/Steps";

const Home = () => {
  return (
    <>
      <Hero />
      <Features  />
      <Steps />
      <PopularCars />
      <LocationCards />
    </>
  );
};

export default Home;
