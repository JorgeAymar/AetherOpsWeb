import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "AetherOps transformed our incident response. We went from waking up at 3 AM for server outages to waking up to a report that the issue was fixed hours ago.",
    name: "Sarah Jenkins",
    title: "VP of Infrastructure, CloudScale",
    rating: 5,
  },
  {
    quote: "The predictive monitoring is uncannily accurate. It caught a memory leak in our primary database cluster three days before it would have caused a crash.",
    name: "David Chen",
    title: "CTO, FinTech Solutions",
    rating: 5,
  },
  {
    quote: "Security hardening that doesn't break production. Finally. The autonomous patching saved us during the last major zero-day vulnerability scare.",
    name: "Marcus Thorne",
    title: "Lead DevOps Engineer, StreamLine",
    rating: 5,
  },
  {
    quote: "ROI was immediate. We reduced our fleet management overhead by 70% within the first month of deployment.",
    name: "Elena Rodriguez",
    title: "Director of Engineering, SaaS Global",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Trusted by Industry Leaders</h2>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-6">
                <div className="p-1">
                  <Card className="bg-card border-white/5 h-full shadow-lg hover:shadow-primary/10 transition-shadow">
                    <CardContent className="flex flex-col justify-between h-full p-8">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-primary/30 mb-4" />
                        <p className="text-muted-foreground italic mb-6 min-h-[100px]">"{item.quote}"</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-transparent border-white/20 text-foreground hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-12 bg-transparent border-white/20 text-foreground hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
        
        <div className="text-center mt-12">
          <Button variant="link" className="text-primary text-lg hover:text-primary/80">Read All Case Studies &rarr;</Button>
        </div>
      </div>
    </section>
  );
}
