# VirtualLabsFE
AI project 2019/2020 Polytechnic of Turin

## Developers

* Giuseppe Ognibene: ognibenegiuseppe8@gmail.com

* Alessandro Pagano: alenihilist@gmail.com

* Hamza Rhaouati: hamza.rhaouati@gmail.com

* Leonardo Tolomei: tolomei.leonardo@gmail.com



## Other stuff

* https://docs.google.com/document/d/1skKK6x3YbBaqDJoYhsfk3NKiIwuAOlmXHtiWzrTeX10/edit

* https://drive.google.com/drive/u/0/folders/1dpIAYeQ7rLAE4yN67bUMnTTp-WR7Zx2s


## Avvio applicazione

1, Nella cartella **ai20-lab05**
2. Dare i seguenti comandi (per scaricare tra le altre cose anche il json-server e il json server-auth)
```
npm install
ng serve --open  # or npm start
```
Viene usata la libreria moment per controllare se un utente è loggato o no verificando la presenza del toke e la sua validità temporale quindi se 
non è installata in locale i comandi da eseguire sono
``` 
npm install 
npm i moment
ng serve --open  # or npm start
```
3. Aprire un altro terminale nella directory **ai20-lab05** e dare i seguenti comandi:
``` 
npx json-server-auth virtuallabs.json -r virtuallabs_routes.json
```
4. Aprire un browser all'indirizzo **https://localhost:4200/**


## Verifica funzionalità applicazione

1. Cliccare sull'icona **hamburger button** (in alto a sinistra) 
per aprire la sidenav laterale con la lista dei corsi (scritti nel codice in questo laboratorio)
2. Per poter vedere usare l'applicazione è necessario loggarsi. Permere il bottone di Login in alto a destra oppure direttamente
su una delle sezioni centrali come per esempio "Students" ed inserire:
    * email: olivier@mail.com
    * password: bestPassw0rd
3. Dopo aver effettuato il login, nella parte centrale, è possibile navigare nelle sezioni "Students", "VMs" e "Assignments" (in questo laboratorio VMs e Assignments vuote)
4. Nella sezione "Students" compare la lista degli studenti iscritti al corso di "Applicazioni Internet" con 
    1. Checkbox per la selezione
    2. Id
    3. Name
    4. FirstName
    5. Team: nome del team oppure ``` <> ``` se lo studente non fa parte di nessun team per quel corso
4. Nella sezione "Studenti" è possibile:
    1. Selezionare uno, più studenti o tutti in una volta (selezionando l'ooportuna casella) e poi cliccare su "Delete selected" per rimuoverli dal corso
    2. Cercare uno studente nella lista di tutti gli studenti da aggiungere al corso. 
    La ricerca viene effettuata per id, nome o cognome. 
    Uno studente viene inserito una sola volta.
    Lo studente viene inserito nella tabella nella posizione corretta in base all'ordinamento selezionato.
    3. Cliccare nella prima riga della tabella, accanto a "Id", "Name", "FirstName", "Team" per ordinare in ordine crescente o discendente la lista
    4. Se sono presenti più di un certo numero di studenti (per default 5), i rimanenti vengono visualizzati in pagine nascoste che possono
    essere raggiunte con la freccia in basso a destra nella tabella

Osservazione: uno studente che ha courseId = 0 non è iscritto a nessun corso quindi di conseguenza deve avere groupId = 0. Solo per test, in questo laboratorio
ho assegnato a 4 studenti (me e i colleghi del mio team), un groupId = 1 (per provare la visualizzazione del nome del team) e anche se sono cancellati dalla tabella esso rimane.

## TLDR: modifiche/aggiunte rispetto al laboratorio 4 
1. Sono stati introdotti due servizi:
    1. AuthService che serve a gestire l'autenticazione di un utente (per ora solo di uno) grazie al JWT ritornato 
    dal json-auth-server e che serve a memorizzare in localStorage dati utili all'applicazione come email, token_id, ecc...
    2. StudentService che serve a gestire le modifiche al DB di studenti, ricevendo le richieste da un componenete Container che contiene un componenente Presentational e usando
    il servizio HTTPclient per fare le richieste al JSON-server
2. Form di login all'interno di un dialog 
3. Due nuove sezioni: VMs e Assignments, da completare nel progetto
4. Sono stati introdotti:
    1. Un interceptor che serve per intercettare le richieste che vengono fatte al server e er aggiungere il token ad esse
    2. Un authentication guard che serve per impedire all'utente non loggato di accedere a delle viste che non verrebbero popolate perché non ha in quel momento
    le credenziali per accedere alle API REST del server
    3. Un error interceptor che intercetta  le risposte https dalle API e controlla se ci siano errori. Nel caso in cui ci sia un 401 allora fa il logout automatico.
    Tutti gli altri errori vengono inviati nuovamente al servizio di chiamata in modo che un avviso con l'errore possa essere visualizzato sullo schermo (per ora viene visualizzato solo
    un errore nel form del login)
5. Altre aggiunte:
    1. Routing
    2. Proxy 
    3. SSL
    4. Sono state protette alcune route grazie all'uso di un file di configurazione di json-server-auth
4. Modifica dello StudentModel per permettere la visualizzazione del nome del gruppo.
