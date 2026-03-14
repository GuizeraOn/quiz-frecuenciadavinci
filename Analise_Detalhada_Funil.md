# Análisis Detallado: Funnel NeuroSilencio - "La Frecuencia Da Vinci"

Este documento presenta una ingeniería reversa completa y un análisis estratégico del embudo de ventas (funnel) diseñado para el producto "La Frecuencia Da Vinci". El análisis cubre desde la captación inicial mediante el Quiz hasta la estructura de ofertas posteriores.

---

## 1. Arquitectura del Funnel
O fluxo do usuário é linear e desenhado para máxima retenção e doutrinação:
1.  **Quiz (index.html):** Diagnóstico interativo de 10 passos.
2.  **Página de VSL (vsl/index.html):** Vídeo de vendas com oferta retardada.
3.  **Checkout (Hotmart):** Finalização da compra.
4.  **Upsell 1 (ups1/index.html):** Oferta complementar imediata ("Protocolo de Drenaje Nocturno").

---

## 2. Análisis Estratégico (Psicología de Conversión)

### El Mecanismo Único (The Big Idea)
El funnel no vende una "cura", vende un **mecanismo de activación**: la **"Frecuencia Da Vinci"**.
*   **Problema Real:** El tinnitus no es un problema del oído, sino un "cortocircuito neuronal" causado por la debilidad de las **ondas gamma**.
*   **Causa Moderna:** El "smog electromagnético" (WiFi, celulares, 5G) interfiere con el filtro natural del cerebro.
*   **La Solución:** Un sonido de 7 segundos que reactiva el sistema de filtrado (Ondas Gamma).

### Gatillos Emocionales
*   **Validación de Frustración:** El quiz pregunta qué ha probado el usuario (pastillas, audífonos) y luego invalida esos métodos explicando la "barrera hematoencefálica".
*   **Urgecia y Personalización:** Al final del quiz, se entrega un "Perfil de Tinnitus" que hace que el usuario sienta que la solución en el vídeo es específica para su caso.

---

## 3. Transmisión Completa del QUIZ (Paso a Paso)

Aquí se detalla textualmente cada elemento del quiz implementado en `index.html`.

### Introducción
*   **Headline:** Silencia Tu Tinnitus Reactivando Las Ondas Gamma Con Un Truco de 7 Segundos.
*   **Subheadline:** Responde 8 preguntas simples y descubre qué está generando tu tinnitus y cuál es la estrategia más efectiva para silenciarlo.

---

### PASO 1: El Gancho (Curiosidad/Efecto Moderno)
*   **Pregunta:** ¿Duermes con tu celular cerca de tu cama?
*   **Opciones:**
    *   ✅ Sí
    *   ❌ No
*   *Lógica:* Conecta inmediatamente con la teoría del smog electromagnético.

### PASO 2: Diagnóstico Sensorial (Validación)
*   **Pregunta:** ¿Cómo describirías mejor el sonido que escuchas?
*   **Opciones:**
    *   🔔 Un pitido agudo y constante
    *   🔉 Un zumbido grave y continuo
    *   🌬️ Un silbido que va y viene
    *   📻 Un sonido tipo estática o chicharreo
    *   🎼 Una mezcla de varios sonidos al mismo tiempo
*   *Lógica:* Aumenta la percepción de personalización médica.

### PASO 3: Quiebre Informativo #1 (Educación)
*   **Contenido:**
    > La neurociencia acaba de revelar algo inquietante: los celulares y routers WiFi en nuestra casa emiten señales que interfieren con un sistema vital de nuestro cerebro llamado **ondas gamma**.
    > Estas ondas son literalmente tu **filtro de cancelación de ruido**. Cuando el smog electromagnético las debilita, la mente pierde la capacidad de "apagar" ruidos de fondo.
    > Esto explica por qué tu tinnitus empeora con el tiempo, incluso si tu oído está perfectamente sano.

---

### PASO 4: Cronología del Dolor
*   **Pregunta:** ¿Hace cuánto tiempo convives con este zumbido?
*   **Opciones:**
    *   ⏱️ Menos de 6 meses
    *   ⏳ Entre 6 meses e 2 años
    *   📅 Entre 2 y 5 años
    *   📆 Entre 5 y 10 años
    *   🕰️ Más de 10 años

### PASO 5: Invalidação de Soluciones Previas (Multi-select)
*   **Pregunta:** ¿Cuáles de estos has probado para combatir tu tinnitus?
*   **Opciones:**
    *   💊 Pastillas o medicamentos recetados por un médico
    *   🌿 Suplementos naturales o vitaminas
    *   🦻 Audífonos o dispositivos de enmascaramiento de sonido
    *   🎧 Ruido blanco, apps o sonidos para dormir
    *   🪡 Acupuntura, terapias alternativas o remedios caseros
    *   🤷‍♀️ Nada todavía — no he encontrado qué hacer
*   *Lógica:* Planta la semilla de que nada de lo anterior funciona porque no llega al cerebro.

### PASO 6: Factores Críticos de Intensidad
*   **Pregunta:** ¿En qué momento del día tu zumbido es más intenso?
*   **Opciones:**
    *   🌙 De noche, cuando todo está en silencio
    *   🌅 Al despertar por la mañana
    *   📱 Después de usar pantallas por mucho tiempo (celular, computadora, TV)
    *   😫 En momentos de estrés o cansancio
    *   🔄 Es constante — casi nunca cambia de intensidad

