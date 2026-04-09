import { AlertCircle, Leaf, Drumstick, Sprout, Flame } from "lucide-react";
import { GiChiliPepper } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";

export function ImportantNotice() {
  return (
    <section className=" bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-t-2 border-orange-500 py-12  mt-12">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-800">
              IMPORTANT NOTICE TO THE CUSTOMER
            </h2>
          </div>

          {/* Main Alert Message */}
          <div className="bg-orange-100 border-l-4 border-orange-600 p-6 mb-8 rounded-r-lg shadow-sm">
            <p className="text-sm md:text-lg font-semibold text-gray-800 mb-2">
              HUOM! Älä unohda kysyä jos sinulla minkäänlaisia allergioita yrteista ja mausteista…
            </p>
            <p className="text-sm md:text-lg text-gray-800">
              <strong>NOTE:</strong> Please do not forget to ask if you have any allergies on herbs, spices or foods
            </p>
          </div>

          {/* Dietary Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Dietary Labels Column */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">
                Dietary Labels
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 text-xl min-w-[30px] pt-0.5">L</span>
                  <div>
                    <p className="font-semibold text-gray-800">Lactose-free</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Note: The portion of raita, mint sauce, and spread butter on naan bread may contain lactose. 
                      Be sure to ask for lactose-free substitutes instead.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-bold text-amber-600 text-xl min-w-[30px] pt-0.5">G</span>
                  <div>
                    <p className="font-semibold text-gray-800">Gluten-free</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Note: Naan bread included in portions contains gluten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-bold text-green-600 text-xl min-w-[30px] pt-0.5">V</span>
                  <div>
                    <p className="font-semibold text-gray-800">Vegan</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Note: Remember to ask for vegan options.
                    </p>
                  </div>
                </div>

                
              </div>
            </div>

            {/* Spice Levels & Food Types Column */}
            <div className="space-y-6">
              {/* Spice Levels */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
                  Spice Levels
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GiChiliPepper className="w-6 h-6 text-red-600" />
                    <span className="text-gray-800 font-medium">Mild Spicy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      <GiChiliPepper className="w-6 h-6 text-red-600" />
                      <GiChiliPepper className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-gray-800 font-medium">Medium Spicy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      <GiChiliPepper className="w-6 h-6 text-red-600" />
                      <GiChiliPepper className="w-6 h-6 text-red-600" />
                      <GiChiliPepper className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-gray-800 font-medium">Extra Spicy</span>
                  </div>
                </div>
              </div>

              {/* Food Types */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">
                  Food Types
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaLeaf className="w-6 h-6 text-green-600" />
                    <span className="text-gray-800 font-medium">Vegetarian</span>
                  </div>
                 
                  <div className="flex items-center gap-3">
                    <Sprout className="w-6 h-6 text-emerald-600" />
                    <span className="text-gray-800 font-medium">Vegan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center bg-orange-100 rounded-lg px-5 py-3 shadow-sm border border-orange-200">
            <p className="text-gray-600 font-semibold text-base md:text-lg">
              🙏 Your safety is our priority. Please inform our staff about any dietary restrictions or allergies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
