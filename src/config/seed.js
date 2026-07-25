// backend/src/config/seed.js
// Run: npm run seed  (from backend/ directory)
// Safe to re-run — all operations use upsert.
// Admin is created only if no admin exists.

import "dotenv/config";
import mongoose from "mongoose";
import Admin    from "../modules/auth/auth.model.js";
import Content  from "../modules/content/content.model.js";
import Settings from "../modules/settings/settings.model.js";

// ─── Full EN content ──────────────────────────────────────────────────────────
const EN = {
  nav: {
    home: "Home", about: "Who We Are", why_us: "Why Us", services: "Services",
    partners: "Partners", market: "Market", cta: "Get in Touch",
  },
  hero: {
    eyebrow: "Field-Trial Intelligence for Egypt",
    heading: "Turning agricultural trials into confident decisions",
    subheading: "Your strategic partner for launching vegetable seed varieties — an independent platform that turns field trials from a risk into a data-driven decision.",
    cta_primary: "Start a Trial",
    cta_secondary: "Our Story",
    image_alt: "Field trial rows of vegetable seed varieties in Egypt",
    stats: [
      { number: "50M+", text: "USD annual market opportunity in Egypt" },
      { number: "70K+", text: "feddans of agricultural-land expansion" },
      { number: "1ST",  text: "independent trial-management platform in Egypt" },
    ],
  },
  about: {
    eyebrow: "Who we are",
    heading_line1: "An independent, neutral",
    heading_line2: "partner in the field",
    body: [
      "One to One was founded as a specialized agricultural services company, providing integrated solutions for local and international vegetable seed companies through managing and executing field trials and evaluating the performance of varieties and hybrids under real cultivation conditions.",
      "We support seed companies in making clearer decisions with reliable field data, organized technical reports, and a systematic view of how varieties suit Egypt's specific agricultural nature — productivity, crop quality, environmental tolerance, disease resistance, and marketability.",
      "We act as a specialized technical body, never as an agent or distributor for any product — testing varieties and hybrids before commercial launch, expansion, or scale-up, reducing risk and supporting research, sales, and marketing decisions.",
    ],
    img_alt: "Agronomist inspecting seedlings",
  },
  whyUs: {
    eyebrow: "Why One to One?",
    heading_line1: "The first independent trial-management",
    heading_line2: "platform in Egypt",
    body: [
      "A network of trials across multiple locations, integrated outputs, faster decision-making, lower cost — turning data into applicable insights.",
      "In the vegetable seed sector, success does not depend only on genetic quality or performance elsewhere — but on real ability to perform under local farming conditions. Egypt's diversity in climate, soil, irrigation, disease pressure, and consumer expectation means seed companies need a capable field partner before making launch, expansion, or re-evaluation decisions.",
    ],
    closing_label: "This is where our role comes in.",
    closing_message: "We give vegetable seed companies a clear picture of how their varieties and hybrids perform in the real market — through carefully designed trials, precise follow-up, and practical analysis that reduces risk and improves decision quality.",
    img_alt: "Field trial evaluation in an Egyptian vegetable crop",
  },
  mission: {
    eyebrow: "Our Direction",
    heading_line1: "Vision & Mission",
    vision: {
      badge: "Our Vision",
      body:  "To become the most trusted platform for agricultural technology in Egypt for managing and evaluating data-driven agricultural trials, enabling more efficient decisions, accelerating innovation, and achieving sustainable growth across the agricultural sector.",
    },
    missionCard: {
      badge: "Our Mission",
      body:  "We serve seed companies and all stakeholders in Egypt's agricultural sector by providing independent field-trial management services, and integrated technical and commercial solutions. Through certified scientific protocols, multi-site trials, and advanced analysis, we enable clients to make accurate decisions, reduce risk, and accelerate successful market entry — upholding integrity, neutrality, and scientific excellence.",
    },
  },
  philosophy: {
    items: [
      {
        label: "Philosophy",
        heading: "Built on accurate data",
        body: "We believe that success in the agricultural sector is built on accurate data. By transforming field trials into an organized, scalable, and independent service, we bridge scientific research and commercial application — turning uncertainty into confident decisions and successful market results.",
      },
      {
        label: "Value Proposition",
        heading: "Risk-managed, not risk-taken",
        body: "We turn high-risk decisions about developing and launching varieties into risk-managed strategies, based on independent, trusted, multi-site agricultural trial data — accelerating validation, reducing risk, and achieving stronger commercial success.",
      },
    ],
  },
  problem: {
    eyebrow: "The Problem We Solve",
    heading: "Vegetable seed companies face real challenges before entering the Egyptian market",
    items: [
      { title: "Unreliable Data",           desc: "Trials are carried out in scattered, inconsistent ways, making comparison between varieties impossible or misleading." },
      { title: "High Risk Decisions",       desc: "Companies launch new varieties after years of investment, building on impressions rather than data — and failure is very costly." },
      { title: "Absence of a Neutral Party",desc: "There is no independent, specialized body to evaluate varieties against fixed standards, away from conflicts of interest." },
      { title: "Slow Launch Cycle",         desc: "Internal evaluation consumes significant time and resources, and delays market entry ahead of competitors." },
    ],
  },
  services: {
    eyebrow: "Our Services",
    heading: "Six ways we de-risk your",
    heading_accent: "market entry",
    show_more: "Show All Services",
    back_to_home: "Back to home",
    values: [
      { icon: "FaLeaf",          name: "Field Trial Management",                   desc: "We plan, execute, and manage field agricultural trials to test vegetable seed varieties and hybrids under real cultivation conditions." },
      { icon: "FaSearch",        name: "Integrated Agricultural Trial Management", desc: "From protocol design through to launch recommendations." },
      { icon: "FaFlask",         name: "Screening & Early Evaluation",             desc: "Selecting varieties efficiently and cost-effectively." },
      { icon: "FaFileAlt",       name: "Reports & Decision Support",               desc: "Technical and marketing reports, and sales tools ready for immediate use." },
      { icon: "FaChartLine",     name: "Technical & Commercial Consulting",        desc: "Market analysis, market-entry plans, and operational efficiency improvement." },
      { icon: "FaGraduationCap", name: "Training & Capacity Building",             desc: "Trial-as-a-Service technical and management programs to develop work teams." },
    ],
  },
  technology: {
    eyebrow: "How We Work",
    heading: "A closed loop, every cycle",
    lead: "Every trial is guaranteed by a trusted protocol, supervised by our specialized team, with outputs ready for immediate commercial use.",
    steps: [
      { num: "1", title: "Request Intake",      desc: "We understand the client's goal and design a dedicated protocol." },
      { num: "2", title: "Scientific Design",    desc: "Determining sites, standards, and timelines." },
      { num: "3", title: "Field Execution",      desc: "Cultivation, supervision, and regular monitoring against unified standards." },
      { num: "4", title: "Analysis & Reporting", desc: "Scientific and marketing reports with clear recommendations." },
    ],
    img_alt: "Close-up of vegetable seeds ready for field trials",
  },
  serve: {
    eyebrow: "Who We Serve",
    heading: "Three partners, one field",
    img_alt: "Wide agricultural field under open sky",
    items: [
      { icon: "FaGlobe", title: "International Vegetable Seed Companies", desc: "Trusted evaluation before investment — neutral, comparable data for a decision based on scientific evidence." },
      { icon: "FaLeaf",  title: "Companies & Local Agents",                desc: "Maximizing the return of the variety portfolio — sales tools based on real data, supporting sales teams with solid technical arguments." },
      { icon: "FaFlask", title: "R&D Centers",                             desc: "Selecting large numbers of varieties, reducing development-cycle costs — fast, scientifically credible results." },
    ],
  },
  partners: {
    eyebrow: "Strategic Partners",
    heading: "Backed by the right hands in the field",
    lead: "The organizations we work alongside — global genetics houses, research bodies, and distribution partners.",
    items: [
      { name: "Partner A", link: "" },
      { name: "Partner B", link: "" },
      { name: "Partner C", link: "" },
      { name: "Partner D", link: "" },
      { name: "Partner E", link: "" },
    ],
  },
  clients: {
    eyebrow: "Our Clients",
    heading: "Trusted by seed companies across Egypt",
    lead: "Local and international vegetable seed companies who rely on our field-trial data to make their next launch decision.",
    items: [
      { name: "Client 1",  link: "" },
      { name: "Client 2",  link: "" },
      { name: "Client 3",  link: "" },
      { name: "Client 4",  link: "" },
      { name: "Client 5",  link: "" },
      { name: "Client 6",  link: "" },
      { name: "Client 7",  link: "" },
      { name: "Client 8",  link: "" },
      { name: "Client 9",  link: "" },
      { name: "Client 10", link: "" },
    ],
  },
  market: {
    eyebrow: "Market Opportunity in Egypt",
    heading: "A 50M+ USD annual opportunity, still largely imported",
    lead: "Agricultural-land expansion of more than 70 thousand feddans and rising demand for high-performing varieties reveal a significant gap in reliable field data — a strong opportunity for companies that invest in professional trials to achieve faster market entry, reduce risk, and strengthen competitive advantage.",
    note: "Figures reflect the annual USD market size by crop and cultivation segment across Egypt, as presented in One to One's market opportunity research.",
    show_more: "View More",
    back_to_home: "Back to home",
    items: [
      {
        title: "Cucumber Market",
        rows: [
          { label: "Open Field (all seasons)",  value: "18M+" },
          { label: "Greenhouse (all seasons)",   value: "150K–5.3M" },
        ],
      },
      {
        title: "Tomato Market",
        rows: [
          { label: "Indeterminate (all seasons)", value: "1.9M+" },
          { label: "Autumn (open field)",          value: "14M+" },
          { label: "Summer (open field)",          value: "10M+" },
        ],
      },
      {
        title: "Hot Pepper Market",
        rows: [
          { label: "Total market",                            value: "4M" },
          { label: "Bull Horn (autumn protected)",             value: "3.5M+" },
          { label: "Charleston (open field)",                  value: "1.25M+" },
          { label: "Medium Pencil (winter GH / open field)",   value: "1M / 0.5M" },
        ],
      },
      {
        title: "Sweet Pepper Market",
        rows: [
          { label: "Blocky Yellow / Red", value: "1.6–2.8M" },
          { label: "Japanese / Dolma",     value: "1.4M+" },
          { label: "Charleston (outdoor)", value: "350K+" },
        ],
      },
    ],
  },
  team: {
    eyebrow: "Our Team",
    heading: "Field expertise meets commercial vision",
    body: [
      "The One to One team draws on diverse expertise combining agricultural knowledge, field trials, variety and hybrid evaluation, agricultural marketing, and administrative governance.",
      "We combine a practical understanding of the agricultural market with the needs of seed companies — from tracking variety performance in the field, to analyzing results, developing marketing messages, and helping companies build more organized operating systems. Our strength lies in pairing technical expertise with commercial vision and organized management.",
    ],
    img_alt: "One to One field team walking an agricultural trial site",
  },
  contact: {
    eyebrow: "Get In Touch",
    heading_line1: "Ready to Trial",
    heading_line2: "With Confidence?",
    subheading: "Whether you're a seed company, distributor, or R&D center — let's turn your next launch into a data-driven decision.",
    form: {
      title: "Send a Message",
      subtitle: "We typically respond within 24 hours",
      name_label: "Full Name",
      name_placeholder: "John Doe",
      email_label: "Email Address",
      email_placeholder: "john@example.com",
      phone_label: "Phone Number",
      phone_placeholder: "+20 1XX XXX XXXX",
      subject_label: "Subject",
      subject_placeholder: "Select a topic",
      subject_options: [
        { value: "general",      label: "General Inquiry" },
        { value: "trial",        label: "Trial Request" },
        { value: "partnership",  label: "Partnership" },
        { value: "support",      label: "Technical Support" },
      ],
      message_label: "Your Message",
      message_placeholder: "Tell us about your project, needs, or questions...",
      submit: "Send Message",
      error: "Please fill in all required fields.",
    },
    success: {
      heading: "Message Sent!",
      body:    "Thank you for reaching out. Our team will review your message and get back to you within 24 hours.",
      again:   "Send another message",
    },
    info: [
      { key: "email",    label: "Email",    value: "info@oneto-one.com",     link: "mailto:info@oneto-one.com" },
      { key: "phone",    label: "Phone",    value: "+02 012 876 369 86",     link: "tel:+0201287636986" },
      { key: "whatsapp", label: "WhatsApp", value: "+20 128 763 6986",       link: "https://wa.me/201287636986" },
      { key: "website",  label: "Website",  value: "www.oneto-one.com",      link: "https://www.oneto-one.com" },
    ],
  },
  footer: {
    tagline: "Egypt's first independent field-trial management platform for vegetable seed companies — turning trials into confident, data-driven launch decisions.",
    quick_links_title: "Quick Links",
    services_title:    "Our Services",
    contact_title:     "Contact Us",
    copyright: "One to One Agri Platform. All rights reserved.",
    links: [
      { label: "Home",       href: "/" },
      { label: "About",      href: "#about" },
      { label: "Services",   href: "#services" },
      { label: "Technology", href: "#technology" },
      { label: "Contact",    href: "#contact" },
    ],
    services: ["Field Trial Management","Screening & Early Evaluation","Reports & Decision Support","Technical & Commercial Consulting","Training & Capacity Building"],
    contact_items: [
      { key: "email",    label: "Email",    value: "info@oneto-one.com" },
      { key: "phone",    label: "Phone",    value: "+20 128 763 6986" },
      { key: "location", label: "Location", value: "All Egypt" },
    ],
  },
};

