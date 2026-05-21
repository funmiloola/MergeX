import { Users } from "./column";

export async function getUsers(): Promise<Users[]> {
  const res = await fetch("https://randomuser.me/api?results=50&seed=users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await res.json();
  return data.results.map((user: any, index: number) => ({
    id: index + 1,
    avatar:user.picture.thumbnail,
    name: ` ${user.name.first} ${user.name.last}`,
    email: user.email,
    gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
    phone: user.phone,
    dateRegistered: new Date(user.dob.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    country: user.location.country,
    city: user.location.city,
    state:user.location.state
  }));
}
export const userdata = await getUsers();
