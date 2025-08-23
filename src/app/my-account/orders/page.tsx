import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[].map((order: any) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.date} • {order.items} items
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${order.total}</p>
                <Badge
                  variant={
                    order.status === "Delivered"
                      ? "default"
                      : order.status === "Shipped"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