// ─── Full AR content ──────────────────────────────────────────────────────────
const AR = {
  nav: {
    home: "الرئيسية", about: "من نحن", why_us: "لماذا نحن", services: "خدماتنا",
    partners: "شركاؤنا", market: "السوق", cta: "تواصل الآن",
  },
  hero: {
    eyebrow: "ذكاء التجارب الحقلية لمصر",
    heading: "نُحوّل التجارب الزراعية إلى قرارات واثقة",
    subheading: "شريكك الاستراتيجي لإطلاق أصناف بذور الخضروات — منصة مستقلة تُحوّل التجارب الحقلية من مخاطرة إلى قرار مبني على البيانات.",
    cta_primary: "ابدأ تجربة",
    cta_secondary: "قصتنا",
    image_alt: "صفوف تجارب حقلية لأصناف بذور الخضروات في مصر",
    stats: [
      { number: "+50 مليون", text: "دولار فرصة سوقية سنوية في مصر" },
      { number: "+70 ألف",   text: "فدان من التوسع في الأراضي الزراعية" },
      { number: "الأولى",    text: "منصة مستقلة لإدارة التجارب الحقلية في مصر" },
    ],
  },
  about: {
    eyebrow: "من نحن",
    heading_line1: "شريك مستقل ومحايد",
    heading_line2: "في الميدان الزراعي",
    body: [
      "تأسست وان تو وان كشركة متخصصة في الخدمات الزراعية، تقدّم حلولاً متكاملة لشركات بذور الخضروات المحلية والعالمية من خلال إدارة وتنفيذ التجارب الحقلية وتقييم أداء الأصناف والهجن في ظروف الزراعة الفعلية.",
      "ندعم شركات البذور في اتخاذ قرارات أكثر وضوحاً عبر بيانات حقلية موثوقة، وتقارير فنية منظمة، ورؤية منهجية لمدى ملاءمة الأصناف لطبيعة الزراعة المصرية الخاصة — من حيث الإنتاجية، وجودة المحصول، وتحمّل الظروف البيئية، ومقاومة الأمراض، والقابلية التسويقية.",
      "نعمل كجهة فنية متخصصة، ولسنا وكيلاً أو موزعاً لأي منتج — إذ نختبر الأصناف والهجن قبل الإطلاق التجاري أو التوسع أو رفع الحجم، مما يقلل المخاطر ويدعم قرارات البحث والمبيعات والتسويق.",
    ],
    img_alt: "مهندس زراعي يفحص الشتلات",
  },
  whyUs: {
    eyebrow: "لماذا وان تو وان؟",
    heading_line1: "أول منصة مستقلة لإدارة",
    heading_line2: "التجارب الحقلية في مصر",
    body: [
      "شبكة تجارب في مواقع متعددة، ومخرجات متكاملة، وقرارات أسرع، وتكلفة أقل — نحوّل البيانات إلى رؤى قابلة للتطبيق.",
      "في قطاع بذور الخضروات، لا يعتمد النجاح على جودة الأصناف الوراثية أو أدائها في مكان آخر فقط — بل على قدرتها الحقيقية على الأداء في ظروف الزراعة المحلية. تنوّع مصر في المناخ والتربة والري وضغط الأمراض وتوقعات المستهلك يعني أن شركات البذور تحتاج إلى شريك ميداني قادر قبل اتخاذ قرارات الإطلاق أو التوسع أو إعادة التقييم.",
    ],
    closing_label: "هنا يأتي دورنا.",
    closing_message: "نمنح شركات بذور الخضروات صورة واضحة عن أداء أصنافها وهجنها في السوق الفعلي — من خلال تجارب مصممة بعناية، ومتابعة دقيقة، وتحليل عملي يقلل المخاطر ويحسّن جودة القرار.",
    img_alt: "تقييم تجربة حقلية في محصول خضروات مصري",
  },
  mission: {
    eyebrow: "وجهتنا",
    heading_line1: "الرؤية والرسالة",
    vision: {
      badge: "رؤيتنا",
      body:  "أن نصبح المنصة الأكثر ثقة للتقنية الزراعية في مصر لإدارة وتقييم التجارب الزراعية القائمة على البيانات، بما يتيح قرارات أكثر كفاءة، ويسرّع الابتكار، ويحقق نمواً مستداماً عبر القطاع الزراعي.",
    },
    missionCard: {
      badge: "رسالتنا",
      body:  "نخدم شركات البذور وجميع الأطراف المعنية في القطاع الزراعي المصري من خلال تقديم خدمات مستقلة لإدارة التجارب الحقلية، وحلول فنية وتجارية متكاملة. عبر بروتوكولات علمية معتمدة، وتجارب متعددة المواقع، وتحليل متقدم، نمكّن عملاءنا من اتخاذ قرارات دقيقة، وتقليل المخاطر، وتسريع النجاح في دخول السوق — مع الحفاظ على النزاهة والحياد والتميز العلمي.",
    },
  },
  philosophy: {
    items: [
      {
        label: "الفلسفة",
        heading: "قائمون على بيانات دقيقة",
        body: "نؤمن بأن النجاح في القطاع الزراعي يُبنى على بيانات دقيقة. فمن خلال تحويل التجارب الحقلية إلى خدمة منظمة وقابلة للتوسع ومستقلة، نجسر الفجوة بين البحث العلمي والتطبيق التجاري — لنحوّل الغموض إلى قرارات واثقة ونتائج تسويقية ناجحة.",
      },
      {
        label: "عرض القيمة",
        heading: "مخاطرة مُدارة، لا مخاطرة عشوائية",
        body: "نحوّل القرارات عالية المخاطرة المتعلقة بتطوير الأصناف وإطلاقها إلى استراتيجيات مُدارة المخاطر، تستند إلى بيانات تجارب حقلية مستقلة وموثوقة من مواقع متعددة — مما يسرّع التحقق، ويقلل المخاطر، ويحقق نجاحاً تجارياً أقوى.",
      },
    ],
  },
  problem: {
    eyebrow: "المشكلة التي نحلّها",
    heading: "شركات بذور الخضروات تواجه تحديات حقيقية قبل دخول السوق المصري",
    items: [
      { title: "بيانات غير موثوقة",     desc: "تُجرى التجارب بطرق متفرقة وغير متسقة، مما يجعل مقارنة الأصناف مستحيلة أو مضلِّلة." },
      { title: "قرارات عالية المخاطرة", desc: "تُطلق الشركات أصنافاً جديدة بعد سنوات من الاستثمار، بناءً على انطباعات لا على بيانات — وقد يكون الفشل مكلفاً للغاية." },
      { title: "غياب جهة محايدة",       desc: "لا توجد جهة مستقلة ومتخصصة لتقييم الأصناف وفق معايير ثابتة، بعيداً عن تضارب المصالح." },
      { title: "دورة إطلاق بطيئة",      desc: "يستهلك التقييم الداخلي وقتاً وموارد كبيرة، ما يؤخر دخول السوق مقارنة بالمنافسين." },
    ],
  },
  services: {
    eyebrow: "خدماتنا",
    heading: "ست طرق نُقلّل بها",
    heading_accent: "مخاطر دخولك السوق",
    show_more: "عرض جميع الخدمات",
    back_to_home: "العودة إلى الرئيسية",
    values: [
      { icon: "FaLeaf",          name: "إدارة التجارب الحقلية",          desc: "نخطط وننفذ وندير التجارب الحقلية الزراعية لاختبار أصناف وهجن بذور الخضروات تحت ظروف الزراعة الفعلية." },
      { icon: "FaSearch",        name: "إدارة متكاملة للتجارب الزراعية", desc: "من تصميم البروتوكول وحتى توصيات الإطلاق." },
      { icon: "FaFlask",         name: "الفرز والتقييم المبكر",          desc: "اختيار الأصناف بكفاءة وبتكلفة مناسبة." },
      { icon: "FaFileAlt",       name: "التقارير ودعم القرار",           desc: "تقارير فنية وتسويقية، وأدوات مبيعات جاهزة للاستخدام الفوري." },
      { icon: "FaChartLine",     name: "الاستشارات الفنية والتجارية",    desc: "تحليل السوق، وخطط دخول السوق، وتحسين الكفاءة التشغيلية." },
      { icon: "FaGraduationCap", name: "التدريب وبناء القدرات",          desc: "برامج فنية وإدارية على أساس «التجربة كخدمة» لتطوير فرق العمل." },
    ],
  },
  technology: {
    eyebrow: "كيف نعمل",
    heading: "حلقة مغلقة، في كل دورة",
    lead: "كل تجربة مضمونة ببروتوكول موثوق، يشرف عليه فريقنا المتخصص، مع مخرجات جاهزة للاستخدام التجاري الفوري.",
    steps: [
      { num: "1", title: "استقبال الطلب",           desc: "نتفهم هدف العميل ونصمم بروتوكولاً مخصصاً." },
      { num: "2", title: "التصميم العلمي",          desc: "تحديد المواقع والمعايير والجداول الزمنية." },
      { num: "3", title: "التنفيذ الحقلي",           desc: "الزراعة والإشراف والمتابعة الدورية وفق معايير موحدة." },
      { num: "4", title: "التحليل وإعداد التقارير", desc: "تقارير علمية وتسويقية مع توصيات واضحة." },
    ],
    img_alt: "بذور خضروات جاهزة للتجارب الحقلية عن قرب",
  },
  serve: {
    eyebrow: "لمن نقدّم خدماتنا",
    heading: "ثلاثة شركاء، ميدان واحد",
    img_alt: "حقل زراعي واسع تحت سماء مفتوحة",
    items: [
      { icon: "FaGlobe", title: "شركات بذور الخضروات العالمية", desc: "تقييم موثوق قبل الاستثمار — بيانات محايدة وقابلة للمقارنة لاتخاذ قرار مبني على أدلة علمية." },
      { icon: "FaLeaf",  title: "الشركات والوكلاء المحليون",     desc: "تعظيم عائد محفظة الأصناف — أدوات مبيعات مبنية على بيانات حقيقية، تدعم فرق المبيعات بحجج فنية قوية." },
      { icon: "FaFlask", title: "مراكز البحث والتطوير",           desc: "اختيار أعداد كبيرة من الأصناف، وخفض تكاليف دورة التطوير — نتائج سريعة وموثوقة علمياً." },
    ],
  },
  partners: {
    eyebrow: "شركاؤنا الاستراتيجيون",
    heading: "مدعومون بأيادٍ موثوقة في الميدان",
    lead: "الجهات التي نعمل معها — بيوت الجينات العالمية، والهيئات البحثية، وشركاء التوزيع.",
    items: [
      { name: "شريك أ", link: "" },
      { name: "شريك ب", link: "" },
      { name: "شريك ج", link: "" },
      { name: "شريك د", link: "" },
      { name: "شريك هـ", link: "" },
    ],
  },
  clients: {
    eyebrow: "عملاؤنا",
    heading: "موثوقون من قبل شركات البذور في مصر",
    lead: "شركات بذور خضروات محلية وعالمية تعتمد على بيانات تجاربنا الحقلية لاتخاذ قرار إطلاقها القادم.",
    items: [
      { name: "عميل 1",  link: "" },
      { name: "عميل 2",  link: "" },
      { name: "عميل 3",  link: "" },
      { name: "عميل 4",  link: "" },
      { name: "عميل 5",  link: "" },
      { name: "عميل 6",  link: "" },
      { name: "عميل 7",  link: "" },
      { name: "عميل 8",  link: "" },
      { name: "عميل 9",  link: "" },
      { name: "عميل 10", link: "" },
    ],
  },
  market: {
    eyebrow: "فرصة السوق في مصر",
    heading: "فرصة سنوية تفوق 50 مليون دولار، لا تزال مستوردة إلى حد كبير",
    lead: "التوسع في الأراضي الزراعية بأكثر من 70 ألف فدان وارتفاع الطلب على الأصناف عالية الأداء يكشفان عن فجوة كبيرة في البيانات الحقلية الموثوقة — فرصة قوية لشركات تستثمر في تجارب احترافية لتحقيق دخول أسرع للسوق، وتقليل المخاطر، وتعزيز الميزة التنافسية.",
    note: "تعكس الأرقام حجم السوق السنوي بالدولار حسب المحصول وقطاع الزراعة في جميع أنحاء مصر، كما وردت في أبحاث وان تو وان لفرص السوق.",
    show_more: "عرض المزيد",
    back_to_home: "العودة إلى الرئيسية",
    items: [
      {
        title: "سوق الخيار",
        rows: [
          { label: "الحقل المفتوح (جميع المواسم)",   value: "+18 مليون" },
          { label: "الصوبات الزراعية (جميع المواسم)", value: "150 ألف–5.3 مليون" },
        ],
      },
      {
        title: "سوق الطماطم",
        rows: [
          { label: "غير محدد النمو (جميع المواسم)", value: "+1.9 مليون" },
          { label: "الخريف (حقل مفتوح)",              value: "+14 مليون" },
          { label: "الصيف (حقل مفتوح)",                value: "+10 مليون" },
        ],
      },
      {
        title: "سوق الفلفل الحار",
        rows: [
          { label: "إجمالي السوق",                        value: "4 مليون" },
          { label: "بولهورن (محمي خريفي)",                value: "+3.5 مليون" },
          { label: "تشارلستون (حقل مفتوح)",               value: "+1.25 مليون" },
          { label: "بنسل متوسط (صوبة شتوية / حقل مفتوح)", value: "1 مليون / 0.5 مليون" },
        ],
      },
      {
        title: "سوق الفلفل الحلو",
        rows: [
          { label: "بلوكي أصفر / أحمر", value: "1.6–2.8 مليون" },
          { label: "ياباني / دولمة",     value: "+1.4 مليون" },
          { label: "تشارلستون (خارجي)",  value: "+350 ألف" },
        ],
      },
    ],
  },
  team: {
    eyebrow: "فريقنا",
    heading: "خبرة ميدانية تلتقي برؤية تجارية",
    body: [
      "يجمع فريق وان تو وان بين خبرات متنوعة تشمل المعرفة الزراعية، والتجارب الحقلية، وتقييم الأصناف والهجن، والتسويق الزراعي، والحوكمة الإدارية.",
      "نجمع بين الفهم العملي للسوق الزراعي واحتياجات شركات البذور — من متابعة أداء الأصناف في الحقل، إلى تحليل النتائج، وصياغة الرسائل التسويقية، ومساعدة الشركات على بناء أنظمة تشغيل أكثر تنظيماً. تكمن قوتنا في الجمع بين الخبرة الفنية والرؤية التجارية والإدارة المنظمة.",
    ],
    img_alt: "فريق وان تو وان أثناء جولة ميدانية في موقع تجربة زراعية",
  },
  contact: {
    eyebrow: "تواصل معنا",
    heading_line1: "جاهزون لتجربة",
    heading_line2: "بثقة؟",
    subheading: "سواء كنت شركة بذور، أو موزعاً، أو مركز أبحاث وتطوير — لنحوّل معاً إطلاقك القادم إلى قرار مبني على بيانات.",
    form: {
      title: "أرسل رسالة",
      subtitle: "نرد عادةً خلال 24 ساعة",
      name_label: "الاسم الكامل",
      name_placeholder: "محمد أحمد",
      email_label: "البريد الإلكتروني",
      email_placeholder: "example@domain.com",
      phone_label: "رقم الهاتف",
      phone_placeholder: "+20 1XX XXX XXXX",
      subject_label: "الموضوع",
      subject_placeholder: "اختر موضوعاً",
      subject_options: [
        { value: "general",      label: "استفسار عام" },
        { value: "trial",        label: "طلب تجربة" },
        { value: "partnership",  label: "شراكة" },
        { value: "support",      label: "دعم فني" },
      ],
      message_label: "رسالتك",
      message_placeholder: "أخبرنا عن مشروعك أو احتياجاتك أو أسئلتك...",
      submit: "إرسال الرسالة",
      error: "يرجى ملء جميع الحقول المطلوبة.",
    },
    success: {
      heading: "تم الإرسال!",
      body:    "شكراً لتواصلك معنا. سيراجع فريقنا رسالتك ويرد عليك خلال 24 ساعة.",
      again:   "إرسال رسالة أخرى",
    },
    info: [
      { key: "email",    label: "البريد الإلكتروني",  value: "info@oneto-one.com",     link: "mailto:info@oneto-one.com" },
      { key: "phone",    label: "الهاتف",              value: "+02 012 876 369 86",     link: "tel:+0201287636986" },
      { key: "whatsapp", label: "واتساب",              value: "+20 128 763 6986",       link: "https://wa.me/201287636986" },
      { key: "website",  label: "الموقع الإلكتروني",  value: "www.oneto-one.com",      link: "https://www.oneto-one.com" },
    ],
  },
  footer: {
    tagline: "المنصة المصرية الأولى المستقلة لإدارة التجارب الحقلية لشركات بذور الخضروات — نحوّل التجارب إلى قرارات إطلاق واثقة ومبنية على البيانات.",
    quick_links_title: "روابط سريعة",
    services_title:    "خدماتنا",
    contact_title:     "تواصل معنا",
    copyright: "وان تو وان أجري بلاتفورم. جميع الحقوق محفوظة.",
    links: [
      { label: "الرئيسية",    href: "/" },
      { label: "من نحن",      href: "#about" },
      { label: "خدماتنا",    href: "#services" },
      { label: "التقنية",    href: "#technology" },
      { label: "تواصل معنا", href: "#contact" },
    ],
    services: ["إدارة التجارب الحقلية","الفرز والتقييم المبكر","التقارير ودعم القرار","الاستشارات الفنية والتجارية","التدريب وبناء القدرات"],
    contact_items: [
      { key: "email",    label: "البريد الإلكتروني", value: "info@oneto-one.com" },
      { key: "phone",    label: "الهاتف",             value: "+20 128 763 6986" },
      { key: "location", label: "الموقع",             value: "جميع أنحاء مصر" },
    ],
  },
};

