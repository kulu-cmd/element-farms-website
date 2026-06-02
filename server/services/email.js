import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'kamil@elementfarmsolutions.co.za'
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://elementfarmsolutions.co.za'

export async function sendAnalysisNotification({
  planId,
  inputs,
  analysis,
  contactName,
  contactEmail,
  farmName,
}) {
  const topCrops = (analysis.recommendations || [])
    .filter(r => r.band === 'best-fit')
    .slice(0, 5)
    .map(r => `${r.crop_name} (${r.suitability_score}/100)`)
    .join(', ')

  const planUrl = `${FRONTEND_URL}/cropfit/plan/${planId}`
  const dateStr = new Date().toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const marketStr = Array.isArray(inputs.market)
    ? inputs.market.join(', ')
    : (inputs.market || '—')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2b2b2b;">
      <div style="background: #0e5a36; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New CropFit Submission</h1>
        <p style="color: #a8d5b5; margin: 8px 0 0; font-size: 14px;">${dateStr}</p>
      </div>

      <div style="background: #f7f5f0; padding: 24px; border: 1px solid #e6e8e6; border-top: none; border-radius: 0 0 8px 8px;">

        ${contactName || farmName ? `
        <div style="background: white; border-radius: 6px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #f36f21;">
          <h2 style="margin: 0 0 10px; font-size: 15px; color: #f36f21; text-transform: uppercase; letter-spacing: 0.05em;">Farmer Details</h2>
          ${contactName ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${contactName}</p>` : ''}
          ${farmName ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Farm:</strong> ${farmName}</p>` : ''}
          ${contactEmail ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${contactEmail}" style="color: #0e5a36;">${contactEmail}</a></p>` : ''}
        </div>
        ` : ''}

        <div style="background: white; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
          <h2 style="margin: 0 0 12px; font-size: 15px; color: #0e5a36; text-transform: uppercase; letter-spacing: 0.05em;">Farm Profile</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 6px 8px 6px 0; color: #666; width: 42%;">Region</td><td style="padding: 6px 0;"><strong>${inputs.regionLabel || inputs.region || '—'}</strong></td></tr>
            <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 6px 8px 6px 0; color: #666;">Season</td><td style="padding: 6px 0;"><strong>${inputs.season || '—'}</strong></td></tr>
            <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 6px 8px 6px 0; color: #666;">Water access</td><td style="padding: 6px 0;"><strong>${inputs.water_access || '—'}</strong></td></tr>
            <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 6px 8px 6px 0; color: #666;">Soil type</td><td style="padding: 6px 0;"><strong>${inputs.soil_type || '—'}</strong></td></tr>
            <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 6px 8px 6px 0; color: #666;">Management</td><td style="padding: 6px 0;"><strong>${inputs.management || '—'}</strong></td></tr>
            <tr style="border-bottom: 1px solid #f0ede6;"><td style="padding: 6px 8px 6px 0; color: #666;">Farm scale</td><td style="padding: 6px 0;"><strong>${inputs.farm_scale || '—'}</strong></td></tr>
            <tr><td style="padding: 6px 8px 6px 0; color: #666;">Markets</td><td style="padding: 6px 0;"><strong>${marketStr}</strong></td></tr>
          </table>
        </div>

        <div style="background: white; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
          <h2 style="margin: 0 0 12px; font-size: 15px; color: #0e5a36; text-transform: uppercase; letter-spacing: 0.05em;">Analysis Summary</h2>
          <p style="margin: 0 0 12px; font-size: 14px; line-height: 1.6; color: #2b2b2b;">${analysis.summary}</p>
          ${topCrops ? `<p style="margin: 0; font-size: 14px; color: #2b2b2b;"><strong>Top crops:</strong> ${topCrops}</p>` : ''}
        </div>

        <div style="text-align: center; padding: 8px 0 16px;">
          <a href="${planUrl}" style="background: #0e5a36; color: white; padding: 13px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px;">View Full Analysis →</a>
        </div>

        <p style="margin: 8px 0 0; font-size: 11px; color: #aaa; text-align: center;">Plan ID: ${planId}</p>
      </div>
    </div>
  `

  await resend.emails.send({
    from: 'CropFit <noreply@elementfarmsolutions.co.za>',
    to: NOTIFICATION_EMAIL,
    subject: `New CropFit — ${inputs.regionLabel || inputs.region || 'Unknown region'}${inputs.season ? ` · ${inputs.season}` : ''}${contactName ? ` · ${contactName}` : ''}`,
    html,
  })
}

export async function sendFarmerResultsEmail({ planId, email, analysis, inputs }) {
  const planUrl = `${FRONTEND_URL}/cropfit/plan/${planId}`

  const top3 = (analysis.recommendations || [])
    .filter(r => r.band === 'best-fit' || r.band === 'good-fit')
    .slice(0, 3)

  const top3Html = top3.map(r => `
    <div style="background: white; border-radius: 6px; padding: 14px 16px; margin-bottom: 10px; border-left: 4px solid #0e5a36;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <strong style="font-size: 15px; color: #1e1e1e;">${r.crop_name}</strong>
        <span style="background: #e8f4ed; color: #0e5a36; font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 20px;">${r.suitability_score}/100</span>
      </div>
      ${r.reasons?.[0] ? `<p style="margin: 0 0 6px; font-size: 13px; color: #5a5550; line-height: 1.5;">${r.reasons[0]}</p>` : ''}
      ${r.time_to_income ? `<span style="font-size: 12px; color: #0e5a36;">⏱ Income in ${r.time_to_income}</span>` : ''}
    </div>
  `).join('')

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2b2b2b;">
      <div style="background: #0e5a36; padding: 28px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0 0 6px; font-size: 22px;">Your CropFit results are ready</h1>
        <p style="color: #a8d5b5; margin: 0; font-size: 14px;">Here are your top crop recommendations for ${inputs.regionLabel || inputs.region || 'your farm'}</p>
      </div>

      <div style="background: #f7f5f0; padding: 24px; border: 1px solid #e6e8e6; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="margin: 0 0 14px; font-size: 15px; color: #0e5a36; text-transform: uppercase; letter-spacing: 0.05em;">Your Top Picks</h2>
        ${top3Html}

        <div style="text-align: center; padding: 20px 0 8px;">
          <a href="${planUrl}" style="background: #0e5a36; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px;">View Full Analysis →</a>
        </div>

        <p style="margin: 16px 0 0; font-size: 12px; color: #aaa; text-align: center;">
          This analysis was generated by CropFit — Element Farm Solutions<br>
          <a href="https://elementfarmsolutions.co.za" style="color: #0e5a36;">elementfarmsolutions.co.za</a>
        </p>
      </div>
    </div>
  `

  await resend.emails.send({
    from: 'CropFit <noreply@elementfarmsolutions.co.za>',
    to: email,
    subject: `Your CropFit crop plan — ${inputs.regionLabel || inputs.region || 'analysis complete'}`,
    html,
  })
}
