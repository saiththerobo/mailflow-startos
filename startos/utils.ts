export const uiPort = 80
export const backendPort = 3000

// HTTP-only nginx config written to the frontend container's rootfs at startup.
// Replaces the image's default config (which has both HTTP and HTTPS blocks and
// hardcodes "backend" as the upstream hostname).  Here we drop the HTTPS block
// (StartOS terminates TLS upstream) and point the proxy at 127.0.0.1 (all
// subcontainers in a StartOS service share the same network namespace).
export const nginxConf = `server {
    listen 80;
    server_name _;

    add_header X-Content-Type-Options    "nosniff" always;
    add_header X-Frame-Options           "SAMEORIGIN" always;
    add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy        "camera=(), microphone=(), geolocation=()" always;
    add_header Content-Security-Policy   "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data: https:; img-src 'self' data: https: blob:; connect-src 'self' wss: ws:; frame-src 'self'; object-src 'none'; base-uri 'self';" always;

    root /usr/share/nginx/html;
    index index.html;

    client_max_body_size 50m;

    proxy_buffer_size       128k;
    proxy_buffers           4 256k;
    proxy_busy_buffers_size 256k;

    location /oauth/ {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_read_timeout 30s;
    }

    location /auth/oidc/ {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_read_timeout 30s;
    }

    location /api/ {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_read_timeout 60s;
    }

    location /ws {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_read_timeout 86400s;
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-store" always;
        add_header X-Content-Type-Options    "nosniff" always;
        add_header X-Frame-Options           "SAMEORIGIN" always;
        add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy        "camera=(), microphone=(), geolocation=()" always;
        add_header Content-Security-Policy   "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data: https:; img-src 'self' data: https: blob:; connect-src 'self' wss: ws:; frame-src 'self'; object-src 'none'; base-uri 'self';" always;
    }

    location = /sw.js {
        add_header Cache-Control "no-store" always;
        add_header X-Content-Type-Options    "nosniff" always;
        add_header X-Frame-Options           "SAMEORIGIN" always;
        add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
        add_header Permissions-Policy        "camera=(), microphone=(), geolocation=()" always;
        add_header Content-Security-Policy   "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data: https:; img-src 'self' data: https: blob:; connect-src 'self' wss: ws:; frame-src 'self'; object-src 'none'; base-uri 'self';" always;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
`
