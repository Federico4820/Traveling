# 🌍 Traveling App - Frontend

Benvenuto nella **Traveling App**, un'applicazione web che consente agli utenti di esplorare e prenotare viaggi in tutto il mondo. Questo progetto è sviluppato con **React**, **Bootstrap** per l'interfaccia utente, e comunica con un'API .NET Core per la gestione dei dati e delle prenotazioni.

---

## 🧭 A cosa serve questa app?

La Traveling App consente agli utenti di:

- Sfogliare una lista di viaggi disponibili.
- Visualizzare i dettagli di ogni viaggio.
- Prenotare un viaggio (previa autenticazione).
- Visualizzare le prenotazioni effettuate.
- (Per gli amministratori) Creare, modificare e cancellare viaggi e prenotazioni.

---

## ⚙️ Funzionalità principali

- **Autenticazione e Autorizzazione**  
  Login, logout e gestione dei ruoli (Utente / Admin).

- **Viaggi**

  - Lista viaggi con ricerca per destinazione.
  - Visualizzazione dettagliata con descrizione, immagine, prezzo.
  - Form per prenotazione diretta.

- **Prenotazioni**

  - Visualizzazione delle prenotazioni personali.
  - Gli admin possono vedere e gestire tutte le prenotazioni.
  - Possibilità di cancellare una prenotazione (sia come utente che come admin).

- **Ruoli amministrativi**
  - Gestione completa dei viaggi.
  - Accesso riservato a sezioni di amministrazione.

---

## 🖼️ Interfaccia utente

L’interfaccia è responsive e moderna, realizzata con **React-Bootstrap**. Le immagini dei viaggi sono ben visibili e ogni scheda mostra in modo chiaro il prezzo e la destinazione.

- Barra di ricerca in cima alla pagina dei viaggi.
- Riquadro evidenziato per le descrizioni.
- Messaggi di conferma/errore in tempo reale.
- Navigazione fluida tra le pagine.

---

## 🔗 Backend API

Questa app comunica con una API REST sviluppata in ASP.NET Core. Il progetto API completo è disponibile qui:  
👉 [Traveling API Repository](https://github.com/Federico4820/TravelingAPI)

---

## 🛠️ Tecnologie utilizzate

- **Frontend**: React, React Router, React Bootstrap
- **Backend**: ASP.NET Core 8.0 Web API (vedi link sopra)
- **Autenticazione**: JWT + Cookie-based authentication
- **Database**: SQL Server
- **Librerie**: Fetch API, Bootstrap

---

## ▶️ Come avviare l’app

1. Clona il progetto:
   ```bash
   git clone https://github.com/TUO_USERNAME/TUA_REPO_FRONTEND.git
   ```
