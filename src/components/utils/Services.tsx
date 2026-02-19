export default function Services() {
  return (
    <section className="py-12 container mx-auto  max-w-7xl p-4">
      <h2 className="text-3xl font-bold text-yellow-900 text-center mb-4">
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
      <div className="md:grid md:grid-cols-3 xl:gap-20 service md:gap-11 flex md:flex-row flex-col md:px-0 px-8 gap-8 mt-10">
        <div className="w-full bg-blue-200 p-6 rounded-lg shadow">
          <a className="w-full" href="/service-details/lunch">
            <div className="w-full flex md:gap-5 items-center gap-6">
              <img
                alt="Lunch "
                width="100"
                height="100"
                className="object-contain xl:w-auto md:w-20 h-28 w-16"
                src="https://api.lumle.fi/api/en/image/1734528907032.png"
              />
              <div className="flex flex-col justify-start font-bold">
                <p className="macondo xl:text-3xl md:text-2xl text-xl">
                  Lunch{" "}
                </p>
                <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                  We offer a Lunch from Monday to Friday, featuring a different
                  menu every day. Find daily lunach menu details here.
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="w-full">
          <a className="w-full" href="/service-details/lunch ">
            <div className="w-full flex md:gap-5 items-center gap-6">
              <img
                alt="À la Carte"
                width="100"
                height="100"
                className="object-contain xl:w-auto md:w-20 h-28 w-16"
                src="https://api.lumle.fi/api/en/image/1734528907032.png"
              ></img>
              <div className="flex flex-col justify-start font-bold">
                <p className="macondo xl:text-3xl md:text-2xl text-xl">
                  À la Carte
                </p>
                <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                  Enjoy our cozy and welcoming atmosphere while savoring our
                  authentic Nepalese dishes.
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="w-full">
          <a className="w-full" href="/service-details/lunch">
            <div className="w-full flex md:gap-5 items-center gap-6">
              <img
                alt="bar "
                width="100"
                height="100"
                className="object-contain xl:w-auto md:w-20 h-28 w-16"
                src="https://api.lumle.fi/api/en/image/1734528907032.png"
              ></img>
              <div className="flex flex-col justify-start">
                <p className="macondo xl:text-3xl md:text-2xl text-xl">
                  Bar And Drinks
                </p>
                <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                  Explore Nepali beer and wine, as well as a selection of
                  cocktails and mocktails.
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="w-full">
          <a className="w-full" href="/service-details/lunch">
            <div className="w-full flex md:gap-5 items-center gap-6">
              <img
                alt="Takeaway "
                width="100"
                height="100"
                className="object-contain xl:w-auto md:w-20 h-28 w-16"
                src="https://api.lumle.fi/api/en/image/1734528907032.png"
              ></img>
              <div className="flex flex-col justify-start">
                <p className="macondo xl:text-3xl md:text-2xl text-xl">
                  Takeaway
                </p>
                <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                  Order your favorite meals online and pick them up at your
                  convenience.
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="w-full">
          <a className="w-full" href="/service-details/lunch">
            <div className="w-full flex md:gap-5 items-center gap-6">
              <img
                alt="Online Order "
                width="100"
                height="100"
                className="object-contain xl:w-auto md:w-20 h-28 w-16"
                src="https://api.lumle.fi/api/en/image/1734528907032.png"
              ></img>
              <div className="flex flex-col justify-start">
                <p className="macondo xl:text-3xl md:text-2xl text-xl">
                  Online Order
                </p>
                <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                  Get your meals delivered straight to your doorstep through our
                  online order service.
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="w-full">
          <a className="w-full" href="/service-details/lunch">
            <div className="w-full flex md:gap-5 items-center gap-6">
              <img
                alt="Reservation "
                width="100"
                height="100"
                className="object-contain xl:w-auto md:w-20 h-28 w-16"
                src="https://api.lumle.fi/api/en/image/1734528907032.png"
              ></img>
              <div className="flex flex-col justify-start">
                <p className="macondo xl:text-3xl md:text-2xl text-xl">
                  Reservation
                </p>
                <p className="koho xl:mt-3 xl:text-base text-xs md:mt-1">
                  Make a reservation to secure your table and enjoy our
                  authentic Nepalese cuisine with your preferances of spice
                  level in a cozy atmosphere.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
