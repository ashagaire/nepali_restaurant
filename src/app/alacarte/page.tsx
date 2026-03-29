import Alacarte from "@/components/menu/Alacarte";
import { Typography } from "@mui/material";

export default function AlacartePage() {
  return (
    <section className="py-12 bg-white container mx-auto max-w-4xl p-4 ">
      <div className="text-center relative ">
       <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, md: 50, lg: 60 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Á la Carte
              </span>
            </Typography>

        
        <p className="text-gray-600 max-w-xl mx-auto italic">
          Discover the authentic taste of Nepal, where every dish is prepared with 
          careful attention to traditional recipes and spices.
        </p>
      </div>
      {/* Alacarte menu items will go here */}
      <Alacarte />
    </section>
  );
}
