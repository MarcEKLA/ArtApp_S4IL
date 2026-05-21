package com.esiea.artapp.repositories;

import com.esiea.artapp.entities.Artiste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtisteRepository extends JpaRepository<Artiste, Long> {

}
