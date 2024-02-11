import { Card, Button } from "@nextui-org/react";
import React from "react";
import { CardContent, CardTitle, CardDescription } from "./ui/card";

const ItemCard = () => {
  return (
    <>
      <Card>
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img
            alt="Image"
            className="object-cover"
            height="90"
            src="/placeholder.svg"
            style={{
              aspectRatio: "2/3",
              objectFit: "cover",
            }}
            width="120"
          />
        </div>
        <CardContent className="p-2">
          <CardTitle className="text-base font-semibold">
            Cotton T-shirt
          </CardTitle>
          <CardDescription className="text-sm">
            Comfortable and stylish
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="font-semibold">$24.99</div>
            <Button size="sm">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemCard;
