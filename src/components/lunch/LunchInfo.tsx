import React from 'react';
import { FaLeaf } from "react-icons/fa";

export default function LunchInfo() {
    return (
        <div className="container mx-auto px-4 max-w-4xl pt-12">
            {/* Creative Info Div & Heading */}
            <div className="text-center ">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 uppercase tracking-tight mb-4 pb-2">
                    Lunch Special``
                </h1>
            </div>

            <div className="mb-10 p-6 md:p-8 bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-2xl shadow-sm border border-green-100 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 p-4 opacity-10 pointer-events-none">
                    <FaLeaf size={120} className="text-green-600" />
                </div>
                <div className="relative z-10 flex flex-col items-start gap-6">
                    <div className="flex flex-row items-center">
                        
                        <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaLeaf className="text-green-600 text-xl md:text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 ml-4">Fresh & Delicious</h3>


                    </div>
                    
                    <div className="text-left">
                        <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                            All our food items are prepared with <strong>fresh, high-quality ingredients</strong>. 
                            <br/>
                            Lunch buffet includes a rich <strong>salad bar, daily soup, naan bread, 
                            sauces, raita, coffee, tea, dessert and more</strong>.
                        </p>
                        <p className="text-sm md:text-base text-green-800 font-medium bg-green-200/50 inline-block px-4 py-2 rounded-full">
                            * Please don't hesitate to ask our staff about the ingredients in any of our dishes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
