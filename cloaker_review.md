# 🕵️ Revisão Técnica: Sistema de Cloacker (Traffic Filtering)

Este documento detalha o funcionamento do sistema de **Cloacker** integrado ao seu funnel. O objetivo principal deste sistema é filtrar o tráfego, permitindo que apenas usuários qualificados (Mobile + Geograficamente permitidos) acessem a página real, enquanto redireciona tráfego indesejado (Desktop, Bots ou regiões específicas) para uma página "decoy" (isca).

---

## 🏗️ Estrutura de Execução

O sistema opera em três camadas de proteção para garantir o máximo de discrição:

### 1. Camada de Invisibilidade (CSS Stealth)
Antes de qualquer script rodar, um bloco de CSS é injetado no `<head>` para forçar a página a ficar totalmente preta e invisível.
- **Função:** Evita o "flash" do conteúdo real antes da decisão do cloacker. Se o usuário for redirecionado, ele nunca verá um único pixel da página original.

### 2. Filtro de Dispositivo (Mobile First)
A primeira verificação é feita via `User-Agent`. 
- **Lógica:** Se o dispositivo **NÃO** for detectado como mobile, o redirecionamento para o `decoyUrl` é instantâneo.
- **Impacto:** Bloqueia ferramentas de análise de desktop, bots de busca padrão e visualizações indesejadas em computadores.

### 3. Filtro Geográfico (Geofencing)
Se o usuário passar no teste de dispositivo, o sistema faz uma chamada assíncrona para a API `ipapi.co`.
- **Regra Atual:** Usuários localizados no **Brasil (BR)** são redirecionados automaticamente.
- **Failsafe (Segurança):** Se a API de geolocalização falhar por qualquer motivo (bloqueio, timeout), o sistema segue a regra de `failSafe: "redirect"`, garantindo que na dúvida, o acesso seja negado.

---

## 🛠️ Configurações Atuais (Resumo)

| Variável | Valor Atual | Descrição |
| :--- | :--- | :--- |
| `decoyUrl` | `https://quizfrecuencia-davinci.vercel.app` | Página para onde o tráfego filtrado é enviado. |
| `excludeCountry` | `BR` | País bloqueado (Brasil). |
| `failSafe` | `redirect` | Comportamento em caso de erro na API (Redirecionar). |
| `geoApi` | `https://ipapi.co/json/` | Provedor de dados geográficos. |

---

## 🔗 Preservação de UTMs

O sistema de redirecionamento (`stealthRedirect`) foi projetado para não quebrar o rastreamento:
- Ele captura todos os parâmetros da URL atual (`?utm_source=...`, etc).
- Anexa-os à URL de destino (`decoyUrl`).
- Isso garante que, mesmo no redirecionamento, você mantenha os dados de origem para análise no Vercel ou outras ferramentas.

---

## ⚠️ Pontos de Atenção e Sugestões

1.  **Dependência de API:** O sistema depende da `ipapi.co`. Se o tráfego for muito alto, a versão gratuita pode atingir limites de taxa (rate limits). 
    > [!TIP]
    > Recomendamos considerar um plano pago ou alternar para uma verificação de IP via servidor (Cloudflare Workers) para escalabilidade massiva.

2.  **Redirect vs Reveal:** No momento, o sistema está configurado para **Redirecionar em caso de erro**. Isso é excelente para segurança, mas se a API cair, 100% do tráfego legítimo também será redirecionado até que a API volte.

3.  **Manutenção de UTMs Internas:** O script de ponte (`script.js`) já está configurado para repassar UTMs do Quiz para a VSL, mantendo a continuidade do rastreamento através de todo o funnel.

---
*Documentação gerada automaticamente para revisão de engenharia de tráfego.*
