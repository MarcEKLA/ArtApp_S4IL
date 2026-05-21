package com.esiea.artapp.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OeuvreResponseDTO {

    private Long id;
    private String titre;
    private String technique;
    private Double prix;
    private Integer nbTirage;

    private String artisteFullName;

    private Boolean disponible;
    private Double prixTotal;        
    private LocalDateTime dateAjout;
    private Integer anneeCreation;   

    private List<MouvementDTO> tags;

    public OeuvreResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getTechnique() { return technique; }
    public void setTechnique(String technique) { this.technique = technique; }

    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }

    public Integer getNbTirage() { return nbTirage; }
    public void setNbTirage(Integer nbTirage) { this.nbTirage = nbTirage; }

    public String getArtisteFullName() { return artisteFullName; }
    public void setArtisteFullName(String artisteFullName) { this.artisteFullName = artisteFullName; }

    public Boolean getDisponible() { return disponible; }
    public void setDisponible(Boolean disponible) { this.disponible = disponible; }

    public Double getPrixTotal() { return prixTotal; }
    public void setPrixTotal(Double prixTotal) { this.prixTotal = prixTotal; }

    public LocalDateTime getDateAjout() { return dateAjout; }
    public void setDateAjout(LocalDateTime dateAjout) { this.dateAjout = dateAjout; }

    public Integer getAnneeCreation() { return anneeCreation; }
    public void setAnneeCreation(Integer anneeCreation) { this.anneeCreation = anneeCreation; }

    public List<MouvementDTO> getTags() { return tags; }
    public void setTags(List<MouvementDTO> tags) { this.tags = tags; }
}
