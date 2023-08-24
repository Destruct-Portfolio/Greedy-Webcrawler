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

