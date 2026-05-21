package com.esiea.artapp.controller;

import com.esiea.artapp.dto.ArtResponse;
import com.esiea.artapp.dto.OeuvreCreateDTO;
import com.esiea.artapp.dto.OeuvreResponseDTO;
import com.esiea.artapp.dto.PageDTO;
import com.esiea.artapp.service.OeuvreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/oeuvres")
public class OeuvreController {

    @Autowired
    private OeuvreService oeuvreService;

    @GetMapping
    public ResponseEntity<ArtResponse<PageDTO<OeuvreResponseDTO>>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "titre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        PageDTO<OeuvreResponseDTO> result = oeuvreService.getAllPaginated(page, size, sortBy, direction);
        return ResponseEntity.ok(ArtResponse.ok(result, "Oeuvres récupérées"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtResponse<OeuvreResponseDTO>> getById(@PathVariable Long id) {
        OeuvreResponseDTO oeuvre = oeuvreService.getOeuvreById(id);
        return ResponseEntity.ok(ArtResponse.ok(oeuvre, "Oeuvre trouvée"));
    }

    @PostMapping
    public ResponseEntity<ArtResponse<OeuvreResponseDTO>> create(
            @Valid @RequestBody OeuvreCreateDTO dto) {
        OeuvreResponseDTO created = oeuvreService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ArtResponse.created(created, "Oeuvre créée avec succès"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArtResponse<OeuvreResponseDTO>> update(
            @PathVariable Long id,
            @Valid @RequestBody OeuvreCreateDTO dto) {
        OeuvreResponseDTO updated = oeuvreService.update(id, dto);
        return ResponseEntity.ok(ArtResponse.ok(updated, "Oeuvre mise à jour"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ArtResponse<Void>> delete(@PathVariable Long id) {
        oeuvreService.delete(id);
        return ResponseEntity.ok(ArtResponse.ok(null, "Oeuvre supprimée"));
    }

    @GetMapping("/search")
    public ResponseEntity<ArtResponse<PageDTO<OeuvreResponseDTO>>> search(
            @RequestParam(required = false) String titre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageDTO<OeuvreResponseDTO> result = oeuvreService.searchByTitre(titre, page, size);
        return ResponseEntity.ok(ArtResponse.ok(result, "Résultats de recherche"));
    }

    @PostMapping("/{id}/tags/{tagId}")
    public ResponseEntity<ArtResponse<OeuvreResponseDTO>> addTag(
            @PathVariable Long id, @PathVariable Long tagId) {
        OeuvreResponseDTO result = oeuvreService.addMouvement(id, tagId);
        return ResponseEntity.ok(ArtResponse.ok(result, "Mouvement ajouté"));
    }

    @DeleteMapping("/{id}/tags/{tagId}")
    public ResponseEntity<ArtResponse<OeuvreResponseDTO>> removeTag(
            @PathVariable Long id, @PathVariable Long tagId) {
        OeuvreResponseDTO result = oeuvreService.removeMouvement(id, tagId);
        return ResponseEntity.ok(ArtResponse.ok(result, "Mouvement retiré"));
    }
}
