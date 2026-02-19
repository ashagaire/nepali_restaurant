import { services } from "@/data/services";
export default function Services() {
  return (
    <section className="py-12 container mx-auto  max-w-7xl p-4">
      <h2 className="text-3xl font-bold text-yellow-900 text-center mb-4 rounded-lg px-4 py-2 bg-blue-200 w-max mx-auto">
        Our Services
      </h2>
      <p className="text-lg font-bold text-yellow-800 mb-8 w-full bg-blue-200 p-6 rounded-lg shadow">
        At Fusion Nepal, we offer a variety of services to cater to your dining
        needs. Whether you're looking for a quick lunch, a full-course meal, or
        catering for your special events, we've got you covered.
      </p>
      <p className="text-lg font-bold text-yellow-800 w-full bg-blue-200 p-6 rounded-lg shadow">
        We are committed to providing excellent service and ensuring that every
        dining experience at Fusion Nepal is memorable. Whether you're dining
        in, taking out, or having your meal delivered, we strive to exceed your
        expectations with our flavorful dishes and exceptional customer service.
      </p>
      <div className="md:grid md:grid-cols-3 xl:gap-12 service md:gap-8 flex md:flex-row flex-col md:px-0 px-8 gap-8 mt-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="w-full bg-blue-200 p-2 sm:p-4 rounded-lg shadow"
          >
            <a className="w-full" href={service.link}>
              <div className="w-full flex md:gap-2 items-center gap-6">
                <img
                  alt={service.serviceName}
                  width="100"
                  height="100"
                  className="object-contain xl:w-auto md:w-20 h-28 w-16"
                  src={service.image}
                />
                <div className="flex flex-col justify-start font-bold">
                  <p className="macondo xl:text-3xl md:text-2xl text-xl">
                    {service.serviceName}
                  </p>
                  <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                    {service.serviceDescription}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
