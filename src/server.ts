//Dependencies
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';

const app: Application = express();
const func = require('./simple/func');

//Middleware
//Static public folder
app.use(express.static(path.join(__dirname, '/client/public')));
app.use(express.static("public"));

const { Client } = require('pg');
const client = new Client();

interface rows {
  rows: any
}

client.connect();
client.query('SELECT $1::text as message', ['Postgres'], (err: string, res:rows) => {
  let rows: Array<any> = [];
  rows = res.rows;
  console.log(err ? "err" + err : rows.map(row => row.message))
  client.end();
})

//Express Routes
app.get('/api/func', (req: Request, res: Response, next: NextFunction) => {
    const f = "number is: " + func(2, 3);
    console.log(f);
    res.send(f);

});
app.get('/api/customers', (req: Request, res: Response, next: NextFunction) => {
    const customers: Object = [
        {
          id: 1,
          name: 'Donald Hughes',
          email: 'donald_h@photon.in'
        },
        {
          id: 2,
          name: 'John Doe',
          email: 'john@doe.com'
        },
        {
          id: 3,
          name: 'Jane Doe',
          email: 'jane@doe.com'
        }
      ];
     res.send(customers);
});


//Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});


