import React, { useMemo, useState } from "react";

const IMAGE_BASE = "/images/primitive-werkz";

const services = [
  { name: "Window Tint", price: 220, icon: "▰", desc: "Clean tint installs for daily drivers, SUVs, luxury cars, and commercial windows.", bullets: ["Factory-style match", "Privacy + heat control", "Fast appointment flow"] },
  { name: "Vinyl Wraps", price: 2800, icon: "✦", desc: "Full wraps, accents, roof wraps, and custom styling with a bold finish.", bullets: ["Full color change", "Roof wrap options", "Custom accents"] },
  { name: "Paint Protection Film", price: 850, icon: "◈", desc: "Clear protection film for high-impact panels and cleaner long-term paint protection.", bullets: ["Front-end protection", "Clear finish", "Scratch resistance"] },
  { name: "Chrome Delete", price: 350, icon: "ϟ", desc: "Blackout trim packages that give the vehicle a cleaner and more aggressive look.", bullets: ["Trim blackout", "Badge removal", "Sharper exterior look"] },
  { name: "Ceramic Coating", price: 650, icon: "◌", desc: "Gloss protection that helps the vehicle stay cleaner and easier to maintain.", bullets: ["Gloss finish", "Easier wash routine", "Protection-focused prep"] },
];

const vehicleDB = {
  Acura: ["Integra", "TLX", "MDX", "RDX", "NSX", "Other Acura"],
  Audi: ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "Q8", "RS5", "RS7", "R8", "Other Audi"],
  BMW: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X3", "X5", "X6", "M3", "M4", "M5", "Other BMW"],
  Chevrolet: ["Camaro", "Corvette", "Malibu", "Tahoe", "Suburban", "Silverado", "Other Chevrolet"],
  Dodge: ["Charger", "Challenger", "Durango", "Hornet", "Other Dodge"],
  Ford: ["Mustang", "Bronco", "Explorer", "F-150", "Maverick", "Escape", "Other Ford"],
  Genesis: ["G70", "G80", "G90", "GV70", "GV80", "Other Genesis"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Pilot", "Odyssey", "Other Honda"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Ioniq 5", "Other Hyundai"],
  Infiniti: ["Q50", "Q60", "QX50", "QX60", "QX80", "Other Infiniti"],
  Jeep: ["Wrangler", "Grand Cherokee", "Compass", "Gladiator", "Other Jeep"],
  Kia: ["K5", "Stinger", "Sportage", "Sorento", "Telluride", "EV6", "Other Kia"],
  Lexus: ["IS", "ES", "GS", "LS", "NX", "RX", "GX", "LC", "Other Lexus"],
  Mazda: ["Mazda3", "Mazda6", "CX-30", "CX-5", "CX-50", "MX-5 Miata", "Other Mazda"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "GLC", "GLE", "G-Wagon", "AMG GT", "Other Mercedes-Benz"],
  Nissan: ["Altima", "Maxima", "Sentra", "Rogue", "Pathfinder", "GT-R", "Z", "Other Nissan"],
  Porsche: ["911", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan", "Other Porsche"],
  Subaru: ["WRX", "BRZ", "Impreza", "Crosstrek", "Forester", "Outback", "Other Subaru"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck", "Other Tesla"],
  Toyota: ["Camry", "Corolla", "Supra", "GR86", "RAV4", "Highlander", "Tacoma", "4Runner", "Other Toyota"],
  Volkswagen: ["Jetta", "Golf GTI", "Golf R", "Passat", "Tiguan", "Atlas", "Other Volkswagen"],
  Other: ["Not listed / custom entry"],
};

const reviews = [
  { name: "Yovanny Castellanos", service: "Tints + chrome delete", quote: "Everything came out lovely. Super friendly, experienced, and flexible with the car work." },
  { name: "AJ", service: "Jeep window tint", quote: "Finished and out the door fast. The work matched my factory tints perfectly." },
  { name: "Timothy Bautista", service: "PPF + tint", quote: "PPF and tint were well done and finished in a timely manner. Will definitely do business again." },
  { name: "Erik", service: "PPF + ceramic coating", quote: "Excellent job, couldn't be happier with the quality." },
];

const processCards = [
  { title: "Tint Install", label: "FAST + CLEAN", desc: "Window tint installed with a clean factory-style look and a sharp finish.", image: `${IMAGE_BASE}/process-tint.jpg` },
  { title: "Wrap Work", label: "CUSTOM STYLE", desc: "Vinyl wrap prep and install for color changes, accents, and blackout packages.", image: `${IMAGE_BASE}/process-wrap.jpg` },
  { title: "PPF Protection", label: "CLEAR FILM", desc: "Paint protection film applied to help shield high-impact areas from road wear.", image: `${IMAGE_BASE}/process-ppf.jpg` },
];

const portfolioPreviewImages = [
  { src: `${IMAGE_BASE}/portfolio-01.jpg`, size: "large" },
  { src: `${IMAGE_BASE}/portfolio-02.jpg`, size: "small" },
  { src: `${IMAGE_BASE}/portfolio-03.jpg`, size: "small" },
  { src: `${IMAGE_BASE}/portfolio-04.jpg`, size: "wide" },
  { src: `${IMAGE_BASE}/portfolio-05.jpg`, size: "small" },
  { src: `${IMAGE_BASE}/portfolio-06.jpg`, size: "small" },
];

const galleryImages = Array.from({ length: 18 }, (_, index) => `${IMAGE_BASE}/gallery-${String(index + 1).padStart(2, "0")}.jpg`);

export default function App() {
  const [page, setPage] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [make, setMake] = useState("BMW");
  const [model, setModel] = useState("M4");
  const [year, setYear] = useState("2024");
  const [service, setService] = useState("Window Tint");
  const [finish, setFinish] = useState("Gloss");
  const [coverage, setCoverage] = useState("Windows Only");

  const years = useMemo(() => Array.from({ length: 37 }, (_, i) => String(2026 - i)), []);
  const makes = Object.keys(vehicleDB);
  const models = vehicleDB[make] || vehicleDB.Other;

  const estimate = useMemo(() => {
    const active = services.find((item) => item.name === service) || services[0];
    let base = active.price;
    if (["Porsche", "BMW", "Mercedes-Benz", "Audi", "Tesla", "Lexus", "Genesis"].includes(make)) base += 100;
    if (coverage === "Full Front") base += 700;
    if (coverage === "Full Vehicle") base += 2500;
    if (coverage === "Chrome Delete") base += 300;
    if (finish === "Satin" || finish === "Matte") base += 200;
    return base.toLocaleString();
  }, [make, service, coverage, finish]);

  function handleMakeChange(nextMake) {
    setMake(nextMake);
    setModel((vehicleDB[nextMake] || vehicleDB.Other)[0]);
  }

  function goToGallery() {
    setPage("gallery");
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome(anchor) {
    setPage("home");
    setNavOpen(false);
    setTimeout(() => {
      if (anchor) document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  if (page === "gallery") {
    return <GalleryPage navOpen={navOpen} setNavOpen={setNavOpen} goHome={goHome} />;
  }

  return (
    <main className="site">
      <Header navOpen={navOpen} setNavOpen={setNavOpen} goHome={goHome} goToGallery={goToGallery} />
      <section className="hero" id="home">
        <div className="glow one" />
        <div className="glow two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span /> East Elmhurst, Queens • Wraps • Tints • PPF</div>
            <h1>Wraps, tints, and film work with a clean custom finish.</h1>
            <p>Vinyl and Film Solutions handles window tinting, vinyl wraps, PPF, chrome delete, ceramic coating, and car customization for drivers who want their vehicle done right.</p>
            <div className="actions">
              <a className="btn primary" href="#quote">Get a Quote →</a>
              <button className="btn outline" onClick={goToGallery}>View Full Gallery</button>
            </div>
            <div className="metrics">
              <Metric value="4.9" label="Rating" />
              <Metric value="17" label="Reviews" />
              <Metric value="2013" label="Established" />
            </div>
          </div>
          <HeroImage />
        </div>
      </section>

      <section className="section" id="services">
        <SectionHead kicker="Services" title="Everything your car needs to stand out." copy="Choose the service your vehicle needs and get a clean install built around speed, quality, fair pricing, and attention to detail." />
        <div className="container service-grid">
          {services.map((item) => (
            <button key={item.name} className={`service-card ${service === item.name ? "active" : ""}`} onClick={() => setService(item.name)}>
              <span className="icon">{item.icon}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <ul>{item.bullets.map((b) => <li key={b}>✓ {b}</li>)}</ul>
            </button>
          ))}
        </div>
      </section>

      <section className="section process" id="process">
        <SectionHead kicker="Visual Process" title="Fast, clean, and done right." copy="Customers come in for tints, wraps, debadging, PPF, coating, and custom work — the goal is always a sharp finish and a job well done." />
        <div className="container process-grid">
          {processCards.map((card) => <ProcessCard key={card.title} card={card} />)}
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="container quote-grid">
          <div>
            <p className="kicker dark">Quote Tool</p>
            <h2>Tell us what your car needs.</h2>
            <p className="dark-copy">Start your quote by selecting your vehicle, service, finish, and coverage. VFS can follow up with the right package for your car.</p>
            <div className="quote-note">
              <div><b>Quick appointment requests</b><span>Send the vehicle details, preferred service, and contact info in one place.</span></div>
              <div><b>Call for fast answers</b><span>Call the shop directly for tint questions, wrap ideas, or quote help.</span></div>
            </div>
          </div>
          <div className="quote-card">
            <div className="quote-card-inner">
              <div className="quote-top"><div><span>Quote Builder</span><h3>Choose your setup</h3></div><b>Step 1/3</b></div>
              <div className="form-grid">
                <Field label="Year" value={year} onChange={setYear} options={years} />
                <Field label="Make" value={make} onChange={handleMakeChange} options={makes} />
                <Field label="Model" value={model} onChange={setModel} options={models} />
                <Field label="Service" value={service} onChange={setService} options={services.map((s) => s.name)} />
                <Field label="Finish" value={finish} onChange={setFinish} options={["Gloss", "Satin", "Matte", "Carbon Fiber", "Color Match", "Not Sure"]} />
                <Field label="Coverage" value={coverage} onChange={setCoverage} options={["Windows Only", "Front Package", "Full Front", "Full Vehicle", "Roof Only", "Chrome Delete"]} />
              </div>
              <div className="estimate">
                <span>Estimate Preview</span>
                <h3>Starting around ${estimate}</h3>
                <p>Final pricing depends on vehicle condition, film material, coverage, prep work, and appointment inspection.</p>
                <div className="contact-fields"><input placeholder="Your name" /><input placeholder="Phone number" /></div>
                <button>Request Quote →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="container section-top">
          <div><p className="kicker">Portfolio</p><h2>Recent work from the shop.</h2><p className="section-copy">Browse recent vehicles, tint jobs, wrap work, PPF installs, chrome delete projects, and finished details.</p></div>
          <button className="btn primary" onClick={goToGallery}>See More Work →</button>
        </div>
        <div className="container portfolio-grid">
          {portfolioPreviewImages.map((image, i) => <PortfolioCard key={image.src} image={image} index={i} />)}
        </div>
      </section>

      <section className="section reviews" id="reviews">
        <SectionHead kicker="Reviews" title="Customers keep coming back." />
        <div className="container reviews-grid">{reviews.map((r) => <Review key={r.name} review={r} />)}</div>
      </section>

      <section className="section contact" id="contact">
        <div className="container contact-grid">
          <div className="contact-main">
            <p className="kicker dark">Visit the shop</p>
            <h2>Vinyl and Film Solutions</h2>
            <div className="info-list">
              <Info title="Address" text="73-13 Ditmars Blvd, East Elmhurst, NY 11370" />
              <Info title="Phone" text="(347) 556-8608" />
              <Info title="Hours" text="Open today • Closes 5 PM" />
            </div>
            <div className="actions"><a className="btn black" href="tel:+13475568608">Call Now</a><a className="btn light-outline" href="https://maps.google.com/?q=73-13+Ditmars+Blvd,+East+Elmhurst,+NY+11370">Get Directions</a></div>
          </div>
          <div className="why-card">
            <p className="kicker">Why drivers choose VFS</p>
            {[
              "Friendly service and clear communication from quote to finish.",
              "Window tint, chrome delete, PPF, wrap, and coating options in one shop.",
              "Fast turnaround on tint jobs and clean custom work.",
              "Trusted by customers for fair pricing, quality work, and a job well done.",
            ].map((text) => <div className="why" key={text}>✓ {text}</div>)}
          </div>
        </div>
      </section>

      <footer><div className="container footer-row"><Logo /><p>Vinyl and Film Solutions • Wraps • Tints • PPF • Ceramic Coating</p></div></footer>
    </main>
  );
}

function Header({ navOpen, setNavOpen, goHome, goToGallery }) {
  const items = [
    ["Services", () => goHome("#services")],
    ["Quote Tool", () => goHome("#quote")],
    ["Process", () => goHome("#process")],
    ["Portfolio", () => goHome("#portfolio")],
    ["Gallery", goToGallery],
    ["Reviews", () => goHome("#reviews")],
    ["Contact", () => goHome("#contact")],
  ];
  return (
    <header className="header">
      <div className="container nav">
        <button className="logo-button" onClick={() => goHome()}><Logo /></button>
        <nav className="desktop-nav">{items.map(([label, action]) => <button key={label} onClick={action}>{label}</button>)}</nav>
        <a className="call" href="tel:+13475568608">Call Now</a>
        <button className="hamburger" onClick={() => setNavOpen(!navOpen)}>{navOpen ? "×" : "☰"}</button>
      </div>
      {navOpen && <div className="mobile-nav container">{items.map(([label, action]) => <button key={label} onClick={action}>{label}</button>)}</div>}
    </header>
  );
}

function Logo() { return <div className="logo"><strong><span>V</span><i>F</i><span>S</span></strong><em>VINYL & FILM</em></div>; }
function Metric({ value, label }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div>; }
function HeroImage() { return <div className="hero-image"><SmartImage src={`${IMAGE_BASE}/hero-car.jpg`} fallback="Project photo coming soon" /><div className="image-overlay" /><div className="hero-image-tags"><b>VFS</b><span>WRAPS • TINTS • PPF</span></div><div className="hero-info"><span>Custom Film Work</span><span>East Elmhurst, Queens</span><span>Request a quote</span></div></div>; }
function SectionHead({ kicker, title, copy }) { return <div className="container section-top"><div><p className="kicker">{kicker}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div></div>; }
function ProcessCard({ card }) { return <article className="process-card"><div className="card-image"><SmartImage src={card.image} fallback="Project photo coming soon" /><div className="image-overlay" /></div><div className="card-body"><span>{card.label}</span><h3>{card.title}</h3><p>{card.desc}</p></div></article>; }
function PortfolioCard({ image, index }) { return <article className={`portfolio-card ${image.size}`}><SmartImage src={image.src} fallback="Project photo coming soon" /><div className="image-overlay" /><div className="portfolio-label"><div><small>Project</small><strong>#{String(index + 1).padStart(2, "0")}</strong></div><span>VIEW</span></div></article>; }
function Review({ review }) { return <article className="review"><div>★★★★★</div><blockquote>“{review.quote}”</blockquote><footer><b>{review.name}</b><span>{review.service}</span></footer></article>; }
function Info({ title, text }) { return <div className="info"><b>{title}</b><span>{text}</span></div>; }
function Field({ label, value, options, onChange }) { return <label className="field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }

function SmartImage({ src, fallback }) {
  const [error, setError] = useState(false);
  if (error) return <div className="fallback"><span>▰</span><b>{fallback}</b></div>;
  return <img src={src} alt="Vehicle project" onError={() => setError(true)} loading="lazy" />;
}

function GalleryPage({ navOpen, setNavOpen, goHome }) {
  return <main className="site"><Header navOpen={navOpen} setNavOpen={setNavOpen} goHome={goHome} goToGallery={() => {}} /><section className="gallery-hero"><div className="container"><button className="btn outline" onClick={() => goHome("#portfolio")}>← Back to Home</button><p className="kicker">Full Gallery</p><h1>Explore more VFS project photos.</h1><p>More completed work from Vinyl and Film Solutions, including tints, wraps, PPF, coatings, chrome delete, and custom styling.</p></div></section><section className="gallery-section"><div className="container gallery-grid">{galleryImages.map((src, i) => <article className="gallery-item" key={src}><SmartImage src={src} fallback="Project photo coming soon" /><div className="image-overlay" /><div className="gallery-label"><small>Gallery Photo</small><strong>#{String(i + 1).padStart(2, "0")}</strong></div></article>)}</div></section></main>;
}
