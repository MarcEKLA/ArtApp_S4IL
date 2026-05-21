package com.esiea.artapp.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mouvement")
public class Mouvement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMouvement;

    @Column(nullable = false, unique = true)
    private String nom;

    @Column
    private String couleur;

    @ManyToMany(mappedBy = "mouvements")
    private List<Oeuvre> oeuvres = new ArrayList<>();

    public Mouvement() {}

    public Long getIdMouvement() { return idMouvement; }
    public void setIdMouvement(Long idMouvement) { this.idMouvement = idMouvement; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCouleur() { return couleur; }
    public void setCouleur(String couleur) { this.couleur = couleur; }

    public List<Oeuvre> getOeuvres() { return oeuvres; }
    public void setOeuvres(List<Oeuvre> oeuvres) { this.oeuvres = oeuvres; }
}
