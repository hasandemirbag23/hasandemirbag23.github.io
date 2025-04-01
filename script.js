document.addEventListener('DOMContentLoaded', () => {
    const branchButtons = document.querySelectorAll('.branch-buttons button');
    
    branchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const branch = button.dataset.branch;
            localStorage.setItem('selectedBranch', branch);
            window.location.href = 'game.html';
        });
    });
}); 