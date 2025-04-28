<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script>
async function authenticateUser() {
    try {
        const initData = window.Telegram.WebApp.initData;
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

        if (!initData || !initDataUnsafe?.user) {
            alert("Ошибка: данные Telegram недоступны.");
            return;
        }

        const response = await fetch("https://your-backend.com/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ initData })
        });

        const result = await response.json();
        console.log("Auth result:", result);

        if (result.status === "ok") {
            // Всё хорошо — пользователя можно пропустить дальше
            document.getElementById("welcome").innerText = `Добро пожаловать, ${initDataUnsafe.user.first_name}!`;
        } else {
            alert("Ошибка авторизации.");
        }
    } catch (error) {
        console.error("Auth error:", error);
        alert("Ошибка авторизации.");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    authenticateUser();
});
</script>

<div id="welcome" style="text-align:center; margin-top:20px; font-size:20px;">
Загрузка...
</div>
