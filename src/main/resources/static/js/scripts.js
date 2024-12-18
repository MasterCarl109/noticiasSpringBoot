const API_URL = 'http://localhost:8080/api/news';

let allNews = [];  // Variable para almacenar todas las noticias y hacer la búsqueda.

document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    document.getElementById('news-form').addEventListener('submit', handleFormSubmit);
});

// Cargar noticias desde la API
function loadNews() {
    fetch(API_URL)
        .then(response => response.json())
        .then(newsList => {
            allNews = newsList;  // Guardamos todas las noticias para realizar la búsqueda.
            displayNews(newsList);
        })
        .catch(error => console.error('Error al cargar noticias:', error));
}

// Mostrar las noticias en tarjetas
function displayNews(newsList) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    newsList.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'col-md-4';
        newsCard.innerHTML = `
            <div class="card p-3">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.content}</p>
                <small class="text-muted">Fecha: ${news.createdAt}</small>
                <div class="mt-2">
                    <button class="btn btn-primary btn-sm" onclick="openUpdateModal(${news.id}, '${news.title}', '${news.content}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteNews(${news.id})">Eliminar</button>
                </div>
            </div>
        `;
        container.appendChild(newsCard);
    });
}

// Función para buscar noticias por título
function searchNews() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();  // Convertimos la búsqueda a minúsculas.

    // Filtramos las noticias por título
    const filteredNews = allNews.filter(news => news.title.toLowerCase().includes(searchTerm));
    
    displayNews(filteredNews);  // Mostramos las noticias filtradas.
}

// Abrir el modal para crear una noticia
function openCreateModal() {
    document.getElementById('news-id').value = '';
    document.getElementById('news-title').value = '';
    document.getElementById('news-content').value = '';
    document.getElementById('modal-title').textContent = 'Crear Noticia';
}

// Abrir el modal para actualizar una noticia
function openUpdateModal(id, title, content) {
    document.getElementById('news-id').value = id;
    document.getElementById('news-title').value = title;
    document.getElementById('news-content').value = content;
    document.getElementById('modal-title').textContent = 'Actualizar Noticia';
    const modal = new bootstrap.Modal(document.getElementById('newsModal'));
    modal.show();
}

// Manejar formulario de crear/actualizar
function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('news-id').value;
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    })
    .then(() => {
        loadNews();
        const modal = bootstrap.Modal.getInstance(document.getElementById('newsModal'));
        modal.hide();
    })
    .catch(error => console.error('Error al guardar noticia:', error));
}

// Eliminar noticia
function deleteNews(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => loadNews())
        .catch(error => console.error('Error al eliminar noticia:', error));
}
