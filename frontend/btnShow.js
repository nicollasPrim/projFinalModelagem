function showSection(id) {
    document.querySelectorAll('.painel').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }