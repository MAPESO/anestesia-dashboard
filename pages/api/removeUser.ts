// Packages
import { NextApiRequest, NextApiResponse } from 'next';

// Model
import User from '../../lib/db/models/User';

// DB
import { connectToDB } from '../../lib/db';

// Utils
import { errorWrapper } from '../../lib/utils/error-wrapper';

async function hanlder (req: NextApiRequest, res: NextApiResponse) {
    await connectToDB(process.env.MONGODB_URI)
    if(req.method === 'GET') {
        const users = await User.find({ userRemove: true });
        return res.status(200).json(users);
    }
    if(req.method === 'PUT') {
        const { id, userRemove } = req.body;
        await User.findOneAndUpdate(id, { userRemove });
        return res.status(200).end();
    }
}

export default errorWrapper(hanlder);