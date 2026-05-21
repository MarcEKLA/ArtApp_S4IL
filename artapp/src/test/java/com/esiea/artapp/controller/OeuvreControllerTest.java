package com.esiea.artapp.controller;

import com.esiea.artapp.dto.OeuvreResponseDTO;
import com.esiea.artapp.security.JwtService;
import com.esiea.artapp.security.MyUserDetailsService;
import com.esiea.artapp.service.OeuvreService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OeuvreController.class)
class OeuvreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OeuvreService oeuvreService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MyUserDetailsService myUserDetailsService;

    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    @WithMockUser
    void getById_doitRenvoyerLeBonChampArtisteFullName() throws Exception {
        OeuvreResponseDTO dto = new OeuvreResponseDTO();
        dto.setId(1L);
        dto.setArtisteFullName("Monet (Impressionnisme)");
        dto.setTitre("Les Nymphéas");
        dto.setPrixTotal(600.0);

        when(oeuvreService.getOeuvreById(1L)).thenReturn(dto);

        mockMvc.perform(get("/api/oeuvres/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.artisteFullName").value("Monet (Impressionnisme)"))
                .andExpect(jsonPath("$.data.titre").value("Les Nymphéas"));
    }
}
