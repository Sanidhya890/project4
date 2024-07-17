import Image from "next/image";
import Navbar from "./Components/Navbar";
import SearchBox from "./Components/SearchBox";
import DisplayAll from "./Components/DisplayAll";
import AddEmployee from "./Components/AddEmployee";

export default function Home() {
  return (
    <>
         <Navbar/>
         <SearchBox/>
         <DisplayAll/>
         <AddEmployee/>
    </>
  );
}
