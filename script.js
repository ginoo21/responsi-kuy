document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi AOS
  AOS.init();

  // Proyek CRUD
  let projects = [
    {
      id: 1,
      title: "Website UMKM",
      description: "Mendesain website dan mobile untuk UMKM sebagai media bisnis dengan memanfatkan Figma",
    },
    {
      id: 2,
      title: "Zombie In Hospital",
      description: "Memanfaatkan aplkasi Greenfoot untuk mengembangkan game sederhana.",
    },
    {
      id: 3,
      title: "Rekam Medis",
      description: "Membuat rekam medis sederhana dengan menggunkan Java dan memanfaatkan MySQL untuk menyimpan database.",
    },
  ];

  const projectList = document.getElementById("project-list");
  const addProjectBtn = document.getElementById("add-project");
  const projectModal = new bootstrap.Modal(
    document.getElementById("projectModal")
  );
  const projectForm = document.getElementById("project-form");
  const saveProjectBtn = document.getElementById("save-project");

  function renderProjects() {
    projectList.innerHTML = "";
    projects.forEach((project) => {
      const projectEl = document.createElement("div");
      projectEl.className = "col-md-4 mb-4";
      projectEl.innerHTML = `
                <div class="card" data-aos="fade-up">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <button class="btn btn-primary btn-sm me-2 edit-project" data-id="${project.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-project" data-id="${project.id}">Hapus</button>
                    </div>
                </div>
            `;
      projectList.appendChild(projectEl);
    });

    // Tambahkan event listener untuk tombol edit dan hapus
    document.querySelectorAll(".edit-project").forEach((btn) => {
      btn.addEventListener("click", editProject);
    });
    document.querySelectorAll(".delete-project").forEach((btn) => {
      btn.addEventListener("click", deleteProject);
    });
  }

  function addProject() {
    document.getElementById("project-id").value = "";
    document.getElementById("project-title").value = "";
    document.getElementById("project-description").value = "";
    document.getElementById("projectModalLabel").textContent =
      "Tambah Proyek Baru";
    projectModal.show();
  }

  function editProject(e) {
    const projectId = parseInt(e.target.dataset.id);
    const project = projects.find((p) => p.id === projectId);
    document.getElementById("project-id").value = project.id;
    document.getElementById("project-title").value = project.title;
    document.getElementById("project-description").value = project.description;
    document.getElementById("projectModalLabel").textContent = "Edit Proyek";
    projectModal.show();
  }

  function deleteProject(e) {
    const projectId = parseInt(e.target.dataset.id);
    Swal.fire({
      title: "Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        projects = projects.filter((p) => p.id !== projectId);
        renderProjects();
        Swal.fire("Terhapus!", "Proyek Anda telah dihapus.", "success");
      }
    });
  }

  function saveProject() {
    const projectId = document.getElementById("project-id").value;
    const title = document.getElementById("project-title").value;
    const description = document.getElementById("project-description").value;

    if (projectId) {
      // Edit proyek yang ada
      const index = projects.findIndex((p) => p.id === parseInt(projectId));
      projects[index] = { ...projects[index], title, description };
    } else {
      // Tambah proyek baru
      const newProject = {
        id: Date.now(),
        title,
        description,
      };
      projects.push(newProject);
    }

    renderProjects();
    projectModal.hide();
    Swal.fire("Tersimpan!", "Proyek Anda telah disimpan.", "success");
  }

  addProjectBtn.addEventListener("click", addProject);
  saveProjectBtn.addEventListener("click", saveProject);

  // Render awal
  renderProjects();

  // Pengiriman formulir kontak
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Di sini Anda biasanya akan mengirim data formulir ke server
    console.log("Formulir dikirim:", { name, email, message });

    Swal.fire({
      title: "Terima kasih!",
      text: "Pesan Anda telah berhasil dikirim.",
      icon: "success",
      confirmButtonText: "OK",
    });

    contactForm.reset();
  });

  // Smooth scrolling untuk link navigasi
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Efek scroll navbar
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.querySelector(".navbar").classList.add("navbar-scrolled");
    } else {
      document.querySelector(".navbar").classList.remove("navbar-scrolled");
    }
  });
});
