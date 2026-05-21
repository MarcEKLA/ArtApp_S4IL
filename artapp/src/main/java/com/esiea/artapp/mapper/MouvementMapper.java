package com.esiea.artapp.mapper;

import com.esiea.artapp.dto.MouvementDTO;
import com.esiea.artapp.entities.Mouvement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MouvementMapper {

    @Mapping(source = "idMouvement", target = "id")
    MouvementDTO toDTO(Mouvement mouvement);

    @Mapping(source = "id", target = "idMouvement")
    Mouvement toEntity(MouvementDTO dto);
}
