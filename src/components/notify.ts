export async function sendDiscordWebhook(message: string, webhookUrl: string): Promise<void> {
    const payload = {
        content: message
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Webhook notification sent successfully');
        } else {
            console.error('Failed to send webhook notification:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while sending webhook notification:', error);
    }
}


await sendDiscordWebhook("Run terminated. Go check VPS.", "https://discord.com/api/webhooks/1144216699403501578/aDI_abXNU726jbcmwCgZFfbgP2oKY_OHj01Zxaxmd-mGSaEycA0g2CaiRKvnhghbi51p")