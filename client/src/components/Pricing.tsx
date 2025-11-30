import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      key: 'personal',
      price: "$0",
      period: "15 days",
      unavailable: ["Autonomous Remediation", "Security Hardening", "Compliance Reports"],
      popular: false,
    },
    {
      key: 'professional',
      price: "$29",
      period: "/month",
      unavailable: ["Compliance Reports", "Dedicated Account Manager"],
      popular: true,
    },
    {
      key: 'enterprise',
      price: "Custom",
      period: "",
      unavailable: [],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">{t.pricing.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const translation = t.pricing.plans[plan.key as keyof typeof t.pricing.plans];
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full flex flex-col border-white/10 bg-card relative overflow-hidden transition-all duration-300 hover:border-primary/30 ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/5' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {t.pricing.most_popular}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-foreground">{translation.name}</CardTitle>
                    <div className="mt-4 mb-2">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground ml-1 font-sans text-sm">{plan.period}</span>
                    </div>
                    <CardDescription className="text-muted-foreground/80 min-h-[40px]">
                      {translation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      {translation.features.map((feature) => (
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
                      {t.pricing.button}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
