"use client";

import CategoryBlock from "@/components/menu/CategoryBlock";
import TagBlock from "@/components/menu/TagBlock";
import { Typography, Divider } from "@mui/material";

export default function SubComponentsPage() {
  return (
    <main className="min-h-[60vh]max-w-7xl mx-auto px-6 py-12 flex flex-col items-center ">
      <div className="mb-8">
        <Typography variant="h4" component="h1" gutterBottom className="font-bold text-gray-800">
          Manage Menu Components
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure categories and tags for your menu items.
        </Typography>
      </div>

      <Divider className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <section>
          <CategoryBlock />
        </section>
        <section>
          <TagBlock />
        </section>
      </div>
    </main>
  );
}
