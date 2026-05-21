package com.esiea.artapp.dto;

public class ArtisteDTO {

    private Long id;
    private String nom;
    private String courant;

    public ArtisteDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCourant() { return courant; }
    public void setCourant(String courant) { this.courant = courant; }
}
