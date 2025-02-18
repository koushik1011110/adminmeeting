import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Booking } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BookingsPage() {
  const { toast } = useToast();
  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const completeMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/bookings/${id}/complete`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Success",
        description: "Booking marked as completed",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/bookings/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Success",
        description: "Booking rejected",
      });
    },
  });

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-destructive/10">
          <CardContent className="p-6">
            <p className="text-destructive">Error loading bookings: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
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
            <Card key={booking.id} className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {format(new Date(booking.date), "MMMM d, yyyy")}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Time: {booking.time}
                </p>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm font-medium">
                  Contact: {booking.mobile_phone}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => rejectMutation.mutate(booking.id)}
                  disabled={rejectMutation.isPending}
                  className="text-destructive hover:text-destructive"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => completeMutation.mutate(booking.id)}
                  disabled={completeMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}