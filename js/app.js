// Sistema de Single Page Application (SPA) básico
class SPARouter {
    constructor() {
        this.routes = {};
        this.rootElem = document.getElementById('main-content') || document.getElementById('conteudo-principal');
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.loadRoute(window.location.pathname));
        document.addEventListener('DOMContentLoaded', () => {
            // Inicializar funcionalidades de acessibilidade
            this.initAccessibility();
            
            document.body.addEventListener('click', (e) => {
                if (e.target.matches('[data-link]')) {
                    e.preventDefault();
                    this.navigate(e.target.href);
                }
            });
            this.loadRoute(window.location.pathname);
        });
    }
    
    // Funcionalidades de acessibilidade
    initAccessibility() {
        // Menu Hambúrguer
        const menuToggle = document.getElementById('menuToggle');
        const menu = document.getElementById('menu');
        
        if (menuToggle && menu) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menu.classList.toggle('active');
            });
        }

        // Navegação por teclado
        const menuItems = document.querySelectorAll('[role="menuitem"]');
        
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                let targetItem;
                
                switch(e.key) {
                    case 'ArrowRight':
                        targetItem = index < menuItems.length - 1 ? menuItems[index + 1] : menuItems[0];
                        break;
                    case 'ArrowLeft':
                        targetItem = index > 0 ? menuItems[index - 1] : menuItems[menuItems.length - 1];
                        break;
                    case 'Escape':
                        if (menu) {
                            menu.classList.remove('active');
                            if (menuToggle) {
                                menuToggle.setAttribute('aria-expanded', 'false');
                                menuToggle.focus();
                            }
                        }
                        break;
                    default:
                        return;
                }
                
                if (targetItem) {
                    targetItem.focus();
                    e.preventDefault();
                }
            });
        });

        // Modo escuro e alto contraste
        this.initThemeToggles();
    }
    
    // Configuração dos botões de tema
    initThemeToggles() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const highContrastToggle = document.getElementById('highContrastToggle');
        
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                document.body.classList.remove('high-contrast');
                
                // Salvar preferência do usuário
                const isDarkMode = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDarkMode);
            });
        }
        
        if (highContrastToggle) {
            highContrastToggle.addEventListener('click', () => {
                document.body.classList.toggle('high-contrast');
                document.body.classList.remove('dark-mode');
                
                // Salvar preferência do usuário
                const isHighContrast = document.body.classList.contains('high-contrast');
                localStorage.setItem('highContrast', isHighContrast);
            });
        }

        // Carregar preferência salva
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        } else if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        } else {
            // Detectar preferência do sistema
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkScheme.matches) {
                document.body.classList.add('dark-mode');
            }
        }
    }

    addRoute(path, template) {
        this.routes[path] = template;
    }

    async loadRoute(path) {
        const template = this.routes[path];
        if (template) {
            const html = await fetch(template).then(response => response.text());
            this.rootElem.innerHTML = html;
        } else {
            this.rootElem.innerHTML = '<h2>Página não encontrada</h2>';
        }
    }

    navigate(path) {
        window.history.pushState({}, path, window.location.origin + path);
        this.loadRoute(path);
    }
}

// Inicializar o router
const router = new SPARouter();
router.addRoute('/', 'templates/home.html');
router.addRoute('/projetos', 'templates/projetos.html');
router.addRoute('/cadastro', 'templates/cadastro.html');

// Sistema de validação de formulários
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = this.form.querySelectorAll('input, select, textarea');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.validateForm(e));
        this.fields.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }

    validateForm(e) {
        let isValid = true;
        this.fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Por favor, corrija os erros no formulário.');
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Validações específicas por tipo
        if (field.required && !value) {
            errorMessage = 'Este campo é obrigatório.';
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, insira um e-mail válido.';
                isValid = false;
            }
        } else if (field.id === 'cpf' && value) {
            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            if (!cpfRegex.test(value)) {
                errorMessage = 'CPF inválido. Use o formato: 000.000.000-00';
                isValid = false;
            }
        } else if (field.id === 'telefone' && value) {
            const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!telefoneRegex.test(value)) {
                errorMessage = 'Telefone inválido. Use o formato: (11) 99999-9999';
                isValid = false;
            }
        } else if (field.id === 'cep' && value) {
            const cepRegex = /^\d{5}-\d{3}$/;
            if (!cepRegex.test(value)) {
                errorMessage = 'CEP inválido. Use o formato: 00000-000';
                isValid = false;
            }
        }

        this.setFieldError(field, errorMessage);
        return isValid;
    }

    setFieldError(field, message) {
        this.clearError(field);
        if (message) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Inicializar a validação do formulário de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        new FormValidator('formCadastro');
    }
});