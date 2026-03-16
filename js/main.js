// ===== DONNÉES DES PROJETS - Version multi-images =====
const projectsData = [
  {
    id: 1,
    title: "Hôtel Yamoussoukro",
    category: "chantier",
    mainImage: "assets/projects/1-hotel-Yakro.jpeg",
    images: [
      "assets/projects/1-hotel-Yakro.jpeg",
      "assets/projects/3-hotel-Yakro.jpeg",
      "assets/projects/4-hotel-Yakro.jpeg",
      "assets/projects/5-hotel-Yakro.jpeg",
      "assets/projects/6-hotel-Yakro.jpeg",
      "assets/projects/7-hotel-Yakro.jpeg",
    ],
    description: "Modélisation d'un hôtel à Yamoussoukro",
    tags: ["Hôtel", "Chantier", "Béton armé", "Yamoussoukro"],
  },
  {
    id: 2,
    title: "Modification d'une villa duplex",
    category: "chantier",
    mainImage: "assets/projects/1-maison-r+2.jpeg",
    images: [
      "assets/projects/1-maison-r+2.jpeg",
      "assets/projects/3-maison-r+2.jpeg",
      "assets/projects/4-maison-r+2.jpeg",
    ],
    description: "Modélisation d'une villa duplex R+1 à Calypso Bassam",
    tags: ["R+1", "Résidentiel", "Construction"],
  },
  {
    id: 3,
    title: "Modélisation Villa Basse",
    category: "chantier",
    mainImage: "assets/projects/1-villa-basse.jpeg",
    images: [
      "assets/projects/1-villa-basse.jpeg",
      "assets/projects/3-villa-basse.jpeg",
    ],
    description: "Modélisation d'une villa basse de standing à Bingerville",
    tags: ["Villa", "Luxe", "Résidentiel"],
  },
  {
    id: 4,
    title: "Suivie et contrôle des travaux de fondation",
    category: "suivi",
    mainImage: "assets/projects/fond1.jpeg",
    images: [
      "assets/projects/fond1.jpeg",
      "assets/projects/fond2.jpeg",
      "assets/projects/fond3.jpeg",
      "assets/projects/fond4.jpeg",
      "assets/projects/fond5.jpeg",
      "assets/projects/fond6.jpeg",
      "assets/projects/fond7.jpeg",
      "assets/projects/fond8.jpeg",
      "assets/projects/fond9.jpeg",
      "assets/projects/fond10.jpeg",
      "assets/projects/fond11.jpeg",
      "assets/projects/fond12.jpeg",
      "assets/projects/fond13.jpeg",
      "assets/projects/fond14.jpeg",
      "assets/projects/fond15.jpeg",
    ],
    description:
      "Suivie et contrôle des travaux de fondation de deux immeubles R+4 à usage d’habitation",
    tags: ["Suivi", "Travaux", "Assurance qualité", "Fondation"],
  },
  {
    id: 5,
    title: "Suivie et contrôle de 6 immeubles R+4",
    category: "suivi",
    mainImage: "assets/projects/tc11.jpeg",
    images: [
      "assets/projects/tc1.jpeg",
      "assets/projects/tc2.jpeg",
      "assets/projects/tc3.jpeg",
      "assets/projects/tc4.jpeg",
      "assets/projects/tc5.jpeg",
      "assets/projects/tc6.jpeg",
      "assets/projects/tc7.jpeg",
      "assets/projects/tc8.jpeg",
      "assets/projects/tc9.jpeg",
      "assets/projects/tc10.jpeg",
      "assets/projects/tc11.jpeg",
    ],
    description:
      "Suivie et contrôle de 6 immeubles R+4 du gros oeuvre jusqu’au second oeuvre",
    tags: [
      "Suivi",
      "Travaux",
      "Assurance qualité",
      "BIM",
      "Gros oeuvre",
      "Second oeuvre",
    ],
  },
  {
    id: 6,
    title: "Études techniques - Gano Compagnie",
    category: "etudes",
    mainImage: "assets/projects/rea1.jpeg",
    images: ["assets/projects/rea1.jpeg", "assets/projects/rea2.jpeg"],
    description: "Plans et métrés réalisés lors du stage à la Gano Compagnie",
    tags: ["Gano Compagnie", "Études", "Plans"],
  },
];

// ===== ATTENTES POUR LE CHARGEMENT =====
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio();
  initializeAnimations();
  setupEventListeners();
  setupMobileMenu();
  setupActiveLinkOnScroll();
  setupLazyLoading();
});

// ===== INITIALISATION PRINCIPALE =====
function initializePortfolio() {
  renderProjects(projectsData);
  initializeProgressBars();
  initializeModal();
  setupFilters();
  setupSmartPreloading();
}

