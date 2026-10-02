const app = document.getElementById("app");
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const themeBtn = document.getElementById("theme");
const intro = document.getElementById("intro");
const toast = document.getElementById("toast");

const contos = [
  {
    id: "o-toca-discos",
    titulo: "O Toca-discos",
    categoria: "Terror",
    data: "12 de janeiro de 2026",
    tempo: "6 min",
    descricao:
      "Numa noite de tempestade, um viúvo reencontra a esposa ao som da música de seu casamento. A manhã revela o que aquela noite escondeu.",
    arquivo: "contos/o-toca-discos.html"
  },

  {
    id: "a-curia",
    titulo: "A Cúria",
    categoria: "Drama",
    data: "3 de fevereiro de 2026",
    tempo: "6 min",
    descricao:
      "Numa biblioteca, o encontro entre dois desconhecidos revela vidas passadas e o preço de uma sentença.",
    arquivo: "contos/a-curia.html"
  },

  {
    id: "a-sentenca-da-fogueira",
    titulo: "A Sentença da Fogueira",
    categoria: "Histórico",
    data: "20 de março de 2026",
    tempo: "7 min",
    descricao:
      "Um escritor desperta paralisado em meio a uma fogueira onde seus próprios livros são queimados. Entre sombras, escritores mortos e uma sentença inexplicável, ele descobre que talvez a fogueira não esteja queimando apenas livros.",
    arquivo: "contos/a-sentenca-da-fogueira.html"
  },

  {
    id: "o-que-nao-fora-escrito",
    titulo: "O que não fora escrito",
    categoria: "Experimental",
    data: "8 de abril de 2026",
    tempo: "1 min",
    descricao:
      "Um autor descobre que a personagem de seu próximo conto já anda pela sua casa.",
    arquivo: "contos/o-que-nao-fora-escrito.html"
  }
];

const poemas = [
  {
    id: "a-rua-dos-murmurios",

    titulo: "A Rua dos Murmúrios",

    autor: "Guilherme Teixeira",

    tipo: "Poema",

    descricao:
      "Uma caminhada entre o trabalho, o tempo e o esquecimento, onde cada pedra parece guardar aquilo que ninguém ousou dizer.",

    estrofes: [
      [
        "Ora, quanta labuta enfrentávamos;",
        "enquanto o ocaso e as estrelas",
        "tingiam nossos olhos jabuticabas,",
        "Mais um dia se passava...",
        "E se passava como rio escorrido!",
        "Quem ousasse posar no tempo",
        "chorava."
      ],

      [
        "E era pior durante o brumário;",
        "ouvíamos súplicas e lamentos",
        "que tampouco se escondiam na neblina,",
        "Mas lá estávamos...",
        "Assentávamos paralelepípedos",
        "e fingíamos não ter ouvidos."
      ],

      [
        "Restava-nos, então, olhar para o chão;",
        "A enxada nos curvava feito ponte,",
        "e nossas pálpebras, cansadas,",
        "cansavam mais que o corpo...",
        "Em seu âmago, sentíamos o amargo",
        "e a batalha das aflições."
      ],

      [
        "A rua, no entanto, era infindável:",
        "nossas botas abarrotadas de poeira",
        "pisavam o próprio esquecimento;",
        "os obreiros cantavam com espátulas,",
        "e cada pedra sabia mais do que devia,",
        "guardando passos que jamais voltariam."
      ],

      [
        "Aquela era a “rua dos murmúrios”!",
        "ali o suor calava mais que a língua,",
        "e cada golpe enterrava nossos segredos!",
        "Nem nós, nem mesmo o tempo,",
        "escaparíamos do silêncio áspero e eterno",
        "Mas, ali, outro dia se passava...",
        "Ali, à beira do esquecimento!"
      ]
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {

  prepararMenu();

  prepararTema();

  iniciarAnimacaoAbertura();

  corrigirLayout();

  router();

});

function iniciarAnimacaoAbertura() {

  if (!intro) return;

  intro.style.display = "flex";
  intro.style.opacity = "1";
  intro.style.pointerEvents = "auto";

  document.body.classList.add("intro-active");

  setTimeout(() => {

    intro.style.opacity = "0";
    intro.style.pointerEvents = "none";

  }, 3500);

  setTimeout(() => {

    intro.style.display = "none";

    document.body.classList.remove("intro-active");

  }, 4800);
}


function prepararMenu() {

  if (!nav) return;

  let poemaLink = nav.querySelector('a[href="#/poemas"]');

  if (!poemaLink) {

    const sobre = nav.querySelector('a[href="#/sobre"]');

    poemaLink = document.createElement("a");

    poemaLink.href = "#/poemas";
    poemaLink.textContent = "Poemas";

    if (sobre) {

      nav.insertBefore(poemaLink, sobre);

    } else {

      nav.prepend(poemaLink);

    }
  }

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      if (burger) {

        burger.setAttribute("aria-expanded", "false");

      }

    });

  });

  if (burger) {

    burger.addEventListener("click", () => {

      const aberto = nav.classList.toggle("open");

      burger.setAttribute(
        "aria-expanded",
        aberto ? "true" : "false"
      );

    });

  }
}


