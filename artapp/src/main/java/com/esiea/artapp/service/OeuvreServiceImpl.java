package com.esiea.artapp.service;

import com.esiea.artapp.dto.OeuvreCreateDTO;
import com.esiea.artapp.dto.OeuvreResponseDTO;
import com.esiea.artapp.dto.PageDTO;
import com.esiea.artapp.entities.Artiste;
import com.esiea.artapp.entities.Mouvement;
import com.esiea.artapp.entities.Oeuvre;
import com.esiea.artapp.exception.ResourceNotFoundException;
import com.esiea.artapp.mapper.OeuvreMapper;
import com.esiea.artapp.repositories.ArtisteRepository;
import com.esiea.artapp.repositories.MouvementRepository;
import com.esiea.artapp.repositories.OeuvreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OeuvreServiceImpl implements OeuvreService {

    @Autowired
    private OeuvreRepository oeuvreRepository;

    @Autowired
    private ArtisteRepository artisteRepository;

    @Autowired
    private MouvementRepository mouvementRepository;

    @Autowired
    private OeuvreMapper oeuvreMapper;

    @Override
    public OeuvreResponseDTO create(OeuvreCreateDTO dto) {
        Artiste artiste = artisteRepository.findById(dto.getArtisteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Artiste non trouvé avec l'id : " + dto.getArtisteId()));
        Oeuvre oeuvre = oeuvreMapper.toEntity(dto);
        oeuvre.setArtiste(artiste);
        Oeuvre saved = oeuvreRepository.save(oeuvre);
        return oeuvreMapper.toDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OeuvreResponseDTO getOeuvreById(Long id) {
        Oeuvre oeuvre = oeuvreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Oeuvre non trouvée avec l'id : " + id));
        return oeuvreMapper.toDTO(oeuvre);
    }

    @Override
    @Transactional(readOnly = true)
    public PageDTO<OeuvreResponseDTO> getAllPaginated(int page, int size,
                                                      String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Oeuvre> pageResult = oeuvreRepository.findAll(pageable);
        Page<OeuvreResponseDTO> dtoPage = pageResult.map(oeuvreMapper::toDTO);
        return PageDTO.from(dtoPage);
    }

    @Override
    public OeuvreResponseDTO update(Long id, OeuvreCreateDTO dto) {
        Oeuvre oeuvre = oeuvreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Oeuvre non trouvée avec l'id : " + id));
        oeuvreMapper.updateEntity(dto, oeuvre);
        if (dto.getArtisteId() != null) {
            Artiste artiste = artisteRepository.findById(dto.getArtisteId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Artiste non trouvé avec l'id : " + dto.getArtisteId()));
            oeuvre.setArtiste(artiste);
        }
        return oeuvreMapper.toDTO(oeuvre);
    }

    @Override
    public void delete(Long id) {
        if (!oeuvreRepository.existsById(id)) {
            throw new ResourceNotFoundException("Oeuvre non trouvée avec l'id : " + id);
        }
        oeuvreRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PageDTO<OeuvreResponseDTO> searchByTitre(String titre, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Oeuvre> pageResult;

        if (titre == null || titre.isBlank()) {
            pageResult = oeuvreRepository.findAll(pageable);
        } else {
            pageResult = oeuvreRepository.findByTitreContains(titre, pageable);
        }
        return PageDTO.from(pageResult.map(oeuvreMapper::toDTO));
    }

    @Override
    public OeuvreResponseDTO addMouvement(Long oeuvreId, Long mouvementId) {
        Oeuvre oeuvre = oeuvreRepository.findById(oeuvreId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Oeuvre non trouvée avec l'id : " + oeuvreId));
        Mouvement mouvement = mouvementRepository.findById(mouvementId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Mouvement non trouvé avec l'id : " + mouvementId));
        if (!oeuvre.getMouvements().contains(mouvement)) {
            oeuvre.getMouvements().add(mouvement);
        }
        return oeuvreMapper.toDTO(oeuvre);
    }

    @Override
    public OeuvreResponseDTO removeMouvement(Long oeuvreId, Long mouvementId) {
        Oeuvre oeuvre = oeuvreRepository.findById(oeuvreId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Oeuvre non trouvée avec l'id : " + oeuvreId));
        Mouvement mouvement = mouvementRepository.findById(mouvementId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Mouvement non trouvé avec l'id : " + mouvementId));
        oeuvre.getMouvements().remove(mouvement);
        return oeuvreMapper.toDTO(oeuvre);
    }
}
