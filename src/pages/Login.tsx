import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <img 
            src={logo} 
            alt="Translink Logo" 
            className="h-24 object-contain mb-2"
          />
          <h1 className="text-3xl font-bold tracking-tight text-[#F44336]">Translink</h1>
          <p className="text-muted-foreground">Your everyday everything app</p>
        </div>

        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your phone number to continue</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center px-3 border rounded-md bg-muted/50 text-sm font-medium">
                    +62
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="812 3456 7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                </div>
              </div>
              <Button type="submit" className="w-full rounded-full h-12 text-lg font-semibold" disabled={phone.length < 6}>
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