---

### PASO 7: Quiebre Informativo #2 (La Barrera)
*   **Contenido:**
    > Por décadas, la medicina intentó tratar tu problema con audífonos y pastillas. Pero la ciencia hoy confirma lo evidente: **el zumbido no proviene de un oído dañado. Se genera directo en tu cerebro.**
    > De hecho, las pastillas tradicionales **JAMÁS van a resolverlo**. Tu cerebro está sellado por una "barrera" que bloquea el **99%** de cualquier químico artificial.
    > *No se puede arreglar un cortocircuito eléctrico tomando química.*

---

### PASO 8: Segmentación por Género
*   **Pregunta:** Para personalizar tu diagnóstico, ¿eres hombre o mujer?
*   **Opciones:** 👩 Mujer / 👨 Hombre.

### PASO 9: Rango de Edad
*   **Pregunta:** ¿En qué rango de edad te encuentras?
*   **Opciones:**
    *   Menos de 40 años
    *   40 a 49 años
    *   50 a 59 años
    *   60 a 69 años
    *   70 a 79 años
    *   80 años o más

### PASO 10: Impacto Psicológico (Multi-select)
*   **Pregunta:** ¿De qué manera el tinnitus está afectando tu vida diaria?
*   **Opciones:**
    *   🥱 Me cuesta conciliar el sueño o descansar bien
    *   🗣️ Se me dificulta seguir conversaciones en grupo
    *   😠 Siento irritabilidad, ansiedad o frustración constante
    *   🧠 Noto que mi memoria y concentración están empeorando
    *   🫂 Me siento más aislado/a de mi familia y mis seres queridos
    *   😩 Hay días en los que siento que ya no puedo más
*   *Lógica:* Abre la "herida emocional" antes de presentar la solución.

---

### PASO 11: Simulación de Análisis
*   **Estados del Loader:**
    1. Verificando función auditiva...
    2. Evaluando interferencia electromagnética...
    3. Calculando nivel de bloqueo gamma...
    4. Generando perfil de tinnitus...

---

### PASO 12: Página de Resultados (El Puente)
*   **Badge:** Resultados Finalizados
*   **Diagnóstico Visual:**
    *   🔴 **Origen probable:** Cortocircuito neuronal (no auditivo)
    *   ⚠️ **Factor agravante:** Dinámico (ej: Interferencia electromagnética aguda)
    *   📊 **Bloqueo gamma:** Alto
    *   ✅ **Pronóstico:** Reversible
*   **Texto Final:** Explica que el cerebro ha "apagado" su filtro y que el protocolo de 7 segundos es la única forma de reactivarlo.
*   **CTA:** Descubrir el Protocolo Da Vinci para mi perfil →

---

## 4. Análisis de la VSL (Página de Ventas)

*   **Headline de Impacto:** ¿El Mayor Enemigo Del Tinnitus? Esta rutina nocturna de 5 minutos detiene el zumbido en los oídos.
*   **Estratema de Prueba Social:** Pill con contador de personas viendo en Facebook (737 personas).
*   **Oferta Retardada (Delayed CTA):** El botón de compra y los detalles de la oferta aparecen después de un tiempo estratégico en el vídeo.
*   **Componente de Autoridad:** Nota personal del "Dr. Ramírez" apelando a personas mayores de 60 años.
*   **Precio/Acceso:** Botón amarillo vibrante con el texto "COMPRAR AHORA" que redirige al checkout de Hotmart.

---

## 5. Análisis del Upsell 1 (Venta Adicional)

*   **Estrategia:** "Zero Friction / Disguised Welcome Page".
*   **Headline:** ¡ATENCIÓN! No cierres esta página — estamos creando tu acceso.
*   **Técnica:** Barra de progreso al 85% para retener al usuario.
*   **Contenido:** Vídeo titulado "Primera clase obligatoria" que en realidad vende un complemento (ej. Shot Matinal o Drenaje Nocturno).
*   **Zona de Decisión:** El widget de compra de Hotmart aparece automáticamente a los 7 minutos y 35 segundos (455 segundos).

---

## 6. Detalles Técnicos (Implementación)

### Script de Personalización (script.js)
El código inyecta dinámicamente las respuestas del usuario en la página de resultados:
*   Si el usuario eligió "pitido agudo" en el paso 2, el texto final dirá: *"Según tus respuestas, un pitido agudo y constante como el tuyo es uno de los patrones más claros de bloqueo gamma..."*
*   El factor agravante cambia según el momento en que el zumbido es más intenso (Paso 6).

### Rastreo (UTM Tracking)
*   Se utiliza un script robusto para capturar parámetros UTM (`utm_source`, `utm_medium`, etc.) y pasarlos a los enlaces de Hotmart mediante el parámetro `&sck`.
*   Esto asegura que el productor sepa exactamente de qué anuncio vino la venta, incluso después de que el usuario navegue por varias páginas del funnel.

---

## 7. Conclusión del Análisis
El funnel está altamente optimizado para **audiencias frías** de redes sociales. Utiliza un enfoque pseudo-científico (ondas gamma) para desplazar la culpa del usuario (no es tu culpa, es el WiFi/médicos que fallaron) y ofrece una solución de baja fricción (7 segundos). La integración técnica asegura una experiencia fluída y un rastreo de datos preciso para optimización de anuncios.
