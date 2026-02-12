"use client";

import OpeningHours from "@/components/utils/OpenHours";
import Link from "next/link";
import { Layout, Button, Space } from "antd";

export default function ContactPage() {
  return (
    <section className="py-12 bg-white container mx-auto max-w-7xl p-4 ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">We'd love to here from you</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="bg-gray-200 rounded-xl h-80 mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.4!2d24.9354!3d60.1699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDEwJzExLjYiTiAyNMKwNTYnMDcuNCJF!5e0!3m2!1sen!2sfi!4v1"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
              title="Restaurant Location"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Public Transport</h3>
              <p className="text-gray-600">
                Tram 1, 2, 3 - Stop Fredrikinkatu. Metro - Kamppi Station (5 min
                walk)
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Fredrikinkatu+42,+Helsinki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Address</h3>
            <address className="not-italic text-gray-600">
              <p>Himalayan Kitchen</p>
              <p>Fredrikinkatu 42</p>
              <p>00100 Helsinki, Finland</p>
            </address>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Phone</h3>
            <a
              href="tel:+358401234567"
              className="text-red-700 hover:text-red-800 text-lg"
            >
              +358 40 123 4567
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Email</h3>
            <a
              href="mailto:info@himalayankitchen.fi"
              className="text-red-700 hover:text-red-800"
            >
              info@himalayankitchen.fi
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://wa.me/358401234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
            <OpeningHours />
          </div>
        </div>
      </div>
    </section>
  );
}
