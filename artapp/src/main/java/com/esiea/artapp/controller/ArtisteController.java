package com.esiea.artapp.controller;

import com.esiea.artapp.dto.ArtisteDTO;
import com.esiea.artapp.dto.ArtResponse;
import com.esiea.artapp.entities.Artiste;
import com.esiea.artapp.exception.ResourceNotFoundException;
import com.esiea.artapp.mapper.ArtisteMapper;
import com.esiea.artapp.repositories.ArtisteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/artistes")
public class ArtisteController {

    @Autowired
    private ArtisteRepository artisteRepository;

    @Autowired
    private ArtisteMapper artisteMapper;

    @GetMapping
    public ResponseEntity<ArtResponse<List<ArtisteDTO>>> getAll() {
        List<ArtisteDTO> artistes = artisteRepository.findAll()
                .stream()
                .map(artisteMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ArtResponse.ok(artistes, "Artistes récupérés"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtResponse<ArtisteDTO>> getById(@PathVariable Long id) {
        Artiste artiste = artisteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Artiste non trouvé avec l'id : " + id));
        return ResponseEntity.ok(ArtResponse.ok(artisteMapper.toDTO(artiste)));
    }

    @PostMapping
    public ResponseEntity<ArtResponse<ArtisteDTO>> create(@Valid @RequestBody ArtisteDTO dto) {
        Artiste artiste = artisteMapper.toEntity(dto);
        Artiste saved = artisteRepository.save(artiste);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ArtResponse.created(artisteMapper.toDTO(saved), "Artiste créé"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ArtResponse<Void>> delete(@PathVariable Long id) {
        if (!artisteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Artiste non trouvé avec l'id : " + id);
        }
        artisteRepository.deleteById(id);
        return ResponseEntity.ok(ArtResponse.ok(null, "Artiste supprimé"));
    }
}
