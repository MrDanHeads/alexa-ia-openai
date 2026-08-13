export type Lang = "es" | "en";

export interface Dictionary {
  brand: string;
  nav: {
    home: string;
    services: string;
    stack: string;
    about: string;
    contact: string;
  };
  cta: {
    book: string;
    cv: string;
  };
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleEmphasis: string;
    titleAfter: string;
    sub: string;
    metrics: { value: string; label: string }[];
    portraitAlt: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    items: { title: string; desc: string; bullets: string[] }[];
  };
  stack: {
    eyebrow: string;
    title: string;
    lede: string;
    categories: { label: string; items: string[] }[];
    certsLabel: string;
    certs: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    bio: string;
    metrics: { value: string; label: string }[];
    timeline: { title: string; org: string }[];
    portraitAlt: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    labels: {
      name: string;
      email: string;
      company: string;
      service: string;
      message: string;
    };
    serviceOptions: string[];
    send: string;
  };
  footer: {
    rights: string;
    privacy: string;
  };
  chat: {
    launcher: string;
    who: string;
    reset: string;
    poweredBy: string;
  };
}

export const translations: Record<Lang, Dictionary> = {
  es: {
    brand: "Danilo Cabezas",
    nav: {
      home: "Inicio",
      services: "Servicios",
      stack: "Stack",
      about: "Sobre mí",
      contact: "Contacto",
    },
    cta: {
      book: "Agendar Consultoría",
      cv: "Descargar CV ↓",
    },
    hero: {
      eyebrow: "CTO & Consultor en IA · +15 años liderando TI",
      titleBefore: "Transformo la infraestructura de TI en ",
      titleEmphasis: "ventaja competitiva",
      titleAfter: " con Inteligencia Artificial.",
      sub: "Ingeniero de Sistemas Senior especializado en automatización con agentes de IA, Business Intelligence y arquitectura ERP / Cloud.",
      metrics: [
        { value: "15+", label: "años de experiencia" },
        { value: "Dynamics 365 BC", label: "ERP" },
        { value: "AWS", label: "Cloud" },
        { value: "OpenAI", label: "Agentes de IA" },
        { value: "Power BI", label: "Analytics" },
      ],
      portraitAlt: "Retrato de Danilo Cabezas, CTO y Consultor en IA",
    },
    services: {
      eyebrow: "Portafolio de servicios",
      title: "Consultoría enfocada en resultados",
      lede: "Tres frentes que trabajan juntos: automatizar con IA, decidir con datos, y sostenerlo todo sobre una infraestructura sólida.",
      cta: "Conversemos →",
      items: [
        {
          title: "IA & Automatización con Agentes",
          desc: "Diseño e implemento agentes que automatizan procesos de negocio de punta a punta.",
          bullets: [
            "N8N — orquestación de flujos",
            "OpenAI — modelos de lenguaje",
            "Copilot Studio & ElevenLabs — asistentes de voz y texto",
          ],
        },
        {
          title: "Business Intelligence & Analytics",
          desc: "Convierto datos dispersos en dashboards y modelos que sostienen decisiones ejecutivas.",
          bullets: [
            "Power BI — dashboards ejecutivos",
            "Python — ciencia de datos & ML",
            "SQL — pipelines de datos",
          ],
        },
        {
          title: "Infraestructura TI & Gestión ERP",
          desc: "Optimizo ERPs y arquitecturas cloud para que la operación escale sin fricción.",
          bullets: [
            "Microsoft Dynamics 365 BC",
            "AWS — arquitectura cloud",
            "Seguridad perimetral (Fortinet)",
          ],
        },
      ],
    },
    stack: {
      eyebrow: "Herramientas & credenciales",
      title: "Stack técnico & certificaciones",
      lede: "El mismo stack que uso con clientes, agrupado por función.",
      categories: [
        { label: "Lenguajes & Data", items: ["Python", "SQL", "Power BI"] },
        {
          label: "Automatización & IA",
          items: ["N8N", "OpenAI", "Copilot Studio", "ElevenLabs"],
        },
        {
          label: "Cloud & Seguridad",
          items: ["AWS", "Dynamics 365 BC", "Fortinet"],
        },
      ],
      certsLabel: "Certificaciones & cursos",
      certs: [
        "Copilot Studio",
        "SQL Total",
        "N8N — Agentes de IA",
        "Power BI Total",
        "Python for Data Science",
        "Marketing Digital 360",
        "Adobe Creative Suite",
      ],
    },
    about: {
      eyebrow: "Trayectoria",
      title: "Sobre mí",
      bio: "Ingeniero de Sistemas con más de 15 años liderando áreas de TI en empresas medianas y grandes, hoy enfocado en llevar la Inteligencia Artificial de la teoría a la operación diaria: agentes que automatizan procesos, dashboards que sostienen decisiones y arquitecturas cloud que escalan sin fricción.",
      metrics: [
        { value: "15+", label: "años de experiencia" },
        { value: "3", label: "especialidades núcleo" },
        { value: "7+", label: "certificaciones" },
      ],
      timeline: [
        { title: "Ingeniería en Sistemas", org: "Universidad Politécnica Salesiana" },
        { title: "Maestría en Diseño Gráfico Digital", org: "UNIR" },
        { title: "Diplomado en Inteligencia Artificial", org: "UDLA" },
      ],
      portraitAlt: "Retrato de Danilo Cabezas",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de tu próximo proyecto",
      labels: {
        name: "Nombre",
        email: "Email",
        company: "Empresa (opcional)",
        service: "Tipo de servicio",
        message: "Mensaje",
      },
      serviceOptions: [
        "IA & Automatización",
        "BI & Analytics",
        "Infraestructura & ERP",
        "Otro",
      ],
      send: "Enviar mensaje →",
    },
    footer: {
      rights: "© 2026 Danilo Cabezas",
      privacy: "Política de Privacidad",
    },
    chat: {
      launcher: "¿Hablamos de tu próximo proyecto?",
      who: "Asistente de Danilo",
      reset: "Reiniciar",
      poweredBy: "Typebot + Cal.com",
    },
  },
  en: {
    brand: "Danilo Cabezas",
    nav: {
      home: "Home",
      services: "Services",
      stack: "Stack",
      about: "About",
      contact: "Contact",
    },
    cta: {
      book: "Book a Consultation",
      cv: "Download CV ↓",
    },
    hero: {
      eyebrow: "CTO & AI Consultant · 15+ years leading IT",
      titleBefore: "I turn IT infrastructure into a ",
      titleEmphasis: "competitive edge",
      titleAfter: " with Artificial Intelligence.",
      sub: "Senior Systems Engineer specialized in AI agent automation, Business Intelligence and ERP / Cloud architecture.",
      metrics: [
        { value: "15+", label: "years of experience" },
        { value: "Dynamics 365 BC", label: "ERP" },
        { value: "AWS", label: "Cloud" },
        { value: "OpenAI", label: "AI agents" },
        { value: "Power BI", label: "Analytics" },
      ],
      portraitAlt: "Portrait of Danilo Cabezas, CTO & AI Consultant",
    },
    services: {
      eyebrow: "Service portfolio",
      title: "Consulting focused on results",
      lede: "Three fronts working together: automating with AI, deciding with data, and holding it all up on solid infrastructure.",
      cta: "Let's talk →",
      items: [
        {
          title: "AI & Agent Automation",
          desc: "I design and deploy agents that automate business processes end to end.",
          bullets: [
            "N8N — workflow orchestration",
            "OpenAI — language models",
            "Copilot Studio & ElevenLabs — voice & text assistants",
          ],
        },
        {
          title: "Business Intelligence & Analytics",
          desc: "I turn scattered data into dashboards and models that support executive decisions.",
          bullets: [
            "Power BI — executive dashboards",
            "Python — data science & ML",
            "SQL — data pipelines",
          ],
        },
        {
          title: "IT Infrastructure & ERP Management",
          desc: "I optimize ERPs and cloud architectures so operations scale without friction.",
          bullets: [
            "Microsoft Dynamics 365 BC",
            "AWS — cloud architecture",
            "Perimeter security (Fortinet)",
          ],
        },
      ],
    },
    stack: {
      eyebrow: "Tools & credentials",
      title: "Tech stack & certifications",
      lede: "The same stack I use with clients, grouped by function.",
      categories: [
        { label: "Languages & Data", items: ["Python", "SQL", "Power BI"] },
        {
          label: "Automation & AI",
          items: ["N8N", "OpenAI", "Copilot Studio", "ElevenLabs"],
        },
        {
          label: "Cloud & Security",
          items: ["AWS", "Dynamics 365 BC", "Fortinet"],
        },
      ],
      certsLabel: "Certifications & courses",
      certs: [
        "Copilot Studio",
        "SQL Total",
        "N8N — AI Agents",
        "Power BI Total",
        "Python for Data Science",
        "Marketing Digital 360",
        "Adobe Creative Suite",
      ],
    },
    about: {
      eyebrow: "Background",
      title: "About me",
      bio: "Systems Engineer with 15+ years leading IT departments at mid-size and large companies, now focused on taking Artificial Intelligence from theory into daily operations: agents that automate processes, dashboards that support decisions, and cloud architectures that scale without friction.",
      metrics: [
        { value: "15+", label: "years of experience" },
        { value: "3", label: "core specialties" },
        { value: "7+", label: "certifications" },
      ],
      timeline: [
        { title: "Systems Engineering", org: "Universidad Politécnica Salesiana" },
        { title: "Master's in Digital Graphic Design", org: "UNIR" },
        { title: "Diploma in Artificial Intelligence", org: "UDLA" },
      ],
      portraitAlt: "Portrait of Danilo Cabezas",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your next project",
      labels: {
        name: "Name",
        email: "Email",
        company: "Company (optional)",
        service: "Service type",
        message: "Message",
      },
      serviceOptions: [
        "AI & Automation",
        "BI & Analytics",
        "Infrastructure & ERP",
        "Other",
      ],
      send: "Send message →",
    },
    footer: {
      rights: "© 2026 Danilo Cabezas",
      privacy: "Privacy Policy",
    },
    chat: {
      launcher: "Let's talk about your next project?",
      who: "Danilo's Assistant",
      reset: "Restart",
      poweredBy: "Typebot + Cal.com",
    },
  },
};
