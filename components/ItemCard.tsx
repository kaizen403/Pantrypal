import { Card, Button } from "@nextui-org/react";
import React from "react";
import { CardContent, CardTitle, CardDescription } from "./ui/card";
interface ItemCardProps {
  itemname: string;
  seller: string;
  imageurl: string;
  quantity: number;
  price: number;
}
const ItemCard: React.FC<ItemCardProps> = ({
  itemname,
  seller,
  imageurl,
  quantity,
  price,
}) => {
  return (
    <>
      <Card>
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img
            alt={itemname}
            className="object-cover w-full h-full"
            src={imageurl} // Use passed `imageurl` here
            style={{
              aspectRatio: "3/2",
              objectFit: "cover",
            }}
          />
        </div>
        <CardContent className="p-2">
          <CardTitle className="text-base font-semibold">{itemname}</CardTitle>
          <CardDescription className="text-sm flex">
            <p className="font-bold">
              <span>Seller: </span>
              <span>{seller}</span>
            </p>
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg m-2">{price}₹</div>
            <Button size="sm">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
