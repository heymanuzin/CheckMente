document.addEventListener('DOMContentLoaded', function() {
    // Sistema de navegação
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    const tabs = document.querySelectorAll('.tab');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            this.classList.add('active');

            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Scroll suave para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Verificar preferência do sistema
    if (prefersDark.matches) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Light</span> Modo Claro';
    }

    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Light</span> Modo Claro';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Light</span> Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;"><path d="M12 3v2M16.24 7.76l1.42-1.42M21 12h-2M16.24 16.24l1.42 1.42M12 19v2M7.76 16.24l-1.42 1.42M3 12H1M7.76 7.76L6.34 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Dark</span> Modo Escuro';
            localStorage.setItem('theme', 'light');
        }
    });

    // Sistema de FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Fechar todos os itens
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Abrir o clicado se não estava ativo
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // Formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e53e3e';
                }
            });

            if (isValid) {
                try {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());

                    // Adicionar timestamp
                    data.timestamp = new Date().toISOString();

                    let endpoint = '';
                    if (form.id === 'desabafarForm') {
                        endpoint = '/api/desabafar';
                    } else if (form.id === 'reportForm') {
                        endpoint = '/api/reportar';
                    } else if (form.id === 'checkinForm') {
                        endpoint = '/api/checkin';
                    }

                    const response = await fetch(`https://checkmente20.netlify.app${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    if (response.ok) {
                        showToast('Obrigada por compartilhar! seus desabafos estaram seguros comigo! beijinhos de luz.');
                        form.reset();
                    } else {
                        showToast('Erro ao enviar mensagem. Tente novamente.');
                    }
                } catch (error) {
                    console.error('Erro:', error);
                    showToast('Erro de conexão. Verifique se o servidor está rodando.');
                }
            } else {
                showToast('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });

    // Função toast
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Efeitos de hover nos cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
