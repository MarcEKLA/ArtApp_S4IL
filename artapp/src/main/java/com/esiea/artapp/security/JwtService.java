package com.esiea.artapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    @Value("${jwt.prefix}")
    private String prefix;

    public String getPrefix() { return prefix; }

    public String generateToken(UserDetails userDetails) {
        List<String> roles = new ArrayList<>();
        userDetails.getAuthorities()
                .forEach(a -> roles.add(a.getAuthority()));

        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withArrayClaim("roles", roles.toArray(new String[0]))
                .withExpiresAt(new Date(System.currentTimeMillis() + expiration))
                .sign(Algorithm.HMAC256(secret));
    }

    public DecodedJWT validateToken(String token) {
        return JWT.require(Algorithm.HMAC256(secret))
                .build().verify(token);
    }

    public String extractUsername(String token) {
        return validateToken(token).getSubject();
    }

    public List<String> extractRoles(String token) {
        return validateToken(token).getClaim("roles").asList(String.class);
    }
}
