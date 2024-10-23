import getAllPets from "@/actions";
import PetsContainer from "./components/PetsContainer";

async function PetsPage() {
  const pets = await getAllPets();

  return <PetsContainer pets={pets} />;
}

export default PetsPage;
