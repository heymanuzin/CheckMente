const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://borgesdasilvaemanoelly13_db_user:zLicEasDla7a0fTB@checkmentedados.ym3pkhj.mongodb.net/?retryWrites=true&w=majority&appName=CheckMentedados';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function listDesabafos() {
  try {
    await client.connect();
    const db = client.db('checkmente');
    const desabafos = await db.collection('desabafos').find({}).toArray();
    console.log('Desabafos Anônimos:');
    desabafos.forEach((desabafo, index) => {
      console.log(`${index + 1}. Assunto: ${desabafo.assunto}`);
      console.log(`   Desabafo: ${desabafo.desabafo}`);
      console.log(`   Contato: ${desabafo.contato || 'Anônimo'}`);
      console.log(`   Data: ${desabafo.timestamp}`);
      console.log('---');
    });
  } catch (err) {
    console.error('Erro ao listar desabafos:', err);
  } finally {
    await client.close();
  }
}

listDesabafos();
