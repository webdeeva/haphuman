import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return <div className="hap-surface"><Navbar /><main className="hap-wrap interior-heading"><p className="hap-eyebrow">404 / Page not found</p><h1>A missing page.<br /><em>A way forward.</em></h1><p>This address does not point to a page in the protocol. Return home or start a new creative record.</p><div className="hap-actions"><Link className="hap-button" href="/">Back to HAP ↗</Link><Link className="hap-text-link" href="/studio">Open the Studio ↗</Link></div></main><Footer /></div>;
}
