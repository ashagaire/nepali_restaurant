"use client";
import { Typography } from "@mui/material";
export default function About() {
  return (
    <div className="py-12 ">
      <div className=" container mx-auto max-w-4xl p-4 ">
        <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, md: 50, lg: 60 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                About Us
              </span>
            </Typography>

        <section className="mb-16">
          <h2 className="md:text-4xl text-2xl font-bold mb-6 text-orange-600">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className=" max-w-none text-gray-800 space-y-4 leading-relaxed">
              <p>
                Fusion Nepal was founded with a simple dream, to bring the
                authentic flavors of Nepal to the heart of Helsinki. Our journey
                began in 2018 when our head chef, trained in the mountain
                villages of Nepal, decided to share the recipes passed down
                through generations of his family.
              </p>
              <br />
              <p>
                Every dish we prepare carries the essence of Nepali hospitality
                – warm, generous, and made with love. We use traditional cooking
                methods and source authentic spices directly from Nepal to
                ensure each bite transports you to the Himalayas.
              </p>
              <br />

              <p>
                Our team is dedicated to creating not just meals, but
                experiences that celebrate the rich culinary heritage of Nepal.
                We are committed to providing excellent service and ensuring
                that every dining experience at Fusion Nepal is memorable.
                Whether you're dining in, taking out, or having your meal
                delivered, we strive to exceed your expectations with our
                flavorful dishes and exceptional customer service.
              </p>
            </div>
            <img src="/images/chef.webp" alt="Chef" className=" max-h-96 p-4" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="md:text-4xl text-2xl font-bold mb-8 text-center text-orange-600">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-orange-100 rounded-xl">
              <div className="text-4xl mb-4">🍛</div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Authentic Recipes</h3>
              <p className="text-gray-600 text-sm">
                Traditional recipes passed down through generations
              </p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-4xl mb-4">🥬</div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Fresh Ingredients</h3>
              <p className="text-gray-600 text-sm">
                Locally sourced produce with imported Nepali spices
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Warm Hospitality</h3>
              <p className="text-gray-600 text-sm">
                The spirit of Nepali 'Atithi Devo Bhava' - Guest is God
              </p>
            </div>
          </div>
        </section>

        <section className="bg-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Welcome!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto ">
            We look forward to serving you and sharing the flavors of Nepal with
            you.
          </p>
        </section>
      </div>
    </div>
  );
}
