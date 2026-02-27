// Para index.html
if (document.getElementById('lista-musicas')) {
  fetch('http://localhost:3000/musicas')
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('lista-musicas');
      data.forEach(musica => {
        const li = document.createElement('li');
        li.textContent = `${musica.titulo} - ${musica.artista} (${musica.ano})`;
        lista.appendChild(li);
      });
    });
}

// Para form.html
if (document.getElementById('form-musica')) {
  document.getElementById('form-musica').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const musica = Object.fromEntries(formData);

    fetch('http://localhost:3000/musicas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(musica)
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  });
}
// Função para carregar músicas no index.html
async function carregarMusicas() {
  const lista = document.getElementById('lista-musicas');
  if (!lista) return; // só roda se existir a lista

  try {
    const resposta = await fetch('http://localhost:3000/musicas');
    const musicas = await resposta.json();

    lista.innerHTML = ''; // limpa antes de preencher

    musicas.forEach(musica => {
      const li = document.createElement('li');
      li.textContent = `${musica.titulo} - ${musica.artista} (${musica.ano})`;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error('Erro ao carregar músicas:', erro);
  }
}

// Função para cadastrar música no form.html
function configurarFormulario() {
  const form = document.getElementById('form-musica');
  if (!form) return; // só roda se existir o formulário

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const musica = Object.fromEntries(formData);

    try {
      const resposta = await fetch('http://localhost:3000/musicas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(musica)
      });

      const resultado = await resposta.json();
      alert(resultado.message);

      // Redireciona para index.html após salvar
      window.location.href = 'index.html';
    } catch (erro) {
      console.error('Erro ao cadastrar música:', erro);
    }
  });
}

// Executa as funções certas dependendo da página
carregarMusicas();
configurarFormulario();
