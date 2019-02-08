const fs = require('fs');
const http = require('http');

const port = process.env.PORT || 3000;


var html_content = fs.readFileSync('index.html', {encoding: 'utf-8'});

//reads employees.json file
const employees = fs.readFileSync('employees.JSON');

//parses json file into list of objects
const employeesJson = JSON.parse(employees).Employees


//runs createServer callback everytime someone accesses the server
const app = http.createServer((req, res)=> {

    console.log('Someone accessed the server');

    res.writeHead(200, {'Content-Type': 'text/html'});

    //reads the outter html once
    fs.readFile(`index.html`, 'utf-8', (error, data) => {

        let output = data;

        //chains the second readFile and reads the html for the table row
        fs.readFile(`person.html`, 'utf-8', (error, data) => {
            //loops over employeeJson data (array of objects) and for each person, replace the html for each person and store the string of html in output
            const personData = employeesJson.map(el => replaceTemplate(data, el)).join('');

            //replace the outter html placeholder with person html of table rows
            output = output.replace('{%person%}', personData)
            
            //render to screen
            res.end(output);
        });

    
    });


})

//listens for whenever the server starts
app.listen(port, '127.0.0.1', () => {
    console.log(`Server is running ${port}`)
    
})


function replaceTemplate(originalHtml, person) {

    let output = originalHtml.replace(/{%image%}/g, person.photoID);
    output = output.replace(/{%firstName%}/g, person.firstName);''
    output = output.replace(/{%lastName%}/g, person.lastName);
    output = output.replace(/{%region%}/g, person.region);
    return output;

}










