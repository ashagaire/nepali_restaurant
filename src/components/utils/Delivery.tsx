"use client";

import Link from "next/link";
import { Button } from "antd";

export default function Delivery() {
  return (
    <section className=" bg-blue-100 text-yellow-700">
      <div className="py-12 container mx-auto max-w-7xl p-4  text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
        <h3 className="text-large md:text-2xl font-bold mb-6">
          You can place your order online via Foodora and Wolt. Checkout the
          available menu details.
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="https://wolt.com/fi/discovery">
            <Button type="default">WOLT</Button>
          </Link>
          <Link href="https://www.foodora.fi/en/restaurants/new?lng=24.937976&lat=60.169869&vertical=restaurants">
            <Button type="default" className=" border text-white">
              FOODORA
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
