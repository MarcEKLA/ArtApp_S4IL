package com.esiea.artapp.dto;

import jakarta.validation.constraints.*;

public class OeuvreCreateDTO {

    @NotBlank(message = "Le titre est obligatoire")
    private String titre;

    @NotBlank(message = "La technique est obligatoire")
    private String technique;

    @NotNull(message = "Le prix est obligatoire")
    @Positive(message = "Le prix doit être positif")
    private Double prix;

    @NotNull(message = "Le nombre de tirages est obligatoire")
    @Min(value = 1, message = "Le nombre de tirages doit être au moins 1")
    private Integer nbTirage;

    @NotNull(message = "L'identifiant de l'artiste est obligatoire")
    private Long artisteId;

    @NotNull(message = "L'année de création est obligatoire")
    @Min(value = 1000, message = "L'année doit être au moins 1000")
    @Max(value = 2100, message = "L'année doit être au maximum 2100")
    private Integer anneeCreation;

    public OeuvreCreateDTO() {}

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getTechnique() { return technique; }
    public void setTechnique(String technique) { this.technique = technique; }

    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }

    public Integer getNbTirage() { return nbTirage; }
    public void setNbTirage(Integer nbTirage) { this.nbTirage = nbTirage; }

    public Long getArtisteId() { return artisteId; }
    public void setArtisteId(Long artisteId) { this.artisteId = artisteId; }

    public Integer getAnneeCreation() { return anneeCreation; }
    public void setAnneeCreation(Integer anneeCreation) { this.anneeCreation = anneeCreation; }
}
