# sivun aukaisu

selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
palvelin->selain: HTML-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
palvelin->selain: CSS-koodi
selain->dokumentti: Asetetaan tyylit paikoilleen
selain->palvelin: https://fullstack-exampleapp.herokuapp.com/spa.js
palvelin->selain: JavaScript-koodi

selain->dokumentti: Selain alkaa pyörittää JavaScript-koodia. Haetaan muistiinpanot, rendataan ne ja asetetaan tapahtumankuuntelija lomakkeeseen.

selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
palvelin->selain: Muistiinpanot JSON-muodossa
selain->dokumentti: renderoidaan muistiinpanot