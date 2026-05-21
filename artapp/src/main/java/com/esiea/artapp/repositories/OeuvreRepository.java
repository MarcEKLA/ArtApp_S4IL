package com.esiea.artapp.repositories;

import com.esiea.artapp.entities.Oeuvre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OeuvreRepository extends JpaRepository<Oeuvre, Long> {

    Page<Oeuvre> findByTitreContains(String titre, Pageable pageable);

    List<Oeuvre> findByArtisteIdArtiste(Long idArtiste);
}
