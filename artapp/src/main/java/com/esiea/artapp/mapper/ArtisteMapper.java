package com.esiea.artapp.mapper;

import com.esiea.artapp.dto.ArtisteDTO;
import com.esiea.artapp.entities.Artiste;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArtisteMapper {

    @Mapping(source = "idArtiste", target = "id")
    ArtisteDTO toDTO(Artiste artiste);

    @Mapping(source = "id", target = "idArtiste")
    Artiste toEntity(ArtisteDTO dto);
}
