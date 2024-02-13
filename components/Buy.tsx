"use client";
import Link from "next/link";
import ItemCard from "./ItemCard";
import getAllItems from "@/lib/actions/getitems";
import { useState, useEffect } from "react";
type SVGProps = React.SVGAttributes<SVGElement>;
interface Item {
  id: number;
  itemname: string;
  seller: string;
  imageurl: string;
  quantity: number;
  price: number;
  sellstart: Date;
}

export default function Component() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getAllItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <div className="grid w-full h-auto mb-3 lg:grid-cols-[100px_1fr_1/3]">
      <div className=" flex-col border-r">
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-center px-4 text-sm font-medium">
            <h1 className="text-white font-bold text-md my-3">
              Filter Options
            </h1>
            <Link
              className="flex items-center gap-3 rounded-lg  px-3 py-2 text-white bg-slate-700 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="#"
            >
              <PackageIcon className="h-4 w-4" />
              All
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <HeartIcon className="h-4 w-4" />
              Food Items
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <HeartIcon className="h-4 w-4" />
              Others
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col lg:min-h-screen">
        <main className="flex-1 overflow-y-auto">
          <div className="grid gap-4  mx-6 lg:grid-cols-4 xl:grid-cols-6">
            {items.map((item, index) => (
              <ItemCard
                key={item.id}
                itemname={item.itemname}
                seller={item.seller}
                imageurl={item.imageurl}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const HeartIcon: React.FC<SVGProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
};

const PackageIcon: React.FC<SVGProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
};
