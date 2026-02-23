// ATLAS AI Financial Model Generator
// Routes AI through Fortuna bridge, handles Stripe checkout
// Pricing: $49 (basic) / $99 (detailed) / $149 (comprehensive)

export default async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") return new Response("OK", { headers });

  // GET: Return pricing
  if (req.method === "GET") {
    return new Response(JSON.stringify({
      service: "ATLAS Financial Model Generator",
      tiers: [
        { id: "basic", price: 49, name: "Basic", desc: "3-year revenue + break-even" },
        { id: "detailed", price: 99, name: "Detailed", desc: "5-year P&L, cash flow, unit economics" },
        { id: "comprehensive", price: 149, name: "Comprehensive", desc: "Full model + 3 scenarios + investor deck" },
      ],
      industries: ["SaaS", "E-commerce", "Marketplace", "FinTech", "HealthTech", "CleanTech", "Hardware", "Services", "Restaurants", "Retail", "Manufacturing"],
      crossSell: {
        oracle: "https://oracle-intelligence.netlify.app",
        grants: "https://grant-os-platform.netlify.app",
      },
    }), { headers });
  }

  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers });

  try {
    const body = await req.json();

    // Preview: Generate sample structure (free)
    if (body.action === "preview") {
      const { industry, revenue, employees } = body;
      const rev = parseFloat(revenue) || 100000;
      const emp = parseInt(employees) || 5;

      // Call Fortuna bridge for AI preview
      const fortunaUrl = "https://fortuna-engine.netlify.app/api/bridge";
      let aiPreview = null;

      try {
        const aiResp = await fetch(fortunaUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Platform": "atlas", "X-Request-Type": "atlas-financial" },
          body: JSON.stringify({
            messages: [{
              role: "user",
              content: `Generate a brief financial model preview for a ${industry || "technology"} startup with $${rev.toLocaleString()} current revenue and ${emp} employees. Include: projected Year 3 revenue, estimated break-even timeline, and 3 key assumptions. Keep response under 200 words. Format as JSON with keys: projectedRevenue, breakEvenMonths, keyAssumptions (array of 3 strings), growthRate, burnRate.`,
            }],
          }),
        });
        
        if (aiResp.ok) {
          const aiData = await aiResp.json();
          const text = aiData.choices?.[0]?.message?.content || aiData.content?.[0]?.text || "";
          try {
            aiPreview = JSON.parse(text.replace(/```json\n?|```/g, "").trim());
          } catch { aiPreview = { raw: text }; }
        }
      } catch (e) {
        console.log("Fortuna bridge unavailable, using fallback:", e.message);
      }

      // Fallback if Fortuna is unavailable
      const preview = aiPreview || {
        projectedRevenue: `$${Math.round(rev * 3.2).toLocaleString()}`,
        breakEvenMonths: Math.ceil(18 / (rev / 100000)),
        keyAssumptions: [
          `${industry || "Tech"} market growing 15-20% annually`,
          `Customer acquisition cost ~$${Math.round(rev / emp / 12)}`,
          `Operating margin reaching 25% by Year 3`,
        ],
        growthRate: "32% CAGR",
        burnRate: `$${(emp * 8500).toLocaleString()}/mo`,
      };

      return new Response(JSON.stringify({
        preview: true,
        industry,
        model: preview,
        fullModelIncludes: ["Detailed P&L", "Cash flow", "Balance sheet", "Sensitivity analysis", "Scenario modeling"],
        cta: "Purchase the full model for comprehensive AI-generated projections",
      }), { headers });
    }

    // Checkout: Create Stripe session
    if (body.action === "checkout") {
      const stripeKey = Netlify.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) {
        return new Response(JSON.stringify({
          error: "Payments pending configuration",
          setupRequired: "STRIPE_SECRET_KEY",
          alternative: "Contact hello@oraclereports.ai for manual ordering",
        }), { status: 503, headers });
      }

      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(stripeKey);
      const tiers = { basic: 4900, detailed: 9900, comprehensive: 14900 };
      const amount = tiers[body.tier] || 4900;
      const origin = new URL(req.url).origin;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: `ATLAS ${body.tier || "basic"} Financial Model`, description: `${body.industry || "Industry"} projections` },
            unit_amount: amount,
          },
          quantity: 1,
        }],
        mode: "payment",
        success_url: `${origin}/?model=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?model=cancelled`,
        metadata: { platform: "atlas", tier: body.tier, industry: body.industry },
      });

      return new Response(JSON.stringify({ url: session.url }), { headers });
    }

    return new Response(JSON.stringify({ error: "Provide action: preview or checkout" }), { status: 400, headers });
  } catch (error) {
    console.error("ATLAS model error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
};

export const config = { path: "/api/model" };
