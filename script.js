// Inicializar Animações (AOS)
AOS.init({ once: true, offset: 50, duration: 800, easing: "ease-out-cubic" });

// Configuração de idioma Português (Brasil) para o Flatpickr
const ptBR = {
  weekdays: {
    shorthand: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    longhand: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
  },
  months: {
    shorthand: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    longhand: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  },
  rangeSeparator: " até ",
  time_24hr: true,
};

// Inicializar Calendário (Flatpickr)
flatpickr(".flatpickr", {
  minDate: "today",
  dateFormat: "d/m/Y",
  locale: ptBR, // Aplica a tradução
  disableMobile: "true", // Força o tema customizado também no mobile para manter pt-BR visualmente
});

// Lógica de Navegação SPA (Single Page Application)
function navigateTo(viewName, sectionId = null) {
  const views = ["view-home", "view-rooms", "view-privacy", "view-terms"];
  views.forEach((id) => document.getElementById(id).classList.add("hidden"));

  const targetView = document.getElementById("view-" + viewName);
  if (targetView) {
    targetView.classList.remove("hidden");
    setTimeout(() => AOS.refresh(), 100);
  }

  if (sectionId) {
    setTimeout(() => {
      const el = document.getElementById(
        sectionId === "rota" || sectionId === "sobre"
          ? sectionId
          : "detail-" + sectionId
      );
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Efeito de Scroll da Navbar
const navbar = document.getElementById("navbar");
const navTexts = document.querySelectorAll(".nav-text-color");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.remove("nav-transparent");
    navbar.classList.add("nav-scrolled");
    navTexts.forEach((el) => {
      if (
        !el.classList.contains("text-white") &&
        !el.parentElement.classList.contains("bg-azul-900")
      ) {
        el.classList.remove("text-white");
        el.classList.add("text-azul-900");
      }
      if (el.classList.contains("text-white")) {
        el.classList.remove("text-white");
        el.classList.add("text-azul-900");
      }
    });
  } else {
    navbar.classList.add("nav-transparent");
    navbar.classList.remove("nav-scrolled");
    navTexts.forEach((el) => {
      if (el.classList.contains("text-azul-900")) {
        el.classList.remove("text-azul-900");
        el.classList.add("text-white");
      }
    });
  }
});

// Menu Mobile
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

// Lógica do Modal de Reserva
const modal = document.getElementById("booking-modal");
const backdrop = document.getElementById("modal-backdrop");
const content = document.getElementById("modal-content");
const roomSelect = document.getElementById("modal-room-select");

function openBookingModal(preselectedRoom = null) {
  modal.classList.remove("hidden");
  setTimeout(() => {
    backdrop.classList.remove("opacity-0");
    content.classList.remove("scale-95", "opacity-0");
  }, 10);
  if (preselectedRoom) roomSelect.value = preselectedRoom;
}

function closeBookingModal() {
  backdrop.classList.add("opacity-0");
  content.classList.add("scale-95", "opacity-0");
  setTimeout(() => modal.classList.add("hidden"), 300);
}

// Fechar modal ao clicar fora
modal.addEventListener("click", (e) => {
  // Clicar fora do conteúdo fecha (backdrop está separado visualmente mas o clique propaga no wrapper)
  if (e.target.id === "booking-modal" || e.target === backdrop)
    closeBookingModal();
});

// Lógica da Newsletter
function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletter-email");
  if (emailInput.value) {
    alert(`Obrigado! O e-mail ${emailInput.value} foi cadastrado.`);
    emailInput.value = "";
  }
}
