import React from 'react';
import { FaLeaf } from "react-icons/fa";
import { Button, Typography } from "@mui/material";

export default function LunchInfo() {
    return (
        <div className="container mx-auto px-4 max-w-4xl pt-12">
            {/* Creative Info Div & Heading */}
            <div>
                <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, md: 50, lg: 60 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Lunch Special
              </span>
            </Typography>
                
            </div>

            <div className="mb-6 md:mb-10 p-4 md:p-6 md:p-4 bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-2xl shadow-sm border border-green-100 relative overflow-hidden">
                <div className="absolute -top-4 -right-2 p-4 opacity-10 pointer-events-none">
                    <FaLeaf size={120} className="text-green-600" />
                </div>
                <div className="relative z-10 flex flex-col items-start gap-2">
                    <div className="flex flex-row items-center">
                        
                        {/* <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
                            <div className="bg-green-100 p-3 rounded-full">
                                <FaLeaf className="text-green-600 text-xl md:text-3xl" />
                            </div>
                        </div> */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 ">Fresh & Delicious</h3>


                    </div>
                    
                    <div className="text-left">
                        <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                            All our food items are prepared with <strong>fresh, high-quality ingredients</strong>. 
                            <br/>
                            Lunch buffet includes a rich <strong>salad bar, daily soup, naan bread, 
                            sauces, raita, coffee, tea, dessert and more</strong>.
                        </p>
                        <p className="text-xs md:text-sm text-green-800 font-medium bg-green-200/50 inline-block px-2 md:px-4 py-1 rounded-sm md:rounded-full">
                            * Please don't hesitate to ask our staff about the ingredients in any of our dishes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
