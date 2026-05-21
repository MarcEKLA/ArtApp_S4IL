package com.esiea.artapp.mapper;

import com.esiea.artapp.entities.Oeuvre;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class OeuvreMapperTest {

    private final OeuvreMapper mapper = new OeuvreMapperImpl();

    @Test
    void calculerPrixTotal_doitRetournerLaValeurDeLaFiche() {

        Oeuvre oeuvre = new Oeuvre();
        oeuvre.setPrix(100.0);          
        oeuvre.setNbTirage(3);          
        oeuvre.setAnneeCreation(1920);  

        Double result = mapper.calculerPrixTotal(oeuvre);

        assertEquals(600.0, result, 0.001);
    }

    @Test
    void calculerPrixTotal_oeuvreRecente_coefUn() {

        Oeuvre oeuvre = new Oeuvre();
        oeuvre.setPrix(100.0);
        oeuvre.setNbTirage(3);
        oeuvre.setAnneeCreation(2000); 

        Double result = mapper.calculerPrixTotal(oeuvre);

        assertEquals(300.0, result, 0.001);
    }
}
