"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const headers = new Headers();
headers.append("Content-Type", "application/json");

const getAllPets = async () => {
  const response = await fetch(
    "https://pets-react-query-backend.eapi.joincoded.com/pets"
  );
  const pets = await response.json();
  return pets;
};

export const findPetById = async (id) => {
  const response = await fetch(
    `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`
  );
  let pet;
  try {
    pet = await response.json();
  } catch (error) {
    console.error("pet not found ");

    redirect("/pets");
  }
  return pet;
};

export const createNewPet = async (formData) => {
  const petData = {
    ...Object.fromEntries(formData),
    adopted: 0,
  };

  const response = await fetch(
    `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(petData),
    }
  );
  const newPet = await response.json();
  revalidatePath("/pets");
  revalidatePath("/pets/[id]", "page");
  redirect(`/pets/${newPet.id}`);
};

export const deletePet = async (id) => {
  await fetch(
    `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`,
    {
      method: "DELETE",
      //   body: JSON.stringify(petData),
    }
  );
  // const newPet = await response.json();
  revalidatePath("/pets");
  revalidatePath("/pets/[id]", "page");
  redirect(`/pets`);
};

export default getAllPets;
