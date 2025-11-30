import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Cloud, Shield, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: "monitoring",
    title: "Predictive Monitoring",
    description: "Our agents analyze thousands of metrics per second, identifying subtle patterns that precede failure.",
    value: "Detects 99.9% of potential outages before they impact users.",
    integrations: ["Prometheus", "Datadog", "CloudWatch"],
    icon: ActivityIcon,
  },
  {
    id: "remediation",
    title: "Autonomous Remediation",
    description: "Self-healing infrastructure that automatically executes verified fixes for known issues.",
    value: "Reduces Mean Time To Resolution (MTTR) by 80%.",
    integrations: ["Ansible", "Terraform", "SaltStack"],
    icon: Zap,
  },
  {
    id: "security",
    title: "Security Hardening",
    description: "Continuous vulnerability scanning and automated patch management for zero-day threats.",
    value: "Ensures 100% compliance with CIS benchmarks.",
    integrations: ["CrowdStrike", "SentinelOne", "Wazuh"],
    icon: Shield,
  },
  {
    id: "compliance",
    title: "Compliance & Reporting",
    description: "Automated audit trails and compliance reporting for GDPR, HIPAA, and SOC2.",
    value: "Saves 20+ hours per week on manual reporting.",
    integrations: ["Splunk", "ELK Stack", "Grafana"],
    icon: BarChart3,
  },
];

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Core Modules</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete suite of intelligent tools designed to autonomously manage your infrastructure.
          </p>
        </div>

        <Tabs defaultValue="monitoring" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card/50 p-1 h-auto mb-8">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 text-sm md:text-base font-medium transition-all"
              >
                {feature.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-card border-white/5 shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-serif">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-lg text-muted-foreground/80">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="p-6 bg-background/50 rounded-lg border border-white/5">
                      <h4 className="text-primary font-semibold mb-2 uppercase tracking-wide text-sm">Value Proposition</h4>
                      <p className="text-xl text-foreground font-medium">{feature.value}</p>
                    </div>

                    <div>
                      <h4 className="text-muted-foreground text-sm uppercase tracking-wide mb-4">Key Integrations & Compatibility</h4>
                      <div className="flex flex-wrap gap-3">
                        {feature.integrations.map((tech) => (
                          <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-sm text-foreground/80 flex items-center gap-2">
                            <Cloud size={14} /> {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="mt-4 gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary text-foreground">
                      <FileText size={16} /> Download AIOps Whitepaper
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
