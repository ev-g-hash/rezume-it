// Проверка доступности демо версий

(function() {
    'use strict';
    
    // Список демо URL которые могут быть отключены
    const potentiallyOfflineDemoUrls = [
        // 'planer-pihtulovevgeny.amvera.io',
        'videos-pihtulovevgeny.amvera.io',
        'fotos-pihtulovevgeny.amvera.io',
        'pbc-shop-pihtulovevgeny.amvera.io',
        'amv-journal-pihtulovevgeny.amvera.io',
    ];
    
    // Показать модальное окно с сообщением
    function showDemoDisabledModal() {
        const modal = new bootstrap.Modal(document.getElementById('demoDisabledModal'));
        modal.show();
    }
    
    // Обновить индикатор статуса демо
    function updateDemoStatus(button, status) {
        const card = button.closest('.card');
        if (!card) return;
        
        // Убираем предыдущие статусы
        card.classList.remove('demo-status-online', 'demo-status-offline', 'demo-status-checking');
        
        // Добавляем новый статус
        switch(status) {
            case 'online':
                card.classList.add('demo-status-online');
                break;
            case 'offline':
                card.classList.add('demo-status-offline');
                break;
            case 'checking':
                card.classList.add('demo-status-checking');
                break;
        }
    }
    
    // Обработчик клика по демо кнопкам
    async function handleDemoClick(event) {
        const button = event.target.closest('.demo-link');
        if (!button) return;
        
        const demoUrl = button.href;
        
        // Проверяем, есть ли домен в списке потенциально отключенных
        const isPotentiallyOffline = potentiallyOfflineDemoUrls.some(domain => 
            demoUrl.includes(domain)
        );
        
        // Если домен НЕ в списке отключенных - разрешаем переход
        if (!isPotentiallyOffline) {
            return true;
        }
        
        // Если домен в списке отключенных - ВСЕГДА показываем модальное окно
        
        // Останавливаем переход
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        // Показываем статус "проверка"
        updateDemoStatus(button, 'checking');
        
        // Сохраняем оригинальный текст
        const originalText = button.innerHTML;
        
        // Показываем индикатор загрузки
        button.classList.add('demo-loading');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверка...';
        
        // Небольшая задержка для показа индикатора
        setTimeout(() => {
            // Убираем индикатор
            button.classList.remove('demo-loading');
            button.disabled = false;
            button.innerHTML = originalText;
            
            // Показываем модальное окно
            showDemoDisabledModal();
        }, 1000); // 1 секунда задержки
        
        return false;
    }
    
    // Инициализация
    function init() {
        // Добавляем класс demo-link к существующим демо кнопкам
        document.querySelectorAll('a[href*="demo"], a[href*="Демо"], .btn-success').forEach(link => {
            if (link.href && link.href.includes('http')) {
                link.classList.add('demo-link');
            }
        });
        
        // Добавляем обработчик событий
        document.addEventListener('click', handleDemoClick, true);
    }
    
    // Запуск после загрузки DOM
    document.addEventListener('DOMContentLoaded', init);
    
})();