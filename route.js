import { Router } from "express";
const router = Router();

/** import controllers */
import * as controller from '../controllers/controller.js';
import * as userController from '../controllers/useController.js';

/** Questions Routes API */

router.route('/questions')
        .get(controller.getQuestions) /** GET Request */
        .post(controller.insertQuestions) /** POST Request */
        .delete(controller.dropQuestions) /** DELETE Request */


router.route('/quiz/:id').get(controller.getSingleQuiz)
router.route('/quiz/:id').delete(controller.deleteSingleQuiz)
router.route('/quiz/:id').put(controller.updateQuiz)


router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)
        .delete(controller.dropResult)

router.route('/user/register')
        .post(userController.createUser)

router.route('/user/login')
        .post(userController.loginUser)

router.route('/user/quizzes/update')
        .post(userController.updateQuizzesTaken)

router.get('/user/profile/:id', userController.getUserProfile)

router.get('/admin/users', userController.getAllUsers)

export default router;