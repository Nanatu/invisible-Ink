var querystring = require("querystring");
var formidable = require("formidable");
var fs = require ("fs");

function start(response)
{
 console.log("Request handler start was called.");
 var body = "<html>" +
 "<head>" +
 "<meta http-equiv='Content-Type' content='text/html'; " +
 "charset='UTF-8' />" +
 "</head>" +
 "<body>" +
 "<form action='/upload' enctype='multipart/form-data' method='post'>" +
 "<input type='file' name='upload'></input>" +
 "<input type='submit' value='Upload file' />" +
 "</form>" +
 "</body>" +
 "</html>" ;
 response.writeHead(200,{"Content-Type":"text/html"});
 response.write(body);
 response.end();
}
function upload(response,request)
{
 console.log("Request handler upload was called.");
 var form = new formidable.IncomingForm();
 console.log("about to parse");
 form.parse(request, function(error,fields,files)
 {
 console.log("parsing done");
 /* possible error on windows systems :
 tried to rename to an already existing file */
 fs.rename(files.upload.path,"c:\\tmp\\test.pdf", function (err)
 {
 if (err)
 {
 fs.unlink("c:\\tmp\\test.pdf");
 console.log("Value of files.upload.path : " + files.upload.path );
 fs.rename(files.upload.path,"c:\\tmp\\test.pdf");
 }
 });
 response.writeHead(200, {"Content-Type" : "text/html" } );
 response.write("Received pdf: <br/>");
 response.write("<a href="/show">/show</a>");
 response.end();
 });
}

function show(response, request)
{
 console.log("Request handler show was called.");
 fs.readFile("c:\\tmp\\test.pdf","binary", function(error,file)
 {
 if (error)
 {
 response.writeHead(500, {"Content-Type": "text/plain" });
 response.write(error + "\n");
 response.end();
 }
 else
 {
 response.writeHead(200, {"Content-Type" : "application/pdf" });
 response.write(file, "binary" );
 response.end();
 }
 });
}
exports.start = start;
exports.upload = upload;
exports.show = show;
