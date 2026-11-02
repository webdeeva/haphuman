import Link from "next/link";
export default function Footer() {
  return <footer className="hap-footer hap-wrap"><div><Link className="hap-brand" href="/">↗ HAP</Link><p>Human Authorship Protocol</p></div><div className="footer-links"><Link href="/whitepaper">Whitepaper</Link><Link href="/api/v1/schemas">Schema</Link><Link href="/studio">Studio</Link></div><p>Founded by Aquarius Maximus<br />© 2026 HAP · An open framework</p></footer>;
}
