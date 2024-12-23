
package com.Master.NEWS.controller;

import com.Master.NEWS.model.News;
import com.Master.NEWS.service.NewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.ui.Model;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }
    @GetMapping("/")
    public String viewHomePage() {
    return "home";
    }

     @GetMapping("/news/list")
    public String viewNewsList(Model model) {
    model.addAttribute("newsList", newsService.getAllNews());
    return "news_list";
    }

    

    @PostMapping
    public News createNews(@RequestBody News news) {
        return newsService.createNews(news);
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News updatedNews) {
        try {
            return ResponseEntity.ok(newsService.updateNews(id, updatedNews));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}
