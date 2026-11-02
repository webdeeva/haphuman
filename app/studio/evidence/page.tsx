import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EvidenceReview from '@/components/studio/EvidenceReview';
export const metadata = { title: 'Evidence review — HAP Studio' };
export default function EvidencePage() {
  return <div className="hap-surface"><Navbar /><main id="main" className="hap-wrap"><header className="interior-heading"><p className="hap-eyebrow">HAP Studio / Capture preview</p><h1>A history you<br /><em>can inspect.</em></h1><p>Open a HAP Capture or assistant evidence package. Review stays in this browser tab; the file is not uploaded or saved by this page.</p></header><EvidenceReview /></main><Footer /></div>;
}
