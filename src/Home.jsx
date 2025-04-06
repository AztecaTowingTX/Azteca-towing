import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-yellow-600 mb-4"
      >
        Austin's Reliable Tow Truck Service
      </motion.h1>

      <p className="text-center text-gray-700 max-w-xl mb-6">
        Fast, affordable, and professional towing & roadside assistance in the Austin, TX area.
        We’re available 24/7 to help you get back on the road.
      </p>

      <Button className="bg-yellow-500 text-black text-lg px-6 py-3 mb-10">
        <PhoneCall className="mr-2" /> Call Now: (512) 555-1234
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          {
            title: "24/7 Emergency Towing",
            desc: "Day or night, we’ve got your back. Our team responds fast and gets the job done right.",
          },
          {
            title: "Roadside Assistance",
            desc: "Locked out, flat tire, or out of gas? We provide quick help when you need it most.",
          },
          {
            title: "Private Property Towing",
            desc: "Partner with us to keep your lots clear. We work with apartments, HOAs, and businesses.",
          },
        ].map((item, i) => (
          <Card key={i} className="rounded-2xl shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-yellow-700 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 max-w-xl text-center">
        <h3 className="text-2xl font-bold mb-2">Request Service</h3>
        <p className="mb-4 text-gray-700">Send us a quick message and we’ll get back to you ASAP.</p>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="text"
            placeholder="Location or Address"
            className="p-3 rounded-xl border border-gray-300"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-3 rounded-xl border border-gray-300"
          />
          <textarea
            placeholder="How can we help?"
            className="p-3 rounded-xl border border-gray-300"
          ></textarea>
          <Button className="bg-yellow-500 text-black text-lg">Send Request</Button>
        </form>
      </div>
    </div>
  );
}
