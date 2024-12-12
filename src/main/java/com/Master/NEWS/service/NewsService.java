
package com.Master.NEWS.service;

import com.Master.NEWS.model.News;
import com.Master.NEWS.repository.NewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public News createNews(News news) {
        news.setCreatedAt(java.time.LocalDateTime.now());
        return newsRepository.save(news);
    }

    public News updateNews(Long id, News updatedNews) {
        return newsRepository.findById(id).map(news -> {
            news.setTitle(updatedNews.getTitle());
            news.setContent(updatedNews.getContent());
            return newsRepository.save(news);
        }).orElseThrow(() -> new RuntimeException("Noticia no encontrada"));
    }

    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }
}
