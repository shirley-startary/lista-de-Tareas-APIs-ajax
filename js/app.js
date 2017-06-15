var api = {
  url : 'https://lab-api-test.herokuapp.com/tasks/'
}

var $contenedorTabla = $("#tasks-list");
var cargarPagina = function(){
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  $(document).on("click",".eliminar",borrarTarea);
  $(document).on("click",".editar",editarTarea);
  $(document).on("click",".ver",verDetalleTarea);
}


var cargarTareas = function() {
  $.getJSON(api.url, function(tareas){
    tareas.forEach(crearTarea);
  });
}

var crearTarea = function(tarea){
  // console.log(tarea);
  var nombre = tarea.name;
  var estado = tarea.status;
  var id = tarea._id;
  // console.log(id);
  var $tr = $("<tr />",{"data-id":id});
  var $nombreTd = $("<td />");
  var $estadoTd = $("<td />");
  var $accionesTd = $("<td />");
  var $iconoVer =$("<button />",{"class":"glyphicon glyphicon-zoom-in ver",
                                          "data-toggle":"modal",

                                          "data-target":".bs-example-modal-sm"});
  var $iconoEditar =$("<button />",{"class":"glyphicon glyphicon-pencil editar"});
  var $iconoEliminar =$("<button />",{"class":"glyphicon glyphicon-remove eliminar"});
  // console.log($tr);
  $nombreTd.text(nombre);
  $estadoTd.text(estado);
  $accionesTd.append($iconoVer);
  $accionesTd.append($iconoEditar);
  $accionesTd.append($iconoEliminar);
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($accionesTd),
  $contenedorTabla.append($tr);
}

var agregarTarea = function (e) {
  e.preventDefault();
  var $nombre  = $("#nombre-tarea")
  var $nombreTarea =$nombre.val();
  $.post(api.url,{
      name: $nombreTarea
  }, function(response){
      $("#myModal").modal("hide");
      crearTarea(response)
      $nombre.val("");
  })
}

var borrarTarea = function () {
  var $elementoPapa = $(this).parents("tr");
  var id = $(this).parents("tr").attr("data-id");
     console.log(api.url+id);
     $.ajax(api.url+id,{
        //  url: api.url + id,
         type: 'DELETE',
         success: function(response) {
           console.log(response);
           alert("se ha borrado correctamente");
            //  cargarTareas();
         },
         error: function(error){
           console.log(error);
         }
     });
   $elementoPapa.remove();
 }

var editarTarea = function () {


}
var plantillaDetalle = '<p id="detalleNombre"><strong>Nombre Tarea:</strong>__nombre__</p>'+
'<p id="detalleFechaCreacion"><strong>Fecha de Creacion de la Tarea:</strong>__fecha__</p>'+
'<p id="detalleEstatus"><strong>Estatus Tarea:</strong>__estatus__</p>';

var verDetalleTarea = function () {
  var $idTarea = $(this).parents("tr").attr("data-id");
  // console.log($idTarea);
  $.getJSON(api.url+$idTarea,function (tarea) {
    var $contenedor = $("#modal-body");
    // console.log($contenedor);
    $contenedor.html(
      plantillaDetalle.replace("__nombre__",tarea.name)
      .replace("__fecha__",tarea.created_at)
      .replace("__estatus__",tarea.status)
    );
    // console.log(tarea);
  })
}
$(document).ready(cargarPagina);
