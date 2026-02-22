import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <section className="pb-12 lg:py-12 container mx-auto  max-w-7xl p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-700">
          Our Services
        </h2>

        <p className="text-yellow-700 mt-2 md:w-1/2 mx-auto text-center text-large md:text-2xl  mb-6 max-w-3xl mx-auto">
          We offer a variety of services to make your dining experience
          unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 grid-cols-3 gap-2 md:grid-cols-6 lg:grid-cols-6 gap-4 md:gap-3 lg:gap-8 sm:px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center  rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-orange-300  "
          >
            <a className="" href={service.link}>
              <div className=" flex justify-center items-center w-auto ">
                <Image
                  src={service.image}
                  alt={service.serviceName}
                  width={100}
                  height={50}
                />
              </div>
              <h3 className="text-l md:text-sm font-semibold text-yellow-700 mb-2 text-center px-1">
                {service.serviceName}
              </h3>
              {/* <p className="text-gray-600 text-center">{service.serviceDescription}</p> */}
            </a>
          </div>
        ))}
      </div>

      {/* <h2 className="text-3xl font-bold text-yellow-900 text-center mb-4 rounded-lg px-4 py-2 bg-blue-200 w-max mx-auto">
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
      </div> */}
    </section>
  );
}
