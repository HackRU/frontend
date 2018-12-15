var hacks = [];
function handleGavelRequest(){
  if($('#hack-error').length != 0){
    $('#hack-error').remove();
  }
  var hackName = $('#gavel-form-name-input').val().trim();
  if(hackName == "") return;
  var parameters = {name:hackName};
  $.get('/gavelQuery',parameters,(data)=>{
    if(data == null){
      var div = $("<div>",{id:"hack-error"});
      div.append("Sorry! Couldn't find "+hackName+" in our submissions <a href=\"http://gavel-ru.herokuapp.com/submissions/\">list</a>.");
      $('#gavel-data').prepend(div);  
      return;
    }
    var json = toJSON(data);
    if(json[0] == null){
      var div = $("<div>",{id:"hack-error"});
      div.append("Sorry! Couldn't find "+hackName+" in our submissions <a href=\"http://gavel-ru.herokuapp.com/submissions/\">list</a>.");
      $('#gavel-data').prepend(div);  
      return;
    }

    if(hacks.indexOf(json[0].Name) != -1) return;
    hacks.push(json[0].Name);
    var div = $("<div>",{id:"hack-"+hacks, "class":"gavel-data-hack"});
    div.append("<p class=\"hack-name\"><span class=\"hack-name-tag\">Name: </span><span class=\"hack-name-text\">"+json[0].Name+"</span></p>");    
    div.append("<p class=\"hack-description\"><span class=\"hack-description-tag\">Description: </span><span class=\"hack-description-text\">"+json[0].Description+"</span></p>");    
    div.append("<p class=\"hack-location\"><span class=\"hack-location-tag\">Location: </span><span class=\"hack-location-text\">"+json[0].Location+"</span></p>");    
    var table = $("<table>",{id:"hack-table-"+hacks,"class":"hack-table"});
    var row = $("<tr>",{"class":"hack-table-row"});
    row.append("<th class=\"hack-table-header header-prize\">Prize</th><th class=\"hack-table-header header-times-seen\">Times Seen</th>"); 
    table.append(row);
    for(var i = 0; i < json.length; i++){
      row = $("<tr>",{"class":"hack-table-row"}); 
      row.append("<td class=\"hack-table-cell cell-prize\">"+json[i].Prize+"</td><td class=\"hack-table-cell cell-times-seen\">"+json[i]["Times Seen"]+"</td>"); 
      table.append(row);
    }


    div.append(table);
    div.append("<div class=\"short-separator\"></div>");
    $('#gavel-data').prepend(div);
    $('#gavel-form-name-input').val("");
  });
  
}

function toJSON(csv){
  var lines = csv.split('\n');
  var res = [];
  var headers = lines[0].split(",");
  for(var i = 1; i < lines.length-1; i++){
    var obj = {};
    var currentline = lines[i].split(',');
    for(var j=0; j < currentline.length; j++){
      obj[headers[j].trim()] = currentline[j];
    }
    res.push(obj);
  }
  return res;
}
