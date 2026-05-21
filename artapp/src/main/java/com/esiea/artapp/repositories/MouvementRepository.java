package com.esiea.artapp.repositories;

import com.esiea.artapp.entities.Mouvement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MouvementRepository extends JpaRepository<Mouvement, Long> {

    Optional<Mouvement> findByNom(String nom);
}
