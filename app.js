function sendDataToBot() {
    // Функция для отправки данных боту
    if (window.Telegram.WebApp) {
        const data = {
            message: "Пользователь завершил просмотр рутин!"
        };
        window.Telegram.WebApp.sendData(JSON.stringify(data));
    }
}

// Запуск мини-приложения
document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
    }
});
