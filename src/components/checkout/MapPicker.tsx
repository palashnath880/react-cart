"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Check, RotateCw, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

// Location Details Type
type LocationType = {
  address: {
    city: string;
    country: string;
    country_code: string;
    postcode: string;
    neighbourhood: string;
    state: string;
  };
  display_name: string;
  name: string;
};

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapPicker({
  children,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm: (p1: LocationType) => void;
}) {
  // state
  const [position, setPosition] = useState<L.LatLngExpression | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locationDetails = useFetch<LocationType>({
    error: () =>
      toast.error("Error fetching address", {
        description: "Please try again.",
      }),
  });

  // get user location coords
  const getGeolocation = () => {
    setLoading(true);
    setPosition(null);
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (position) {
      const [lat, lng] = position.toString().split(",");
      const reqURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      locationDetails.fetch(reqURL);
    }
  }, [position]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        val && getGeolocation();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby="Map picker dialog">
        <DialogHeader>
          <DialogTitle>Pick your address</DialogTitle>
        </DialogHeader>
        <div className="flex-1 grid grid-cols-1 place-items-center">
          {/* loading */}
          {loading && (
            <div className="py-20 flex items-center justify-center">
              <RotateCw className="animate-spin" />
            </div>
          )}

          {/* error alert*/}
          {!loading && error && (
            <div className="py-20">
              <Alert
                variant={"destructive"}
                className="!items-center !text-center"
              >
                <AlertTitle>Location access denied.</AlertTitle>
                <AlertDescription className="!justify-center">
                  Please enable location services to use this feature.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* if error is empty and position is not null  */}
          {!loading && !error && position && (
            <div className="relative w-full">
              {locationDetails.loading && (
                <div className="absolute top-0 left-0 w-full h-full !bg-black/20 z-[10000]" />
              )}
              <MapContainer
                center={position}
                zoom={16}
                className="!w-full !h-[50vh]"
                fadeAnimation
                touchZoom
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={position}></Marker>
                <LocationMarker setPosition={setPosition} />
              </MapContainer>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex items-center justify-end gap-5">
            <DialogClose asChild>
              <Button className="!cursor-pointer" variant={"destructive"}>
                Close <X />
              </Button>
            </DialogClose>
            <Button
              className="!cursor-pointer"
              disabled={!locationDetails.data}
              onClick={() => {
                locationDetails.data && onConfirm(locationDetails.data);
                setIsOpen(false);
              }}
            >
              Confirm <Check />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LocationMarker({ setPosition }: { setPosition: (p1: any) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
