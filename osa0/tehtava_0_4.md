# sivun avaaminen

selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
palvelin->selain: HTML-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
palvelin->selain: CSS-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
palvelin->selain: JavaScript-koodi
selain->palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
palvelin->selain: Muistiinpanot JSON-muodossa

# muistiinpanon lisääminen

käyttäjä->selain: käyttäjä kirjoittaa muistiinpanonsa ja klikkaa "talleta"
selain->palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
note over selain: selain sisällyttää post-pyyntöön muistiinpanon form datassa
palvelin->selain: HTTP 302 https://fullstack-exampleapp.herokuapp.com/notes
note over palvelin: palvelin vastaa uudelleenohjauksella muistiinpanojen listaukseen