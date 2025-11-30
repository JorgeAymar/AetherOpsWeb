import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'pt' | 'fr';

interface Translations {
    nav: {
        philosophy: string;
        features: string;
        success: string;
        testimonials: string;
        pricing: string;
    };
    hero: {
        title: string;
        title_highlight: string;
        subtitle: string;
        cta_primary: string;
        cta_secondary: string;
    };
    philosophy: {
        title: string;
        title_highlight: string;
        description: string;
        stats: {
            cores: string;
            incidents: string;
            uptime: string;
        };
    };
    features: {
        title: string;
        subtitle: string;
        items: {
            ai_admin: {
                title: string;
                description: string;
                value: string;
            };
            diagnosis: {
                title: string;
                description: string;
                value: string;
            };
            voice_deploy: {
                title: string;
                description: string;
                value: string;
            };
            auto_security: {
                title: string;
                description: string;
                value: string;
            };
        };
    };
    success: {
        title: string;
        subtitle: string;
        items: {
            dashboard: {
                title: string;
                category: string;
            };
            security: {
                title: string;
                category: string;
            };
            architecture: {
                title: string;
                category: string;
            };
        };
        modal_desc: string;
    };
    pricing: {
        title: string;
        subtitle: string;
        plans: {
            personal: {
                name: string;
                description: string;
                features: string[];
            };
            professional: {
                name: string;
                description: string;
                features: string[];
            };
            enterprise: {
                name: string;
                description: string;
                features: string[];
            };
        };
        button: string;
        most_popular: string;
    };
    testimonials: {
        title: string;
        read_more: string;
        items: {
            quote: string;
            name: string;
            title: string;
        }[];
    };
    footer: {
        tagline: string;
        newsletter: {
            title: string;
            description: string;
            placeholder: string;
            button: string;
        };
        rights: string;
        open_source: string;
        view_github: string;
        links: {
            privacy: string;
            terms: string;
            sla: string;
        };
    };
}

