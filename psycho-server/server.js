const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// База данных разрешенных HWID (сюда добавляйте HWID ваших пользователей)
const allowedHWIDs = new Set([
    "тестовый_hwid_пользователя"
]);

app.get('/api/check', (req, res) => {
    const hwid = req.query.hwid;
    
    if (!hwid) {
        return res.status(400).json({ success: false, message: "HWID not provided" });
    }

    if (allowedHWIDs.has(hwid)) {
        res.json({ success: true, message: "Access granted" });
    } else {
        res.status(403).json({ success: false, message: "HWID not registered or banned" });
    }
});

app.listen(PORT, () => {
    console.log(`Psycho Auth Server running on port ${PORT}`);
});