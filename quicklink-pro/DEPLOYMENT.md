# 🚀 Guida al Deployment

Guida passo-passo per mettere QuickLink Pro online.

## Opzione 1: Vercel (Più Semplice - CONSIGLIATA)

### Vantaggi
- ✅ Deploy gratuito
- ✅ SSL automatico
- ✅ CI/CD integrato
- ✅ Ottimo per Next.js
- ✅ Deploy in 5 minuti

### Step-by-Step

#### 1. Prepara il Codice

Se non hai ancora un repository Git:

```bash
cd quicklink-pro
git init
git add .
git commit -m "Initial commit"
```

Pusha su GitHub (crea prima un repo su github.com):

```bash
git remote add origin https://github.com/TUO-USERNAME/quicklink-pro.git
git branch -M main
git push -u origin main
```

#### 2. Crea Account Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca "Sign Up"
3. Registrati con GitHub

#### 3. Setup Database Esterno

**Opzione A - Vercel Postgres (Consigliato)**

1. Dal tuo progetto Vercel, vai su "Storage"
2. Clicca "Create Database" → "Postgres"
3. Copia il `DATABASE_URL`

**Opzione B - Supabase (Alternativa gratuita)**

1. Vai su [supabase.com](https://supabase.com)
2. Crea nuovo progetto
3. Vai su Settings → Database
4. Copia "Connection string" (transaction pooler mode)
5. Formato: `postgresql://postgres:[password]@[host]:6543/postgres`

**Opzione C - PlanetScale**

1. Vai su [planetscale.com](https://planetscale.com)
2. Crea database
3. Copia connection string

#### 4. Modifica per PostgreSQL

Nel file `prisma/schema.prisma`, cambia:

```prisma
datasource db {
  provider = "postgresql"  // era "sqlite"
  url      = env("DATABASE_URL")
}
```

#### 5. Deploy su Vercel

**Via Web Interface:**

1. Dal dashboard Vercel, clicca "Add New Project"
2. Importa il repository GitHub
3. Vercel rileverà automaticamente Next.js
4. Clicca "Deploy"

**Via CLI:**

```bash
# Installa Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

#### 6. Configura Environment Variables

Nel dashboard Vercel del tuo progetto:

1. Vai su "Settings" → "Environment Variables"
2. Aggiungi le seguenti variabili:

```
DATABASE_URL = postgresql://[il-tuo-database-url]
NEXTAUTH_SECRET = [genera-con-comando-sotto]
NEXTAUTH_URL = https://tuo-progetto.vercel.app
NEXT_PUBLIC_APP_URL = https://tuo-progetto.vercel.app
```

Per generare `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

#### 7. Inizializza Database

```bash
# Installa dipendenze localmente con il nuovo db url
DATABASE_URL="postgresql://..." npx prisma db push
```

O usa Prisma Studio per verificare:
```bash
DATABASE_URL="postgresql://..." npx prisma studio
```

#### 8. Redeploy

Dopo aver aggiunto le env variables:
- Vai su "Deployments"
- Clicca sui 3 puntini dell'ultimo deployment
- Clicca "Redeploy"

#### 9. Dominio Personalizzato (Opzionale)

1. Compra dominio su [Namecheap](https://namecheap.com) o [Google Domains](https://domains.google)
2. In Vercel, vai su "Settings" → "Domains"
3. Aggiungi il tuo dominio
4. Configura DNS come indicato da Vercel

**Costo dominio**: ~$10-15/anno

---

## Opzione 2: Railway

### Vantaggi
- ✅ Setup database automatico
- ✅ $5 credito gratuito
- ✅ Configurazione zero

### Step-by-Step

1. **Crea account su [railway.app](https://railway.app)**

2. **Nuovo Progetto:**
   - Clicca "New Project"
   - Seleziona "Deploy from GitHub repo"
   - Autorizza GitHub e seleziona il repository

3. **Railway Configurerà Automaticamente:**
   - Next.js build
   - PostgreSQL database
   - Environment variables

4. **Aggiungi Database:**
   - Nel progetto, clicca "New"
   - Seleziona "Database" → "PostgreSQL"
   - Railway creerà automaticamente `DATABASE_URL`

5. **Aggiungi Environment Variables:**

Vai su variabili e aggiungi:
```
NEXTAUTH_SECRET = [genera-con-openssl-rand-base64-32]
NEXTAUTH_URL = ${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_PUBLIC_APP_URL = ${{RAILWAY_PUBLIC_DOMAIN}}
```

6. **Modifica `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

7. **Trigger Deploy:**
- Push su GitHub
- Railway rebuilderà automaticamente

---

## Opzione 3: VPS (DigitalOcean, Linode, Hetzner)

### Vantaggi
- ✅ Controllo completo
- ✅ Può costare meno a lungo termine
- ❌ Più complesso

### Costo
- VPS base: $5-10/mese
- Consigliato: DigitalOcean Droplet $6/mese

### Step-by-Step

#### 1. Crea VPS

1. Crea account su [DigitalOcean](https://digitalocean.com)
2. Crea nuovo Droplet:
   - Ubuntu 22.04
   - Basic plan ($6/mese)
   - Scegli datacenter vicino ai tuoi utenti

#### 2. Connetti al Server

```bash
ssh root@TUO_IP_SERVER
```

#### 3. Setup Server

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Setup firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

#### 4. Setup PostgreSQL

```bash
# Diventa utente postgres
sudo -u postgres psql

# In psql:
CREATE DATABASE quicklinkpro;
CREATE USER quicklinkuser WITH PASSWORD 'tua-password-sicura';
GRANT ALL PRIVILEGES ON DATABASE quicklinkpro TO quicklinkuser;
\q
```

#### 5. Clone e Setup App

```bash
# Crea user app
adduser quicklink
su - quicklink

# Clone repo
git clone https://github.com/TUO-USERNAME/quicklink-pro.git
cd quicklink-pro

# Install dependencies
npm install

# Create .env
nano .env
```

Aggiungi in `.env`:
```env
DATABASE_URL="postgresql://quicklinkuser:tua-password@localhost:5432/quicklinkpro"
NEXTAUTH_SECRET="[genera-con-openssl]"
NEXTAUTH_URL="http://TUO_IP"
NEXT_PUBLIC_APP_URL="http://TUO_IP"
```

#### 6. Build e Start

```bash
# Generate Prisma
npx prisma generate
npx prisma db push

# Build
npm run build

# Test
npm start
```

Testa su `http://TUO_IP:3000`

#### 7. Setup PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "quicklink-pro" -- start

# Auto-start on reboot
pm2 startup
pm2 save
```

#### 8. Setup Nginx (Reverse Proxy)

```bash
# Come root
exit  # exit da user quicklink
apt install -y nginx

# Configura Nginx
nano /etc/nginx/sites-available/quicklink-pro
```

Aggiungi:
```nginx
server {
    listen 80;
    server_name TUO_DOMINIO_O_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/quicklink-pro /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 9. Setup SSL con Let's Encrypt

```bash
# Install certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d tuo-dominio.com

# Auto-renew
certbot renew --dry-run
```

---

## Testing del Deployment

Dopo il deploy, testa:

1. ✅ Homepage si carica
2. ✅ Registrazione utente funziona
3. ✅ Login funziona
4. ✅ Creazione link funziona
5. ✅ Redirect link funziona (visita un link breve)
6. ✅ Analytics vengono tracciate
7. ✅ Dashboard mostra statistiche

---

## Monitoring e Manutenzione

### Logging

**Vercel:**
- Dashboard → Logs (in tempo reale)

**Railway:**
- Dashboard → Deployment logs

**VPS:**
```bash
pm2 logs quicklink-pro
```

### Database Backup

**Vercel Postgres:**
- Vai su Storage → tuo database → Backups

**Manuale (PostgreSQL):**
```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

Automatizza con cron:
```bash
crontab -e

# Add line (backup giornaliero alle 2am):
0 2 * * * pg_dump postgresql://... > /backup/backup_$(date +\%Y\%m\%d).sql
```

### Monitoring Uptime

Usa servizi gratuiti:
- [UptimeRobot](https://uptimerobot.com) - Gratis, controlla ogni 5 min
- [Pingdom](https://pingdom.com) - Free tier disponibile
- [StatusCake](https://statuscake.com) - Free tier disponibile

---

## Troubleshooting

### "Internal Server Error" dopo deploy

1. Controlla logs
2. Verifica environment variables
3. Controlla DATABASE_URL sia corretto
4. Verifica che Prisma sia stato generato: aggiungi al build command `prisma generate`

### Database connection error

1. Verifica DATABASE_URL
2. Per PostgreSQL, assicurati di usare SSL: aggiungi `?sslmode=require` alla fine dell'URL
3. Verifica che IP del server sia whitelisted nel database

### NextAuth error

1. Verifica NEXTAUTH_SECRET sia settato
2. Verifica NEXTAUTH_URL corrisponda al dominio
3. In produzione, usa sempre HTTPS

---

## Costi Mensili Stimati

### Setup Minimo (Gratis - $10/mese)
- Vercel: Gratis
- Database (Vercel Postgres): Gratis (fino a 256MB)
- Dominio: ~$1/mese (se annuale)
- **Totale: $0-1/mese**

### Setup Professionale ($20-30/mese)
- Railway Pro: $5/mese (dopo credito gratis)
- Database: $5-10/mese
- Dominio: $1/mese
- Monitoring: Gratis
- **Totale: $11-16/mese**

### Setup VPS ($15-25/mese)
- DigitalOcean Droplet: $6/mese
- Database (incluso): $0
- Backups: $1.20/mese
- Dominio: $1/mese
- Monitoring: Gratis
- **Totale: $8-10/mese**

---

## Scaling per Crescita

Quando raggiungi 1000+ utenti attivi:

1. **Upgrade database**: Passa a piano superiore
2. **CDN**: Usa Vercel Edge Network (incluso) o Cloudflare
3. **Caching**: Implementa Redis per session storage
4. **Multiple regions**: Deploy in più datacenter
5. **Load balancing**: Se usi VPS, aggiungi load balancer

---

## Supporto

Problemi con il deployment?

1. Controlla logs del servizio
2. Leggi documentazione ufficiale:
   - [Vercel Docs](https://vercel.com/docs)
   - [Railway Docs](https://docs.railway.app)
   - [Next.js Deployment](https://nextjs.org/docs/deployment)
3. Cerca su Google l'errore specifico

---

**Buon deployment! 🚀**

Una volta online, il tuo QuickLink Pro sarà accessibile 24/7 da tutto il mondo!
