$(document).ready(
  function(){

    // Stampa lista iniziale
    stampaLista()

    // Al click del bottone aggiungi,aggiungi il prodotto
    $(document).on('click','.inserisci',
      function(){

        // Inserimento in una variabile il compito da aggiungere
        var compito = $('input').val();

        // Se l'input riporta un valore
        if(compito.length > 0){
          // Chiamata ajax per aggiumgere un compito alla lista
          $.ajax({
            url:  'http://157.230.17.132:3011/todos/',
            method: 'POST',
            data:{
              text: compito
            },
            success: function(data){

              // Stampa a schermo la lista e reset generale
              reset();
              stampaLista();
            },
            error: function(){
              alert('Errore caricamento API');
            }
          });
        }else{
          alert('Inserire almeno un carattere');
        }
    });

    // Al click del bottone Elimina,elimina il compito
    $(document).on('click','.elimina',
      function(){

        // Inserimento in una variabile l'id per il compito da eliminare
        var idCompito = $(this).parent().attr('data-id');

        // Chiamata ajax per aggiumgere un compito alla lista
        $.ajax({
          url:  'http://157.230.17.132:3011/todos/' + idCompito,
          method: 'DELETE',
          success: function(data){

            // Stampa a schermo la lista e reset generale
            reset();
            stampaLista();
          },
          error: function(){
            alert('Errore caricamento API');
          }
        });
    });
});

// Reset generale
function reset(){
  $('.listaSpesa').text('');
  $('input').val('');
}

// Stampa lista
function stampaLista(){

  // Chiamata ajax per stampare a schermo la lista
  $.ajax({
    url:  'http://157.230.17.132:3011/todos/',
    method: 'GET',
    success: function(data){

      // Se la lista ha almeno un risultato stampa a shermo
      if(data.length > 0){

        // Implementazione handlebars
        var source = $("#lista-template").html();
        var template = Handlebars.compile(source);

        // Cicla tutti i risultati della chiamata
        for (var i = 0; i < data.length; i++) {
          var context = {
            id: data[i].id,
            compito: data[i].text
          };

          // Stampa il risulato
          var html = template(context);
          $('.listaSpesa').append(html);
        }
      }
    },
    error: function(){
      alert('Errore caricamento API');
    }
  });
}
