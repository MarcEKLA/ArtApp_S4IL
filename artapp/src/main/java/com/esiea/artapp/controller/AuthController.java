package com.esiea.artapp.controller;

import com.esiea.artapp.dto.*;
import com.esiea.artapp.entities.*;
import com.esiea.artapp.exception.ResourceNotFoundException;
import com.esiea.artapp.repositories.*;
import com.esiea.artapp.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<ArtResponse<Map<String, Object>>> login(
            @Valid @RequestBody LoginRequestDTO dto) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .collect(Collectors.toList());

        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("username", userDetails.getUsername());
        data.put("roles", roles);

        return ResponseEntity.ok(ArtResponse.ok(data, "Connexion réussie"));
    }

    @PostMapping("/api/users/register")
    public ResponseEntity<ArtResponse<UserDTO>> register(
            @Valid @RequestBody RegisterDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ArtResponse.error("Cet email est déjà utilisé"));
        }

        Role roleUser = roleRepository.findByRole("USER")
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Rôle USER introuvable — insérez les rôles en base"));

        User user = new User();
        user.setNom(dto.getNom());
        user.setPrenom(dto.getPrenom());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        Set<Role> roles = new HashSet<>();
        roles.add(roleUser);
        user.setRoles(roles);

        User saved = userRepository.save(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setIdUser(saved.getIdUser());
        userDTO.setNom(saved.getNom());
        userDTO.setPrenom(saved.getPrenom());
        userDTO.setEmail(saved.getEmail());
        userDTO.setRoles(List.of("USER"));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ArtResponse.created(userDTO, "Inscription réussie"));
    }
}
