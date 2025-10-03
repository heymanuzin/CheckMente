const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://borgesdasilvaemanoelly13_db_user:zLicEasDla7a0fTB@checkmentedados.ym3pkhj.mongodb.net/?retryWrites=true&w=majority&appName=CheckMentedados';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function listCheckins() {
  try {
    await client.connect();
    const db = client.db('checkmente');
    const checkins = await db.collection('checkins').find({}).toArray();
    console.log('Check-ins Emocionais:');
    checkins.forEach((checkin, index) => {
      console.log(`${index + 1}. Humor: ${checkin.mood}`);
      console.log(`   Notas: ${checkin.notes || 'Nenhuma nota adicional'}`);
      console.log(`   Data: ${checkin.timestamp}`);
      console.log('---');
    });
  } catch (err) {
    console.error('Erro ao listar check-ins:', err);
  } finally {
    await client.close();
  }
}

listCheckins();
