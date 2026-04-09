"use client";

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GiChiliPepper } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import { lunchMenuData, LunchItem } from '@/data/lunch';

export default function LunchBuffetList() {
    const [expanded, setExpanded] = useState<string | false>(false);

    useEffect(() => {
        // Get current day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const today = new Date().getDay();
        // If it's Saturday (6) or Sunday (0), default to Monday (1). Otherwise, use current day.
        const defaultDayIndex = today === 0 || today === 6 ? 1 : today;
        
        const defaultDayMatch = lunchMenuData.find(menu => menu.dayIndex === defaultDayIndex);
        if (defaultDayMatch) {
            setExpanded(`panel-${defaultDayMatch.day}`);
        } else {
             setExpanded('panel-Monday'); // Fallback
        }
    }, []);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const renderDietaryTags = (item: LunchItem) => {
        if (!item.dietary || item.dietary.length === 0) return null;
        return (
            <span className="text-sm font-medium text-gray-800 ml-2">
                ({item.dietary.join(', ')})
            </span>
        );
    };

    return (
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-4 ">
            {lunchMenuData.map((dailyMenu) => (
                <Accordion
                    key={dailyMenu.day}
                    expanded={expanded === `panel-${dailyMenu.day}`}
                    onChange={handleChange(`panel-${dailyMenu.day}`)}
                    sx={{
                        boxShadow: 'none',
                        border: '1px solid #f9c78cff',
                        borderRadius: '8px !important',
                        '&:before': { display: 'none' },
                        overflow: 'hidden',
                    
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#383736ff', fontSize: 30 }} />}
                        aria-controls={`panel-${dailyMenu.day}-content`}
                        id={`panel-${dailyMenu.day}-header`}
                        sx={{
                            backgroundColor: expanded === `panel-${dailyMenu.day}` ? '#f97316' : '#f97316',
                            transition: 'background-color 0.3s ease',
                            padding: { xs: '8px 16px', sm: '6px 24px' } // Responsive padding
                        }}
                    >
                        <span className={`text-lg md:text-xl font-bold uppercase text-gray-800'}`}>
                            {dailyMenu.day}
                        </span>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0, backgroundColor: '#fcfcfc'}}>
                        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                            {dailyMenu.items.map((item, index) => (
                                <div key={item.id} className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative">
                                    {/* Desktop layout: Flex row. Mobile layout: Flex col */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div className="flex-1">
                                            <div className="flex items-center flex-wrap gap-2">
                                                <h3 className="text-base md:text-lg font-bold text-gray-800">
                                                    {index + 1}. {item.name}
                                                </h3>
                                                {renderDietaryTags(item)}
                                                {/* Status Icons */}
                                                <div className="flex items-center space-x-2 ml-auto sm:ml-2 mt-1 sm:mt-0">
                                                    {item.isVeg && (
                                                        <div title="Vegetarian/Vegan" className="flex items-center justify-center text-[#2c913f] bg-green-50 rounded-full p-1 border border-green-200">
                                                            <FaLeaf size={16} />
                                                        </div>
                                                    )}
                                                    {item.isSpicy && (
                                                        <div title="Spicy" className="flex items-center justify-center text-[#e31e24] bg-red-50 rounded-full p-1 border border-red-200">
                                                            <GiChiliPepper size={18} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm md:text-base text-gray-600 mt-2 pr-0 sm:pr-8">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="mt-2 sm:mt-0 font-bold text-gray-900 md:text-lg whitespace-nowrap text-left sm:text-right">
                                            €{item.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
