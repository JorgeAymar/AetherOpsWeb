import { motion } from "framer-motion";
import { Server, ShieldCheck, Activity } from "lucide-react";
import systemDiagram from "@assets/generated_images/abstract_holographic_system_diagram_showing_data_flow_and_ai_processing..png";

const stats = [
  { label: "Managed Cores", value: "500k+", icon: Server },
  { label: "Incidents Resolved", value: "95%", icon: ShieldCheck },
  { label: "Uptime Improvement", value: "+15%", icon: Activity },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Beyond Automation: <br />
              <span className="text-primary">The Power of AetherOps</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Traditional Remote Monitoring and Management (RMM) is reactive. AetherOps represents a paradigm shift to Autonomous Operations. 
              Our advanced Machine Learning agents don't just alert you to problems; they detect anomalies before they become incidents and 
              deploy autonomous remediation strategies instantly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-start p-4 border-l border-primary/30">
                  <stat.icon className="w-8 h-8 text-primary mb-3" />
                  <span className="text-3xl font-bold text-foreground mb-1">{stat.value}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-30 pointer-events-none" />
            <img
              src={systemDiagram}
              alt="AetherOps System Diagram"
              className="rounded-lg shadow-2xl border border-white/10 relative z-10 w-full hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
