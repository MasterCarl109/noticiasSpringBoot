const API_URL = '/api/news';

document.addEventListener('DOMContentLoaded', () => {
    loadNews();

    const newsForm = document.getElementById('newsForm');
    newsForm.addEventListener('submit', handleFormSubmit);
});

// Cargar todas las noticias
function loadNews() {
    fetch(API_URL)
        .then(response => response.json())
        .then(news => {
            const newsContainer = document.getElementById('newsContainer');
            newsContainer.innerHTML = '';
            news.forEach(item => {
                const newsCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.content}</p>
                                <button class="btn btn-warning" onclick="editNews(${item.id})">Editar</button>
                                <button class="btn btn-danger" onclick="deleteNews(${item.id})">Eliminar</button>
                            </div>
                        </div>
                    </div>`;
                newsContainer.innerHTML += newsCard;
            });
        })
        .catch(error => console.error('Error al cargar las noticias:', error));
}

// Manejar el envío del formulario (Crear/Actualizar)
function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('newsId').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    })
        .then(() => {
            loadNews();
            const modal = bootstrap.Modal.getInstance(document.getElementById('newsModal'));
            modal.hide();
            document.getElementById('newsForm').reset();
        })
        .catch(error => console.error('Error al guardar la noticia:', error));
}

// Editar una noticia
function editNews(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(news => {
            document.getElementById('newsId').value = news.id;
            document.getElementById('title').value = news.title;
            document.getElementById('content').value = news.content;

            const modal = new bootstrap.Modal(document.getElementById('newsModal'));
            modal.show();
        })
        .catch(error => console.error('Error al cargar la noticia:', error));
}

// Eliminar una noticia
function deleteNews(id) {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => loadNews())
            .catch(error => console.error('Error al eliminar la noticia:', error));
    }
}
