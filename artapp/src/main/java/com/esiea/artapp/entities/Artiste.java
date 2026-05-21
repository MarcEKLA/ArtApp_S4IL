package com.esiea.artapp.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "artiste_art")
public class Artiste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idArtiste;

    @Column(nullable = false)
    private String nom;

    @Column
    private String courant;

    @OneToMany(mappedBy = "artiste")
    private List<Oeuvre> oeuvres = new ArrayList<>();

    public Artiste() {}

    public Long getIdArtiste() { return idArtiste; }
    public void setIdArtiste(Long idArtiste) { this.idArtiste = idArtiste; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCourant() { return courant; }
    public void setCourant(String courant) { this.courant = courant; }

    public List<Oeuvre> getOeuvres() { return oeuvres; }
    public void setOeuvres(List<Oeuvre> oeuvres) { this.oeuvres = oeuvres; }
}
