import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "Essential AIOps monitoring for small fleets.",
    features: [
      "Up to 50 VPS Instances",
      "Predictive Monitoring",
      "Basic Anomaly Detection",
      "Email Alerts",
      "99.9% Uptime SLA",
    ],
    unavailable: ["Autonomous Remediation", "Security Hardening", "Compliance Reports"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$599",
    period: "/month",
    description: "Full autonomous operations for growing businesses.",
    features: [
      "Up to 200 VPS Instances",
      "Advanced Predictive AI",
      "Autonomous Remediation",
      "Security Hardening",
      "Slack & Teams Integration",
      "Priority Support",
    ],
    unavailable: ["Compliance Reports", "Dedicated Account Manager"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Maximum performance and security for large scale infrastructure.",
    features: [
      "Unlimited VPS Instances",
      "Full Autonomous Suite",
      "Zero-Day Security Patching",
      "Compliance & Audit Logs",
      "24/7 Dedicated Support",
      "Custom API Access",
    ],
    unavailable: [],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the level of autonomy that fits your infrastructure needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full flex flex-col border-white/10 bg-card relative overflow-hidden transition-all duration-300 hover:border-primary/30 ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/5' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-foreground">{plan.name}</CardTitle>
                  <div className="mt-4 mb-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 font-sans text-sm">{plan.period}</span>
                  </div>
                  <CardDescription className="text-muted-foreground/80 min-h-[40px]">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.unavailable.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground/40">
                        <X className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full h-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-foreground'}`}
                    disabled={true}
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
