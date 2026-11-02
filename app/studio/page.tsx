import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Studio — Human Authorship Protocol",
  description: "Document your writing, knowledge, and music in a portable record of creative contribution.",
};

export default function StudioPage() {
  return <div className="hap-surface">
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar />
    <main id="main" className="hap-wrap">
      <header className="interior-heading">
        <p className="hap-eyebrow">HAP Studio / Your creative record</p>
        <h1>Give your process<br /><em>a place to live.</em></h1>
        <p>Keep the ideas, source material, and decisions behind your work together. Start with a practice. Build a record in your own words.</p>
      </header>
      <section className="studio-paths" aria-label="Choose your creative practice">
        <article><p className="hap-eyebrow">01 / Written works</p><div className="studio-specimen" aria-hidden="true">Every word has<br /><em>a history.</em></div><h2>Writing & knowledge</h2><p>Essays, books, scripts, poetry, and articles. Document original passages, domain expertise, source material, and the work of co-writing with AI.</p><Link className="hap-button" href="/studio/create?domain=written_content">Start a writing record <span aria-hidden="true">↗</span></Link><span className="studio-path-note">4 stages · Original sources welcome</span></article>
        <article><p className="hap-eyebrow">02 / Music & sound</p><div className="studio-specimen studio-wave" aria-hidden="true">∿∿∿∿∿</div><h2>Sound & composition</h2><p>Document your musical direction, voice permissions, lyrics, revisions, and final selection. Keep the decisions behind the track.</p><Link className="hap-button" href="/studio/create">Start a music record <span aria-hidden="true">↗</span></Link><span className="studio-path-note">5 stages · From direction to selection</span></article>
      </section>
      <section className="studio-notes hap-section"><div><p className="hap-eyebrow">Before you begin</p><h2>A record you can<br />read, keep, and share.</h2></div><dl className="evidence-list"><div><dt>Start with what you have</dt><dd>Use notes, excerpts, or references to your own material. You do not need to upload a finished work.</dd></div><div><dt>Review before publishing</dt><dd>Generate and copy your JSON record first. IPFS publication and blockchain anchoring are optional and require configured services.</dd></div><div><dt>Read the score in context</dt><dd>The legacy HCS describes supplied information. Your expertise and source contributions have their own profile.</dd></div></dl></section>
      <div className="interior-bottom-links"><Link href="/whitepaper" className="hap-text-link">Read the protocol ↗</Link><Link href="/api/v1/schemas" className="hap-text-link">Explore the record schema ↗</Link></div>
    </main><Footer />
  </div>;
}
