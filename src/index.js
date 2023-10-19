import express from 'express';
import cassandra from 'cassandra-driver';
import 'dotenv/config';

const app = express();
const port = 8000;

const client = new cassandra.Client({
	contactPoints: [process.env.CASSANDRA_HOST],
	localDataCenter: 'dc1',
	keyspace: 'prod',
	credentials: {
		username: process.env.CASSANDRA_USER,
		password: process.env.CASSANDRA_PASSWORD,
	},
});

app.use(express.static('./public'));

app.get('/api/data', async (req, res) => {
	const data = await client.execute('SELECT * FROM employment');
	res.send(data.rows);
});

app.listen(port, () => {
	console.log(`Backend listening on port ${port}`);
});
