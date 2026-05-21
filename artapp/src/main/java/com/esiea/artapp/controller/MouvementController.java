package com.esiea.artapp.controller;

import com.esiea.artapp.dto.ArtResponse;
import com.esiea.artapp.dto.MouvementDTO;
import com.esiea.artapp.entities.Mouvement;
import com.esiea.artapp.exception.ResourceNotFoundException;
import com.esiea.artapp.mapper.MouvementMapper;
import com.esiea.artapp.repositories.MouvementRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tags")
public class MouvementController {

    @Autowired
    private MouvementRepository mouvementRepository;

    @Autowired
    private MouvementMapper mouvementMapper;

    @GetMapping
    public ResponseEntity<ArtResponse<List<MouvementDTO>>> getAll() {
        List<MouvementDTO> mouvements = mouvementRepository.findAll()
                .stream()
                .map(mouvementMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ArtResponse.ok(mouvements, "Mouvements récupérés"));
    }

    @PostMapping
    public ResponseEntity<ArtResponse<MouvementDTO>> create(@Valid @RequestBody MouvementDTO dto) {
        Mouvement mouvement = mouvementMapper.toEntity(dto);
        Mouvement saved = mouvementRepository.save(mouvement);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ArtResponse.created(mouvementMapper.toDTO(saved), "Mouvement créé"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ArtResponse<Void>> delete(@PathVariable Long id) {
        if (!mouvementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Mouvement non trouvé avec l'id : " + id);
        }
        mouvementRepository.deleteById(id);
        return ResponseEntity.ok(ArtResponse.ok(null, "Mouvement supprimé"));
    }
}
