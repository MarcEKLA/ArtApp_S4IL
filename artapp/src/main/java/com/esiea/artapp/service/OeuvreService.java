package com.esiea.artapp.service;

import com.esiea.artapp.dto.OeuvreCreateDTO;
import com.esiea.artapp.dto.OeuvreResponseDTO;
import com.esiea.artapp.dto.PageDTO;

public interface OeuvreService {

    OeuvreResponseDTO create(OeuvreCreateDTO dto);

    OeuvreResponseDTO getOeuvreById(Long id);

    PageDTO<OeuvreResponseDTO> getAllPaginated(int page, int size, String sortBy, String direction);

    OeuvreResponseDTO update(Long id, OeuvreCreateDTO dto);

    void delete(Long id);

    PageDTO<OeuvreResponseDTO> searchByTitre(String titre, int page, int size);

    OeuvreResponseDTO addMouvement(Long oeuvreId, Long mouvementId);

    OeuvreResponseDTO removeMouvement(Long oeuvreId, Long mouvementId);
}
