import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <Button className="cursor-pointer" variant={"outline"}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[].map((address: any) => (
          <Card key={address.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={address.type === "Home" ? "default" : "secondary"}
                  >
                    {address.type}
                  </Badge>
                  {address.isDefault && (
                    <Badge variant="outline">Default</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="font-medium">{address.name}</p>
                <p className="text-sm text-muted-foreground">
                  {address.address}
                </p>
                <p className="text-sm text-muted-foreground">{address.city}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
