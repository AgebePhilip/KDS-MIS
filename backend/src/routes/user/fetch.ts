import { Router, Request, Response } from 'express';
import { UserType } from '../../services/types/user';

import {body} from 'express-validator';
import { User } from '../../models/userModel';
import { JWT } from '../../services/Jwt';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middleware/validate-request';
import { GenerateToken } from '../../helper/user-tokens';
import { MailMessagePublisher } from '../../event/mail-publisher';
import { redis_client } from '../../startup/redis-config';
import { lang } from '../../helper/lang/language';
import { successResponse } from '../../helper/success-response';
import { requireAuth } from '../../middleware/require-auth';
import { permission } from '../../middleware/permission';
import { Roles } from '../../helper/role';


const router = Router();


router.get('/', requireAuth, permission(Roles.admin), async (req: Request, res: Response) => {


  const user =  await User.find({});

  res.status(200).send(successResponse(user))     

})


export default router;