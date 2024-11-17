"use client";

import { User, columns } from "./components/columns";
import UserTable from "./components/UserTable";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      username: "jdoe",
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@example.com",
      isAdmin: true,
      isActive: true,
    },
    {
      id: "2",
      username: "asmith",
      firstName: "Alice",
      lastName: "Smith",
      email: "asmith@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "3",
      username: "mbrown",
      firstName: "Michael",
      lastName: "Brown",
      email: "mbrown@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "4",
      username: "ljones",
      firstName: "Laura",
      lastName: "Jones",
      email: "ljones@example.com",
      isAdmin: false,
      isActive: false,
    },
    {
      id: "5",
      username: "kwilson",
      firstName: "Kevin",
      lastName: "Wilson",
      email: "kwilson@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "6",
      username: "tmoore",
      firstName: "Tina",
      lastName: "Moore",
      email: "tmoore@example.com",
      isAdmin: false,
      isActive: false,
    },
    {
      id: "7",
      username: "rclark",
      firstName: "Robert",
      lastName: "Clark",
      email: "rclark@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "8",
      username: "jmartin",
      firstName: "Jessica",
      lastName: "Martin",
      email: "jmartin@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "9",
      username: "hlee",
      firstName: "Henry",
      lastName: "Lee",
      email: "hlee@example.com",
      isAdmin: false,
      isActive: false,
    },
    {
      id: "10",
      username: "dking",
      firstName: "David",
      lastName: "King",
      email: "dking@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "11",
      username: "nwhite",
      firstName: "Nancy",
      lastName: "White",
      email: "nwhite@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "12",
      username: "bgreen",
      firstName: "Brian",
      lastName: "Green",
      email: "bgreen@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "13",
      username: "sblack",
      firstName: "Sarah",
      lastName: "Black",
      email: "sblack@example.com",
      isAdmin: false,
      isActive: false,
    },
    {
      id: "14",
      username: "jyoung",
      firstName: "James",
      lastName: "Young",
      email: "jyoung@example.com",
      isAdmin: false,
      isActive: true,
    },
    {
      id: "15",
      username: "mhill",
      firstName: "Megan",
      lastName: "Hill",
      email: "mhill@example.com",
      isAdmin: false,
      isActive: true,
    },
  ];
}

export default async function Users() {
  const data = await getData();
  return (
    <div className="mx-4">
      <UserTable columns={columns} data={data} />
    </div>
  );
}