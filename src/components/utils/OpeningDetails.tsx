"use client";

import OpenHours from "./OpenHours";

export default function OpeningDetails() {
  return (
    <section className=" lg:mt-12 container mx-auto max-w-7xl p-4 bg-orange-200 xl:rounded-4xl">
      <div className="container-custom ">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center">
              Opening Hours
            </h2>
            <OpenHours />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Find Us</h2>
            <div className=" rounded-xl h-64 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.4!2d24.9354!3d60.1699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDEwJzExLjYiTiAyNMKwNTYnMDcuNCJF!5e0!3m2!1sen!2sfi!4v1"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Restaurant Location"
              />
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Fredrikinkatu 42, 00100 Helsinki</p>
              <a
                href="https://maps.google.com/?q=Fredrikinkatu+42,+Helsinki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 hover:text-primary-800 font-medium"
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
