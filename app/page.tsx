/* eslint-disable @next/next/no-img-element */
"use client";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Globe,
  Globe2,
  ImageIcon,
  Loader2,
  Map,
  MapPin,
  Shield,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
  const fileinputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState<"coordinates" | "image">(
    "coordinates"
  );
  const [mapError, setMapError] = useState(true);
  const mapRef = useRef<HTMLInputElement>(null);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024 || !file.type.startsWith("image/")) {
        setAlertMessage(
          file.size > 10 * 1024 * 1024
            ? "Image size must be less than 10MB"
            : "Please select a valid image file"
        );
        setShowAlert(true);
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              FloodSight
            </h1>
          </div>

        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-7xl space-y-8">
        <section className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
            AI-Powered Flood Risk Analysis
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Analyze flood risk using precise coordinates or terrain images with
            advanced AI algorithms.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Choose Analysis Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="coordinates" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100">
                  <TabsTrigger
                    value="coordinates"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    Coordinates
                  </TabsTrigger>
                  <TabsTrigger
                    value="image"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Image
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="coordinates" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        type="number"
                        placeholder="Enter latitude"
                        id="latitude"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        type="number"
                        placeholder="Enter longitude"
                        id="longitude"
                      />
                    </div>
                  </div>
                  <Button className="w-full">
                    <MapPin className="mr-2 h-4" /> Analyze Coordinates
                  </Button>
                </TabsContent>

                {/* Image Tab */}
                <TabsContent value="image" className="mt-6 space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      ref={fileinputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {!imagePreview ? (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Upload terrain image
                          </p>
                          <p className="text-xs mt-1 text-slate-500">
                            JPG, PNG, or GIF up to 10MB
                          </p>
                        </div>
                        <Button
                          onClick={() => fileinputRef.current?.click()}
                          variant="outline"
                          size="sm"
                        >
                          <Camera className="mr-2 h-4 w-4" /> Choose Image
                        </Button>
                      </div>
                    ) : (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-lg"
                      />
                    )}
                    <Button className="w-full mt-4">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Analyze Image
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                  <p className="text-slate-500">
                    {analysisType === "coordinates"
                      ? "Analyzing Coordinates..."
                      : "Analyzing Image..."}
                  </p>
                </div>
              ) : (
                <p className="text-slate-500 italic">
                  Results will be displayed here after analysis.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-blue-600" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mapError ? (
                <div className="w-full h-80 rounded-lg border border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
                  <Map className="h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-1">
                    Map Not Available
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md">
                    To enable the interactive map, set up a Google Maps API in
                    your <code>.env.local</code> file.
                  </p>
                </div>
              ) : (
                <div id="map" ref={mapRef} className="w-full h-80 rounded-lg border border-slate-800"></div>
              )}
            </CardContent>
          </Card>
        </section>

        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Input Error</AlertDialogTitle>
              <AlertDialogDescription>
                {alertMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </main>

      <footer className="mt-10 py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        © {new Date().getFullYear()} FloodSight. All rights reserved.
      </footer>
    </div>
  );
}
