import Alacarte from "@/components/menu/Alacarte";
import { Typography } from "@mui/material";

export default function AlacartePage() {
  return (
    <section className="">
      {/* Fixed Output Title Header */}
      <div className="text-center fixed   pt-6 md:pt-12 left-0 right-0 w-full z-40 bg-white/100 xl:border-none xl:shadow-none">
       <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, sm: 45, md: 50} }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Á la Carte
              </span>
            </Typography>
        
      </div>
      
      {/* Provide padding compensation so regular components do not overlap with new fixed header */}
      <div className="container mx-auto max-w-7xl p-4 pt-24 md:pt-24 xl:pt-32">
        <Alacarte />
      </div>
    </section>
  );
}
