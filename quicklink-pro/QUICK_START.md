# ⚡ Quick Start - Inizia in 5 Minuti

La guida più veloce per far partire QuickLink Pro.

## TL;DR - Un Solo Comando

### Linux/Mac
```bash
./start.sh
```

### Windows
```batch
start.bat
```

Fatto! L'app sarà su **http://localhost:3000**

---

## Requisiti

Prima di iniziare, assicurati di avere:

✅ **Node.js 18+** installato
   - Controlla: `node --version`
   - Se non ce l'hai: [Scarica Node.js](https://nodejs.org/)

---

## Cosa Fa lo Script

Lo script automaticamente:

1. ✅ Verifica che Node.js sia installato
2. 📦 Installa tutte le dipendenze (`npm install`)
3. 🗄️ Genera il client Prisma
4. 🗄️ Crea il database SQLite
5. 🚀 Avvia l'applicazione

---

## Primo Utilizzo

### 1. Avvia l'App
```bash
./start.sh
```

### 2. Apri il Browser
Vai su: **http://localhost:3000**

### 3. Crea Account
- Clicca "Get Started"
- Inserisci email e password
- Crea account

### 4. Crea il Primo Link
- Inserisci un URL lungo (es. https://example.com/very/long/url)
- Clicca "Create Short Link"
- Copia il link breve generato

### 5. Testa il Link
- Apri il link breve in una nuova tab
- Verrai reindirizzato all'URL originale
- Le analytics verranno tracciate automaticamente

---

## Comandi Utili

### Avviare in Development Mode
```bash
npm run dev
```

### Build per Produzione
```bash
npm run build
npm start
```

### Aprire Prisma Studio (Database GUI)
```bash
npx prisma studio
```

### Reset Database (ATTENZIONE: cancella tutti i dati)
```bash
rm prisma/dev.db
npx prisma db push
```

---

## Struttura Progetto

```
quicklink-pro/
├── app/                    # Next.js app directory
│   ├── api/               # API endpoints
│   ├── auth/              # Sign in/up pages
│   ├── dashboard/         # User dashboard
│   └── [shortCode]/       # Dynamic redirect route
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema & migrations
│   └── schema.prisma     # Database models
├── public/               # Static files
└── package.json          # Dependencies
```

---

## Environment Variables

Il progetto include già un file `.env` configurato per sviluppo locale.

Se vuoi personalizzarlo:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Problemi Comuni

### "npm: command not found"
➜ **Soluzione**: Installa Node.js da [nodejs.org](https://nodejs.org/)

### "Port 3000 is already in use"
➜ **Soluzione**: Chiudi altre app sulla porta 3000 o usa un'altra porta:
```bash
PORT=3001 npm run dev
```

### "Database locked" o errori SQLite
➜ **Soluzione**:
```bash
rm prisma/dev.db
npx prisma db push
```

### Pagina bianca o errori JavaScript
➜ **Soluzione**:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## Prossimi Passi

### Per Uso Locale
✅ Sei pronto! Usa l'app localmente quanto vuoi.

### Per Metterla Online
1. Leggi **[DEPLOYMENT.md](./DEPLOYMENT.md)** per istruzioni di deploy
2. Deploy su Vercel (5 minuti, gratis)
3. Configura un dominio personalizzato

### Per Monetizzare
1. Leggi **[BUSINESS_GUIDE.md](./BUSINESS_GUIDE.md)**
2. Integra Stripe per pagamenti
3. Inizia il marketing
4. Raggiungi $1000/mese!

---

## Supporto

**Problemi?**
- Leggi il [README.md](./README.md) completo
- Controlla [DEPLOYMENT.md](./DEPLOYMENT.md) per il deploy
- Cerca l'errore su Google
- Apri una issue su GitHub

---

## Test Rapido

Vuoi testare che tutto funzioni? Segui questi step:

1. ✅ Vai su http://localhost:3000 → Vedi homepage
2. ✅ Clicca "Sign Up" → Crea account
3. ✅ Dashboard si carica → Vedi "Total Links: 0"
4. ✅ Crea link → Inserisci "https://google.com"
5. ✅ Copia short link → Es. http://localhost:3000/abc123
6. ✅ Apri short link in nuova tab → Vieni reindirizzato a Google
7. ✅ Torna alla dashboard → Vedi "Total Clicks: 1"

Se tutti questi step funzionano, **sei pronto!** 🎉

---

## Tips & Tricks

💡 **Usa Ctrl+C** nel terminale per fermare il server

💡 **Hot Reload**: Il codice si ricarica automaticamente quando modifichi file

💡 **Prisma Studio**: Usa `npx prisma studio` per vedere/modificare il database visualmente

💡 **Logs**: Guarda il terminale per vedere request e errori in real-time

---

**Buon divertimento con QuickLink Pro!** ⚡

Hai creato la tua prima startup SaaS in meno di 5 minuti! 🚀
