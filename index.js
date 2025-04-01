// Service Worker Kaydı
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker başarıyla kaydedildi:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker kaydı başarısız:', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const branchButtons = document.querySelectorAll('[data-branch]');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    let selectedDifficulty = localStorage.getItem('difficulty') || 'normal';

    // Zorluk seviyesi seçimi
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedDifficulty = button.dataset.difficulty;
            localStorage.setItem('difficulty', selectedDifficulty);
        });
    });

    // Varsayılan zorluk seviyesini seç
    const defaultDifficulty = localStorage.getItem('difficulty') || 'normal';
    const defaultButton = document.querySelector(`[data-difficulty="${defaultDifficulty}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
    }

    // Branş seçimi
    branchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const branch = button.dataset.branch;
            localStorage.setItem('selectedBranch', branch);
            window.location.href = 'game.html';
        });
    });
}); 