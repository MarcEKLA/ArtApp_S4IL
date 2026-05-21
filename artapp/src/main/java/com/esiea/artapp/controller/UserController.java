package com.esiea.artapp.controller;

import com.esiea.artapp.dto.ArtResponse;
import com.esiea.artapp.dto.UserDTO;
import com.esiea.artapp.entities.User;
import com.esiea.artapp.exception.ResourceNotFoundException;
import com.esiea.artapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ArtResponse<List<UserDTO>>> getAll() {
        List<UserDTO> users = userRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ArtResponse.ok(users, "Utilisateurs récupérés"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ArtResponse<Void>> delete(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Utilisateur non trouvé avec l'id : " + id);
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok(ArtResponse.ok(null, "Utilisateur supprimé"));
    }

    private UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setIdUser(user.getIdUser());
        dto.setNom(user.getNom());
        dto.setPrenom(user.getPrenom());
        dto.setEmail(user.getEmail());
        dto.setRoles(user.getRoles().stream()
                .map(r -> r.getRole())
                .collect(Collectors.toList()));
        return dto;
    }
}
