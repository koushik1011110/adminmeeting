import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import type { Booking } from "@shared/schema";

export default function BookingsPage() {
  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-destructive">Error loading bookings: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          bookings?.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>
                  {format(new Date(booking.date), "MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Time: {booking.time}</p>
                <p className="text-muted-foreground">
                  Phone: {booking.mobile_phone}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
