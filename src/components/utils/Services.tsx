import { services } from "@/data/services";
import Link from "next/link";

export default function Services() {
  return (
    <section className="py-12 container mx-auto  max-w-7xl p-4">
      <h2 className="text-3xl font-bold text-yellow-900 text-center mb-4 rounded-lg px-4 py-2 bg-blue-200 w-max mx-auto">
        Our Services
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-6 lg:gap-4 mt-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex bg-blue-200 p-2 sm:p-4  rounded-lg shadow"
          >
            <a className="w-full" href={service.link}>
              <div className="w-full flex flex-col items-center ">
                <p className="font-bold xl:text-xl md:text-xl text-l">
                  {service.serviceName}
                </p>
                <img
                  alt={service.serviceName}
                  className="object-contain xl:w-auto md:w-auto h-36 w-full"
                  src={service.image}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-end  ">
        <Link
          href="/about"
          className="flex justify-end text-yellow-700 hover:text-yellow-900  font-bold rounded-lg px-4 py-2 mt-4 bg-blue-200"
        >
          Read More...
        </Link>
      </div>
    </section>
  );
}
