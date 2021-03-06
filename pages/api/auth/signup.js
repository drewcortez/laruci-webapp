import { postClient } from '../../../data/access/clients';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newClient = await postClient(req.body.client);
      res.status(201).json({ statusCode: '201', client: newClient });
    } catch (err) {
      if (err.message.startsWith('ERN0C1')) {
        res.status(422).json({
          statusCode: '422',
          message: 'INVALID CLIENT: ' + err.message,
        });
      } else if (err.message.startsWith('DUPLICATED')) {
        res.status(400).json({
          statusCode: '400',
          message: 'CLIENT ALREADY EXISTS: ' + err.message,
        });
      } else {
        res.status(500).json({
          statusCode: '500',
          message: 'ERROR SAVING SIZE SET: ' + err.message,
        });
      }
    }
  } else {
    res.status(405).json({
      statusCode: '405',
      message: 'METHOD NOT ALLOWED',
    });
  }
}
