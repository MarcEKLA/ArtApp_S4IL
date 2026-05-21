package com.esiea.artapp.mapper;

import com.esiea.artapp.dto.OeuvreCreateDTO;
import com.esiea.artapp.dto.OeuvreResponseDTO;
import com.esiea.artapp.entities.Oeuvre;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {MouvementMapper.class})
public interface OeuvreMapper {

    @Mapping(target = "idOeuvre", ignore = true)
    @Mapping(target = "artiste", ignore = true)
    @Mapping(target = "dateAjout", ignore = true)
    @Mapping(target = "disponible", ignore = true)
    @Mapping(target = "mouvements", ignore = true)
    Oeuvre toEntity(OeuvreCreateDTO dto);

    @Mapping(target = "artisteFullName", expression = "java(buildArtisteFullName(oeuvre))")
    @Mapping(target = "prixTotal", expression = "java(calculerPrixTotal(oeuvre))")
    @Mapping(source = "mouvements", target = "tags")
    @Mapping(source = "idOeuvre", target = "id")
    OeuvreResponseDTO toDTO(Oeuvre oeuvre);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "idOeuvre", ignore = true)
    @Mapping(target = "artiste", ignore = true)
    @Mapping(target = "dateAjout", ignore = true)
    @Mapping(target = "disponible", ignore = true)
    @Mapping(target = "mouvements", ignore = true)
    void updateEntity(OeuvreCreateDTO dto, @MappingTarget Oeuvre oeuvre);

    default String buildArtisteFullName(Oeuvre oeuvre) {
        if (oeuvre.getArtiste() == null) {
            return null;
        }
        String nom = oeuvre.getArtiste().getNom();
        String courant = oeuvre.getArtiste().getCourant();
        if (courant != null && !courant.isBlank()) {
            return nom + " (" + courant + ")";
        }
        return nom;
    }

    default Double calculerPrixTotal(Oeuvre oeuvre) {
        if (oeuvre.getPrix() == null || oeuvre.getNbTirage() == null
                || oeuvre.getAnneeCreation() == null) {
            return 0.0;
        }
        double coef = oeuvre.getAnneeCreation() < 1950 ? 2.0 : 1.0;
        return oeuvre.getPrix() * oeuvre.getNbTirage() * coef;
    }
}
