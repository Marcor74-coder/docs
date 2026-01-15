# ⚡ QuickLink Pro - URL Shortener SaaS

Un servizio completo di URL shortening con analytics avanzate, pronto per generare entrate ricorrenti.

## 🎯 Panoramica

QuickLink Pro è un'applicazione SaaS completa che permette agli utenti di:
- Creare link brevi e memorabili
- Tracciare analytics dettagliate su ogni click
- Gestire un numero illimitato di link (con piano Pro)
- Visualizzare statistiche in tempo reale

## ✨ Caratteristiche

### Per gli Utenti
- **Link Brevi Personalizzati**: Crea alias personalizzati o usa codici generati automaticamente
- **Analytics Dettagliate**: Traccia dispositivi, browser, sistemi operativi, e referrer
- **Dashboard Intuitiva**: Interfaccia moderna e facile da usare
- **Modello Freemium**: Piano gratuito (50 link) e Pro (illimitato) a $19/mese

### Stack Tecnologico
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite con Prisma ORM
- **Autenticazione**: NextAuth.js
- **Analytics**: Sistema custom di tracking

## 🚀 Avvio Rapido (ONE-CLICK)

### Prerequisiti
- Node.js 18+ installato ([Download](https://nodejs.org/))

### Avvio con UN SOLO COMANDO

**Su Linux/Mac:**
```bash
./start.sh
```

**Su Windows:**
```batch
start.bat
```

Lo script automaticamente:
1. ✅ Verifica i prerequisiti
2. 📦 Installa tutte le dipendenze
3. 🗄️ Configura il database
4. 🚀 Avvia l'applicazione

L'app sarà disponibile su **http://localhost:3000**

## 📖 Guida Completa

### Installazione Manuale (Opzionale)

Se preferisci installare manualmente:

```bash
# 1. Installa le dipendenze
npm install

# 2. Genera Prisma Client
npx prisma generate

# 3. Crea il database
npx prisma db push

# 4. Avvia in development
npm run dev
```

### Primo Utilizzo

1. **Apri l'applicazione**: Vai su http://localhost:3000
2. **Crea un account**: Clicca su "Get Started" e registrati
3. **Crea il tuo primo link**: Nella dashboard, inserisci un URL lungo
4. **Condividi**: Copia il link breve e condividilo ovunque
5. **Monitora**: Guarda le statistiche in tempo reale nella dashboard

## 💰 Modello di Business

### Piano Gratuito
- 50 link al mese
- Analytics di base
- Supporto standard
- **Costo**: $0/mese

### Piano Pro
- Link **illimitati**
- Analytics avanzate ed export
- Domini personalizzati
- Supporto prioritario
- **Costo**: $19/mese

### Potenziale di Guadagno

**Per raggiungere $1000/mese:**
- Hai bisogno di ~53 clienti Pro ($19 × 53 = $1,007)
- Oppure un mix di clienti free + conversione a Pro

**Strategia suggerita:**
1. **Marketing iniziale**: Social media, Product Hunt, Reddit
2. **SEO**: Ottimizza per "url shortener", "link shortener"
3. **Content marketing**: Blog su marketing digitale
4. **Freemium**: Acquisisci utenti free, converti al 5-10% a Pro
5. **Referral program**: Offri sconti per referral

## 🌐 Deploy in Produzione

### Opzione 1: Vercel (Consigliato - GRATUITO per iniziare)

1. **Crea account su [Vercel](https://vercel.com)**

2. **Installa Vercel CLI:**
```bash
npm install -g vercel
```

3. **Deploy:**
```bash
vercel
```

4. **Configura database per produzione:**
   - Usa [Vercel Postgres](https://vercel.com/storage/postgres) (gratuito)
   - O [PlanetScale](https://planetscale.com/) (gratuito)
   - O [Supabase](https://supabase.com/) (gratuito)

5. **Aggiorna variabili d'ambiente su Vercel:**
   - `DATABASE_URL`: URL del tuo database
   - `NEXTAUTH_SECRET`: Genera con `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Il tuo dominio Vercel
   - `NEXT_PUBLIC_APP_URL`: Il tuo dominio Vercel

### Opzione 2: Railway

1. Crea account su [Railway](https://railway.app)
2. Clicca "New Project" → "Deploy from GitHub"
3. Collega il repository
4. Railway configurerà tutto automaticamente

### Opzione 3: VPS (DigitalOcean, Linode, etc.)

```bash
# Su server
git clone <your-repo>
cd quicklink-pro
npm install
npm run build
npm start
```

Usa PM2 per mantenere l'app in esecuzione:
```bash
npm install -g pm2
pm2 start npm --name "quicklink-pro" -- start
pm2 startup
pm2 save
```

## 🔧 Configurazione Avanzata

### Variabili d'Ambiente

Crea un file `.env` (già presente) con:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database

Il progetto usa SQLite per sviluppo locale (facile e zero configurazione).

Per produzione, ti consiglio di passare a PostgreSQL:

1. Modifica `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Aggiorna DATABASE_URL con il tuo Postgres URL

3. Rigenera e migra:
```bash
npx prisma generate
npx prisma db push
```

## 📊 Gestione Analytics

Le analytics vengono tracciate automaticamente ad ogni click:
- Device type (desktop, mobile, tablet)
- Browser
- Sistema operativo
- Referrer (da dove proviene il traffico)
- Timestamp

I dati sono visibili nella dashboard di ogni utente.

## 💳 Integrazione Pagamenti (Next Step)

Per monetizzare effettivamente, dovrai integrare un sistema di pagamento:

### Stripe (Consigliato)

1. Crea account su [Stripe](https://stripe.com)

2. Installa Stripe:
```bash
npm install stripe @stripe/stripe-js
```

3. Aggiungi API per creare subscription

4. Implementa webhook per gestire pagamenti

**Risorse:**
- [Stripe Docs](https://stripe.com/docs)
- [Next.js + Stripe Tutorial](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript)

## 🔒 Sicurezza

L'app include:
- ✅ Password hashate con bcrypt
- ✅ Session JWT sicure
- ✅ Validazione input
- ✅ SQL injection protection (Prisma ORM)
- ✅ HTTPS ready

**Per produzione assicurati di:**
- Usare HTTPS
- Cambiare NEXTAUTH_SECRET
- Usare database esterno sicuro
- Implementare rate limiting

## 📈 Marketing e Growth

### Canali di Acquisizione

1. **Product Hunt**: Lancia il prodotto
2. **Reddit**: r/SideProject, r/entrepreneur
3. **Twitter/X**: Twitta features e aggiornamenti
4. **LinkedIn**: Post su marketing digitale
5. **SEO**: Blog su marketing e analytics
6. **Facebook Groups**: Gruppi di digital marketing
7. **YouTube**: Tutorial su come usare link shortener

### Contenuti da Creare

- "Come tracciare i tuoi link di marketing"
- "Best practices per URL shortening"
- "Analytics per social media marketing"
- Tutorial video
- Case studies

## 🛠️ Manutenzione

### Backup Database

```bash
# SQLite
cp prisma/dev.db prisma/backup.db

# PostgreSQL
pg_dump $DATABASE_URL > backup.sql
```

### Monitoring

Usa servizi come:
- [Vercel Analytics](https://vercel.com/analytics) (gratuito)
- [Sentry](https://sentry.io) per error tracking
- [LogRocket](https://logrocket.com) per session replay

## 🤝 Supporto e Contributi

Hai domande o problemi? Ecco come ottenere aiuto:

1. **Documentazione**: Leggi questo README
2. **Issues**: Apri una issue su GitHub
3. **Email**: [Il tuo email]

## 📝 License

MIT License - Sei libero di usare questo progetto per scopi commerciali.

## 🎉 Prossimi Passi

1. ✅ Avvia l'applicazione
2. ✅ Crea un account e testa le funzionalità
3. 🚀 Deploy su Vercel
4. 💳 Integra Stripe per pagamenti
5. 📣 Inizia il marketing
6. 💰 Monitora le conversioni e ottimizza

---

**Fatto da Claude Code per il tuo successo imprenditoriale** ⚡

Buona fortuna con la tua startup! 🚀
