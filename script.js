document.addEventListener('DOMContentLoaded', () => {
    // Função global para salvar a resposta do Wi-Fi (conforme solicitado)
    window.saveWifiAnswer = function(answer) {
        localStorage.setItem('wifi_status', answer);
    };

    // Configurações e Variáveis Globais
    const totalSteps = 10; // Passos de pergunta/interação antes do loading
    let currentStepIndex = 1;
    let userAnswers = {};

    // Elementos da UI
    const progressBar = document.getElementById('progressBar');
    const stepCards = document.querySelectorAll('.step-card');

    // Esconder o header ao final do quiz
    const quizHeader = document.getElementById('quizHeader');

    // Inicializa a navegação
    setupNavigation();
    setupMultiSelectValidation();

    var stepEnteredAt = Date.now();
    var lastStep = null;

    function setupNavigation() {
        var quizStarted = false;

        // Seleciona todos os botões que avançam um passo
        const nextButtons = document.querySelectorAll('.next-step');

        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('data-target');

                // Record answers for personalization
                const stepCard = button.closest('.step-card');
                if (stepCard) {
                    // Captura resposta do Wi-Fi se existir o atributo data-wifi
                    const wifiAnswer = button.getAttribute('data-wifi');
                    if (wifiAnswer) {
                        saveWifiAnswer(wifiAnswer);
                    }

                    if (stepCard.id === 'step8') {
                        const btnText = button.textContent.trim().toLowerCase();
                        userAnswers.gender = btnText.includes('mujer') ? 'f' : 'm';
                    } else if (stepCard.id === 'step2') {
                        userAnswers.step2Raw = button.textContent.trim().toLowerCase();
                    } else if (stepCard.id === 'step6') {
                        userAnswers.step6Raw = button.textContent.trim().toLowerCase();
                    }
                }

                if (!quizStarted) {
                    quizStarted = true;
                    if (window.NSTTracker) window.NSTTracker.track('quiz_start');
                }

                goToStep(targetId);
            });
        });
    }

    function goToStep(targetId) {
        if (lastStep !== null && window.NSTTracker) {
            var secondsOnStep = Math.round((Date.now() - stepEnteredAt) / 1000);
            window.NSTTracker.track('step_time_' + lastStep, secondsOnStep);
        }
        stepEnteredAt = Date.now();
        lastStep = parseInt((targetId.match(/step(\d+)/) || [])[1]) || null;

        var match = targetId.match(/step(\d+)/);
        if (match && window.NSTTracker) {
            window.NSTTracker.trackQuizStep(parseInt(match[1]));
        }

        // Animação de saída do card atual
        const currentCard = document.querySelector('.step-card.active');
        if (currentCard) {
            currentCard.classList.remove('active');
        }

        // Animação de entrada do novo card
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
            // Scroll suave para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Dá um pequeno tempo antes de mostrar para o efeito de transição
            setTimeout(() => {
                targetCard.classList.add('active');
            }, 50);



            // Atualiza imagens de idade baseado no gênero antes de exibir (step 9)
            if (targetId === 'step9' && userAnswers.gender) {
                const g = userAnswers.gender;
                const images = targetCard.querySelectorAll('.age-avatar');
                if (images.length === 6) {
                    images[0].src = `images/age_${g}_under_40.webp`;
                    images[1].src = `images/age_${g}_40_49.webp`;
                    images[2].src = `images/age_${g}_50_59.webp`;
                    images[3].src = `images/age_${g}_60_69.webp`;
                    images[4].src = `images/age_${g}_70_79.webp`;
                    images[5].src = `images/age_${g}_80_plus.webp`;
                }
            }

            updateProgress(targetId);

            // Checar comportamentos especiais baseados na tela destino
            if (targetId === 'step11-loading') {
                startAnalysisSim();
            }
        }
    }

    function updateProgress(targetId) {
        // Remove 'step' para pegar o número e atualizar barra
        const match = targetId.match(/step(\d+)/);
        if (match) {
            let stepNum = parseInt(match[1]);

            if (stepNum <= totalSteps) {
                // É um passo de pergunta normal
                const percentage = (stepNum / totalSteps) * 100;
                progressBar.style.width = `${percentage}%`;
            } else {
                // Telas finais (loading, resultado)
                quizHeader.style.opacity = '0';
                setTimeout(() => quizHeader.style.display = 'none', 300);
            }
        }
    }

    // Configuração de Multi Select (Checkboxes)
    function setupMultiSelectValidation() {
        // Step 5
        const step5Checkboxes = document.querySelectorAll('#step5 input[type="checkbox"]');
        const btnStep5 = document.getElementById('btnStep5');

        step5Checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                // Atualiza estilo visual do checkbox
                const parentLabel = cb.closest('.custom-checkbox');
                if (cb.checked) {
                    parentLabel.classList.add('checked-style');
                } else {
                    parentLabel.classList.remove('checked-style');
                }

                // Valida se pelo menos 1 está preenchido
                const anyChecked = Array.from(step5Checkboxes).some(chk => chk.checked);
                btnStep5.disabled = !anyChecked;
            });
        });

        btnStep5.addEventListener('click', () => goToStep('step6'));

        // Step 10
        const step10Checkboxes = document.querySelectorAll('#step10 input[type="checkbox"]');
        const btnStep10 = document.getElementById('btnStep10');

        step10Checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                // Atualiza estilo visual do checkbox
                const parentLabel = cb.closest('.custom-checkbox');
                if (cb.checked) {
                    parentLabel.classList.add('checked-style');
                } else {
                    parentLabel.classList.remove('checked-style');
                }

                const anyChecked = Array.from(step10Checkboxes).some(chk => chk.checked);
                btnStep10.disabled = !anyChecked;
            });
        });

        btnStep10.addEventListener('click', () => goToStep('step11-loading'));
    }

    // Simulação da Análise de Dados (Página Final do Quiz)
    function startAnalysisSim() {
        const analysisBar = document.getElementById('analysisBar');
        const items = document.querySelectorAll('.analysis-steps li');

        // Simulação de tempo: ~4.5 segundos total
        let progress = 0;
        const intervalTime = 30; // ms
        const totalDuration = 4500; // 4.5s
        const stepsCount = totalDuration / intervalTime;
        const increment = 100 / stepsCount;

        const loaderInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loaderInterval);
                finishAnalysis();
            }
            analysisBar.style.width = `${progress}%`;

            // Atualiza status text based on progress
            if (progress > 25 && progress < 50) {
                setStepActive(items, 1);
            } else if (progress >= 50 && progress < 75) {
                setStepActive(items, 2);
            } else if (progress >= 75) {
                setStepActive(items, 3);
            }
        }, intervalTime);
    }

    function setStepActive(items, activeIndex) {
        items.forEach((item, index) => {
            if (index < activeIndex) {
                item.classList.remove('active');
                item.classList.add('done');
            } else if (index === activeIndex) {
                item.classList.add('active');
            }
        });
    }

    function finishAnalysis() {
        updateDynamicResults();
        setTimeout(() => {
            goToStep('step12-result');
        }, 500);
    }

    function updateDynamicResults() {
        const factorValue = document.getElementById('dynamic-factor-agravante');
        const par1 = document.getElementById('result-dynamic-p1');

        let step2Text = "sonido constante";
        if (userAnswers.step2Raw) {
            if (userAnswers.step2Raw.includes('pitido')) step2Text = "pitido agudo y constante";
            else if (userAnswers.step2Raw.includes('grave') || userAnswers.step2Raw.includes('continuo')) step2Text = "zumbido grave y continuo";
            else if (userAnswers.step2Raw.includes('silbido')) step2Text = "silbido que va y viene";
            else if (userAnswers.step2Raw.includes('estática') || userAnswers.step2Raw.includes('chicharreo')) step2Text = "sonido tipo estática";
            else if (userAnswers.step2Raw.includes('mezcla')) step2Text = "mezcla de sonidos complejos";
        }

        if (par1) {
            par1.innerHTML = `Según tus respuestas, un <strong>${step2Text}</strong> es uno de los patrones más claros de <strong>bloqueo gamma de alta frecuencia</strong>. Esto confirma que tu problema no se está generando en tu oído, sino que es el mecanismo de filtrado natural de tu cerebro que se ha "apagado". Esto explica por qué los tratamientos convencionales no han funcionado: están atacando el órgano equivocado.`;
        }

        if (factorValue && userAnswers.step6Raw) {
            if (userAnswers.step6Raw.includes('pantallas')) {
                factorValue.textContent = "Interferencia electromagnética aguda";
            } else if (userAnswers.step6Raw.includes('estrés') || userAnswers.step6Raw.includes('cansancio')) {
                factorValue.textContent = "Sobrecarga de cortisol bloqueando ondas gamma";
            } else if (userAnswers.step6Raw.includes('silencio')) {
                factorValue.textContent = "Falla de cancelación por falta de estímulo externo";
            } else if (userAnswers.step6Raw.includes('despertar') || userAnswers.step6Raw.includes('mañana')) {
                factorValue.textContent = "Hiperactividad neuronal matutina";
            } else {
                factorValue.textContent = "Disfunción de ondas gamma (Constante)";
            }
        }
    }
});
