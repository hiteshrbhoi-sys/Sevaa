// backend/api/send-push.js
const webpush = require('web-push');

// Generate VAPID keys: npx web-push generate-vapid-keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  'YOUR_VAPID_PUBLIC_KEY',
  'YOUR_VAPID_PRIVATE_KEY'
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subscription, notification } = req.body;

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify(notification)
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Push notification error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}