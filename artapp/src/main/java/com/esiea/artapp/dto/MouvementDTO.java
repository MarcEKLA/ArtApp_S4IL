package com.esiea.artapp.dto;

public class MouvementDTO {

    private Long id;
    private String nom;
    private String couleur;  

    public MouvementDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCouleur() { return couleur; }
    public void setCouleur(String couleur) { this.couleur = couleur; }
}
