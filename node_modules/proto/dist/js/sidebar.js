const btn = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.backdrop');

    function toggleMenu() {
      sidebar.classList.toggle('open');
      btn.classList.toggle('active');
      backdrop.classList.toggle('active');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    backdrop.addEventListener('click', toggleMenu);


const toggleButtons = document.querySelectorAll(".toc-toggle");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.closest(".toc-section");
        section.classList.toggle("collapsed");
      });
    });