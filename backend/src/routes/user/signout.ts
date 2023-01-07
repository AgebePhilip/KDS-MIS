import { Router } from 'express';

const router = Router();

router.post('/signout', (req, res) => {
  req.session = null;
  res.status(200).send({});
})



export default router;