function prepararTema() {

  if (!themeBtn) return;

  const temaSalvo = localStorage.getItem("psj-theme");

  if (temaSalvo === "light") {

    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );

  }

  atualizarIconeTema();


  themeBtn.addEventListener("click", () => {

    const temaAtual =
      document.documentElement.getAttribute("data-theme");

    if (temaAtual === "light") {

      document.documentElement.setAttribute(
        "data-theme",
        "dark"
      );

      localStorage.setItem("psj-theme", "dark");

    } else {

      document.documentElement.setAttribute(
        "data-theme",
        "light"
      );

      localStorage.setItem("psj-theme", "light");

    }

    atualizarIconeTema();

  });

}


function atualizarIconeTema() {

  if (!themeBtn) return;

  const tema =
    document.documentElement.getAttribute("data-theme");

  themeBtn.textContent =
    tema === "light" ? "🌙" : "☀️";
}


window.addEventListener("hashchange", router);


function router() {

  let rota = location.hash.replace(/^#\/?/, "");

  if (!rota) {

    renderHome();
    return;

  }

  if (rota === "contos") {

    renderContos();
    return;

  }

  if (rota === "poemas") {

    renderPoemas();
    return;

  }

  if (rota === "sobre") {

    renderSobre();
    return;

  }

  if (rota === "autor") {

    renderAutor();
    return;

  }


  if (rota.startsWith("conto/")) {

    const id = rota.replace("conto/", "");

    renderConto(id);
    return;

  }


  if (rota.startsWith("poema/")) {

    const id = rota.replace("poema/", "");

    renderPoema(id);
    return;

  }


  render404();
}

function renderHome() {

  document.body.classList.remove("read");

  app.innerHTML = `

    <section class="hero">

      <div class="orn">✦</div>

      <h1>
        Pois Serei Julgado
      </h1>

      <p class="q">
        “Algumas histórias foram feitas para serem lidas.
        Outras, para serem descobertas.”
      </p>

      <p>
        Uma biblioteca de contos, poemas e palavras
        que preferem permanecer na penumbra.
      </p>

      <div class="bar home-buttons">

        <a class="btn" href="#/contos">
          Entrar nos contos
        </a>

        <a class="btn ghost" href="#/poemas">
          Ler poemas
        </a>

      </div>

    </section>


    <section class="wrap">

      <div class="block-head">

        <div>

          <span class="meta">
            Biblioteca
          </span>

          <h2>
            Histórias para serem descobertas.
          </h2>

        </div>

      </div>


      <div class="grid">

        ${contos.slice(0, 3).map(criarCardConto).join("")}

      </div>

    </section>

  `;

  atualizarTitulo();

}

function renderContos() {

  document.body.classList.remove("read");

  app.innerHTML = `

    <section class="page-head">

      <div class="wrap">

        <span class="meta">
          Biblioteca
        </span>

        <h1>
          Contos
        </h1>

        <p>
          Histórias de terror, drama, história e experimentação.
        </p>

      </div>

    </section>


    <section class="wrap">

      <div class="tools">

        <input
          id="searchContos"
          type="search"
          placeholder="Buscar por título, gênero ou palavra..."
          aria-label="Buscar contos"
        >

      </div>


      <div class="tools filtros">

        <button
          class="chip on"
          data-filter="Todos">
          Todos
        </button>

        <button
          class="chip"
          data-filter="Terror">
          Terror
        </button>

        <button
          class="chip"
          data-filter="Drama">
          Drama
        </button>

        <button
          class="chip"
          data-filter="Histórico">
          Histórico
        </button>

        <button
          class="chip"
          data-filter="Experimental">
          Experimental
        </button>

      </div>


      <div
        id="contosGrid"
        class="grid">

        ${contos.map(criarCardConto).join("")}

      </div>

    </section>

  `;


  configurarBuscaContos();

  atualizarTitulo();

}

function criarCardConto(conto) {

  return `

    <article class="card">

      <div class="meta">
        ${escapeHTML(conto.categoria)}
        ·
        ${escapeHTML(conto.data)}
        ·
        ${escapeHTML(conto.tempo)}
      </div>


      <h3>
        ${escapeHTML(conto.titulo)}
      </h3>


      <p>
        ${escapeHTML(conto.descricao)}
      </p>


      <div>

        <a
          class="btn ghost"
          href="#/conto/${encodeURIComponent(conto.id)}">

          Ler conto

        </a>

      </div>

    </article>

  `;
}
function configurarBuscaContos() {

  const input =
    document.getElementById("searchContos");

  const grid =
    document.getElementById("contosGrid");

  const filtros =
    document.querySelectorAll("[data-filter]");

  let filtroAtual = "Todos";


  function atualizar() {

    const termo =
      input
        ? input.value.toLowerCase().trim()
        : "";


    const resultado = contos.filter(conto => {

      const correspondeFiltro =
        filtroAtual === "Todos" ||
        conto.categoria === filtroAtual;


      const texto = `
        ${conto.titulo}
        ${conto.categoria}
        ${conto.descricao}
      `.toLowerCase();


      const correspondeBusca =
        !termo || texto.includes(termo);


      return correspondeFiltro && correspondeBusca;

    });


    if (!resultado.length) {

      grid.innerHTML = `

        <div class="empty">

          <h2>
            Nenhuma história encontrada.
          </h2>

          <p>
            Tente outro termo de busca.
          </p>

        </div>

      `;

      return;

    }


    grid.innerHTML =
      resultado.map(criarCardConto).join("");

  }


  if (input) {

    input.addEventListener(
      "input",
      atualizar
    );

  }


  filtros.forEach(botao => {

    botao.addEventListener("click", () => {

      filtros.forEach(b =>
        b.classList.remove("on")
      );

      botao.classList.add("on");

      filtroAtual =
        botao.dataset.filter;

      atualizar();

    });

  });

}

function renderPoemas() {

  document.body.classList.remove("read");

  app.innerHTML = `

    <section class="page-head">

      <div class="wrap">

        <span class="meta">
          Biblioteca
        </span>

        <h1>
          Poemas
        </h1>

        <p>
          Palavras que não precisam de uma história
          para deixar uma marca.
        </p>

      </div>

    </section>


    <section class="wrap">

      <div class="grid poemas-grid">

        ${poemas.map(criarCardPoema).join("")}

      </div>

    </section>

  `;

  atualizarTitulo();

}
function criarCardPoema(poema) {

  return `

    <article class="card poem-card">

      <div class="meta">
        POEMA
      </div>


      <h3>
        ${escapeHTML(poema.titulo)}
      </h3>


      <div class="poem-author">
        ${escapeHTML(poema.autor)}
      </div>


      <p>
        ${escapeHTML(poema.descricao)}
      </p>


      <div>

        <a
          class="btn ghost"
          href="#/poema/${encodeURIComponent(poema.id)}">

          Ler poema

        </a>

      </div>

    </article>

  `;
}


function renderConto(id) {

  const conto =
    contos.find(item => item.id === id);


  if (!conto) {

    render404();
    return;

  }


  document.body.classList.add("read");


  const indice =
    contos.findIndex(item => item.id === id);


  const anterior =
    indice > 0
      ? contos[indice - 1]
      : null;


  const proximo =
    indice < contos.length - 1
      ? contos[indice + 1]
      : null;


  app.innerHTML = `

    <article>

      <div class="meta">
        ${escapeHTML(conto.categoria)}
        ·
        ${escapeHTML(conto.data)}
        ·
        ${escapeHTML(conto.tempo)}
      </div>


      <h1>
        ${escapeHTML(conto.titulo)}
      </h1>


      <p class="lead">
        ${escapeHTML(conto.descricao)}
      </p>


      <div class="bar">

        <a
          class="btn ghost"
          href="#/contos">
          ← Voltar aos contos
        </a>

      </div>


      <div class="body">

        <p>
          Este conto está disponível em sua página
          dedicada.
        </p>

        <p>
          <a
            class="btn"
            href="${escapeAttribute(conto.arquivo)}">

            Abrir conto

          </a>
        </p>

      </div>


      <div class="pn">

        ${
          anterior
            ? `
              <a href="#/conto/${anterior.id}">
                ← ${escapeHTML(anterior.titulo)}
              </a>
            `
            : "<span></span>"
        }


        ${
          proximo
            ? `
              <a href="#/conto/${proximo.id}">
                ${escapeHTML(proximo.titulo)} →
              </a>
            `
            : "<span></span>"
        }

      </div>

    </article>

  `;


  atualizarTitulo(conto.titulo);

}

function renderPoema(id) {

  const poema =
    poemas.find(item => item.id === id);


  if (!poema) {

    render404();
    return;

  }


  document.body.classList.add("read");


  const indice =
    poemas.findIndex(item => item.id === id);


  const anterior =
    indice > 0
      ? poemas[indice - 1]
      : null;


  const proximo =
    indice < poemas.length - 1
      ? poemas[indice + 1]
      : null;


  const estrofesHTML =
    poema.estrofes
      .map(estrofe => `

        <p class="poem-stanza">

          ${estrofe
            .map(verso =>
              escapeHTML(verso)
            )
            .join("<br>")}

        </p>

      `)
      .join("");


  app.innerHTML = `

    <article class="poem-reading">

      <div class="meta">
        POEMA
      </div>


      <h1>
        ${escapeHTML(poema.titulo)}
      </h1>


      <div class="poem-author">
        ${escapeHTML(poema.autor)}
      </div>


      <div class="bar">

        <a
          class="btn ghost"
          href="#/poemas">

          ← Voltar aos poemas

        </a>

      </div>


      <div class="poem-body">

        ${estrofesHTML}

      </div>


      <div class="pn">

        ${
          anterior
            ? `
              <a href="#/poema/${anterior.id}">
                ← ${escapeHTML(anterior.titulo)}
              </a>
            `
            : "<span></span>"
        }


        ${
          proximo
            ? `
              <a href="#/poema/${proximo.id}">
                ${escapeHTML(proximo.titulo)} →
              </a>
            `
            : "<span></span>"
        }

      </div>

    </article>

  `;


  atualizarTitulo(poema.titulo);

}

function renderSobre() {

  document.body.classList.remove("read");

  app.innerHTML = `

    <section class="page-head">

      <div class="wrap">

        <span class="meta">
          O projeto
        </span>

        <h1>
          Sobre
        </h1>

      </div>

    </section>


    <section class="wrap">

      <article class="standard-page">

        <p>
          <strong>Pois Serei Julgado</strong> é uma
          biblioteca digital dedicada a contos e poemas.
        </p>

        <p>
          Aqui, histórias encontram o silêncio,
          o mistério, a memória e tudo aquilo que
          permanece depois da última página.
        </p>

        <p>
          Leia devagar.
          Algumas palavras foram feitas para permanecer.
        </p>

      </article>

    </section>

  `;

  atualizarTitulo("Sobre");

}


function renderAutor() {

  document.body.classList.remove("read");

  app.innerHTML = `

    <section class="page-head">

      <div class="wrap">

        <span class="meta">
          Escrita
        </span>

        <h1>
          Área do Autor
        </h1>

        <p>
          Espaço reservado para gerenciamento e publicação
          de novas obras.
        </p>

      </div>

    </section>


    <section class="wrap">

      <div class="card author-card">

        <h2>
          Área do Autor
        </h2>

        <p>
          Novas ferramentas para publicação de contos
          e poemas podem ser adicionadas aqui.
        </p>

      </div>

    </section>

  `;

  atualizarTitulo("Área do Autor");

}
function render404() {

  document.body.classList.remove("read");

  app.innerHTML = `

    <section class="wrap empty">

      <div class="orn">
        ✦
      </div>

      <h1>
        Página não encontrada
      </h1>

      <p>
        Parece que esta página se perdeu entre as histórias.
      </p>

      <a
        class="btn"
        href="#/">

        Voltar ao início

      </a>

    </section>

  `;

  atualizarTitulo("Página não encontrada");

}

function corrigirLayout() {

  const style = document.createElement("style");

  style.id = "psj-layout-fixes";

  style.textContent = `

    /* ===============================
       CABEÇALHO DAS PÁGINAS
       =============================== */

    .page-head {
      padding-top: 7rem;
      padding-bottom: 2rem;
      background:
        radial-gradient(
          ellipse at 50% 0%,
          color-mix(
            in srgb,
            var(--acc) 12%,
            transparent
          ),
          transparent 65%
        );
    }

    .page-head h1 {
      font-size: clamp(3rem, 8vw, 5.5rem);
      margin: .2rem 0 .5rem;
      letter-spacing: .08em;
    }

    .page-head p {
      max-width: 40rem;
      color: var(--mute);
      margin: 0;
    }


    /* ===============================
       GRID
       =============================== */

    .grid {
      align-items: stretch;
    }

    .grid .card {
      min-height: 320px;
      height: 100%;
    }

    .grid .card > div:last-child {
      margin-top: auto;
      padding-top: 1rem;
    }


    /* ===============================
       BOTÕES
       =============================== */

    .home-buttons {
      justify-content: center;
      margin-top: 2rem;
    }


    /* ===============================
       POEMAS
       =============================== */

    .poem-card {
      min-height: 330px !important;
    }

    .poem-author {
      color: var(--acc);
      font-family: "Cormorant Garamond", Georgia, serif;
      font-style: italic;
      font-size: 1.15rem;
    }

    .poem-reading {
      max-width: 48rem;
    }

    .poem-reading h1 {
      margin-bottom: .3rem;
    }

    .poem-body {
      margin-top: 3rem;
      font-family:
        "Cormorant Garamond",
        Georgia,
        serif;
      font-size: 1.35rem;
      line-height: 1.75;
    }

    .poem-stanza {
      margin: 0 0 2.7rem !important;
      text-indent: 0 !important;
    }

    .poem-stanza::first-letter {
      font-size: inherit !important;
      float: none !important;
      color: inherit !important;
      padding: 0 !important;
    }


    /* ===============================
       PÁGINAS PADRÃO
       =============================== */

    .standard-page {
      max-width: 48rem;
      margin: 0 auto;
      padding: 1rem 0 5rem;
    }

    .standard-page p {
      margin-bottom: 1.5rem;
    }


    /* ===============================
       VAZIO
       =============================== */

    .empty {
      text-align: center;
      padding-top: 8rem;
      padding-bottom: 8rem;
    }

    .empty h2,
    .empty h1 {
      margin-bottom: .5rem;
    }

    .empty p {
      color: var(--mute);
      margin-bottom: 2rem;
    }


    /* ===============================
       INTRO
       =============================== */

    body.intro-active {
      overflow: hidden;
    }

    #intro {
      opacity: 1;
      visibility: visible;
    }

    #intro h1 {
      animation:
        introTitle 1.8s .4s both;
    }

    #intro p {
      animation:
        introText 1.8s 1.8s both;
    }

    @keyframes introTitle {

      from {
        opacity: 0;
        transform:
          translateY(30px)
          scale(.96);
        letter-spacing: .5em;
      }

      to {
        opacity: 1;
        transform:
          translateY(0)
          scale(1);
        letter-spacing: .3em;
      }

    }

    @keyframes introText {

      from {
        opacity: 0;
        transform: translateY(20px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }

    }


    /* ===============================
       TRANSIÇÃO DAS PÁGINAS
       =============================== */

    main {
      animation:
        pageEnter .65s ease both;
    }

    @keyframes pageEnter {

      from {
        opacity: 0;
        transform: translateY(18px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }

    }


    /* ===============================
       MOBILE
       =============================== */

    @media (max-width: 720px) {

      .page-head {
        padding-top: 5rem;
      }

      .page-head h1 {
        font-size: 3.4rem;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .grid .card {
        min-height: 0;
      }

      .poem-body {
        font-size: 1.18rem;
      }

    }

  `;

  document.head.appendChild(style);

}


/* =========================================================
   TÍTULO DA PÁGINA
   ========================================================= */

function atualizarTitulo(subtitulo = "") {

  document.title =
    subtitulo
      ? `${subtitulo} — Pois Serei Julgado`
      : "Pois Serei Julgado — Biblioteca de Contos";

}


function mostrarToast(mensagem) {

  if (!toast) return;

  toast.textContent = mensagem;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}

function escapeHTML(valor) {

  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function escapeAttribute(valor) {

  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}