const translations: Record<Language, Translations> = {
    en: {
        nav: {
            philosophy: "Philosophy",
            features: "Features",
            success: "Success Stories",
            testimonials: "Testimonials",
            pricing: "View Pricing",
        },
        hero: {
            title: "Manage your VPS environments",
            title_highlight: "without being present.",
            subtitle: "The perfect solution for startups and digital creators. Your AI crew manages your Linux Ubuntu VPS environments—no SysAdmin required. Maintain full control with autonomous infrastructure.",
            cta_primary: "Get Started",
            cta_secondary: "View Pricing & Plans",
        },
        philosophy: {
            title: "Beyond Automation:",
            title_highlight: "The Power of AetherOps",
            description: "Traditional Remote Monitoring and Management (RMM) is reactive. AetherOps represents a paradigm shift to Autonomous Operations. Our advanced Machine Learning agents don't just alert you to problems; they detect anomalies before they become incidents and deploy autonomous remediation strategies instantly.",
            stats: {
                cores: "Managed Cores",
                incidents: "Incidents Resolved",
                uptime: "Uptime Improvement",
            },
        },
        features: {
            title: "Transform Your Reality",
            subtitle: "AetherOps isn't just a tool; it's a lifestyle design enabler. Bridge the gap between high-performance business and personal freedom.",
            items: {
                ai_admin: {
                    title: "AI-Based Administration & Monitoring",
                    description: "Your AI crew manages, monitors, and scales your infrastructure 24/7. It's like having a dedicated SysAdmin team that never sleeps.",
                    value: "Benefit: Continuous expert management.",
                },
                diagnosis: {
                    title: "Proactive Diagnosis & Improvement",
                    description: "Detects issues before they happen and suggests improvements automatically. Advanced algorithms ensure peak performance.",
                    value: "Benefit: Self-healing infrastructure.",
                },
                voice_deploy: {
                    title: "Chat & Voice Deployment",
                    description: "Deploy apps and manage servers simply by talking or chatting with your AI. No complex CLI commands needed.",
                    value: "Benefit: Zero-friction operations.",
                },
                auto_security: {
                    title: "Autonomous Security",
                    description: "Enterprise-grade security protocols applied and updated automatically. Your data remains impenetrable against new threats.",
                    value: "Benefit: Enterprise-grade protection.",
                },
            },
        },
        success: {
            title: "Success in Action",
            subtitle: "Visualizing the impact of autonomous operations across enterprise fleets.",
            items: {
                dashboard: {
                    title: "Real-time Anomaly Detection",
                    category: "Dashboard",
                },
                security: {
                    title: "Autonomous Security Grid",
                    category: "Security",
                },
                architecture: {
                    title: "Predictive Correction Flow",
                    category: "Architecture",
                },
            },
            modal_desc: "Full resolution visualization of the AetherOps platform capability.",
        },
        pricing: {
            title: "Transparent Pricing",
            subtitle: "Choose the level of autonomy that fits your infrastructure needs.",
            plans: {
                personal: {
                    name: "Personal",
                    description: "Perfect for personal projects and hobbyists.",
                    features: ["1 VPS Instance", "Basic AI Crew", "1-Click Deploy", "Community Support", "99.9% Uptime SLA"],
                },
                professional: {
                    name: "Professional",
                    description: "Full autonomous operations for growing businesses.",
                    features: ["Up to 5 VPS Instances", "Advanced AI Crew", "Autonomous Remediation", "Security Hardening", "AI Advisor Chatbot", "Priority Support"],
                },
                enterprise: {
                    name: "Enterprise",
                    description: "Maximum performance and security for large scale infrastructure.",
                    features: ["Unlimited VPS Instances", "Full Autonomous Suite", "Zero-Day Security Patching", "Compliance & Audit Logs", "24/7 Dedicated Support", "Custom API Access"],
                },
            },
            button: "Coming Soon",
            most_popular: "MOST POPULAR",
        },
        testimonials: {
            title: "Trusted by Industry Leaders",
            read_more: "Read All Case Studies",
            items: [
                {
                    quote: "AetherOps transformed our incident response. We went from waking up at 3 AM for server outages to waking up to a report that the issue was fixed hours ago.",
                    name: "Sarah Jenkins",
                    title: "VP of Infrastructure, CloudScale",
                },
                {
                    quote: "The predictive monitoring is uncannily accurate. It caught a memory leak in our primary database cluster three days before it would have caused a crash.",
                    name: "David Chen",
                    title: "CTO, FinTech Solutions",
                },
                {
                    quote: "Security hardening that doesn't break production. Finally. The autonomous patching saved us during the last major zero-day vulnerability scare.",
                    name: "Marcus Thorne",
                    title: "Lead DevOps Engineer, StreamLine",
                },
                {
                    quote: "ROI was immediate. We reduced our fleet management overhead by 70% within the first month of deployment.",
                    name: "Elena Rodriguez",
                    title: "Director of Engineering, SaaS Global",
                },
            ],
        },
        footer: {
            tagline: "AIOps. Simplified. Autonomous infrastructure for the next generation of cloud computing.",
            newsletter: {
                title: "Stay Informed",
                description: "Subscribe for AIOps insights, whitepapers, and product updates.",
                placeholder: "Enter your email",
                button: "Subscribe",
            },
            rights: "All rights reserved.",
            open_source: "Open Source Project",
            view_github: "View on GitHub",
            links: {
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                sla: "SLA",
            },
        },
    },
    es: {
        nav: {
            philosophy: "Filosofía",
            features: "Características",
            success: "Casos de Éxito",
            testimonials: "Testimonios",
            pricing: "Ver Precios",
        },
        hero: {
            title: "Gestiona tus entornos VPS",
            title_highlight: "sin estar presente.",
            subtitle: "La solución ideal para startups y emprendedores digitales. Tu equipo de IA gestiona tus entornos VPS Linux Ubuntu—sin necesidad de SysAdmin. Mantén el control total con una infraestructura autónoma.",
            cta_primary: "Empezar",
            cta_secondary: "Ver Precios y Planes",
        },
        philosophy: {
            title: "Más allá de la Automatización:",
            title_highlight: "El Poder de AetherOps",
            description: "La Gestión y Monitorización Remota (RMM) tradicional es reactiva. AetherOps representa un cambio de paradigma hacia las Operaciones Autónomas. Nuestros agentes avanzados de Machine Learning no solo te alertan de problemas; detectan anomalías antes de que se conviertan en incidentes y despliegan estrategias de remediación autónoma al instante.",
            stats: {
                cores: "Núcleos Gestionados",
                incidents: "Incidentes Resueltos",
                uptime: "Mejora de Uptime",
            },
        },
        features: {
            title: "Transforma Tu Realidad",
            subtitle: "AetherOps no es solo una herramienta; es un facilitador de diseño de vida. Une el alto rendimiento empresarial con la libertad personal.",
            items: {
                ai_admin: {
                    title: "Administración y Monitoreo con IA",
                    description: "Tu equipo de IA gestiona, monitorea y escala tu infraestructura 24/7. Es como tener un equipo SysAdmin dedicado que nunca duerme.",
                    value: "Beneficio: Gestión experta continua.",
                },
                diagnosis: {
                    title: "Diagnóstico y Mejora Proactiva",
                    description: "Detecta problemas antes de que ocurran y sugiere mejoras automáticamente. Algoritmos avanzados aseguran el máximo rendimiento.",
                    value: "Beneficio: Infraestructura auto-reparable.",
                },
                voice_deploy: {
                    title: "Despliegue por Chat y Voz",
                    description: "Despliega apps y gestiona servidores simplemente hablando o chateando con tu IA. Sin comandos CLI complejos.",
                    value: "Beneficio: Operaciones sin fricción.",
                },
                auto_security: {
                    title: "Seguridad Autónoma",
                    description: "Protocolos de seguridad empresarial aplicados y actualizados automáticamente. Tus datos permanecen impenetrables ante nuevas amenazas.",
                    value: "Beneficio: Protección de grado empresarial.",
                },
            },
        },
        success: {
            title: "Éxito en Acción",
            subtitle: "Visualizando el impacto de las operaciones autónomas en flotas empresariales.",
            items: {
                dashboard: {
                    title: "Detección de Anomalías en Tiempo Real",
                    category: "Panel de Control",
                },
                security: {
                    title: "Red de Seguridad Autónoma",
                    category: "Seguridad",
                },
                architecture: {
                    title: "Flujo de Corrección Predictiva",
                    category: "Arquitectura",
                },
            },
            modal_desc: "Visualización en alta resolución de la capacidad de la plataforma AetherOps.",
        },
        pricing: {
            title: "Precios Transparentes",
            subtitle: "Elige el nivel de autonomía que se ajuste a las necesidades de tu infraestructura.",
            plans: {
                personal: {
                    name: "Personal",
                    description: "Perfecto para proyectos personales y aficionados.",
                    features: ["1 Instancia VPS", "Equipo IA Básico", "Despliegue en 1-Click", "Soporte Comunitario", "99.9% Uptime SLA"],
                },
                professional: {
                    name: "Profesional",
                    description: "Operaciones autónomas completas para empresas en crecimiento.",
                    features: ["Hasta 5 Instancias VPS", "Equipo IA Avanzado", "Remediación Autónoma", "Endurecimiento de Seguridad", "Chatbot Asesor IA", "Soporte Prioritario"],
                },
                enterprise: {
                    name: "Empresarial",
                    description: "Máximo rendimiento y seguridad para infraestructura a gran escala.",
                    features: ["Instancias VPS Ilimitadas", "Suite Autónoma Completa", "Parches de Seguridad Zero-Day", "Registros de Cumplimiento y Auditoría", "Soporte Dedicado 24/7", "Acceso API Personalizado"],
                },
            },
            button: "Próximamente",
            most_popular: "MÁS POPULAR",
        },
        testimonials: {
            title: "Con la Confianza de Líderes de la Industria",
            read_more: "Leer Todos los Casos de Estudio",
            items: [
                {
                    quote: "AetherOps transformó nuestra respuesta a incidentes. Pasamos de despertarnos a las 3 AM por cortes de servidor a despertarnos con un informe de que el problema se solucionó hace horas.",
                    name: "Sarah Jenkins",
                    title: "VP de Infraestructura, CloudScale",
                },
                {
                    quote: "La monitorización predictiva es increíblemente precisa. Detectó una fuga de memoria en nuestro clúster de base de datos principal tres días antes de que causara un fallo.",
                    name: "David Chen",
                    title: "CTO, FinTech Solutions",
                },
                {
                    quote: "Endurecimiento de seguridad que no rompe producción. Finalmente. El parcheo autónomo nos salvó durante la última gran amenaza de vulnerabilidad zero-day.",
                    name: "Marcus Thorne",
                    title: "Ingeniero DevOps Principal, StreamLine",
                },
                {
                    quote: "El ROI fue inmediato. Redujimos nuestros gastos generales de gestión de flota en un 70% dentro del primer mes de implementación.",
                    name: "Elena Rodriguez",
                    title: "Directora de Ingeniería, SaaS Global",
                },
            ],
        },
        footer: {
            tagline: "AIOps. Simplificado. Infraestructura autónoma para la próxima generación de computación en la nube.",
            newsletter: {
                title: "Mantente Informado",
                description: "Suscríbete para recibir información sobre AIOps, whitepapers y actualizaciones de productos.",
                placeholder: "Introduce tu email",
                button: "Suscribirse",
            },
            rights: "Todos los derechos reservados.",
            open_source: "Proyecto de Código Abierto",
            view_github: "Ver en GitHub",
            links: {
                privacy: "Política de Privacidad",
                terms: "Términos de Servicio",
                sla: "SLA",
            },
        },
    },
    pt: {
        nav: {
            philosophy: "Filosofia",
            features: "Recursos",
            success: "Histórias de Sucesso",
            testimonials: "Depoimentos",
            pricing: "Ver Preços",
        },
        hero: {
            title: "Gerencie seus ambientes VPS",
            title_highlight: "sem estar presente.",
            subtitle: "A solução ideal para startups e empreendedores digitais. Sua equipe de IA gerencia seus ambientes VPS Linux Ubuntu—sem necessidade de SysAdmin. Mantenha controle total com infraestrutura autônoma.",
            cta_primary: "Começar",
            cta_secondary: "Ver Preços e Planos",
        },
        philosophy: {
            title: "Além da Automação:",
            title_highlight: "O Poder do AetherOps",
            description: "O Monitoramento e Gerenciamento Remoto (RMM) tradicional é reativo. AetherOps representa uma mudança de paradigma para Operações Autônomas. Nossos agentes avançados de Machine Learning não apenas alertam sobre problemas; eles detectam anomalias antes que se tornem incidentes e implantam estratégias de remediação autônoma instantaneamente.",
            stats: {
                cores: "Núcleos Gerenciados",
                incidents: "Incidentes Resolvidos",
                uptime: "Melhoria de Uptime",
            },
        },
        features: {
            title: "Transforme Sua Realidade",
            subtitle: "AetherOps não é apenas uma ferramenta; é um facilitador de estilo de vida. Una o alto desempenho empresarial com a liberdade pessoal.",
            items: {
                ai_admin: {
                    title: "Administração e Monitoramento com IA",
                    description: "Sua equipe de IA gerencia, monitora e escala sua infraestrutura 24/7. É como ter uma equipe SysAdmin dedicada que nunca dorme.",
                    value: "Benefício: Gestão especializada contínua.",
                },
                diagnosis: {
                    title: "Diagnóstico e Melhoria Proativa",
                    description: "Detecta problemas antes que aconteçam e sugere melhorias automaticamente. Algoritmos avançados garantem desempenho máximo.",
                    value: "Benefício: Infraestrutura auto-reparável.",
                },
                voice_deploy: {
                    title: "Deploy via Chat e Voz",
                    description: "Implante apps e gerencie servidores simplesmente falando ou conversando com sua IA. Sem comandos CLI complexos.",
                    value: "Benefício: Operações sem atrito.",
                },
                auto_security: {
                    title: "Segurança Autônoma",
                    description: "Protocolos de segurança empresarial aplicados e atualizados automaticamente. Seus dados permanecem impenetráveis contra novas ameaças.",
                    value: "Benefício: Proteção de nível empresarial.",
                },
            },
        },
        success: {
            title: "Sucesso em Ação",
            subtitle: "Visualizando o impacto das operações autônomas em frotas empresariais.",
            items: {
                dashboard: {
                    title: "Detecção de Anomalias em Tempo Real",
                    category: "Painel de Controle",
                },
                security: {
                    title: "Grade de Segurança Autônoma",
                    category: "Segurança",
                },
                architecture: {
                    title: "Fluxo de Correção Preditiva",
                    category: "Arquitetura",
                },
            },
            modal_desc: "Visualização em alta resolução da capacidade da plataforma AetherOps.",
        },
        pricing: {
            title: "Preços Transparentes",
            subtitle: "Escolha o nível de autonomia que se adapta às necessidades da sua infraestrutura.",
            plans: {
                personal: {
                    name: "Pessoal",
                    description: "Perfeito para projetos pessoais e hobbyistas.",
                    features: ["1 Instância VPS", "Equipe IA Básica", "Implantação em 1-Click", "Suporte da Comunidade", "99.9% Uptime SLA"],
                },
                professional: {
                    name: "Profissional",
                    description: "Operações autônomas completas para empresas em crescimento.",
                    features: ["Até 5 Instâncias VPS", "Equipe IA Avançada", "Remediação Autônoma", "Endurecimento de Segurança", "Chatbot Consultor IA", "Suporte Prioritário"],
                },
                enterprise: {
                    name: "Empresarial",
                    description: "Desempenho máximo e segurança para infraestrutura em larga escala.",
                    features: ["Instâncias VPS Ilimitadas", "Suíte Autônoma Completa", "Patches de Segurança Zero-Day", "Registros de Conformidade e Auditoria", "Suporte Dedicado 24/7", "Acesso API Personalizado"],
                },
            },
            button: "Em Breve",
            most_popular: "MAIS POPULAR",
        },
        testimonials: {
            title: "Confiado por Líderes da Indústria",
            read_more: "Ler Todos os Estudos de Caso",
            items: [
                {
                    quote: "AetherOps transformou nossa resposta a incidentes. Passamos de acordar às 3 da manhã por interrupções no servidor para acordar com um relatório de que o problema foi resolvido horas atrás.",
                    name: "Sarah Jenkins",
                    title: "VP de Infraestrutura, CloudScale",
                },
                {
                    quote: "O monitoramento preditivo é incrivelmente preciso. Detectou um vazamento de memória em nosso cluster de banco de dados principal três dias antes de causar uma falha.",
                    name: "David Chen",
                    title: "CTO, FinTech Solutions",
                },
                {
                    quote: "Endurecimiento de segurança que não quebra a produção. Finalmente. O patch autônomo nos salvou durante o último grande susto de vulnerabilidade zero-day.",
                    name: "Marcus Thorne",
                    title: "Engenheiro DevOps Principal, StreamLine",
                },
                {
                    quote: "O ROI foi imediato. Reduzimos nossas despesas gerais de gerenciamento de frota em 70% no primeiro mês de implantação.",
                    name: "Elena Rodriguez",
                    title: "Diretora de Engenharia, SaaS Global",
                },
            ],
        },
        footer: {
            tagline: "AIOps. Simplificado. Infraestrutura autônoma para a próxima geração de computação em nuvem.",
            newsletter: {
                title: "Mantenha-se Informado",
                description: "Inscreva-se para receber insights sobre AIOps, whitepapers e atualizações de produtos.",
                placeholder: "Digite seu e-mail",
                button: "Inscrever-se",
            },
            rights: "Todos os direitos reservados.",
            open_source: "Projeto de Código Aberto",
            view_github: "Ver no GitHub",
            links: {
                privacy: "Política de Privacidade",
                terms: "Termos de Serviço",
                sla: "SLA",
            },
        },
    },
    fr: {
        nav: {
            philosophy: "Philosophie",
            features: "Fonctionnalités",
            success: "Histoires de Réussite",
            testimonials: "Témoignages",
            pricing: "Voir les Prix",
        },
        hero: {
            title: "Gérez vos environnements VPS",
            title_highlight: "sans être présent.",
            subtitle: "La solution idéale pour les startups et les créateurs numériques. Votre équipe d'IA gère vos environnements VPS Linux Ubuntu—aucun administrateur requis. Gardez un contrôle total avec une infrastructure autonome.",
            cta_primary: "Commencer",
            cta_secondary: "Voir Prix et Plans",
        },
        philosophy: {
            title: "Au-delà de l'Automatisation:",
            title_highlight: "La Puissance d'AetherOps",
            description: "La surveillance et la gestion à distance (RMM) traditionnelles sont réactives. AetherOps représente un changement de paradigme vers les Opérations Autonomes. Nos agents d'apprentissage automatique avancés ne se contentent pas de vous alerter des problèmes; ils détectent les anomalies avant qu'elles ne deviennent des incidents et déploient instantanément des stratégies de remédiation autonomes.",
            stats: {
                cores: "Cœurs Gérés",
                incidents: "Incidents Résolus",
                uptime: "Amélioration de la Disponibilité",
            },
        },
        features: {
            title: "Transformez Votre Réalité",
            subtitle: "AetherOps n'est pas seulement un outil; c'est un facilitateur de style de vie. Comblez le fossé entre la haute performance commerciale et la liberté personnelle.",
            items: {
                ai_admin: {
                    title: "Administration et Surveillance par IA",
                    description: "Votre équipe IA gère, surveille et fait évoluer votre infrastructure 24/7. C'est comme avoir une équipe d'administrateurs système dédiée qui ne dort jamais.",
                    value: "Avantage: Gestion experte continue.",
                },
                diagnosis: {
                    title: "Diagnostic et Amélioration Proactive",
                    description: "Détecte les problèmes avant qu'ils ne surviennent et suggère des améliorations automatiquement. Des algorithmes avancés assurent des performances optimales.",
                    value: "Avantage: Infrastructure auto-réparatrice.",
                },
                voice_deploy: {
                    title: "Déploiement par Chat et Voix",
                    description: "Déployez des apps et gérez des serveurs simplement en parlant ou en discutant avec votre IA. Pas de commandes CLI complexes.",
                    value: "Avantage: Opérations sans friction.",
                },
                auto_security: {
                    title: "Sécurité Autonome",
                    description: "Protocoles de sécurité d'entreprise appliqués et mis à jour automatiquement. Vos données restent impénétrables face aux nouvelles menaces.",
                    value: "Avantage: Protection de niveau entreprise.",
                },
            },
        },
        success: {
            title: "Réussite en Action",
            subtitle: "Visualiser l'impact des opérations autonomes sur les flottes d'entreprise.",
            items: {
                dashboard: {
                    title: "Détection d'Anomalies en Temps Réel",
                    category: "Tableau de Bord",
                },
                security: {
                    title: "Grille de Sécurité Autonome",
                    category: "Sécurité",
                },
                architecture: {
                    title: "Flux de Correction Prédictive",
                    category: "Architecture",
                },
            },
            modal_desc: "Visualisation haute résolution de la capacité de la plateforme AetherOps.",
        },
        pricing: {
            title: "Tarification Transparente",
            subtitle: "Choisissez le niveau d'autonomie qui correspond aux besoins de votre infrastructure.",
            plans: {
                personal: {
                    name: "Personnel",
                    description: "Parfait pour les projets personnels et les amateurs.",
                    features: ["1 Instance VPS", "Équipe IA de Base", "Déploiement en 1 Clic", "Support Communautaire", "99.9% SLA de Disponibilité"],
                },
                professional: {
                    name: "Professionnel",
                    description: "Opérations autonomes complètes pour les entreprises en croissance.",
                    features: ["Jusqu'à 5 Instances VPS", "Équipe IA Avancée", "Remédiation Autonome", "Renforcement de la Sécurité", "Chatbot Conseiller IA", "Support Prioritaire"],
                },
                enterprise: {
                    name: "Entreprise",
                    description: "Performance et sécurité maximales pour une infrastructure à grande échelle.",
                    features: ["Instances VPS Illimitées", "Suite Autonome Complète", "Correctifs de Sécurité Zero-Day", "Journaux de Conformité et d'Audit", "Support Dédié 24/7", "Accès API Personnalisé"],
                },
            },
            button: "Bientôt Disponible",
            most_popular: "LE PLUS POPULAIRE",
        },
        testimonials: {
            title: "Approuvé par les Leaders de l'Industrie",
            read_more: "Lire Toutes les Études de Cas",
            items: [
                {
                    quote: "AetherOps a transformé notre réponse aux incidents. Nous sommes passés de réveils à 3 heures du matin pour des pannes de serveur à des réveils avec un rapport indiquant que le problème a été résolu il y a des heures.",
                    name: "Sarah Jenkins",
                    title: "VP Infrastructure, CloudScale",
                },
                {
                    quote: "La surveillance prédictive est incroyablement précise. Elle a détecté une fuite de mémoire dans notre cluster de base de données principal trois jours avant qu'elle ne provoque un crash.",
                    name: "David Chen",
                    title: "CTO, FinTech Solutions",
                },
                {
                    quote: "Un renforcement de la sécurité qui ne casse pas la production. Enfin. Le correctif autonome nous a sauvés lors de la dernière grande alerte de vulnérabilité zero-day.",
                    name: "Marcus Thorne",
                    title: "Ingénieur DevOps Principal, StreamLine",
                },
                {
                    quote: "Le retour sur investissement a été immédiat. Nous avons réduit nos frais généraux de gestion de flotte de 70% dès le premier mois de déploiement.",
                    name: "Elena Rodriguez",
                    title: "Directrice de l'Ingénierie, SaaS Global",
                },
            ],
        },
        footer: {
            tagline: "AIOps. Simplifié. Infrastructure autonome pour la prochaine génération de cloud computing.",
            newsletter: {
                title: "Restez Informé",
                description: "Abonnez-vous pour recevoir des informations sur AIOps, des livres blancs et des mises à jour de produits.",
                placeholder: "Entrez votre email",
                button: "S'abonner",
            },
            rights: "Tous droits réservés.",
            open_source: "Projet Open Source",
            view_github: "Voir sur GitHub",
            links: {
                privacy: "Politique de Confidentialité",
                terms: "Conditions d'Utilisation",
                sla: "SLA",
            },
        },
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