// ===== RENDU DES PROJETS =====
function renderProjects(projects) {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
          <div class="project-card" data-category="${project.category}" data-project-id="${project.id}">
              <div class="project-image">
                  <div class="image-loader">
                      <div class="loader-spinner"></div>
                  </div>
                  <img 
                      src="${project.mainImage}" 
                      alt="${project.title}" 
                      loading="lazy"
                      data-src="${project.mainImage}"
                      class="lazy-image"
                      onload="this.parentElement.classList.add('loaded')"
                      onerror="this.src='https://via.placeholder.com/800x600?text=Image+non+disponible'">
                  <div class="project-overlay">
                      <button class="project-zoom" data-id="${project.id}" aria-label="Voir les photos">
                          <i class="fas fa-images"></i>
                          <span class="image-count">${project.images.length} photo${project.images.length > 1 ? "s" : ""}</span>
                      </button>
                  </div>
              </div>
              <div class="project-info">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  <div class="project-tags">
                      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
                  </div>
              </div>
          </div>
      `,
    )
    .join("");
}

// ===== FILTRES DES PROJETS =====
function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");
  const projectsGrid = document.getElementById("projectsGrid");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Animation du bouton actif
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.style.transform = "scale(1)";
      });
      button.classList.add("active");
      button.style.transform = "scale(1.05)";

      const filterValue = button.dataset.filter;

      // Filtrage avec animation
      let visibleCount = 0;
      projects.forEach((project, index) => {
        setTimeout(() => {
          if (
            filterValue === "all" ||
            project.dataset.category === filterValue
          ) {
            project.style.display = "block";
            visibleCount++;
            setTimeout(() => {
              project.style.opacity = "1";
              project.style.transform = "scale(1) translateY(0)";
            }, 50);
          } else {
            project.style.opacity = "0";
            project.style.transform = "scale(0.8) translateY(20px)";
            setTimeout(() => {
              project.style.display = "none";
            }, 300);
          }
        }, index * 30); // Effet cascade
      });

      // Afficher/masquer le message "aucun résultat"
      setTimeout(() => handleNoResults(filterValue, visibleCount), 350);
    });
  });
}

// ===== GESTION DES RÉSULTATS DE FILTRAGE =====
function handleNoResults(filterValue, visibleCount) {
  const noResultsMessage = document.querySelector(".no-results-message");
  const projectsGrid = document.getElementById("projectsGrid");

  if (visibleCount === 0) {
    if (!noResultsMessage) {
      const filterLabels = {
        all: "tous les projets",
        chantier: "chantier",
        etudes: "études techniques",
        lumion: "rendus LUMION",
        archicad: "modélisations Archicad",
      };

      const message = document.createElement("div");
      message.className = "no-results-message";
      message.innerHTML = `
          <i class="fas fa-folder-open"></i>
          <h3>Aucun projet dans cette catégorie</h3>
          <p>Explorez d'autres catégories pour découvrir mes réalisations en ${filterLabels[filterValue] || filterValue}</p>
          <button class="btn btn-secondary reset-filters">Voir tous les projets</button>
        `;
      projectsGrid.after(message);

      // Bouton pour réinitialiser les filtres
      message.querySelector(".reset-filters").addEventListener("click", () => {
        document.querySelector('[data-filter="all"]').click();
      });
    }
  } else if (noResultsMessage) {
    noResultsMessage.remove();
  }
}

// ===== GESTIONNAIRE DE GALERIE MULTI-IMAGES AMÉLIORÉ =====
let currentGallery = {
  images: [],
  currentIndex: 0,
  projectTitle: "",
};

function initializeModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.querySelector(".modal-caption");
  const closeBtn = document.querySelector(".modal-close");
  const prevBtn = document.querySelector(".modal-prev");
  const nextBtn = document.querySelector(".modal-next");

  // Créer les éléments d'interface
  const imageCounter = document.createElement("div");
  imageCounter.className = "image-counter";

  const thumbnailsContainer = document.createElement("div");
  thumbnailsContainer.className = "modal-thumbnails";

  const zoomControls = document.createElement("div");
  zoomControls.className = "zoom-controls";
  zoomControls.innerHTML = `
      <button class="zoom-in" aria-label="Zoom avant"><i class="fas fa-search-plus"></i></button>
      <button class="zoom-out" aria-label="Zoom arrière"><i class="fas fa-search-minus"></i></button>
      <button class="zoom-reset" aria-label="Réinitialiser"><i class="fas fa-undo"></i></button>
    `;

  modal.querySelector(".modal-content").appendChild(imageCounter);
  modal.querySelector(".modal-content").appendChild(thumbnailsContainer);
  modal.querySelector(".modal-content").appendChild(zoomControls);

  let zoomLevel = 1;
  const maxZoom = 3;
  const minZoom = 1;

  // Ouvrir la modal avec la galerie du projet
  document.addEventListener("click", (e) => {
    const zoomBtn = e.target.closest(".project-zoom");
    if (zoomBtn) {
      const projectId = parseInt(zoomBtn.dataset.id);
      const project = projectsData.find((p) => p.id === projectId);

      if (project) {
        currentGallery = {
          images: project.images,
          currentIndex: 0,
          projectTitle: project.title,
        };

        openModal(
          project.images[0],
          `${project.title} (1/${project.images.length})`,
        );
        updateImageCounter();
        renderThumbnails();
        resetZoom();
      }
    }
  });

  function renderThumbnails() {
    thumbnailsContainer.innerHTML = currentGallery.images
      .map(
        (img, index) => `
          <div class="thumbnail-dot ${index === currentGallery.currentIndex ? "active" : ""}" 
              data-index="${index}"
              title="Voir image ${index + 1}">
          </div>
        `,
      )
      .join("");

    // Ajouter les événements de clic sur les miniatures
    document.querySelectorAll(".thumbnail-dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = parseInt(dot.dataset.index);
        if (!isNaN(index) && index !== currentGallery.currentIndex) {
          navigateToIndex(index);
        }
      });
    });
  }

  function navigateToIndex(index) {
    currentGallery.currentIndex = index;
    const image = currentGallery.images[currentGallery.currentIndex];

    // Animation de transition
    modalImg.style.opacity = "0";
    modalImg.style.transform = "scale(0.95)";

    setTimeout(() => {
      modalImg.src = image;
      modalCaption.textContent = `${currentGallery.projectTitle} (${currentGallery.currentIndex + 1}/${currentGallery.images.length})`;
      updateImageCounter();
      renderThumbnails();
      resetZoom();

      modalImg.style.opacity = "1";
      modalImg.style.transform = "scale(1)";
    }, 150);
  }

  function updateImageCounter() {
    imageCounter.textContent = `${currentGallery.currentIndex + 1} / ${currentGallery.images.length}`;
  }

  function openModal(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    const hasMultipleImages = currentGallery.images.length > 1;
    prevBtn.style.display = hasMultipleImages ? "flex" : "none";
    nextBtn.style.display = hasMultipleImages ? "flex" : "none";
    imageCounter.style.display = hasMultipleImages ? "block" : "none";
    thumbnailsContainer.style.display = hasMultipleImages ? "flex" : "none";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    resetZoom();
  }

  function navigateModal(direction) {
    if (currentGallery.images.length <= 1) return;

    let newIndex = currentGallery.currentIndex + direction;

    if (newIndex < 0) {
      newIndex = currentGallery.images.length - 1;
    } else if (newIndex >= currentGallery.images.length) {
      newIndex = 0;
    }

    navigateToIndex(newIndex);
  }

  function resetZoom() {
    zoomLevel = 1;
    modalImg.style.transform = "scale(1)";
    modalImg.style.cursor = "zoom-in";
  }

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", () => navigateModal(-1));
  nextBtn.addEventListener("click", () => navigateModal(1));

  // Zoom controls
  modal.querySelector(".zoom-in").addEventListener("click", () => {
    if (zoomLevel < maxZoom) {
      zoomLevel += 0.25;
      modalImg.style.transform = `scale(${zoomLevel})`;
      modalImg.style.cursor = zoomLevel > 1 ? "zoom-out" : "zoom-in";
    }
  });

  modal.querySelector(".zoom-out").addEventListener("click", () => {
    if (zoomLevel > minZoom) {
      zoomLevel -= 0.25;
      modalImg.style.transform = `scale(${zoomLevel})`;
      modalImg.style.cursor = zoomLevel > 1 ? "zoom-out" : "zoom-in";
    }
  });

  modal.querySelector(".zoom-reset").addEventListener("click", resetZoom);

  // Double-clic pour zoomer/dézoomer
  modalImg.addEventListener("dblclick", (e) => {
    e.preventDefault();
    if (zoomLevel >= maxZoom) {
      resetZoom();
    } else {
      zoomLevel = maxZoom;
      modalImg.style.transform = `scale(${zoomLevel})`;
      modalImg.style.cursor = "zoom-out";
    }
  });

  // Navigation au clavier
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      navigateModal(-1);
    } else if (e.key === "ArrowRight") {
      navigateModal(1);
    } else if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      document.querySelector(".zoom-in").click();
    } else if (e.key === "-") {
      e.preventDefault();
      document.querySelector(".zoom-out").click();
    } else if (e.key === "0") {
      e.preventDefault();
      document.querySelector(".zoom-reset").click();
    }
  });

  // Fermer en cliquant en dehors
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Swipe pour mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      navigateModal(1); // Swipe gauche -> suivant
    } else if (touchEndX > touchStartX + swipeThreshold) {
      navigateModal(-1); // Swipe droit -> précédent
    }
  });
}

// ===== BARRES DE PROGRESSIONS =====
function initializeProgressBars() {
  const progressBars = document.querySelectorAll(".progress");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target;
          const width = progress.dataset.progress;

          // Animation progressive
          let currentWidth = 0;
          const increment = width / 30;
          const interval = setInterval(() => {
            currentWidth += increment;
            if (currentWidth >= width) {
              progress.style.width = width + "%";
              clearInterval(interval);
            } else {
              progress.style.width = currentWidth + "%";
            }
          }, 20);

          // Ajouter le pourcentage
          const skillItem = progress.closest(".skill-item");
          const skillName = skillItem.querySelector("span");
          if (!skillName.querySelector(".percentage")) {
            const percentageSpan = document.createElement("span");
            percentageSpan.className = "percentage";
            percentageSpan.textContent = `${width}%`;
            skillName.appendChild(percentageSpan);
          }

          observer.unobserve(progress);
        }
      });
    },
    { threshold: 0.5, rootMargin: "50px" },
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

// ===== LAZY LOADING =====
function setupLazyLoading() {
  const images = document.querySelectorAll(".project-image img");

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src && img.src !== img.dataset.src) {
            img.src = img.dataset.src;
          }
          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "200px",
      threshold: 0.01,
    },
  );

  images.forEach((img) => {
    if (img.complete) {
      img.parentElement.classList.add("loaded");
    }
    imageObserver.observe(img);
  });
}

// ===== PRÉCHARGEMENT INTELLIGENT =====
function setupSmartPreloading() {
  const preloadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectCard = entry.target;
          const projectId = projectCard.dataset.projectId;
          const project = projectsData.find(
            (p) => p.id === parseInt(projectId),
          );

          if (project && project.images.length > 1) {
            // Précharger la deuxième image
            const img = new Image();
            img.src = project.images[1];
          }

          preloadObserver.unobserve(projectCard);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    preloadObserver.observe(card);
  });
}

// ===== MENU HAMBURGER =====
function setupMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

// ===== SCROLL ACTIVE LINK ET HEADER =====
function setupActiveLinkOnScroll() {
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let isScrolling = false;

  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        // Header background change on scroll
        if (window.scrollY > 100) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }

        // Active link update
        let current = "";
        const scrollPosition = window.scrollY + 200;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
          }
        });

        isScrolling = false;
      });
    }
    isScrolling = true;
  });
}

// ===== ANIMATIONS AU SCROLL =====
function initializeAnimations() {
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-item, .contact-card, .timeline-item, .journey-column",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          // Animation spéciale pour les éléments de la timeline
          if (entry.target.classList.contains("timeline-item")) {
            entry.target.style.animation = "fadeInLeft 0.5s ease forwards";
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "50px" },
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
  });
}

// ===== SMOOTH SCROLL POUR LES ANCRES =====
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Mettre à jour l'URL sans saut
        history.pushState(null, null, targetId);
      }
    });
  });
}

// ===== SETUP DES EVENT LISTENERS =====
function setupEventListeners() {
  setupSmoothScroll();

  // Gestion du scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const projectsSection = document.querySelector("#projets");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Rafraîchir les observers après les changements de filtres
  const observer = new MutationObserver(() => {
    setupLazyLoading();
    setupSmartPreloading();
  });

  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    observer.observe(projectsGrid, { childList: true, subtree: true });
  }
}

// ===== GESTION DES ERREURS D'IMAGES =====
window.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      console.warn("Image non trouvée:", e.target.src);
      e.target.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%23999' text-anchor='middle' dy='.3em'%3EImage non disponible%3C/text%3E%3C/svg%3E";
      e.target.alt = "Image non disponible";
      e.target.parentElement?.classList.add("loaded");
    }
  },
  true,
);

// ===== PRÉCHARGEMENT DES IMAGES =====
function preloadImages() {
  // Précharger uniquement les images principales d'abord
  projectsData.forEach((project) => {
    const img = new Image();
    img.src = project.mainImage;
  });
}

// Lancer le préchargement après le chargement initial
window.addEventListener("load", preloadImages);

// ===== GESTION DE LA PERFORMANCE =====
// Debounce pour les événements de scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimisation du scroll
window.addEventListener(
  "scroll",
  debounce(() => {
    // Actions à optimiser
  }, 100),
  { passive: true },
);
