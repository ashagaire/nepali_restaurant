import { Skeleton, Card, CardContent } from "@mui/material";

export default function LoadingMeanuSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="rounded-2xl shadow">
              <Skeleton variant="rectangular" height={180} />
              <CardContent>
                <Skeleton height={24} width="80%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="60%" />
                <Skeleton height={32} width="40%" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
