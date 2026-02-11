import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeSQL(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
  if (typeof val === "number") return String(val);
  if (Array.isArray(val)) {
    return `ARRAY[${val.map((v) => `'${String(v).replace(/'/g, "''")}'`).join(",")}]::text[]`;
  }
  if (typeof val === "object") {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const tables = [
    "cruise_lines",
    "destinations",
    "cruises",
    "cabin_types",
    "bookings",
    "deck_plans",
    "dining_venues",
    "entertainment_venues",
    "ship_profiles",
  ];

  let sql = "-- SQL Dump generated on " + new Date().toISOString() + "\n";
  sql += "-- Tables: " + tables.join(", ") + "\n\n";

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      sql += `-- ERROR fetching ${table}: ${error.message}\n\n`;
      continue;
    }
    if (!data || data.length === 0) {
      sql += `-- ${table}: no data\n\n`;
      continue;
    }

    sql += `-- ${table} (${data.length} rows)\n`;
    const columns = Object.keys(data[0]);

    for (const row of data) {
      const values = columns.map((col) => escapeSQL(row[col]));
      sql += `INSERT INTO public.${table} (${columns.join(", ")}) VALUES (${values.join(", ")});\n`;
    }
    sql += "\n";
  }

  return new Response(sql, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=cruise-db-dump.sql",
    },
  });
});
