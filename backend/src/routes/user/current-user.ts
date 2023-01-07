import { Request, Response, Router } from 'express';
import { currentUser } from '../../middleware/current-user';



const router = Router();

router.get('/currentuser', currentUser, async (req: Request, res: Response) => {
   
  res.send({currentUser: req.currentUser || null})
 
})



export default router;