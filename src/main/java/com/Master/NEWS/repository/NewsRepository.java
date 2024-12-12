
package com.Master.NEWS.repository;

import com.Master.NEWS.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
    
}