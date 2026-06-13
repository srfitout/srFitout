import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getContactSubmissions, verifyAdmin } from "@/lib/api/contact.functions";
import { LogOut, RefreshCw, Mail, Phone, Calendar, User, Search, Briefcase, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Helper to fetch submissions
  const loadSubmissions = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = (await getContactSubmissions({
        data: { email, password: pass },
      })) as { success: boolean; data: any[] };
      if (res.success && res.data) {
        setSubmissions(res.data);
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      console.error("Dashboard data load error:", err);
      const msg = err?.message || "";
      const isAuthErr = 
        msg.toLowerCase().includes("unauthorized") || 
        msg.toLowerCase().includes("invalid") || 
        msg.toLowerCase().includes("credential") || 
        msg.toLowerCase().includes("password");

      if (isAuthErr) {
        setError("Invalid email or password.");
        sessionStorage.removeItem("admin_email");
        sessionStorage.removeItem("admin_pass");
        setIsAuthenticated(false);
      } else {
        // Keep them logged in so they see the specific database connectivity issue
        setError(msg || "Could not fetch inquiries. Database connection failed.");
        setIsAuthenticated(true);
      }
    } finally {
      setLoading(false);
      setAuthChecking(false);
    }
  };

  // Check sessionStorage on mount
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("admin_email");
    const savedPass = sessionStorage.getItem("admin_pass");
    if (savedEmail && savedPass) {
      loadSubmissions(savedEmail, savedPass);
    } else {
      setAuthChecking(false);
    }
  }, []);

  // Form submission logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const authRes = (await verifyAdmin({
        data: { email: emailInput, password: passwordInput },
      })) as { success: boolean };
      if (authRes.success) {
        sessionStorage.setItem("admin_email", emailInput);
        sessionStorage.setItem("admin_pass", passwordInput);
        await loadSubmissions(emailInput, passwordInput);
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      let errorMsg = err?.message || "Authentication error occurred.";
      
      // Parse Zod schema validation errors into a human-readable list
      try {
        if (typeof errorMsg === "string" && errorMsg.startsWith("[") && errorMsg.endsWith("]")) {
          const parsed = JSON.parse(errorMsg);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
            errorMsg = parsed.map((issue: any) => issue.message).join(", ");
          }
        }
      } catch (e) {
        // Fallback to raw message if parsing fails
      }

      setError(errorMsg);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_email");
    sessionStorage.removeItem("admin_pass");
    setIsAuthenticated(false);
    setSubmissions([]);
    setEmailInput("");
    setPasswordInput("");
  };

  const handleRefresh = () => {
    const email = sessionStorage.getItem("admin_email");
    const pass = sessionStorage.getItem("admin_pass");
    if (email && pass) {
      loadSubmissions(email, pass);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const query = searchQuery.toLowerCase();
    return (
      (sub.name || "").toLowerCase().includes(query) ||
      (sub.email || "").toLowerCase().includes(query) ||
      (sub.phone || "").toLowerCase().includes(query) ||
      (sub.type || "").toLowerCase().includes(query) ||
      (sub.message || "").toLowerCase().includes(query)
    );
  });

  // Calculate statistics
  const totalCount = submissions.length;
  const typeCounts = submissions.reduce((acc: any, sub: any) => {
    const type = (sub.type || "Other").trim().toLowerCase();
    if (type.includes("residential") || type.includes("home") || type.includes("house")) {
      acc.residential = (acc.residential || 0) + 1;
    } else if (type.includes("office") || type.includes("commercial") || type.includes("retail")) {
      acc.commercial = (acc.commercial || 0) + 1;
    } else {
      acc.other = (acc.other || 0) + 1;
    }
    return acc;
  }, { residential: 0, commercial: 0, other: 0 });

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-[color:var(--primary)]" size={32} />
          <span className="text-sm tracking-widest uppercase text-muted-foreground">Verifying access...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)] p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-sm shadow-xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)]" />
          
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)] mb-4">
              <Lock size={24} />
            </div>
            <h2 className="font-display text-3xl text-[color:var(--primary)]">Admin Portal</h2>
            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">Authorized Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="eyebrow block mb-2">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@srfitout.com"
                className="w-full bg-transparent border-b border-border focus:border-[color:var(--primary)] outline-none py-2 text-sm transition"
              />
            </div>

            <div>
              <label className="eyebrow block mb-2">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-border focus:border-[color:var(--primary)] outline-none py-2 text-sm transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 rounded-sm border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center mt-6 disabled:opacity-50 py-3 rounded-sm"
            >
              {loading ? "Verifying..." : "Login to Dashboard"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-[color:var(--primary)] underline underline-offset-4">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--ink)]">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10">
        <div className="container-x h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[color:var(--primary)]" size={20} />
            <h1 className="font-display text-xl md:text-2xl text-[color:var(--primary)]">SR Fitout</h1>
            <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-[color:var(--primary)]/10 text-[color:var(--primary)] font-semibold">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              disabled={loading}
              title="Refresh Inquiries"
              className="p-2 text-muted-foreground hover:text-[color:var(--primary)] transition rounded-full hover:bg-[color:var(--muted)]"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 border border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition text-xs tracking-wider uppercase rounded-sm"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-sm text-sm space-y-2">
            <h3 className="font-semibold font-sans text-base">⚠️ Database Connection Issue</h3>
            <p>
              Your credentials are correct, but the server failed to fetch inquiries from the database:
            </p>
            <code className="block p-2 bg-red-100/60 rounded text-xs overflow-x-auto">
              {error}
            </code>
            <p className="text-xs text-red-600/80 mt-2">
              <strong>Checklist:</strong><br />
              1. Make sure you installed Mongoose by running <code className="bg-red-100 px-1 py-0.5 rounded">npm install</code> inside the <code className="bg-red-100 px-1 py-0.5 rounded">frontend</code> folder.<br />
              2. Make sure local MongoDB is running at <code className="bg-red-100 px-1 py-0.5 rounded">mongodb://localhost:27017/</code>, or update the <code className="bg-red-100 px-1 py-0.5 rounded">MONGODB_URI</code> in <code className="bg-red-100 px-1 py-0.5 rounded">frontend/.env</code>.<br />
              3. <strong>Important:</strong> You must restart your dev server (stop the running <code className="bg-red-100 px-1 py-0.5 rounded">npm run dev</code> command and run it again) for the server to load the new <code className="bg-red-100 px-1 py-0.5 rounded">.env</code> configurations.
            </p>
          </div>
        )}

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card p-6 border border-border rounded-sm">
            <div className="eyebrow">Total Inquiries</div>
            <div className="mt-2 text-3xl font-display font-medium text-[color:var(--primary)]">{totalCount}</div>
          </div>
          <div className="bg-card p-6 border border-border rounded-sm">
            <div className="eyebrow">Residential</div>
            <div className="mt-2 text-3xl font-display font-medium text-amber-800">{typeCounts.residential}</div>
          </div>
          <div className="bg-card p-6 border border-border rounded-sm">
            <div className="eyebrow">Commercial</div>
            <div className="mt-2 text-3xl font-display font-medium text-emerald-800">{typeCounts.commercial}</div>
          </div>
          <div className="bg-card p-6 border border-border rounded-sm">
            <div className="eyebrow">Other / Custom</div>
            <div className="mt-2 text-3xl font-display font-medium text-zinc-700">{typeCounts.other}</div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 border border-border rounded-sm">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, type, or query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-9 pr-4 py-2 border-b border-border focus:border-[color:var(--primary)] outline-none text-sm"
            />
          </div>
          <div className="text-xs text-muted-foreground tracking-wider uppercase">
            Showing {filteredSubmissions.length} of {totalCount} submissions
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-sm">
              <h3 className="font-display text-xl text-muted-foreground">No inquiries found</h3>
              <p className="text-sm text-muted-foreground/75 mt-2">
                {submissions.length === 0 ? "You haven't received any contact submissions yet." : "No results match your search filters."}
              </p>
            </div>
          ) : (
            filteredSubmissions.map((sub: any) => (
              <div
                key={sub._id}
                className="bg-card border border-border rounded-sm p-6 hover:shadow-md transition duration-200 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-[color:var(--primary)]" />
                      <h3 className="font-semibold text-lg">{sub.name}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <a href={`mailto:${sub.email}`} className="flex items-center gap-1.5 hover:text-[color:var(--primary)]">
                        <Mail size={14} />
                        {sub.email}
                      </a>
                      <a href={`tel:${sub.phone}`} className="flex items-center gap-1.5 hover:text-[color:var(--primary)]">
                        <Phone size={14} />
                        {sub.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    {sub.type && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[color:var(--accent)]/20 text-[color:var(--accent-foreground)] font-medium">
                        <Briefcase size={12} />
                        {sub.type}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={13} />
                      {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="eyebrow block">Client Message</h4>
                  <p className="text-sm/relaxed text-[color:var(--ink)] bg-muted/30 p-4 rounded-sm border border-border/40 whitespace-pre-line">
                    {sub.message || <span className="italic text-muted-foreground">No message provided.</span>}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
