"use client";
import { useState } from "react";

export default function JoinSection() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !role) { setErrorMsg("Please fill in all fields."); setStatus("error"); return; }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setEmail("");
        setRole("");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return <section id="join" className="hap-wrap hap-section evidence-section">
    <div><p className="hap-eyebrow">Stay involved</p><h2>Help shape<br />what comes next.</h2><p>Join the protocol waitlist for updates as HAP develops.</p></div>
    <div>{status === "success" ? <div role="status"><h3>You’re on the waitlist.</h3><p>We’ll be in touch as the protocol develops.</p></div> : <form onSubmit={handleSubmit} className="hap-waitlist">
      <label>Email address<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label>
      <label>Your role<select required value={role} onChange={e => setRole(e.target.value)}><option value="" disabled>Choose a role</option><option value="creator">Writer / Creator / Artist</option><option value="developer">Developer / Builder</option><option value="platform">Platform / Company</option><option value="researcher">Researcher / Academic</option><option value="investor">Investor</option></select></label>
      {status === "error" && <p role="alert">{errorMsg}</p>}
      <button className="hap-button" type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Join Protocol Waitlist ↗"}</button>
    </form>}</div>
  </section>;
}
