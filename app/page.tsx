import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinSection from "@/components/JoinSection";
import SpiralField from "@/components/SpiralField";

const steps = [
  ["01", "Set the intention", "Record the brief, structure, constraints, and ideas you brought to the work."],
  ["02", "Keep the process", "Preserve original writing, instructions, revisions, and the reasons you kept or rejected a version."],
  ["03", "Make a record", "Export a structured account of your contribution. Optional storage and anchoring can help others check its integrity."],
];

export default function HomePage() {
  return (
    <div className="hap-home">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <section className="hap-hero hap-wrap">
          <div className="hero-index"><span className="status-dot" /> HUMAN AUTHORSHIP PROTOCOL <span>EST. 2026 / v2.1</span></div>
          <SpiralField />
          <div className="hero-copy">
            <p className="hap-eyebrow">The work is more than the output.</p>
            <h1>Leave a trace<br />of the <em>human.</em></h1>
            <p className="hero-description">The sentence you rewrote. The sound you shaped. The version you refused. HAP records the creative decisions behind AI-assisted work.</p>
            <div className="hap-actions"><Link className="hap-button" href="/studio/create">Document your work <span aria-hidden="true">↗</span></Link><Link className="hap-text-link" href="/whitepaper">Read the protocol <span aria-hidden="true">↗</span></Link></div>
          </div>
          <div className="hero-foot"><span>WRITTEN WORKS / MUSIC / VISUAL ART</span><span>A record of process. A place for people.</span><a href="#protocol" aria-label="Explore the protocol">↓</a></div>
        </section>

        <section id="protocol" className="hap-wrap hap-section protocol-intro">
          <p className="hap-eyebrow">01 / The premise</p>
          <div><h2>Tools change.<br />Your decisions still matter.</h2><p>A finished work rarely tells the whole story. HAP is an open framework for documenting what you contributed, where AI entered the process, and how the work took shape.</p><p>It turns a scattered creative history into a readable, portable record. The starting point is your account of the process; verification requires supporting evidence.</p></div>
        </section>

        <section id="works" className="hap-wrap hap-section">
          <div className="section-heading"><p className="hap-eyebrow">02 / Creative practice</p><h2>For the page.<br />And everything beyond it.</h2></div>
          <div className="works-layout">
            <article className="written-feature">
              <div className="work-meta"><span>PROFILE 01</span><span>AVAILABLE IN STUDIO</span></div>
              <div className="manuscript" aria-label="Illustrative manuscript revision"><span>draft_03 / editorial note</span><p>The city was <del>quiet.</del><br /><ins>holding its breath.</ins></p><small>Revision: replace description with tension.</small></div>
              <h3>Written works</h3><p>Essays, fiction, poetry, scripts, and articles. Record your original knowledge, source writings, data, lectures, and editorial decisions alongside the draft history. Your contribution can begin long before you co-write with AI.</p><Link className="hap-text-link" href="/studio/create?domain=written_content">Start a writing record <span aria-hidden="true">↗</span></Link>
            </article>
            <div className="other-works">
              <article><div className="work-meta"><span>PROFILE 02</span><span>STUDIO</span></div><div className="wave-mark" aria-hidden="true">∿∿∿∿∿</div><h3>Music & sound</h3><p>From lyrics and composition to licensed voices, arrangement, and the final selection.</p><Link className="hap-text-link" href="/studio/create">Start a music record ↗</Link></article>
              <article><div className="work-meta"><span>PROFILE 03</span><span>API PROFILE</span></div><h3>Visual art</h3><p>Document direction, source inputs, and iterations through the API. A dedicated Studio workflow is still to come.</p><Link className="hap-text-link" href="/api/v1/schemas">Explore the schema ↗</Link></article>
            </div>
          </div>
        </section>

        <section id="knowledge" className="hap-wrap hap-section evidence-section">
          <div><p className="hap-eyebrow">Beyond the prompt</p><h2>Your knowledge<br />is part of the work.</h2><p>You may bring years of research, a body of original writing, a lecture series, or a knowledge base you built. When you co-write with AI, that foundation belongs in the record.</p><Link className="hap-text-link" href="/studio/create?domain=written_content">Document a knowledge-led collaboration ↗</Link></div>
          <dl className="evidence-list"><div><dt>The foundation you created</dt><dd>Identify original material, your relationship to each source, and what it contributed to the work.</dd></div><div><dt>The system you prepared</dt><dd>Record the instructions, curriculum, retrieval setup, or model training you used to make your knowledge available to the AI.</dd></div><div><dt>The work you made together</dt><dd>Describe your ideas, interpretation, co-writing, and judgment alongside the AI’s drafting or revision role. A word count cannot tell that whole story.</dd></div></dl>
        </section>

        <section id="framework" className="hap-wrap hap-section">
          <div className="section-heading"><p className="hap-eyebrow">03 / The method</p><h2>Make the process visible.</h2></div>
          <div className="process-list">{steps.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section id="score" className="hap-wrap hap-section evidence-section">
          <div><p className="hap-eyebrow">04 / Evidence, with context</p><h2>A useful record.<br />An honest measure.</h2><p>The Human Contribution Score summarizes the information supplied to the record. It is a prototype heuristic, not a measured percentage of human authorship. Original expertise and source contributions appear in a separate contribution profile.</p><Link className="hap-text-link" href="/whitepaper#implementation-status">Read the implementation notes ↗</Link></div>
          <dl className="evidence-list"><div><dt>Declaration</dt><dd>The creator describes their inputs and decisions. This is self-reported.</dd></div><div><dt>Integrity</dt><dd>A fingerprint can reveal changes to a record. An anchor can link it to a blockchain transaction.</dd></div><div><dt>Verification</dt><dd>Identity, source evidence, and independent review are separate requirements. A score or timestamp alone cannot establish authorship.</dd></div></dl>
        </section>

        <section id="vision" className="hap-wrap hap-section closing-section"><p className="hap-eyebrow">An open framework / An ongoing conversation</p><h2>Let the work carry<br /><em>its human story.</em></h2><div className="hap-actions"><Link className="hap-button" href="/studio">Open the Studio ↗</Link><Link className="hap-text-link" href="/whitepaper">Explore the whitepaper ↗</Link></div></section>
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
}
