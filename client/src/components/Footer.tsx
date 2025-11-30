import { MapPin, Phone, Mail, Twitter, Linkedin, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="text-3xl font-serif font-bold text-foreground tracking-tighter mb-4">
              Aether<span className="text-primary">Ops</span>
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              AIOps. Simplified. <br />
              Autonomous infrastructure for the next generation of cloud computing.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Instagram, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>100 Innovation Dr,<br />Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (888) 400-5500</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@aetherops.com</span>
              </li>
              <li className="flex items-center gap-3 text-primary font-semibold">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Support Available 24/7/365</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6 uppercase tracking-wider">Stay Informed</h4>
            <p className="text-muted-foreground mb-4">Subscribe for AIOps insights, whitepapers, and product updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-white/5 border-white/10 text-foreground focus-visible:ring-primary" />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AetherOps Inc. All rights reserved. Designed by Replit.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">SLA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
