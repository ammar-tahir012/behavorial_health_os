// supabase/functions/log-hipaa-ack/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 1. Create Supabase Client
        // process.env keys are injected by Supabase Edge Runtime
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // 2. Get User from Token
        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
            throw new Error("Unauthorized: User not found")
        }

        // 3. Parse Body
        const { agreed, policyVersion } = await req.json()

        if (!agreed) {
            return new Response(JSON.stringify({ error: "Agreement required" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            })
        }

        // 4. Log to Audit Table (using Service Role if needed, but RLS usually allows user inserts via function?)
        // Actually, for strict audit logs, we might want to use the Admin Client to bypass RLS restrictions on 'audit_logs' 
        // if users aren't allowed to insert directly.
        const serviceClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { error: insertError } = await serviceClient
            .from('audit_logs')
            .insert({
                user_id: user.id,
                action: 'HIPAA_ACKNOWLEDGE',
                details: { policy_version: policyVersion, agreed_at: new Date() },
                ip_address: req.headers.get('x-forwarded-for') || 'unknown'
            })

        if (insertError) throw insertError

        // 5. Update User Metadata (Optional)
        await supabaseClient.auth.updateUser({
            data: { hipaa_acknowledged: true, hipaa_acked_at: new Date() }
        })

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
