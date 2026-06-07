package com.valorantcompanion.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    private static final String STATUS = "UP";
    private static final String APPLICATION = "valorant-companion-api";

    @GetMapping
    public ResponseEntity<?> health(HttpServletRequest request) {
        String accept = request.getHeader("Accept");
        if (accept != null && accept.contains("text/html")) {
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(healthHtml());
        }
        return ResponseEntity.ok(Map.of(
                "status", STATUS,
                "application", APPLICATION
        ));
    }

    private static String healthHtml() {
        return """
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <title>Valorant Companion API — Health</title>
                  <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body {
                      min-height: 100dvh;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: 1.5rem;
                      font-family: system-ui, -apple-system, sans-serif;
                      background: #0a0a0a;
                      color: #f5f5f5;
                    }
                    main {
                      width: 100%;
                      max-width: 24rem;
                      border: 1px solid #262626;
                      border-radius: 0.75rem;
                      background: #141414;
                      padding: 1.5rem;
                    }
                    h1 {
                      font-size: 1.125rem;
                      font-weight: 600;
                      line-height: 1.4;
                      margin-bottom: 0.25rem;
                    }
                    p.subtitle {
                      font-size: 0.875rem;
                      color: #a3a3a3;
                      margin-bottom: 1.25rem;
                    }
                    dl {
                      display: grid;
                      gap: 0.75rem;
                    }
                    .row {
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      gap: 1rem;
                      font-size: 0.875rem;
                    }
                    dt { color: #a3a3a3; }
                    dd { font-weight: 500; text-align: right; }
                    .badge {
                      display: inline-flex;
                      align-items: center;
                      gap: 0.375rem;
                      padding: 0.125rem 0.5rem;
                      border-radius: 9999px;
                      background: #14532d;
                      color: #86efac;
                      font-size: 0.8125rem;
                      font-weight: 600;
                    }
                    .badge::before {
                      content: "";
                      width: 0.5rem;
                      height: 0.5rem;
                      border-radius: 50%;
                      background: #22c55e;
                    }
                    a {
                      display: block;
                      margin-top: 1.25rem;
                      font-size: 0.8125rem;
                      color: #a3a3a3;
                      text-align: center;
                      text-decoration: none;
                    }
                    a:hover { color: #f5f5f5; }
                  </style>
                </head>
                <body>
                  <main>
                    <h1>Valorant Companion API</h1>
                    <p class="subtitle">Status do serviço</p>
                    <dl>
                      <div class="row">
                        <dt>Status</dt>
                        <dd><span class="badge">UP</span></dd>
                      </div>
                      <div class="row">
                        <dt>Aplicação</dt>
                        <dd>valorant-companion-api</dd>
                      </div>
                    </dl>
                    <a href="/swagger-ui.html">Abrir documentação Swagger</a>
                  </main>
                </body>
                </html>
                """;
    }
}
