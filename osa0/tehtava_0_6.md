```
käyttäjä->selain: käyttäjä kirjoittaa muistiinpanonsa ja klikkaa "talleta"
selain->ikkuna: formin onsubmit lätee päälle - rendataan uusi muistiinpano
selain->palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
note over selain: selain sisällyttää post-pyyntöön muistiinpanon JSON-muodossa
palvelin->selain: HTTP 200
```