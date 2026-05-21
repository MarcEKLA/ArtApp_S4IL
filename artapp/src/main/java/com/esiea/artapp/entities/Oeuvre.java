package com.esiea.artapp.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "oeuvre")
public class Oeuvre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOeuvre;

    @Column(nullable = false)
    private String titre;

    @Column
    private String technique;

    @Column
    private Double prix;

    @Column
    private Integer nbTirage;

    @Column
    private LocalDateTime dateAjout;

    @Column
    private Boolean disponible;

    @Min(1000)
    @Max(2100)
    @Column
    private Integer anneeCreation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artiste_id")
    private Artiste artiste;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "oeuvre_mouvement",
        joinColumns = @JoinColumn(name = "oeuvre_id"),
        inverseJoinColumns = @JoinColumn(name = "mouvement_id")
    )
    private List<Mouvement> mouvements = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.dateAjout = LocalDateTime.now();
        if (this.disponible == null) {
            this.disponible = true;
        }
    }

    public Oeuvre() {}

    public Long getIdOeuvre() { return idOeuvre; }
    public void setIdOeuvre(Long idOeuvre) { this.idOeuvre = idOeuvre; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getTechnique() { return technique; }
    public void setTechnique(String technique) { this.technique = technique; }

    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }

    public Integer getNbTirage() { return nbTirage; }
    public void setNbTirage(Integer nbTirage) { this.nbTirage = nbTirage; }

    public LocalDateTime getDateAjout() { return dateAjout; }
    public void setDateAjout(LocalDateTime dateAjout) { this.dateAjout = dateAjout; }

    public Boolean getDisponible() { return disponible; }
    public void setDisponible(Boolean disponible) { this.disponible = disponible; }

    public Integer getAnneeCreation() { return anneeCreation; }
    public void setAnneeCreation(Integer anneeCreation) { this.anneeCreation = anneeCreation; }

    public Artiste getArtiste() { return artiste; }
    public void setArtiste(Artiste artiste) { this.artiste = artiste; }

    public List<Mouvement> getMouvements() { return mouvements; }
    public void setMouvements(List<Mouvement> mouvements) { this.mouvements = mouvements; }
}
