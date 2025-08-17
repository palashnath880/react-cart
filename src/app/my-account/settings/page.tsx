import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-sm">Order Updates</p>
              <p className="text-sm text-muted-foreground">
                Get notified about order status
              </p>
            </div>
            <Checkbox className="cursor-pointer !border-primary/70" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-sm">Promotional Emails</p>
              <p className="text-sm text-muted-foreground">
                Receive deals and offers
              </p>
            </div>
            <Checkbox className="cursor-pointer !border-primary/70" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-sm">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Get text updates</p>
            </div>
            <Checkbox
              className="cursor-pointer !border-primary/70"
              defaultChecked
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Two-Factor Authentication
          </Button>
          <Separator />
          <Button variant="destructive" className="w-full cursor-pointer">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