const SECTION_KEYS = ["nav","hero","about","whyUs","mission","philosophy","problem","services","technology","serve","partners","clients","market","team","contact","footer"];

const DEFAULT_SETTINGS = {
  brandName:         "One to One",
  primaryColor:      "#037338",
  accentColor:       "#96C422",
  email:             "info@oneto-one.com",
  phone:             "+20 128 763 6986",
  whatsapp:          "+20 128 763 6986",
  website:           "www.oneto-one.com",
  location:          "All Egypt",
  socialLinks:       { facebook: "", linkedin: "", instagram: "", whatsapp: "https://wa.me/201287636986" },
  logoUrl:           "",
  logoWhiteUrl:      "",
  logoPublicId:      "",
  logoWhitePublicId: "",
};

const seed = async () => {
  try {
    console.log("[seed] Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[seed] MongoDB connected");

    console.log(`[seed] Seeding ${SECTION_KEYS.length} content sections...`);
    for (const key of SECTION_KEYS) {
      await Content.findOneAndUpdate(
        { section: key },
        { $set: { section: key, en: EN[key], ar: AR[key], images: [] } },
        { upsert: true, new: true }
      );
      console.log(`[seed]   ✓ ${key}`);
    }

    console.log("[seed] Seeding settings...");
    await Settings.findOneAndUpdate(
      {},
      { $set: DEFAULT_SETTINGS },
      { upsert: true, new: true }
    );
    console.log("[seed]   ✓ Settings upserted");

    console.log("[seed] Seeding admin account...");
    const adminEmail    = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn("[seed]   ! ADMIN_EMAIL or ADMIN_PASSWORD not set in .env — skipping");
    } else {
      const existing = await Admin.findOne({ email: adminEmail.toLowerCase() });
      if (existing) {
        console.log("[seed]   ℹ Admin already exists — skipping (password unchanged)");
      } else {
        await Admin.create({ email: adminEmail, password: adminPassword });
        console.log(`[seed]   ✓ Admin created: ${adminEmail}`);
      }
    }

    console.log(`[seed] Done. ${SECTION_KEYS.length + 2} documents ready in MongoDB.`);
  } catch (err) {
    console.error("[seed] Error:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("[seed] Disconnecting...");
    process.exit(0);
  }
};

seed();
