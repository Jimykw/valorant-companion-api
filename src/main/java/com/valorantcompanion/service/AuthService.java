package com.valorantcompanion.service;

import com.valorantcompanion.domain.entity.User;
import com.valorantcompanion.domain.enums.Role;
import com.valorantcompanion.dto.request.LoginRequest;
import com.valorantcompanion.dto.request.RegisterRequest;
import com.valorantcompanion.dto.response.AuthResponse;
import com.valorantcompanion.dto.response.UserResponse;
import com.valorantcompanion.exception.BusinessException;
import com.valorantcompanion.mapper.EntityMapper;
import com.valorantcompanion.repository.UserRepository;
import com.valorantcompanion.security.JwtService;
import com.valorantcompanion.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException("E-mail já cadastrado");
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new BusinessException("Username já cadastrado");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .build();

        return EntityMapper.toUserResponse(userRepository.save(user));
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException("Usuário não encontrado"));

        UserPrincipal principal = new UserPrincipal(user);
        String token = jwtService.generateToken(principal);

        return new AuthResponse(token, "Bearer", jwtService.getExpirationMs());
    }
}
