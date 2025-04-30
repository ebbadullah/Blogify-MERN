///simple express server 
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
    
})
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' })
})
app.get('/api/data', (req, res) => {
    res.json({ data: 'This is some data from the server!' })
})
app.get('/api/data/:id', (req, res) => {
    const id = req.params.id;
    res.json({ data: `This is some data from the server with id ${id}!` })
})

app.get('/api/data/:id/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    res.json({ data: `This is some data from the server with id ${id} and name ${name}!` })
}
)

app.listen(port, () => {
    
    console.log(`Example app listening at http://localhost:${port}`)
})